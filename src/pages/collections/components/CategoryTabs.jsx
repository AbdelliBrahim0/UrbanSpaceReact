import React from 'react';
import { motion } from 'framer-motion';

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="relative mb-8">
      <div className="flex flex-wrap gap-2 lg:gap-4 justify-center lg:justify-start">
        {categories?.map((category, index) => (
          <motion.button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`relative px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-heading font-bold text-sm lg:text-base transition-street overflow-hidden ${
              activeCategory === category?.id
                ? 'text-accent-foreground bg-accent'
                : 'text-foreground bg-surface hover:bg-muted hover:text-accent'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="relative z-10">{category?.name}</span>
            {activeCategory === category?.id && (
              <motion.div
                className="absolute inset-0 bg-accent"
                layoutId="activeTab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;