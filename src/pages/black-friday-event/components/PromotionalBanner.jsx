import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const PromotionalBanner = ({ discount, title, description, isFlashing = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface via-card to-surface border border-accent/30 p-8 ${
        isFlashing ? 'animate-pulse' : ''
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(229, 9, 20, 0.1) 10px,
            rgba(229, 9, 20, 0.1) 20px
          )`
        }}></div>
      </div>
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          {/* Discount Badge */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center space-x-2 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold text-2xl mb-4"
          >
            <Icon name="Percent" size={24} />
            <span>{discount}% OFF</span>
          </motion.div>

          {/* Content */}
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-text-secondary font-body text-lg">
            {description}
          </p>
        </div>

        {/* Visual Element */}
        <div className="hidden md:block ml-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center"
          >
            <Icon name="Zap" size={32} className="text-white" />
          </motion.div>
        </div>
      </div>
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-success to-accent opacity-20 animate-pulse"></div>
      </div>
    </motion.div>
  );
};

export default PromotionalBanner;