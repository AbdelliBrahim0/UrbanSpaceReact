import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import CategoryTabs from "./components/CategoryTabs";
import ProductCard from "./components/ProductCard";
import { categoriesApi, subcategoriesApi, productsApi } from "../../api";
import SaleHero from "./components/SaleHero";
import UrgencyBanner from "./components/UrgencyBanner";



const SubcategoryTabs = ({ subcategories, activeSubcategory, onSubcategoryChange }) => (
  <div className="flex gap-4 overflow-x-auto py-2 mb-6">
    {subcategories.map(sub => (
      <button
        key={sub.id}
        onClick={() => onSubcategoryChange(sub.id)}
        className={`px-4 py-2 rounded-full text-sm font-medium ${
          activeSubcategory === sub.id
            ? "bg-accent text-accent-foreground"
            : "bg-surface text-muted-foreground"
        }`}
      >
        {sub.name}
      </button>
    ))}
  </div>
);

const Collections = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Charger catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesApi.list();
        setCategories([{ id: "all", name: "All Items" }, ...data]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Charger sous-catégories
  useEffect(() => {
    if (activeCategory === "all") {
      setSubcategories([]);
      setActiveSubcategory(null);
      return;
    }
    const fetchSubcategories = async () => {
      setLoadingSubcategories(true);
      try {
        const data = await subcategoriesApi.list();
        const filtered = data.filter(sub =>
          sub.categories.some(cat => cat.id === Number(activeCategory))
        );
        setSubcategories(filtered);
        setActiveSubcategory(filtered.length > 0 ? filtered[0].id : null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSubcategories(false);
      }
    };
    fetchSubcategories();
  }, [activeCategory]);

  // Charger produits
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const data = await productsApi.list();
        setProducts(data.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Filtrer produits côté front
  const filteredProducts = products.filter(product => {
    const matchesCategory =
      activeCategory === "all" ||
      product.categories?.some(cat => cat.id === Number(activeCategory));
    const matchesSubcategory =
      !activeSubcategory ||
      product.subCategories?.some(sub => sub.id === Number(activeSubcategory));
    return matchesCategory && matchesSubcategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <UrgencyBanner />
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-background via-surface to-background py-16 lg:py-24">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2300FF88%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
          
          <div className="relative max-w-7xl mx-auto px-4 lg:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h1 className="font-heading font-bold text-4xl lg:text-6xl text-foreground mb-4">
                Urban
                <span className="text-accent text-shadow-glow">Space</span>
                <br />
                Collections
              </h1>
              <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto">
                Discover exclusive streetwear pieces from the most coveted brands in urban fashion culture
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories et produits */}
        <section className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          {loadingCategories ? (
            <div className="text-center text-muted-foreground">Loading categories...</div>
          ) : (
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          )}

          {loadingSubcategories ? (
            <div className="text-center text-muted-foreground">Loading subcategories...</div>
          ) : subcategories.length > 0 ? (
            <SubcategoryTabs
              subcategories={subcategories}
              activeSubcategory={activeSubcategory}
              onSubcategoryChange={setActiveSubcategory}
            />
          ) : null}

          {loadingProducts ? (
            <div className="text-center text-muted-foreground mt-10">Loading products...</div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    images: [product.urlImage, product.urlImageHover].filter(Boolean),
                    isNew: new Date(product.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                  }}
                  onProductClick={id => navigate(`/product/${id}`)}
                  onAddToCart={prod => console.log("Add to cart", prod)}
                  onToggleWishlist={id => console.log("Toggle wishlist", id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground mt-10">
              Aucun produit trouvé pour cette catégorie/sous-catégorie.
            </div>
          )}
        </section>
        <SaleHero />
        {/* Newsletter Section */}
        <section className="bg-surface py-16">
          <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
                Stay in the Loop
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Get exclusive access to new drops, limited releases, and street culture insights
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-background border border-street rounded-lg focus:border-accent focus:outline-none text-foreground"
                />
                <Button variant="default" className="px-8">
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Collections;
