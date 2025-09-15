import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UltraLimitedProduct = ({ product, index }) => {
  const [quantity, setQuantity] = useState(product?.initialStock);
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (quantity > 0 && Math.random() < 0.3) {
        setQuantity(prev => Math.max(0, prev - 1));
        
        const purchaseLocations = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Atlanta', 'Houston'];
        const newPurchase = {
          id: Date.now(),
          location: purchaseLocations?.[Math.floor(Math.random() * purchaseLocations?.length)],
          timeAgo: 'Just now'
        };
        
        setRecentPurchases(prev => [newPurchase, ...prev?.slice(0, 2)]);
      }
    }, Math.random() * 8000 + 2000);

    return () => clearInterval(interval);
  }, [quantity]);

  const stockPercentage = (quantity / product?.initialStock) * 100;
  const isLowStock = stockPercentage < 30;
  const isCriticalStock = stockPercentage < 10;
  const isSoldOut = quantity === 0;

  const handleQuickPurchase = () => {
    if (!isSoldOut) {
      console.log(`Quick purchase: ${product?.name} - Size: ${selectedSize}`);
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
      {/* Exclusive Badge */}
      <div className="absolute top-4 left-4 z-20">
        <motion.div
          className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Ultra Exclusive
        </motion.div>
      </div>
      {/* Stock Status Badge */}
      <div className="absolute top-4 right-4 z-20">
        <motion.div
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            isSoldOut ? 'bg-error text-error-foreground' :
            isCriticalStock ? 'bg-error text-error-foreground animate-pulse': isLowStock ?'bg-warning text-warning-foreground': 'bg-success text-success-foreground'
          }`}
          animate={isCriticalStock ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {isSoldOut ? 'Sold Out' : `${quantity} Left`}
        </motion.div>
      </div>
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay Effects */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Quick Actions Overlay */}
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
              >
                Quick Buy
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sold Out Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-background/90 flex items-center justify-center">
            <div className="text-center">
              <Icon name="X" size={48} className="text-error mx-auto mb-2" />
              <p className="text-error font-bold text-lg">SOLD OUT</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-heading font-bold text-lg text-foreground mb-1">
              {product?.name}
            </h3>
            <p className="text-muted-foreground text-sm">{product?.brand}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-accent">
              ${product?.salePrice}
            </div>
            <div className="text-sm text-muted-foreground line-through">
              ${product?.originalPrice}
            </div>
          </div>
        </div>

        {/* Stock Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">Stock Level</span>
            <span className={`text-xs font-bold ${
              isCriticalStock ? 'text-error' : isLowStock ? 'text-warning' : 'text-success'
            }`}>
              {stockPercentage?.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${
                isCriticalStock ? 'bg-error' : isLowStock ? 'bg-warning' : 'bg-success'
              }`}
              initial={{ width: '100%' }}
              animate={{ width: `${stockPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Size</p>
          <div className="flex space-x-2">
            {product?.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 text-xs font-bold rounded border transition-street ${
                  selectedSize === size
                    ? 'bg-accent text-accent-foreground border-accent'
                    : 'bg-surface text-foreground border-street hover:border-accent'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Purchase Velocity */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-accent" />
            <span className="text-xs text-muted-foreground">Purchase Activity</span>
          </div>
          <AnimatePresence>
            {recentPurchases?.map((purchase) => (
              <motion.div
                key={purchase?.id}
                className="text-xs text-accent mb-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                Someone in {purchase?.location} bought this {purchase?.timeAgo}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {!isSoldOut ? (
            <>
              <Button
                variant="default"
                fullWidth
                onClick={handleQuickPurchase}
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
                iconName="ShoppingCart"
                iconPosition="left"
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                fullWidth
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                iconName="Zap"
                iconPosition="left"
              >
                Buy Now
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              fullWidth
              className="border-error text-error hover:bg-error hover:text-error-foreground"
              iconName="Bell"
              iconPosition="left"
            >
              Notify When Available
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UltraLimitedProduct;