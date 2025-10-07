import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import ProductCard from "./components/ProductCard";
import { categoriesApi, subcategoriesApi, productsApi } from "../../api";
import SaleHero from "./components/SaleHero";
import UrgencyBanner from "./components/UrgencyBanner";
import PaginationControls from "./components/PaginationControls";
import CombinedFilter from "./components/CombinedFilter";
import { useDebounce } from "../../hooks/useDebounce";

const Collections = () => {
  const navigate = useNavigate();
  const MAX_PRICE = 1000; // Or a more appropriate max value
  const ITEMS_PER_PAGE = 16;

  // State for filter data and active filters
  const [filterData, setFilterData] = useState([]);
  const [activeFilters, setActiveFilters] = useState({ categories: [], subcategories: [] });
  const [priceRange, setPriceRange] = useState({ min: 0, max: MAX_PRICE });
  const debouncedPriceRange = useDebounce(priceRange, 500);

  // State for products
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Loading states
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Effect to fetch filter data (categories and subcategories)
  useEffect(() => {
    const fetchFilterData = async () => {
      setLoadingFilters(true);
      try {
        const [categories, subcategories] = await Promise.all([
          categoriesApi.list(),
          subcategoriesApi.list()
        ]);
        const structuredData = categories.map(cat => ({
          ...cat,
          type: 'category',
          subcategories: subcategories.filter(sub => 
            sub.categories.some(subCat => subCat.id === cat.id)
          ).map(sub => ({ ...sub, type: 'subcategory' }))
        }));
        setFilterData(structuredData);
      } catch (err) {
        console.error("Failed to load filter data:", err);
      } finally {
        setLoadingFilters(false);
      }
    };
    fetchFilterData();
  }, []);

  // Effect to fetch all products once
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoadingProducts(true);
      try {
        // Fetch all products - assuming the API can handle a large limit
        const data = await productsApi.list(1, 1000);
        if (data.items) {
          setAllProducts(data.items);
          const max = data.items.reduce((maxVal, p) => {
            const price = parseFloat(p.price);
            return price > maxVal ? price : maxVal;
          }, 0);
          if (max > 0) {
            setMaxPrice(max);
            setPriceRange({ min: 0, max: max });
          }
        }
      } catch (err) {
        console.error("Failed to fetch all products:", err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchAllProducts();
  }, []);

  // Effect to apply filters and update filtered products
  useEffect(() => {
    let productsToFilter = [...allProducts];

    // Category and Subcategory filtering
    if (activeFilters.categories.length > 0) {
        productsToFilter = productsToFilter.filter(p => 
            p.category && activeFilters.categories.includes(p.category.id)
        );
    }
    if (activeFilters.subcategories.length > 0) {
        productsToFilter = productsToFilter.filter(p => 
            p.subcategory && activeFilters.subcategories.includes(p.subcategory.id)
        );
    }

    // Price filtering
    productsToFilter = productsToFilter.filter(p => {
      const price = parseFloat(p.price);
      return price >= debouncedPriceRange.min && price <= debouncedPriceRange.max;
    });

    setFilteredProducts(productsToFilter);
    setCurrentPage(1); // Reset to first page after filtering

  }, [allProducts, activeFilters, debouncedPriceRange]);

  // Effect for client-side pagination
  useEffect(() => {
    const newTotalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    setTotalPages(newTotalPages > 0 ? newTotalPages : 1);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex));

  }, [filteredProducts, currentPage]);


  const handleCategoryToggle = (categoryId, isChecked) => {
    const category = filterData.find(c => c.id === categoryId);
    if (!category) return;

    const subIdsForCategory = category.subcategories?.map(sub => sub.id) || [];
    
    setActiveFilters(prevFilters => {
      let newCategories = [...prevFilters.categories];
      let newSubcategories = [...prevFilters.subcategories];

      if (isChecked) {
        newCategories = [...new Set([...newCategories, categoryId])];
        newSubcategories = [...new Set([...newSubcategories, ...subIdsForCategory])];
      } else {
        newCategories = newCategories.filter(c => c !== categoryId);
        newSubcategories = newSubcategories.filter(subId => !subIdsForCategory.includes(subId));
      }

      return { categories: newCategories, subcategories: newSubcategories };
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubcategoryChange = (subcategoryId, isChecked, parentCategoryId) => {
    setActiveFilters(prevFilters => {
      let newSubcategories = [...prevFilters.subcategories];

      if (isChecked) {
        newSubcategories = [...new Set([...newSubcategories, subcategoryId])];
      } else {
        newSubcategories = newSubcategories.filter(id => id !== subcategoryId);
      }

      // Check if parent category needs to be updated
      const parentCategory = filterData.find(c => c.id === parentCategoryId);
      let newCategories = [...prevFilters.categories];

      if (parentCategory) {
        const siblingSubcategoryIds = parentCategory.subcategories.map(s => s.id);
        const allSiblingsChecked = siblingSubcategoryIds.every(id => newSubcategories.includes(id));

        if (allSiblingsChecked) {
          if (!newCategories.includes(parentCategoryId)) {
            newCategories = [...newCategories, parentCategoryId];
          }
        } else {
          if (newCategories.includes(parentCategoryId)) {
            newCategories = newCategories.filter(id => id !== parentCategoryId);
          }
        }
      }

      return { categories: newCategories, subcategories: newSubcategories };
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setActiveFilters({ categories: [], subcategories: [] });
    setPriceRange({ min: 0, max: MAX_PRICE });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

        {/* Filters and Products Section */}
        <section className="px-4 lg:px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Panel */}
            <aside className="w-full lg:w-1/4 xl:w-1/5">
              {loadingFilters ? (
                <div className="text-center text-muted-foreground">Loading filters...</div>
              ) : (
                <CombinedFilter
                  filterData={filterData}
                  activeFilters={activeFilters}
                  onCategoryToggle={handleCategoryToggle}
                  onSubcategoryChange={handleSubcategoryChange}
                  onReset={handleResetFilters}
                  priceRange={priceRange}
                  onPriceChange={setPriceRange}
                  maxPrice={MAX_PRICE}
                />
              )}
            </aside>

            {/* Products Grid */}
            <div className="w-full lg:w-3/4 xl:w-4/5">
              {totalPages > 1 && (
                <div className="flex justify-end mb-4">
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}

              {loadingProducts ? (
                <div className="text-center text-muted-foreground mt-10">Loading products...</div>
              ) : paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedProducts.map(product => (
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
                  No products found for this selection.
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
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