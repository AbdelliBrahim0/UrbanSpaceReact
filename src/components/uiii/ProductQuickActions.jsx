import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ProductQuickActions = ({ 
  product,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  className = "",
  isVisible = false 
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    setIsAdding(true);
    try {
      if (onAddToCart) {
        await onAddToCart(product);
      }
    } finally {
      setTimeout(() => setIsAdding(false), 1000);
    }
  };

  const handleWishlistToggle = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    setIsWishlisted(!isWishlisted);
    if (onAddToWishlist) {
      onAddToWishlist(product, !isWishlisted);
    }
  };

  const handleQuickView = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div className={`absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gang-transition ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    } ${className}`}>
      <div className="flex items-center space-x-2 animate-scale-in">
        {/* Add to Cart */}
        <Button
          variant="default"
          size="sm"
          onClick={handleAddToCart}
          disabled={isAdding}
          loading={isAdding}
          className="bg-accent text-accent-foreground hover:bg-accent/90 gang-hover-scale shadow-gang"
        >
          <Icon name={isAdding ? "Check" : "ShoppingCart"} size={16} />
          <span className="ml-2 font-body font-medium">
            {isAdding ? "Added!" : "Add"}
          </span>
        </Button>

        {/* Wishlist */}
        <Button
          variant="secondary"
          size="icon"
          onClick={handleWishlistToggle}
          className={`gang-hover-scale shadow-gang ${
            isWishlisted 
              ? 'bg-error text-error-foreground hover:bg-error/90' 
              : 'bg-surface text-foreground hover:bg-surface/80'
          }`}
        >
          <Icon 
            name={isWishlisted ? "Heart" : "Heart"} 
            size={16}
            className={isWishlisted ? "fill-current" : ""}
          />
        </Button>

        {/* Quick View */}
        <Button
          variant="secondary"
          size="icon"
          onClick={handleQuickView}
          className="bg-surface text-foreground hover:bg-surface/80 gang-hover-scale shadow-gang"
        >
          <Icon name="Eye" size={16} />
        </Button>
      </div>
      {/* Product Info Overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-card/90 backdrop-blur-sm rounded-lg p-3 gang-border">
          <h4 className="font-body font-semibold text-foreground text-sm truncate mb-1">
            {product?.name || 'Product Name'}
          </h4>
          <div className="flex items-center justify-between">
            <span className="font-data font-bold text-accent">
              ${product?.price?.toFixed(2) || '0.00'}
            </span>
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <span className="font-data text-muted-foreground line-through text-sm">
                ${product?.originalPrice?.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Size Options */}
          {product?.sizes && product?.sizes?.length > 0 && (
            <div className="flex items-center space-x-1 mt-2">
              <span className="text-muted-foreground text-xs">Sizes:</span>
              {product?.sizes?.slice(0, 4)?.map((size) => (
                <span 
                  key={size} 
                  className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded font-data"
                >
                  {size}
                </span>
              ))}
              {product?.sizes?.length > 4 && (
                <span className="text-xs text-muted-foreground">+{product?.sizes?.length - 4}</span>
              )}
            </div>
          )}

          {/* Stock Status */}
          {product?.stock !== undefined && (
            <div className="flex items-center space-x-2 mt-2">
              <div className={`w-2 h-2 rounded-full ${
                product?.stock > 10 ? 'bg-success' : 
                product?.stock > 0 ? 'bg-warning' : 'bg-error'
              }`}></div>
              <span className="text-xs text-muted-foreground">
                {product?.stock > 10 ? 'In Stock' : 
                 product?.stock > 0 ? `Only ${product?.stock} left` : 'Out of Stock'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductQuickActions;