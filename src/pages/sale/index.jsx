import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SaleHero from './components/SaleHero';
import SaleFilters from './components/SaleFilters';
import SaleProductCard from './components/SaleProductCard';
import FeaturedDeals from './components/FeaturedDeals';
import TrustSignals from './components/TrustSignals';
import Icon from '../../components/AppIcon';

const Sale = () => {
  const [activeFilters, setActiveFilters] = useState({
    discount: [],
    category: [],
    size: [],
    price: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);
  const productsPerPage = 12;

  // Mock sale products data
  const saleProducts = [
    {
      id: 1,
      name: "Urban Legends Hoodie",
      brand: "STREET KINGS",
      originalPrice: 129.99,
      salePrice: 38.99,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
      rating: 4.8,
      reviews: 234,
      stock: 3,
      availableSizes: ["S", "M", "L", "XL"],
      isFlashSale: true,
      flashSaleEnds: "2h 15m",
      isWishlisted: false
    },
    {
      id: 2,
      name: "Graffiti Bomber Jacket",
      brand: "CITY REBELS",
      originalPrice: 199.99,
      salePrice: 79.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
      rating: 4.9,
      reviews: 156,
      stock: 8,
      availableSizes: ["M", "L", "XL", "XXL"],
      isLimitedEdition: true,
      isWishlisted: true
    },
    {
      id: 3,
      name: "Neon Dreams T-Shirt",
      brand: "UNDERGROUND",
      originalPrice: 49.99,
      salePrice: 14.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      rating: 4.6,
      reviews: 89,
      stock: 15,
      availableSizes: ["XS", "S", "M", "L"],
      isClearance: true,
      isWishlisted: false
    },
    {
      id: 4,
      name: "Street Art Cargo Pants",
      brand: "REBEL WEAR",
      originalPrice: 149.99,
      salePrice: 59.99,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      rating: 4.7,
      reviews: 203,
      stock: 12,
      availableSizes: ["S", "M", "L", "XL", "XXL"],
      isWishlisted: false
    },
    {
      id: 5,
      name: "Hypebeast Snapback",
      brand: "STREET KINGS",
      originalPrice: 79.99,
      salePrice: 23.99,
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop",
      rating: 4.5,
      reviews: 67,
      stock: 25,
      availableSizes: ["One Size"],
      isFlashSale: true,
      flashSaleEnds: "1h 45m",
      isWishlisted: false
    },
    {
      id: 6,
      name: "Urban Warrior Sneakers",
      brand: "CITY REBELS",
      originalPrice: 249.99,
      salePrice: 124.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
      rating: 4.9,
      reviews: 445,
      stock: 6,
      availableSizes: ["7", "8", "9", "10", "11", "12"],
      isLimitedEdition: true,
      isWishlisted: true
    },
    {
      id: 7,
      name: "Midnight Vibes Sweatshirt",
      brand: "UNDERGROUND",
      originalPrice: 99.99,
      salePrice: 29.99,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
      rating: 4.4,
      reviews: 112,
      stock: 18,
      availableSizes: ["S", "M", "L", "XL"],
      isClearance: true,
      isWishlisted: false
    },
    {
      id: 8,
      name: "Street Culture Backpack",
      brand: "REBEL WEAR",
      originalPrice: 129.99,
      salePrice: 64.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      rating: 4.6,
      reviews: 178,
      stock: 22,
      availableSizes: ["One Size"],
      isWishlisted: false
    },
    {
      id: 9,
      name: "Neon Nights Tank Top",
      brand: "STREET KINGS",
      originalPrice: 39.99,
      salePrice: 11.99,
      image: "https://images.unsplash.com/photo-1583743814966-8936f37f8302?w=500&h=500&fit=crop",
      rating: 4.3,
      reviews: 56,
      stock: 30,
      availableSizes: ["XS", "S", "M", "L", "XL"],
      isFlashSale: true,
      flashSaleEnds: "3h 22m",
      isWishlisted: false
    },
    {
      id: 10,
      name: "Urban Legend Denim Jacket",
      brand: "CITY REBELS",
      originalPrice: 179.99,
      salePrice: 89.99,
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&h=500&fit=crop",
      rating: 4.8,
      reviews: 267,
      stock: 9,
      availableSizes: ["S", "M", "L", "XL"],
      isLimitedEdition: true,
      isWishlisted: true
    },
    {
      id: 11,
      name: "Street Art Beanie",
      brand: "UNDERGROUND",
      originalPrice: 29.99,
      salePrice: 8.99,
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&h=500&fit=crop",
      rating: 4.2,
      reviews: 34,
      stock: 45,
      availableSizes: ["One Size"],
      isClearance: true,
      isWishlisted: false
    },
    {
      id: 12,
      name: "Hypebeast Joggers",
      brand: "REBEL WEAR",
      originalPrice: 89.99,
      salePrice: 44.99,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      rating: 4.7,
      reviews: 189,
      stock: 16,
      availableSizes: ["S", "M", "L", "XL", "XXL"],
      isWishlisted: false
    }
  ];

  const handleFilterChange = (sectionId, optionId) => {
    if (sectionId === 'clear-all') {
      setActiveFilters({
        discount: [],
        category: [],
        size: [],
        price: []
      });
      return;
    }

    setActiveFilters(prev => {
      const currentFilters = prev?.[sectionId] || [];
      const isSelected = currentFilters?.includes(optionId);
      
      return {
        ...prev,
        [sectionId]: isSelected 
          ? currentFilters?.filter(id => id !== optionId)
          : [...currentFilters, optionId]
      };
    });
  };

  const filteredProducts = saleProducts; // In real app, apply filters here
  const totalPages = Math.ceil(filteredProducts?.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts?.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page) => {
    setIsLoading(true);
    setCurrentPage(page);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Sale - Up to 70% Off Streetwear | StreetVault</title>
        <meta name="description" content="Massive streetwear sale with up to 70% off premium urban fashion. Limited time deals on hoodies, jackets, sneakers and more. Shop now!" />
        <meta name="keywords" content="streetwear sale, urban fashion deals, discount clothing, hypebeast sale, street style clearance" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <SaleHero />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Featured Deals */}
          <FeaturedDeals />

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <SaleFilters 
                onFilterChange={handleFilterChange}
                activeFilters={activeFilters}
              />
            </div>

            {/* Products Section */}
            <div className="lg:col-span-3">
              {/* Products Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Sale Items
                  </h2>
                  <p className="text-muted-foreground">
                    {filteredProducts?.length} products found
                  </p>
                </div>

                {/* View Toggle */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-street ${
                      viewMode === 'grid' ?'bg-accent text-accent-foreground' :'bg-surface text-muted-foreground hover:text-accent'
                    }`}
                  >
                    <Icon name="Grid3X3" size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-street ${
                      viewMode === 'list' ?'bg-accent text-accent-foreground' :'bg-surface text-muted-foreground hover:text-accent'
                    }`}
                  >
                    <Icon name="List" size={20} />
                  </button>
                </div>
              </div>

              {/* Products Grid */}
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-muted-foreground">Loading amazing deals...</p>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`grid gap-6 ${
                    viewMode === 'grid' ?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :'grid-cols-1'
                  }`}
                >
                  {currentProducts?.map((product, index) => (
                    <SaleProductCard 
                      key={product?.id} 
                      product={product} 
                      index={index}
                    />
                  ))}
                </motion.div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-12">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-surface border border-street text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent hover:text-accent-foreground transition-street"
                  >
                    <Icon name="ChevronLeft" size={20} />
                  </button>
                  
                  {[...Array(totalPages)]?.map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-street ${
                          currentPage === page
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-surface border border-street text-foreground hover:bg-accent hover:text-accent-foreground'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-surface border border-street text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent hover:text-accent-foreground transition-street"
                  >
                    <Icon name="ChevronRight" size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Trust Signals */}
          <div className="mt-16">
            <TrustSignals />
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-surface border-t border-street py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Never Miss a Sale
              </h2>
              <p className="text-muted-foreground text-lg">
                Get exclusive access to flash sales, early bird discounts, and limited edition drops.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-input border border-street rounded-lg px-4 py-3 text-foreground focus:border-accent focus:ring-1 focus:ring-accent"
                />
                <button className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:scale-105 transition-street">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Join 50,000+ streetwear enthusiasts. Unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-background border-t border-street py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">
              © {new Date()?.getFullYear()} StreetVault. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Sale;