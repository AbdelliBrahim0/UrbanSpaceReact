import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SaleProductCard = ({ product, index }) => {
  const [isWishlisted, setIsWishlisted] = useState(product?.isWishlisted || false);
  const [isHovered, setIsHovered] = useState(false);

  const discountPercentage = Math.round(((product?.originalPrice - product?.salePrice) / product?.originalPrice) * 100);
  const savings = product?.originalPrice - product?.salePrice;

  const handleWishlistToggle = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickAdd = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log('Quick add to cart:', product?.id);
  };

  const getBadgeColor = () => {
    if (discountPercentage >= 70) return 'bg-error text-error-foreground';
    if (discountPercentage >= 50) return 'bg-warning text-warning-foreground';
    if (discountPercentage >= 30) return 'bg-accent text-accent-foreground';
    return 'bg-success text-success-foreground';
  };

  const getUrgencyLevel = () => {
    if (product?.stock <= 3) return 'critical';
    if (product?.stock <= 10) return 'low';
    return 'normal';
  };

  const urgencyLevel = getUrgencyLevel();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative bg-card border border-street rounded-lg overflow-hidden hover:border-accent transition-street box-shadow-street hover:box-shadow-modal"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to="/product-detail" className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-street duration-500"
          />
          
          {/* Discount Badge */}
          <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold ${getBadgeColor()} animate-pulse-glow`}>
            -{discountPercentage}%
          </div>

          {/* Special Badges */}
          <div className="absolute top-3 right-3 flex flex-col space-y-1">
            {product?.isFlashSale && (
              <div className="bg-error text-error-foreground px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                FLASH
              </div>
            )}
            {product?.isLimitedEdition && (
              <div className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-bold">
                LIMITED
              </div>
            )}
            {product?.isClearance && (
              <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold">
                FINAL SALE
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-street ${
              isWishlisted 
                ? 'bg-error text-error-foreground' 
                : 'bg-background/80 text-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
            style={{ marginTop: product?.isFlashSale || product?.isLimitedEdition || product?.isClearance ? '2.5rem' : '0' }}
          >
            <Icon name={isWishlisted ? "Heart" : "Heart"} size={16} className={isWishlisted ? 'fill-current' : ''} />
          </button>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-background/80 flex items-center justify-center"
          >
            <div className="text-center space-y-3">
              <div className="text-accent font-heading font-bold text-lg">
                SAVE ${savings?.toFixed(2)}
              </div>
              <button
                onClick={handleQuickAdd}
                className="bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:scale-105 transition-street"
              >
                Quick Add
              </button>
            </div>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Brand & Name */}
          <div className="mb-2">
            <p className="text-xs text-accent font-medium uppercase tracking-wide">
              {product?.brand}
            </p>
            <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-accent transition-street">
              {product?.name}
            </h3>
          </div>

          {/* Pricing */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg font-bold text-accent">
              ${product?.salePrice?.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              ${product?.originalPrice?.toFixed(2)}
            </span>
            <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded-full font-medium">
              Save ${savings?.toFixed(2)}
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
                {urgencyLevel === 'critical' ? `Only ${product?.stock} left!` : 
                 urgencyLevel === 'low' ? `${product?.stock} remaining` : 
                 'In Stock'}
              </span>
            </div>
            
            {/* Rating */}
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="text-warning fill-current" />
              <span className="text-xs text-muted-foreground">
                {product?.rating} ({product?.reviews})
              </span>
            </div>
          </div>

          {/* Size Options Preview */}
          {product?.availableSizes && (
            <div className="flex items-center space-x-1 mb-2">
              <span className="text-xs text-muted-foreground">Sizes:</span>
              <div className="flex space-x-1">
                {product?.availableSizes?.slice(0, 4)?.map((size) => (
                  <span key={size} className="text-xs bg-muted text-muted-foreground px-1 py-0.5 rounded">
                    {size}
                  </span>
                ))}
                {product?.availableSizes?.length > 4 && (
                  <span className="text-xs text-accent">+{product?.availableSizes?.length - 4}</span>
                )}
              </div>
            </div>
          )}

          {/* Flash Sale Timer */}
          {product?.isFlashSale && product?.flashSaleEnds && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-2 mt-2">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={12} className="text-error" />
                <span className="text-xs text-error font-medium">
                  Flash sale ends in {product?.flashSaleEnds}
                </span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default SaleProductCard;