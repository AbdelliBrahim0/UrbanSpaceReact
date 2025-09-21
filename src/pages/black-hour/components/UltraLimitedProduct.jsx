import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { formatPrice } from '../../../utils/formatters';
import { CartContext } from '../../../contexts/CartContext';

// Gestion des notifications toast simplifiée
const toast = {
  success: (title, options = {}) => {
    console.log(`[SUCCESS] ${title}`, options);
    // Pas d'alerte pour éviter les popups intempestifs
  },
  error: (title, options = {}) => {
    console.error(`[ERROR] ${title}`, options);
    // Afficher uniquement les erreurs critiques
    if (options.critical && typeof window !== 'undefined' && window.alert) {
      window.alert(`❌ ${title}\n${options.description || ''}`);
    }
  },
  info: (title, options = {}) => {
    console.log(`[INFO] ${title}`, options);
  }
};

const UltraLimitedProduct = ({ product, index, onSelect }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(product?.initialStock || 0);
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (quantity > 0 && Math.random() < 0.3) {
        setQuantity(prev => Math.max(0, prev - 1));
        
        const purchaseLocations = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Lille', 'Bordeaux'];
        const newPurchase = {
          id: Date.now(),
          location: purchaseLocations[Math.floor(Math.random() * purchaseLocations.length)],
          timeAgo: 'à l\'instant'
        };
        
        setRecentPurchases(prev => [newPurchase, ...(prev || []).slice(0, 2)]);
      }
    }, Math.random() * 8000 + 2000);

    return () => clearInterval(interval);
  }, [quantity]);

  const stockPercentage = (product.initialStock > 0) 
    ? (quantity / product.initialStock) * 100 
    : 0;
  const isLowStock = stockPercentage < 30 && stockPercentage > 0;
  const isCriticalStock = stockPercentage < 10 && stockPercentage > 0;
  const isSoldOut = quantity === 0;

  const originalPrice = product.originalPrice || 0;
  const salePrice = product.salePrice || originalPrice;
  const discountPercentage = product.promotion?.discountPercentage 
    ? Math.round(product.promotion.discountPercentage) 
    : originalPrice > salePrice 
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100) 
      : 0;

  const handleQuickPurchase = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    if (isSoldOut) {
      toast.error('Produit en rupture de stock', {
        description: 'Ce produit n\'est malheureusement plus disponible',
        position: 'top-right',
        duration: 3000,
      });
      return;
    }
    
    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    
    try {
      // Ajouter le produit au panier avec les détails nécessaires
      addToCart({
        id: product.id,
        name: product.name,
        price: parseFloat(product.salePrice || product.originalPrice),
        image: product.image,
        size: selectedSize || product.sizes?.[0] || 'Unique',
        color: 'Standard',
        source: 'Black Hour',
        fromBlackHour: true,
        quantity: 1
      });
      
      // Afficher une notification de succès
      console.log(`[Black Hour] Produit ajouté au panier: ${product.name}`);
      
      // Appeler la fonction onSelect si elle existe (pour la compatibilité avec le code existant)
      if (onSelect) {
        onSelect(product);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      toast.error('Erreur', {
        description: 'Une erreur est survenue lors de l\'ajout au panier',
        critical: true
      });
    } finally {
      // Réinitialiser l'état après un court délai
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 1000);
    }
  };

  return (
    <motion.div
      className="relative bg-card border border-street rounded-lg overflow-hidden group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      {discountPercentage > 0 && (
        <div className="absolute top-4 left-4 z-20">
          <motion.div
            className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            -{discountPercentage}%
          </motion.div>
        </div>
      )}
      
      <div className="absolute top-4 right-4 z-20">
        <motion.div
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            isSoldOut 
              ? 'bg-error text-error-foreground' 
              : isCriticalStock 
                ? 'bg-error text-error-foreground animate-pulse' 
                : isLowStock 
                  ? 'bg-warning text-warning-foreground' 
                  : 'bg-success text-success-foreground'
          }`}
          animate={isCriticalStock ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {isSoldOut ? 'Épuisé' : `${quantity} restant${quantity > 1 ? 's' : ''}`}
        </motion.div>
      </div>

      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <AnimatePresence>
          {isHovered && !isSoldOut && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                variant="default"
                onClick={handleQuickPurchase}
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
                iconName="Zap"
                iconPosition="left"
                disabled={isAddingToCart}
              >
                Acheter maintenant
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {isSoldOut && (
          <div className="absolute inset-0 bg-background/90 flex items-center justify-center">
            <div className="text-center">
              <Icon name="X" size={48} className="text-error mx-auto mb-2" />
              <p className="text-error font-bold text-lg">RUPTURE DE STOCK</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                Être averti
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0 mr-2">
            <h3 className="text-lg font-bold text-foreground truncate">{product.name}</h3>
            <p className="text-muted-foreground text-sm">
              {product.categories?.[0]?.name || product.brand || 'Streetwear'}
            </p>
            {product.promotion?.timeRemaining?.isActive && (
              <div className="mt-1">
                <div className="text-xs text-warning font-medium">
                  <Icon name="Clock" size={12} className="inline mr-1" />
                  {product.promotion.timeRemaining.hours}h {product.promotion.timeRemaining.minutes}m
                </div>
              </div>
            )}
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-black text-accent">
              {formatPrice(salePrice)} TND
            </div>
            {originalPrice > salePrice && (
              <div className="text-sm text-muted-foreground line-through">
                {formatPrice(originalPrice)} TND
              </div>
            )}
          </div>
        </div>

        {product.description && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          </div>
        )}

        <div className="mt-4">
          {product.sizes?.length > 0 && (
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">Tailles disponibles:</span>
              <div className="flex space-x-1">
                {product.sizes.map(size => (
                  <span 
                    key={size} 
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${
                      selectedSize === size 
                        ? 'bg-accent text-accent-foreground' 
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="w-full bg-muted rounded-full h-2 overflow-hidden mt-3">
            <motion.div
              className={`h-full ${
                isCriticalStock 
                  ? 'bg-error' 
                  : isLowStock 
                    ? 'bg-warning' 
                    : 'bg-success'
              } rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${stockPercentage}%` }}
              transition={{ duration: 1 }}
            />
          </div>

          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{quantity} restant{quantity > 1 ? 's' : ''}</span>
            {product.initialStock > 0 && (
              <span>Vendu: {product.initialStock - quantity} sur {product.initialStock}</span>
            )}
          </div>
        </div>

        <AnimatePresence>
          {recentPurchases?.map((purchase) => (
            <motion.div
              key={purchase.id}
              className="text-xs text-accent mb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              Achat récent à {purchase.location} {purchase.timeAgo}
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="mt-4 space-y-2">
          {!isSoldOut ? (
            <>
              <Button
                variant="default"
                fullWidth
                onClick={handleQuickPurchase}
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
                iconName={isAddingToCart ? 'Loader' : 'ShoppingCart'}
                iconPosition="left"
                disabled={isAddingToCart}
              >
                {isAddingToCart ? 'Ajout en cours...' : 'Ajouter au panier'}
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                iconName="Zap"
                iconPosition="left"
                onClick={handleQuickPurchase}
                disabled={isAddingToCart}
              >
                Acheter maintenant
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              fullWidth
              className="border-error text-error hover:bg-error hover:text-error-foreground"
              iconName="Bell"
              iconPosition="left"
              onClick={() => {
                toast.info('Notification activée', {
                  description: 'Vous serez averti lorsque ce produit sera à nouveau en stock',
                  position: 'top-right',
                  duration: 3000,
                });
              }}
            >
              M'avertir quand disponible
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UltraLimitedProduct;
