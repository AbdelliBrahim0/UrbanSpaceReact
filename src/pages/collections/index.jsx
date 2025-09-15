import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";

import Button from "../../components/ui/Button";
import CategoryTabs from "./components/CategoryTabs";
import FilterPanel from "./components/FilterPanel";
import ProductGrid from "./components/ProductGrid";
import SortDropdown from "./components/SortDropdown";
import SearchBar from "./components/SearchBar";

// Import API
import { categoriesApi } from "../../api";

const Collections = () => {
  const navigate = useNavigate();

  // États
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Charger les catégories depuis le backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesApi.list();
        // Ajouter "All Items" manuellement au début
        const categoriesWithAll = [
          { id: "all", name: "All Items" },
          ...data.map((cat) => ({ id: cat.id, name: cat.name })),
        ];
        setCategories(categoriesWithAll);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-background via-surface to-background py-16 lg:py-24">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2300FF88%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />

          <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="font-heading font-bold text-4xl lg:text-6xl text-foreground mb-4">
                Street
                <span className="text-accent text-shadow-glow">Vault</span>
                <br />
                Collections
              </h1>
              <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto">
                Discover exclusive streetwear pieces from the most coveted brands in urban fashion culture
              </p>
            </motion.div>

            {/* Search Bar */}
            <SearchBar searchQuery={""} onSearchChange={() => {}} onSearchSubmit={() => {}} />
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          {/* Category Tabs */}
          {loadingCategories ? (
            <div className="text-center text-muted-foreground">Loading categories...</div>
          ) : (
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          )}

          {/* Pour le moment, pas encore de produits branchés */}
          <div className="mt-10 text-center text-muted-foreground">
            Sélectionnez une catégorie pour afficher les produits (à brancher ensuite).
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-street py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-2 mb-4 lg:mb-0">
              <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
                <span className="text-accent-foreground font-heading font-bold text-lg">S</span>
              </div>
              <span className="font-heading font-bold text-xl text-foreground">StreetVault</span>
            </div>

            <div className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} StreetVault. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Collections;