import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onProductClick, onAddToCart, onToggleWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageCycle = () => {
    if (product?.images && product?.images?.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product?.images?.length);
    }
  };

  const handleAddToCart = (e) => {
    e?.stopPropagation();
    onAddToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e?.stopPropagation();
    onToggleWishlist(product?.id);
  };

  const handleProductClick = () => {
    onProductClick(product?.id);
  };

  return (
    <motion.div
      className="bg-surface rounded-lg overflow-hidden border border-street cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product?.images ? product?.images?.[currentImageIndex] : product?.image}
          alt={product?.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onMouseEnter={handleImageCycle}
        />
        
        {/* Overlay Actions */}
        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="secondary"
            size="icon"
            onClick={handleAddToCart}
            className="bg-background/90 hover:bg-accent hover:text-accent-foreground"
          >
            <Icon name="ShoppingBag" size={20} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={handleToggleWishlist}
            className={`bg-background/90 hover:bg-accent hover:text-accent-foreground ${
              product?.isWishlisted ? 'text-error' : ''
            }`}
          >
            <Icon name={product?.isWishlisted ? "Heart" : "Heart"} size={20} />
          </Button>
        </motion.div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product?.isNew && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-bold">
              NEW
            </span>
          )}
          {product?.discount && (
            <span className="bg-error text-white px-2 py-1 rounded text-xs font-bold">
              -{product?.discount}%
            </span>
          )}
          {product?.isLimited && (
            <span className="bg-warning text-warning-foreground px-2 py-1 rounded text-xs font-bold">
              LIMITED
            </span>
          )}
        </div>

        {/* Size Indicator */}
        {product?.availableSizes && (
          <div className="absolute bottom-3 left-3">
            <div className="flex space-x-1">
              {product?.availableSizes?.slice(0, 4)?.map((size, index) => (
                <span
                  key={size}
                  className="bg-background/80 text-foreground px-1.5 py-0.5 rounded text-xs"
                >
                  {size}
                </span>
              ))}
              {product?.availableSizes?.length > 4 && (
                <span className="bg-background/80 text-foreground px-1.5 py-0.5 rounded text-xs">
                  +{product?.availableSizes?.length - 4}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-bold text-foreground group-hover:text-accent transition-street line-clamp-2">
            {product?.name}
          </h3>
          <div className="flex items-center space-x-1 text-warning">
            <Icon name="Star" size={14} />
            <span className="text-sm">{product?.rating}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product?.brand}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product?.originalPrice && product?.originalPrice !== product?.price && (
              <span className="text-muted-foreground line-through text-sm">
                ${product?.originalPrice}
              </span>
            )}
            <span className="font-heading font-bold text-lg text-accent">
              ${product?.price}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {product?.colors && product?.colors?.length > 0 && (
              <div className="flex space-x-1">
                {product?.colors?.slice(0, 3)?.map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-street"
                    style={{ backgroundColor: color }}
                  />
                ))}
                {product?.colors?.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{product?.colors?.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Stock Status */}
        {product?.stock !== undefined && (
          <div className="mt-3">
            {product?.stock === 0 ? (
              <span className="text-error text-sm font-medium">Out of Stock</span>
            ) : product?.stock < 5 ? (
              <span className="text-warning text-sm font-medium">
                Only {product?.stock} left
              </span>
            ) : (
              <span className="text-success text-sm font-medium">In Stock</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;