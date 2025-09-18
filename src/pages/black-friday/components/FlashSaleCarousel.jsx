import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { salesApi } from '../../../api';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Fonction pour sélectionner des éléments aléatoires d'un tableau
const getRandomItems = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const FlashSaleCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState({});

  // Formater les données des produits comme dans la page de vente
  const formatProductData = (products) => {
    return products.map(product => ({
      id: product.id,
      name: product.name,
      brand: product.brand || 'Urban Space',
      originalPrice: product.sale?.originalPrice || product.price,
      salePrice: product.sale?.discountedPrice || product.price,
      image: product.urlImage,
      imageHover: product.urlImageHover || product.urlImage,
      rating: 4.5, // Default rating
      reviews: Math.floor(Math.random() * 100), // Random reviews for demo
      stock: product.stock || Math.floor(Math.random() * 30) + 5,
      availableSizes: product.size ? product.size.split(',').map(s => s.trim()) : ['S', 'M', 'L', 'XL'],
      isFlashSale: true,
      flashSaleEnds: '24h',
      isWishlisted: false,
      categories: product.categories,
      promotion: product.sale
    }));
  };

  // Charger les produits en solde
  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        setLoading(true);
        const response = await salesApi.list();
        
        if (response.success && Array.isArray(response.data) && response.data.length > 0) {
          // Sélectionner 5 produits aléatoires
          const randomProducts = getRandomItems(response.data, 5);
          const formattedProducts = formatProductData(randomProducts);
          setSaleProducts(formattedProducts);
          
          // Initialiser l'état des favoris
          const initialWishlistState = {};
          formattedProducts.forEach(product => {
            initialWishlistState[product.id] = false;
          });
          setIsWishlisted(initialWishlistState);
        } else {
          setError(response.message || 'Aucun produit en solde disponible');
        }
      } catch (err) {
        console.error('Erreur lors du chargement des produits en solde:', err);
        setError('Impossible de charger les produits en solde. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchSaleProducts();
  }, []);
  
  // Gestion des favoris
  const handleWishlistToggle = (productId, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsWishlisted(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };
  
  // Calculer le pourcentage de réduction
  const getDiscountPercentage = (originalPrice, salePrice) => {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };
  
  // Obtenir la couleur du badge en fonction du pourcentage de réduction
  const getBadgeColor = (discount) => {
    if (discount >= 70) return 'bg-error text-error-foreground';
    if (discount >= 50) return 'bg-warning text-warning-foreground';
    if (discount >= 30) return 'bg-accent text-accent-foreground';
    return 'bg-success text-success-foreground';
  };
  
  // Obtenir le niveau d'urgence du stock
  const getUrgencyLevel = (stock) => {
    if (stock <= 3) return 'critical';
    if (stock <= 10) return 'low';
    return 'normal';
  };

  // Mettre à jour le minuteur du compte à rebours
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 3600);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Gérer le défilement automatique du carrousel
  useEffect(() => {
    if (saleProducts.length > 0) {
      const slideTimer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % Math.ceil(saleProducts.length / 4));
      }, 5000);

      return () => clearInterval(slideTimer);
    }
  }, [saleProducts]);

  // Formater le temps restant
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  // Passer au slide suivant
  const nextSlide = () => {
    if (saleProducts.length > 0) {
      setCurrentSlide(prev => (prev + 1) % Math.ceil(saleProducts.length / 4));
    }
  };

  // Revenir au slide précédent
  const prevSlide = () => {
    if (saleProducts.length > 0) {
      setCurrentSlide(prev => (prev - 1 + Math.ceil(saleProducts.length / 4)) % Math.ceil(saleProducts.length / 4));
    }
  };

  // Obtenir les produits pour le slide actuel (4 produits par slide)
  const getCurrentSlideProducts = () => {
    const startIndex = currentSlide * 4;
    return saleProducts.slice(startIndex, startIndex + 4);
  };

  // Afficher un indicateur de chargement
  if (loading) {
    return (
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Ventes Flash
            </h2>
            <p className="text-muted-foreground">
              Offres spéciales pour une durée limitée
            </p>
          </div>
          <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card rounded-lg overflow-hidden border border-street">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Afficher un message d'erreur si nécessaire
  if (error || saleProducts.length === 0) {
    return (
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 text-center py-12">
          <div className="text-warning">
            <Icon name="AlertTriangle" size={48} className="mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Aucune offre flash disponible</h3>
            <p className="text-muted-foreground">
              {error || 'Revenez plus tard pour découvrir nos offres spéciales'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-4 mb-6"
          >
            <div className="w-12 h-12 bg-error rounded-full flex items-center justify-center">
              <Icon name="Zap" size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-2">
                VENTES FLASH
              </h2>
              <div className="text-error font-bold text-lg">
                Se termine dans: {formatTime(timeLeft)}
              </div>
            </div>
          </motion.div>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Offres spéciales pour une durée limitée. Ces prix ne dureront pas longtemps !
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="py-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {getCurrentSlideProducts().map((product) => {
                    const discount = getDiscountPercentage(product.originalPrice, product.salePrice);
                    const urgencyLevel = getUrgencyLevel(product.stock);
                    const savings = product.originalPrice - product.salePrice;
                    
                    return (
                      <Link 
                        to={`/product-detail/${product.id}`} 
                        key={product.id}
                        className="group relative bg-card border border-street rounded-lg overflow-hidden hover:border-accent transition-street box-shadow-street hover:box-shadow-modal"
                      >
                        {/* Image Container */}
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-street duration-500"
                          />
                          
                          {/* Discount Badge */}
                          <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold ${getBadgeColor(discount)} animate-pulse-glow`}>
                            -{discount}%
                          </div>

                          {/* Flash Sale Badge */}
                          <div className="absolute top-3 right-3 flex flex-col space-y-1">
                            <div className="bg-error text-error-foreground px-2 py-1 rounded-full text-xs font-bold">
                              FLASH
                            </div>
                          </div>

                          {/* Wishlist Button */}
                          <button
                            onClick={(e) => handleWishlistToggle(product.id, e)}
                            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-street ${
                              isWishlisted[product.id] 
                                ? 'bg-error text-error-foreground' 
                                : 'bg-background/80 text-foreground hover:bg-accent hover:text-accent-foreground'
                            }`}
                            style={{ marginTop: '2.5rem' }}
                          >
                            <Icon 
                              name="Heart" 
                              size={16} 
                              className={isWishlisted[product.id] ? 'fill-current' : ''} 
                            />
                          </button>
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                          {/* Brand & Name */}
                          <div className="mb-2">
                            <p className="text-xs text-accent font-medium uppercase tracking-wide">
                              {product.brand}
                            </p>
                            <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-accent transition-street">
                              {product.name}
                            </h3>
                          </div>

                          {/* Pricing */}
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg font-bold text-accent">
                              {product.salePrice?.toFixed(2)}TND
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              {product.originalPrice?.toFixed(2)}TND
                            </span>
                            <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded-full font-medium">
                              Économisez {savings?.toFixed(2)}TND
                            </span>
                          </div>

                          {/* Stock Status */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-1">
                              <Icon 
                                name="Package" 
                                size={14} 
                                className={urgencyLevel === 'critical' ? 'text-error' : urgencyLevel === 'low' ? 'text-warning' : 'text-success'} 
                              />
                              <span className={`text-xs font-medium ${
                                urgencyLevel === 'critical' ? 'text-error' : urgencyLevel === 'low' ? 'text-warning' : 'text-success'
                              }`}>
                                {urgencyLevel === 'critical' ? `Plus que ${product.stock} !` : 
                                 urgencyLevel === 'low' ? `${product.stock} restants` : 
                                 'En stock'}
                              </span>
                            </div>
                            
                            {/* Rating */}
                            <div className="flex items-center space-x-1">
                              <Icon name="Star" size={12} className="text-warning fill-current" />
                              <span className="text-xs text-muted-foreground">
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                          </div>

                          {/* Size Options Preview */}
                          {product.availableSizes && (
                            <div className="flex items-center space-x-1 mb-2">
                              <span className="text-xs text-muted-foreground">Tailles:</span>
                              <div className="flex space-x-1">
                                {product.availableSizes.slice(0, 4).map((size) => (
                                  <span key={size} className="text-xs bg-muted text-muted-foreground px-1 py-0.5 rounded">
                                    {size}
                                  </span>
                                ))}
                                {product.availableSizes.length > 4 && (
                                  <span className="text-xs text-accent">+{product.availableSizes.length - 4}</span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Flash Sale Timer */}
                          <div className="bg-error/10 border border-error/20 rounded-lg p-2 mt-2">
                            <div className="flex items-center space-x-2">
                              <Icon name="Clock" size={12} className="text-error" />
                              <span className="text-xs text-error font-medium">
                                Vente flash se termine dans {product.flashSaleEnds}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons - Only show if there are more than 4 products */}
          {saleProducts.length > 4 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-surface border border-accent/30 w-12 h-12 rounded-full shadow-lg"
              >
                <Icon name="ChevronLeft" size={24} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-surface border border-accent/30 w-12 h-12 rounded-full shadow-lg"
              >
                <Icon name="ChevronRight" size={24} />
              </Button>
            </>
          )}

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: Math.ceil(saleProducts.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-accent scale-125' : 'bg-muted hover:bg-accent/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleCarousel;