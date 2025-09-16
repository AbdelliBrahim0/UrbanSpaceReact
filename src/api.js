const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");
const PUBLIC_API = API_BASE;

// ---------- Helpers ----------
async function fetchApi(endpoint, options = {}) {
  const url = `${PUBLIC_API}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Ajouter le token JWT à l'en-tête Authorization si l'utilisateur est connecté
  const token = localStorage.getItem('jwt_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include",  // Assure-toi que les cookies sont envoyés si nécessaire
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data && typeof data === "object") {
      return data;
    }

    return { success: true, data };
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    return {
      success: false,
      message: error.message || "Erreur inconnue",
    };
  }
}

function createEmptyPaginatedResponse(limit = 12) {
  return {
    success: true,
    items: [],
    pagination: {
      current_page: 1,
      items_per_page: limit,
      total_items: 0,
      total_pages: 1,
      has_previous: false,
      has_next: false,
    },
  };
}

// ---------- Private API ----------
// Ajouter des méthodes pour la gestion du login et signup
const privateApi = {
  auth: {
    // Fonction pour l'inscription
    signup: async (userData) => {
      try {
        const response = await fetchApi("/api/signup", {
          method: "POST",
          body: JSON.stringify(userData),
        });

        if (response.success) {
          // Sauvegarder le token JWT dans le localStorage
          localStorage.setItem("jwt_token", response.token);
          return {
            success: true,
            message: "Inscription réussie",
            user: response.user,
          };
        } else {
          return {
            success: false,
            message: response.message || "Erreur lors de l'inscription",
          };
        }
      } catch (error) {
        console.error("Erreur d'inscription:", error);
        return {
          success: false,
          message: error.message || "Erreur inconnue",
        };
      }
    },

    // Fonction pour la connexion
    login: async (credentials) => {
      try {
        const response = await fetchApi("/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
        });

        if (response.success) {
          // Sauvegarder le token JWT dans le localStorage
          localStorage.setItem("jwt_token", response.token);
          return {
            success: true,
            message: "Connexion réussie",
            token: response.token,
            user: response.user,
          };
        } else {
          return {
            success: false,
            message: response.message || "Identifiants invalides",
          };
        }
      } catch (error) {
        console.error("Erreur de connexion:", error);
        return {
          success: false,
          message: error.message || "Erreur inconnue",
        };
      }
    },

    // Fonction pour vérifier si l'utilisateur est connecté (via le token JWT)
    checkAuth: async () => {
      const token = localStorage.getItem("jwt_token");

      if (!token) {
        return {
          success: false,
          message: "Non authentifié",
        };
      }

      try {
        const response = await fetchApi("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.success
          ? {
              success: true,
              user: response.user,
            }
          : {
              success: false,
              message: "Session expirée",
            };
      } catch (error) {
        console.error("Erreur de vérification d'authentification:", error);
        return {
          success: false,
          message: "Erreur inconnue",
        };
      }
    },

    // Fonction pour la déconnexion
    logout: () => {
      // Supprimer le token JWT du localStorage
      localStorage.removeItem("jwt_token");
      return { success: true, message: "Déconnexion réussie" };
    },
  },
};

// ---------- Public API (inchangé) ----------
const publicApi = {
  categories: {
    list: async () => {
      const response = await fetchApi("/public/categories");
      return response.items || [];
    },
    get: async (id) => {
      const response = await fetchApi(`/public/categories/${id}`);
      return response.item || null;
    },
  },

  subcategories: {
    list: async () => {
      const response = await fetchApi("/public/subcategories");
      return response.items || [];
    },
    get: async (id) => {
      const response = await fetchApi(`/public/subcategories/${id}`);
      return response.item || null;
    },
  },

  products: {
    list: async (page = 1, limit = 12, categoryId, subcategoryId) => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (categoryId) params.append("category", categoryId.toString());
      if (subcategoryId) params.append("subcategory", subcategoryId.toString());

      try {
        const url = `/products?${params}`;
        const response = await fetchApi(url);

        if (response.success && Array.isArray(response.items)) {
          return {
            success: true,
            items: response.items,
            pagination: response.pagination || {
              current_page: page,
              items_per_page: limit,
              total_items: response.items.length,
              total_pages: Math.ceil(response.items.length / limit),
              has_previous: page > 1,
              has_next: page < Math.ceil(response.items.length / limit),
            },
          };
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }

      return createEmptyPaginatedResponse(limit);
    },

    get: async (id) => {
      const response = await fetchApi(`/products/${id}`);
      return response.item || null;
    },

    getByCategory: async (categoryId, page = 1, limit = 12) => {
      const response = await fetchApi(`/public/categories/${categoryId}/products?page=${page}&limit=${limit}`);
      if (response.success && Array.isArray(response.items)) {
        return response;
      }
      return createEmptyPaginatedResponse(limit);
    },

    getBySubcategory: async (subcategoryId, page = 1, limit = 12) => {
      const response = await fetchApi(`/public/subcategories/${subcategoryId}/products?page=${page}&limit=${limit}`);
      if (response.success && Array.isArray(response.items)) {
        return response;
      }
      return createEmptyPaginatedResponse(limit);
    },
  },
};

export default { ...publicApi, privateApi };

// Export alias (compatibilité avec ton ancien code)
export const categoriesApi = publicApi.categories;
export const subcategoriesApi = publicApi.subcategories;
export const productsApi = publicApi.products;
export const authApi = privateApi.auth;
