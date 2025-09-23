import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CountdownTimer from './components/CountdownTimer';
import UltraLimitedProduct from './components/UltraLimitedProduct';
import LiveActivityFeed from './components/LiveActivityFeed';
import UrgencyBanner from './components/UrgencyBanner';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FlashSaleBanner from './components/FlashSaleBanner';
import { blackhour } from '../../api';
import EventWrapper from '../../components/EventWrapper';

const BlackHourContent = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [ultraLimitedProducts, setUltraLimitedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    const fetchBlackHourProducts = async () => {
      try {
        setLoading(true);
        const response = await blackhour.list();
        
        if (response.success && Array.isArray(response.data)) {
          const formattedProducts = response.data.map(product => ({
            id: product.id,
            name: product.name,
            brand: product.categories?.[0]?.name || 'Brand',
            originalPrice: product.price,
            salePrice: product.promotion?.discountedPrice || product.price,
            initialStock: product.stock,
            image: product.urlImage,
            imageHover: product.urlImageHover || product.urlImage,
            sizes: product.size ? product.size.split(',') : ['S', 'M', 'L', 'XL'],
            isExclusive: true,
            description: product.description,
            promotion: product.promotion
          }));
          
          setUltraLimitedProducts(formattedProducts);
          
          // Trouver la date de fin de promotion la plus proche
          const activePromotions = response.data
            .filter(p => p.promotion?.endTime)
            .map(p => new Date(p.promotion.endTime).getTime());
            
          if (activePromotions.length > 0) {
            const nearestEndTime = new Date(Math.min(...activePromotions));
            setEndTime(nearestEndTime);
          }
        } else {
          setError(response.message || 'Erreur lors du chargement des produits');
        }
      } catch (err) {
        console.error('Erreur API:', err);
        setError('Impossible de charger les produits. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlackHourProducts();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Black Hour - Ultra Exclusive Deals | UrbanSpace</title>
        <meta name="description" content="Ultra-exclusive streetwear deals with real-time availability. Limited time offers ending soon!" />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Header />

        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)`,
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />
          
          {/* Floating Particles */}
          {[...Array(30)]?.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100, -20],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <main className="relative z-10 pt-16">
          {/* Urgency Banner */}
          <UrgencyBanner />

          {/* Hero Section with Countdown */}
          <section className="relative py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {endTime && <CountdownTimer endDate={new Date(endTime)} />}
                
                <motion.div
                  className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="flex items-center space-x-2 text-accent">
                    <Icon name="Shield" size={20} />
                    <span className="text-sm font-medium">Secure Checkout</span>
                  </div>
                  <div className="flex items-center space-x-2 text-accent">
                    <Icon name="Truck" size={20} />
                    <span className="text-sm font-medium">Express Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2 text-accent">
                    <Icon name="RotateCcw" size={20} />
                    <span className="text-sm font-medium">Easy Returns</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
          {/* Flash Sale Banner */}
          <FlashSaleBanner />
          {/* Ultra Limited Products Section */}
          <section className="py-16 bg-surface/30">
            <div className="container mx-auto px-4">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
                  ULTRA-EXCLUSIVE DROPS
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Limited quantities. Real-time availability. Once they're gone, they're gone forever.
                </p>
              </motion.div>

              <div className="px-4 sm:px-6 lg:px-8 py-12">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="bg-card border border-street rounded-lg overflow-hidden h-[500px] animate-pulse">
                        <div className="bg-muted h-3/4 w-full"></div>
                        <div className="p-4 space-y-4">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-4 bg-muted rounded w-1/2"></div>
                          <div className="h-6 bg-muted rounded w-1/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <div className="text-error text-lg mb-4">{error}</div>
                    <Button 
                      onClick={() => window.location.reload()}
                      variant="outline"
                      iconName="RefreshCw"
                    >
                      Réessayer
                    </Button>
                  </div>
                ) : ultraLimitedProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-muted-foreground text-lg">Aucun produit disponible pour le moment</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ultraLimitedProducts.map((product, index) => (
                      <UltraLimitedProduct
                        key={product.id}
                        product={product}
                        index={index}
                        onSelect={() => handleProductSelect(product)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          

          {/* Final CTA Section */}
          <section className="py-16 bg-gradient-to-r from-accent/10 via-transparent to-accent/10">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-3xl md:text-4xl font-black text-foreground mb-4">
                  Ne manquez pas les offres Black Hour                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Les offres Black Hour se terminent bientôt. Rejoignez notre liste VIP pour un accès exclusif aux prochaines sorties.
                </p>
                
                
              </motion.div>
            </div>
          </section>
        </main>

        

        {/* Footer */}
        <footer className="bg-surface border-t border-street py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground text-sm">
              © {new Date()?.getFullYear()} UrbanSpace. All rights reserved. | Black Hour - Ultra Exclusive Deals
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

const BlackHourPage = () => {
  return (
    <EventWrapper 
      eventType="black_hour"
      fallbackRoute="/black-hour-limited-event"
    >
      <BlackHourContent />
    </EventWrapper>
  );
};

export default BlackHourPage;