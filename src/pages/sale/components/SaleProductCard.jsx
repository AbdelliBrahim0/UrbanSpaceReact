import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { useCart } from '../../../contexts/CartContext';

const SaleProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
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
    handleAddToCart(e);
  };

  const handleAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.salePrice),
      image: product.image,
      size: product.availableSizes?.[0] || 'Unique',
      color: 'Standard',
      source: 'From Sale'
    });
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
      <Link to={`/product/${product.id}`} className="block">
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
                disabled={!product.stock || product.stock <= 0}
              >
                {product.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
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
              {product?.salePrice?.toFixed(3)} TND
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {product?.originalPrice?.toFixed(3)} TND
            </span>
            <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded-full font-medium">
              Save {(product?.originalPrice - product?.salePrice)?.toFixed(3)} TND
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
                {urgencyLevel === 'critical' ? `Seulement ${product?.stock} restant(s) !` : 
                 urgencyLevel === 'low' ? `${product?.stock} restant(s)` : 
                 'En stock'}
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

          {/* Bouton Ajouter au panier - Version mobile/visible par défaut */}
          <div className="lg:hidden mt-3">
            <button
              onClick={handleAddToCart}
              className="w-full bg-accent text-accent-foreground py-2 px-4 rounded-lg font-medium hover:bg-accent/90 transition-street flex items-center justify-center"
              disabled={!product.stock || product.stock <= 0}
            >
              <Icon name="ShoppingBag" className="mr-2" size={16} />
              {product.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
            </button>
          </div>
        </div>
      </Link>
      
      {/* Bouton Ajouter au panier - Version desktop (visible au survol) */}
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-street">
        <button
          onClick={handleAddToCart}
          className="w-full bg-accent text-accent-foreground py-2 px-4 rounded-lg font-medium hover:bg-accent/90 transition-street flex items-center justify-center"
          disabled={!product.stock || product.stock <= 0}
        >
          <Icon name="ShoppingBag" className="mr-2" size={16} />
          {product.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
        </button>
      </div>
    </motion.div>
  );
};

export default SaleProductCard;