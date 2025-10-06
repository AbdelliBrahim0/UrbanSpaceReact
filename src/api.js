// Configuration de l'URL de base de l'API
const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");
const API_PREFIX = "";
const PUBLIC_API = `${API_BASE}`;

// ---------- Helpers ----------
async function fetchApi(endpoint, options = {}) {
  const url = `${PUBLIC_API}${endpoint}`;
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Ajouter le token JWT à l'en-tête Authorization si l'utilisateur est connecté
  const token = localStorage.getItem('jwt_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const fetchOptions = {
    method: options.method || 'GET',
    headers,
    credentials: 'include',
    ...options,
  };

  // Ne pas sérialiser le corps si c'est déjà une chaîne ou si c'est un FormData
  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, fetchOptions);
    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(responseData.message || `Erreur HTTP ${response.status}`);
      error.status = response.status;
      error.data = responseData;
      throw error;
    }

    return responseData;

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
// API pour les opérations utilisateur
const userApi = {
  // Récupérer le profil de l'utilisateur connecté
  getProfile: async () => {
    try {
      const response = await fetchApi("/user/profile", {
        method: "GET"
      });
      
      if (response.success && response.user) {
        return {
          success: true,
          user: response.user
        };
      }
      return {
        success: false,
        message: response.message || "Erreur lors de la récupération du profil"
      };
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
      return {
        success: false,
        message: error.message || "Erreur de connexion au serveur"
      };
    }
  },
  
  // Mettre à jour le profil utilisateur
  updateProfile: async (userData) => {
    try {
      const response = await fetchApi("/user/update-profile", {
        method: "PUT",
        body: userData
      });
      
      if (response.success) {
        return {
          success: true,
          user: response.user,
          message: response.message || "Profil mis à jour avec succès"
        };
      }
      return {
        success: false,
        message: response.message || "Erreur lors de la mise à jour du profil"
      };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      return {
        success: false,
        message: error.message || "Erreur de connexion au serveur"
      };
    }
  }
};

const privateApi = {
  auth: {
    // Fonction pour l'inscription
    signup: async (userData) => {
      try {
        const response = await fetchApi("/signup", {
          method: "POST",
          body: userData,
        });

        if (response.success) {
          // Ne pas sauvegarder le token ici, ce sera fait dans le composant
          return {
            success: true,
            message: response.message || "Inscription réussie",
            user: response.user,
            token: response.token
          };
        }
        return {
          success: false,
          message: response.message || "Erreur lors de l'inscription"
        };
      } catch (error) {
        console.error("Erreur d'inscription:", error);
        return {
          success: false,
          message: error.message || "Erreur de connexion au serveur"
        };
      }
    },

    // Fonction pour la connexion
    login: async (credentials) => {
      try {
        console.log('Tentative de connexion avec :', {
          email: credentials.email,
          password: '[PROTECTED]'
        });
        
        const response = await fetchApi("/login", {
          method: "POST",
          body: {
            username: credentials.email.trim(),  // Symfony expects 'username' field
            email: credentials.email.trim(),     // Keep for backward compatibility
            password: credentials.password
          }
        });

        console.log('Réponse du serveur :', response);

        if (response.token) {
          return {
            success: true,
            message: response.message || "Connexion réussie",
            user: response.user || {
              id: response.id,
              email: response.email,
              nom: response.nom,
              roles: response.roles || []
            },
            token: response.token
          };
        }
        
        return {
          success: false,
          message: response.message || "Identifiants invalides"
        };
      } catch (error) {
        console.error("Erreur de connexion:", error);
        return {
          success: false,
          message: error.data?.message || error.message || "Impossible de se connecter au serveur"
        };
      }
    },

    // Fonction pour vérifier si l'utilisateur est connecté (via le token JWT)
    checkAuth: async () => {
      const token = localStorage.getItem("jwt_token");

      if (!token) {
        return { success: false, message: "Non authentifié" };
      }

      try {
        const response = await fetchApi("/me", {
          method: "GET"
        });

        if (response.success) {
          return {
            success: true,
            user: response.user
          };
        }
        
        // Si l'authentification échoue, nettoyer le token invalide
        localStorage.removeItem("jwt_token");
        return {
          success: false,
          message: response.message || "Session expirée"
        };
      } catch (error) {
        console.error("Erreur de vérification d'authentification:", error);
        return {
          success: false,
          message: "Erreur de connexion au serveur"
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
  blackfriday: {
    list: async () => {
      const response = await fetchApi("/api/black-friday");

      if (response.success && Array.isArray(response.data)) {
        return {
          success: true,
          items: response.data,
          count: response.count,
        };
      }

      return { success: false, message: "Erreur lors de la récupération des produits Black Friday" };
    },
  },




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
    list: async (page = 1, limit = 12, categoryId, subcategoryId, minPrice, maxPrice) => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (categoryId) params.append("category", categoryId.toString());
      if (subcategoryId) params.append("subcategory", subcategoryId.toString());
      if (minPrice) params.append("min_price", minPrice.toString());
      if (maxPrice) params.append("max_price", maxPrice.toString());

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

// Export de la fonction fetchApi
export { fetchApi };

// Export des APIs individuelles
export const categoriesApi = publicApi.categories;
export const subcategoriesApi = publicApi.subcategories;
export const productsApi = publicApi.products;
export const authApi = privateApi.auth;

// Exporter l'API utilisateur
export { userApi };

// Export de l'API Black Friday
export const blackfriday = {
  list: async () => {
    const response = await fetchApi("/black-friday");
    if (response.success && Array.isArray(response.data)) {
      return {
        success: true,
        data: response.data,
        count: response.count
      };
    }
    return { success: false, message: "Erreur lors du chargement des produits Black Friday" };
  }
};

export const blackhour = {
  list: async () => {
    const response = await fetchApi("/black-hour");
    if (response.success && Array.isArray(response.data)) {
      return {
        success: true,
        data: response.data,
        count: response.count,
        currentTime: response.currentTime
      };
    }
  },
};

export const eventsApi = {
  async checkStatus() {
    try {
      // API_BASE already includes /api, so we start with /admin
      const response = await fetchApi('/admin/events/status');
      return response;
    } catch (error) {
      console.error('Error checking event status:', error);
      return { success: false, error: error.message };
    }
  },
};

export const salesApi = {
  list: async () => {
    try {
      const response = await fetchApi("/sales");
      return response.success ? response : createEmptyPaginatedResponse();
    } catch (error) {
      console.error("Error fetching sales:", error);
      return createEmptyPaginatedResponse();
    }
  },
};

export const ordersApi = {
  create: async (orderData) => {
    try {
      const response = await fetchApi("/orders", {
        method: "POST",
        body: orderData
      });
      
      if (response.success) {
        return {
          success: true,
          order: response.data,
          message: "Commande créée avec succès"
        };
      }
      
      return {
        success: false,
        message: response.message || "Erreur lors de la création de la commande"
      };
    } catch (error) {
      console.error("Error creating order:", error);
      return {
        success: false,
        message: error.message || "Erreur lors de la création de la commande"
      };
    }
  },
};

// Export par défaut combinant toutes les APIs
export default { 
  ...publicApi, 
  privateApi,
  userApi,
  blackhour,
  sales: salesApi
};