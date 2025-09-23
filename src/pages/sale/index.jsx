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
import Button from '../../components/ui/Button';
import { salesApi } from '../../api';
import { formatPrice } from '../../utils/formatters';

const Sale = () => {
  const [activeFilters, setActiveFilters] = useState({
    discount: [],
    category: [],
    size: [],
    price: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saleProducts, setSaleProducts] = useState([]);
  const productsPerPage = 12;

  // Fetch sale products from API
  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        setIsLoading(true);
        const response = await salesApi.list();
        
        if (response.success && Array.isArray(response.data)) {
          // Format products data to match component props
          const formattedProducts = response.data.map(product => ({
            id: product.id,
            name: product.name,
            brand: product.brand || 'Urban Space',
            originalPrice: product.sale?.originalPrice || product.price,
            salePrice: product.sale?.discountedPrice || product.price,
            image: product.urlImage,
            imageHover: product.urlImageHover || product.urlImage,
            rating: 4.5, // Default rating
            reviews: Math.floor(Math.random() * 100), // Random reviews for demo
            stock: product.stock,
            availableSizes: product.size ? product.size.split(',').map(s => s.trim()) : ['S', 'M', 'L', 'XL'],
            isFlashSale: true, // All sale items are considered flash sales
            flashSaleEnds: product.sale?.timeRemaining?.isActive 
              ? `${product.sale.timeRemaining.hours}h ${product.sale.timeRemaining.minutes}m`
              : '24h',
            isWishlisted: false,
            categories: product.categories,
            promotion: product.sale
          }));
          
          setSaleProducts(formattedProducts);
        } else {
          setError(response.message || 'Erreur lors du chargement des soldes');
        }
      } catch (err) {
        console.error('Erreur API:', err);
        setError('Impossible de charger les produits en solde. Veuillez réessayer plus tard.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaleProducts();
  }, []);

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

  // Filter products based on active filters
  const filteredProducts = saleProducts.filter(product => {
    if (!product) return false;
    
    // Filter by discount
    if (activeFilters.discount.length > 0) {
      const discount = product.promotion?.discountPercentage || 
        Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100);
      
      if (activeFilters.discount.includes('50+') && discount < 50) return false;
      if (activeFilters.discount.includes('40-50') && (discount < 40 || discount > 50)) return false;
      if (activeFilters.discount.includes('30-40') && (discount < 30 || discount > 40)) return false;
      if (activeFilters.discount.includes('20-30') && (discount < 20 || discount > 30)) return false;
      if (activeFilters.discount.includes('10-20') && (discount < 10 || discount > 20)) return false;
    }

    // Filter by category
    if (activeFilters.category.length > 0) {
      if (!activeFilters.category.includes(product.categories[0])) return false;
    }

    // Filter by size
    if (activeFilters.size.length > 0) {
      if (!activeFilters.size.some(size => product.availableSizes.includes(size))) return false;
    }

    // Filter by price
    if (activeFilters.price.length > 0) {
      const priceRange = activeFilters.price[0].split('-');
      if (product.salePrice < priceRange[0] || product.salePrice > priceRange[1]) return false;
    }

    return true;
  });

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
        <title>Sale - Up to 70% Off Streetwear | UrbanSpace</title>
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
                <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-6'} gap-6`}>
                  {currentProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={viewMode === 'grid' ? '' : 'flex'}
                    >
                      <SaleProductCard
                        product={{
                          ...product,
                          // Ensure all required props are passed
                          discountPercentage: product.promotion?.discountPercentage || 
                            Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100),
                          timeRemaining: product.promotion?.timeRemaining
                        }}
                        viewMode={viewMode}
                      />
                    </motion.div>
                  ))}
                </div>
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
                Ne manquez jamais une vente
              </h2>
              <p className="text-muted-foreground text-lg">
                Bénéficiez d'un accès exclusif aux ventes flash, aux remises pour les lève-tôt et aux éditions limitées.
              </p>
              
              
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-background border-t border-street py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">
              © {new Date()?.getFullYear()} UrbanSpace. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Sale;