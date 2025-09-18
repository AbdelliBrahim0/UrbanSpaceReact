import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { blackhour } from '../../../api';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Fonction utilitaire pour sélectionner des éléments aléatoires d'un tableau
const getRandomItems = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Fonction pour formater la date en français
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return format(date, 'HH:mm', { locale: fr });
};

// Fonction pour calculer le temps restant
const calculateTimeLeft = (endTime) => {
  if (!endTime) return { hours: 0, minutes: 0, seconds: 0 };
  
  const now = new Date();
  const end = new Date(endTime);
  const difference = end - now;
  
  if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0 };
  
  return {
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};

const FeaturedDeals = () => {
  const [currentDeal, setCurrentDeal] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [featuredDeals, setFeaturedDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour formater les données des produits
  const formatProductData = (products) => {
    return products.map(product => {
      const discount = Math.round(
        ((product.sale?.originalPrice - product.sale?.discountedPrice) / 
        product.sale?.originalPrice) * 100
      );
      
      return {
        id: product.id,
        title: product.name.toUpperCase(),
        brand: product.brand || 'URBANSPACE',
        originalPrice: product.sale?.originalPrice || product.price,
        salePrice: product.sale?.discountedPrice || product.price,
        image: product.urlImage || 'https://via.placeholder.com/500x500?text=Produit+non+disponible',
        discount: discount,
        description: product.description || 'Produit exclusif en édition limitée',
        stock: product.stock || 0,
        isFlashSale: true,
        socialProof: `${Math.floor(Math.random() * 100) + 50} personnes ont acheté aujourd'hui`,
        startTime: product.sale?.startTime,
        endTime: product.sale?.endTime
      };
    });
  };

  // Récupérer les produits de la Black Hour
  useEffect(() => {
    const fetchBlackHourProducts = async () => {
      try {
        setLoading(true);
        const response = await blackhour.list();
        
        if (response.success && Array.isArray(response.data)) {
          // Sélectionner 3 produits aléatoires
          const randomProducts = getRandomItems(response.data, 3);
          const formattedProducts = formatProductData(randomProducts);
          setFeaturedDeals(formattedProducts);
          
          // Mettre à jour le temps restant pour le premier produit
          if (formattedProducts.length > 0 && formattedProducts[0].endTime) {
            setTimeLeft(calculateTimeLeft(formattedProducts[0].endTime));
          }
        } else {
          setError(response.message || 'Erreur lors du chargement des produits');
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des produits:', err);
        setError('Impossible de charger les produits. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlackHourProducts();
  }, []);

  // Mettre à jour le temps restant pour le produit actuel
  useEffect(() => {
    if (featuredDeals.length > 0 && featuredDeals[currentDeal]?.endTime) {
      const timer = setInterval(() => {
        const newTimeLeft = calculateTimeLeft(featuredDeals[currentDeal].endTime);
        setTimeLeft(newTimeLeft);

        // Si le temps est écoulé, passer au produit suivant
        if (newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
          setCurrentDeal((prev) => (prev + 1) % featuredDeals.length);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentDeal, featuredDeals]);

  // Gérer le défilement automatique des offres
  useEffect(() => {
    if (featuredDeals.length > 1) {
      const interval = setInterval(() => {
        setCurrentDeal((prev) => (prev + 1) % featuredDeals.length);
      }, 8000); // Changement toutes les 8 secondes

      return () => clearInterval(interval);
    }
  }, [featuredDeals]);

  const currentDealData = featuredDeals?.[currentDeal] || {};
  const savings = currentDealData?.originalPrice - currentDealData?.salePrice || 0;

  return (
    <div className="bg-surface border border-street rounded-lg overflow-hidden mb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent to-success p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={24} className="text-accent-foreground" />
            <h2 className="text-xl font-heading font-bold text-accent-foreground">
              DEAL OF THE HOUR
            </h2>
          </div>
          <div className="flex items-center space-x-2 bg-accent-foreground/20 rounded-lg px-3 py-1">
            <Icon name="Clock" size={16} className="text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">
              {timeLeft.hours.toString().padStart(2, '0')}:
              {timeLeft.minutes.toString().padStart(2, '0')}:
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
      {/* Deal Content */}
      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Product Image */}
          <motion.div
            key={currentDeal}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={currentDealData?.image}
                alt={currentDealData?.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Discount Badge */}
            <div className="absolute top-4 left-4 bg-error text-error-foreground px-3 py-2 rounded-full font-bold text-lg animate-pulse-glow">
              -{currentDealData?.discount}%
            </div>

            {/* Special Badges */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              {currentDealData?.isFlashSale && (
                <div className="bg-error text-error-foreground px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                  FLASH SALE
                </div>
              )}
              {currentDealData?.isLimitedEdition && (
                <div className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-bold">
                  LIMITED
                </div>
              )}
              {currentDealData?.isClearance && (
                <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold">
                  FINAL SALE
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            key={`details-${currentDeal}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Brand & Title */}
            <div>
              <p className="text-accent font-medium text-sm uppercase tracking-wide mb-1">
                {currentDealData?.brand}
              </p>
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                {currentDealData?.title}
              </h3>
              <p className="text-muted-foreground mt-2">
                {currentDealData?.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-accent">
                  ${currentDealData?.salePrice?.toFixed(2)}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  ${currentDealData?.originalPrice?.toFixed(2)}
                </span>
              </div>
              <div className="bg-success text-success-foreground inline-block px-3 py-1 rounded-full text-sm font-bold">
                YOU SAVE ${savings?.toFixed(2)}
              </div>
            </div>

            {/* Stock & Social Proof */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Package" size={16} className={currentDealData?.stock <= 5 ? 'text-error' : 'text-success'} />
                <span className={`text-sm font-medium ${currentDealData?.stock <= 5 ? 'text-error' : 'text-success'}`}>
                  {currentDealData?.stock <= 5 ? `Only ${currentDealData?.stock} left!` : `${currentDealData?.stock} in stock`}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-accent" />
                <span className="text-sm text-muted-foreground">
                  {currentDealData?.socialProof}
                </span>
              </div>
              
              {/* Affichage des horaires de début et de fin */}
              {(currentDealData?.startTime || currentDealData?.endTime) && (
                <div className="flex items-center space-x-2 mt-2">
                  <Icon name="Clock" size={16} className="text-warning" />
                  <span className="text-sm text-warning font-medium">
                    {currentDealData.startTime ? `De ${formatDate(currentDealData.startTime)}` : ''}
                    {currentDealData.endTime ? ` à ${formatDate(currentDealData.endTime)}` : ''}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button className="flex-1 bg-accent text-accent-foreground py-3 px-6 rounded-lg font-heading font-bold text-lg hover:scale-105 transition-street box-shadow-street">
                ADD TO CART
              </button>
              <button className="flex-1 border border-accent text-accent py-3 px-6 rounded-lg font-heading font-bold text-lg hover:bg-accent hover:text-accent-foreground transition-street">
                VIEW DETAILS
              </button>
            </div>

            {/* Trust Signals */}
            <div className="flex items-center justify-between pt-4 border-t border-street">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-xs text-muted-foreground">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Truck" size={16} className="text-success" />
                <span className="text-xs text-muted-foreground">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="RotateCcw" size={16} className="text-success" />
                <span className="text-xs text-muted-foreground">30-Day Returns</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Deal Navigation */}
        {loading ? (
          <div className="flex justify-center space-x-2 mt-6">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="w-3 h-3 rounded-full bg-muted-foreground/30 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-4 text-error">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 text-sm text-accent hover:underline"
            >
              Réessayer
            </button>
          </div>
        ) : (
          <div className="flex justify-center space-x-2 mt-6">
            {featuredDeals?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentDeal(index)}
                className={`w-3 h-3 rounded-full transition-street ${
                  index === currentDeal ? 'bg-accent' : 'bg-muted-foreground opacity-50'
                }`}
                aria-label={`Aller à l'offre ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedDeals;