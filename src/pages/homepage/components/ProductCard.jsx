import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProductCard = ({ product, onProductClick, onAddToCart, onToggleWishlist, isWishlisted }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-surface rounded-lg overflow-hidden border border-street cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onProductClick(product.id)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={isHovered && product.urlImageHover ? product.urlImageHover : product.urlImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay actions */}
        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Button variant="secondary" size="icon" onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>
            <Icon name="ShoppingBag" size={20} />
          </Button>
          <Button variant="secondary" size="icon" onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}>
            <Icon name={isWishlisted ? "Heart" : "Heart"} size={20} />
          </Button>
        </motion.div>

        {/* Stock badge */}
        {product.stock < 5 && (
          <span className="absolute top-2 left-2 bg-warning text-warning-foreground px-2 py-1 rounded text-xs font-bold">
            Only {product.stock} left
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-heading font-bold text-foreground group-hover:text-accent line-clamp-2">{product.name}</h3>
        {product.description && <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>}
        <div className="mt-2 flex items-center justify-between">
          <span className="font-heading font-bold text-lg text-accent">{Number(product.price).toFixed(2)} TND</span>
          {product.size && (
            <span className="bg-background/80 text-foreground px-1.5 py-0.5 rounded text-xs">{product.size}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
