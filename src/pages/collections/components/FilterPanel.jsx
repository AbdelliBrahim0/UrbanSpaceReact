import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  onClearFilters,
  isMobile 
}) => {
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colorOptions = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#FF0040' },
    { name: 'Green', value: '#00FF88' },
    { name: 'Blue', value: '#0066FF' },
    { name: 'Yellow', value: '#FFB800' },
    { name: 'Purple', value: '#8B00FF' },
    { name: 'Gray', value: '#808080' }
  ];

  const brandOptions = [
    'Supreme', 'Off-White', 'Stone Island', 'A Bathing Ape', 
    'Stussy', 'Palace', 'Fear of God', 'Kith'
  ];

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-heading font-bold text-lg mb-4 text-foreground">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="1000"
              value={filters?.priceRange?.[0]}
              onChange={(e) => onFilterChange('priceRange', [parseInt(e?.target?.value), filters?.priceRange?.[1]])}
              className="flex-1 h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-sm text-muted-foreground w-16">${filters?.priceRange?.[0]}</span>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="1000"
              value={filters?.priceRange?.[1]}
              onChange={(e) => onFilterChange('priceRange', [filters?.priceRange?.[0], parseInt(e?.target?.value)])}
              className="flex-1 h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-sm text-muted-foreground w-16">${filters?.priceRange?.[1]}</span>
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-heading font-bold text-lg mb-4 text-foreground">Sizes</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizeOptions?.map((size) => (
            <button
              key={size}
              onClick={() => {
                const newSizes = filters?.sizes?.includes(size)
                  ? filters?.sizes?.filter(s => s !== size)
                  : [...filters?.sizes, size];
                onFilterChange('sizes', newSizes);
              }}
              className={`p-2 rounded-lg border transition-street ${
                filters?.sizes?.includes(size)
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-street bg-surface text-foreground hover:border-accent hover:text-accent'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-heading font-bold text-lg mb-4 text-foreground">Colors</h3>
        <div className="grid grid-cols-4 gap-3">
          {colorOptions?.map((color) => (
            <button
              key={color?.name}
              onClick={() => {
                const newColors = filters?.colors?.includes(color?.name)
                  ? filters?.colors?.filter(c => c !== color?.name)
                  : [...filters?.colors, color?.name];
                onFilterChange('colors', newColors);
              }}
              className={`relative w-12 h-12 rounded-full border-2 transition-street ${
                filters?.colors?.includes(color?.name)
                  ? 'border-accent scale-110' :'border-street hover:border-accent hover:scale-105'
              }`}
              style={{ backgroundColor: color?.value }}
              title={color?.name}
            >
              {filters?.colors?.includes(color?.name) && (
                <Icon 
                  name="Check" 
                  size={16} 
                  className={`absolute inset-0 m-auto ${
                    color?.name === 'White' ? 'text-black' : 'text-white'
                  }`} 
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-heading font-bold text-lg mb-4 text-foreground">Brands</h3>
        <div className="space-y-2">
          {brandOptions?.map((brand) => (
            <label key={brand} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters?.brands?.includes(brand)}
                onChange={(e) => {
                  const newBrands = e?.target?.checked
                    ? [...filters?.brands, brand]
                    : filters?.brands?.filter(b => b !== brand);
                  onFilterChange('brands', newBrands);
                }}
                className="w-4 h-4 text-accent bg-surface border-street rounded focus:ring-accent focus:ring-2"
              />
              <span className="text-foreground group-hover:text-accent transition-street">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={onClearFilters}
        className="w-full"
        iconName="RotateCcw"
        iconPosition="left"
      >
        Clear All Filters
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-background border-r border-street z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading font-bold text-xl text-foreground">Filters</h2>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <Icon name="X" size={24} />
                  </Button>
                </div>
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="w-80 bg-surface rounded-lg p-6 border border-street h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-xl text-foreground">Filters</h2>
        <Icon name="Filter" size={20} className="text-accent" />
      </div>
      <FilterContent />
    </div>
  );
};

export default FilterPanel;