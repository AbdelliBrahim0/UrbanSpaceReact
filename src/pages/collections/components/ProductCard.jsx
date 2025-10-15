import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { useCart } from '../../../contexts/CartContext';

const ProductCard = ({ product, onProductClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.urlImage,
      size: product.size || 'Unique',
      color: product.color || 'Standard',
      source: 'From Collections' // Ajout de la source
    });
    
    // Optionnel : ouvrir le panier après l'ajout
    // setIsCartOpen(true);
  };

  return (
    <motion.div
      className="bg-surface rounded-lg overflow-hidden border border-street cursor-pointer group flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onProductClick(product)}
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
          <Button 
            variant="secondary" 
            size="icon" 
            onClick={(e) => { 
              e.stopPropagation(); 
              // Gérer les favoris ici si nécessaire
            }}
          >
            <Icon name="Heart" size={20} />
          </Button>
        </motion.div>

        {/* Stock badge */}
        {product.stock < 5 && (
          <span className="absolute top-2 left-2 bg-warning text-warning-foreground px-2 py-1 rounded text-xs font-bold">
            Only {product.stock} left
          </span>
        )}
      </div>

      <div className="p-4 flex-grow flex flex-col">
                <h3 className="w-full block font-heading font-bold text-foreground group-hover:text-accent truncate">{product.name}</h3>
        {product.description && <p className="text-muted-foreground text-sm truncate mt-1">{product.description}</p>}
        
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-heading font-bold text-lg text-accent">
              {Number(product.price).toFixed(3)} TND
            </span>
            {product.size && (
              <span className="bg-background/80 text-foreground px-1.5 py-0.5 rounded text-xs">{product.size}</span>
            )}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full border-accent text-accent hover:bg-accent hover:text-white transition-colors"
            onClick={handleAddToCart}
          >
            <Icon name="ShoppingBag" className="mr-2" size={16} />
            Ajouter au panier
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
