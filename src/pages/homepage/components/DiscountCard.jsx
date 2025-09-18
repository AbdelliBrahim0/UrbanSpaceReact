import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DiscountCard = ({ 
  discount, 
  category, 
  originalPrice, 
  discountedPrice, 
  description, 
  isLimited = false,
  onActionClick 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="bg-card border border-border rounded-2xl p-6 overflow-hidden transform transition-all duration-300 hover:border-accent/50">
        {/* Limited Badge */}
        {isLimited && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider"
          >
            Limité
          </motion.div>
        )}

        {/* Discount Badge */}
        <div className="flex items-center justify-between mb-6">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="bg-gradient-to-r from-accent to-success text-white px-4 py-2 rounded-lg font-bold text-xl"
          >
            -{discount}%
          </motion.div>
          <Icon name="Tag" size={24} className="text-text-secondary group-hover:text-accent transition-colors duration-300" />
        </div>

        {/* Category */}
        <h3 className="text-xl font-heading font-bold text-foreground mb-2 uppercase tracking-wide">
          {category}
        </h3>

        {/* Description */}
        <p className="text-text-secondary font-body mb-6 leading-relaxed">
          {description}
        </p>

        {/* Pricing */}
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-2xl font-bold text-success">
            {discountedPrice}€
          </span>
          <span className="text-lg text-text-secondary line-through">
            {originalPrice}€
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-accent to-transparent"></div>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          onClick={onActionClick}
          className="border-accent text-accent hover:bg-accent hover:text-white group-hover:scale-105 transition-all duration-300"
        >
          Voir les Détails
        </Button>

        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      </div>
    </motion.div>
  );
};

export default DiscountCard;