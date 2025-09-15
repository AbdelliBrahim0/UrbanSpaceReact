import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SaleFilters = ({ onFilterChange, activeFilters }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    discount: true,
    category: false,
    size: false,
    price: false
  });

  const filterSections = [
    {
      id: 'discount',
      title: 'Discount Range',
      icon: 'Percent',
      options: [
        { id: 'up-to-30', label: 'Up to 30% OFF', count: 45 },
        { id: '30-50', label: '30-50% OFF', count: 32 },
        { id: '50-70', label: '50-70% OFF', count: 18 },
        { id: 'over-70', label: 'Over 70% OFF', count: 8 }
      ]
    },
    {
      id: 'category',
      title: 'Categories',
      icon: 'Grid3X3',
      options: [
        { id: 'hoodies', label: 'Hoodies & Sweatshirts', count: 28 },
        { id: 'tees', label: 'T-Shirts & Tanks', count: 35 },
        { id: 'jackets', label: 'Jackets & Outerwear', count: 22 },
        { id: 'pants', label: 'Pants & Joggers', count: 19 },
        { id: 'accessories', label: 'Accessories', count: 15 }
      ]
    },
    {
      id: 'size',
      title: 'Size',
      icon: 'Ruler',
      options: [
        { id: 'xs', label: 'XS', count: 12 },
        { id: 's', label: 'S', count: 25 },
        { id: 'm', label: 'M', count: 38 },
        { id: 'l', label: 'L', count: 42 },
        { id: 'xl', label: 'XL', count: 31 },
        { id: 'xxl', label: 'XXL', count: 18 }
      ]
    },
    {
      id: 'price',
      title: 'Price Range',
      icon: 'DollarSign',
      options: [
        { id: 'under-25', label: 'Under $25', count: 23 },
        { id: '25-50', label: '$25 - $50', count: 34 },
        { id: '50-100', label: '$50 - $100', count: 28 },
        { id: 'over-100', label: 'Over $100', count: 18 }
      ]
    }
  ];

  const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'discount-high', label: 'Highest Discount' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'newest', label: 'Newest First' },
    { id: 'popularity', label: 'Most Popular' }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const handleFilterSelect = (sectionId, optionId) => {
    onFilterChange(sectionId, optionId);
  };

  const clearAllFilters = () => {
    onFilterChange('clear-all');
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.flat()?.length;
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full justify-between"
          iconName="Filter"
          iconPosition="left"
        >
          Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
          <Icon name={isFiltersOpen ? "ChevronUp" : "ChevronDown"} size={20} />
        </Button>
      </div>
      {/* Filters Panel */}
      <AnimatePresence>
        {(isFiltersOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:opacity-100 lg:h-auto"
          >
            <div className="bg-surface border border-street rounded-lg p-6 mb-6">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-heading font-bold text-foreground flex items-center space-x-2">
                  <Icon name="Filter" size={20} className="text-accent" />
                  <span>Filters</span>
                </h3>
                {getActiveFilterCount() > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-accent hover:text-accent-foreground hover:bg-accent"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              {/* Sort Options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Sort By
                </label>
                <select className="w-full bg-input border border-street rounded-lg px-3 py-2 text-foreground focus:border-accent focus:ring-1 focus:ring-accent">
                  {sortOptions?.map(option => (
                    <option key={option?.id} value={option?.id}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Sections */}
              <div className="space-y-4">
                {filterSections?.map((section) => (
                  <div key={section?.id} className="border-b border-street pb-4 last:border-b-0">
                    <button
                      onClick={() => toggleSection(section?.id)}
                      className="w-full flex items-center justify-between py-2 text-left hover:text-accent transition-street"
                    >
                      <div className="flex items-center space-x-2">
                        <Icon name={section?.icon} size={16} className="text-accent" />
                        <span className="font-medium text-foreground">{section?.title}</span>
                      </div>
                      <Icon 
                        name={expandedSections?.[section?.id] ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                      />
                    </button>

                    <AnimatePresence>
                      {expandedSections?.[section?.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 space-y-2"
                        >
                          {section?.options?.map((option) => (
                            <label
                              key={option?.id}
                              className="flex items-center justify-between py-1 cursor-pointer hover:text-accent transition-street group"
                            >
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={activeFilters?.[section?.id]?.includes(option?.id) || false}
                                  onChange={() => handleFilterSelect(section?.id, option?.id)}
                                  className="w-4 h-4 text-accent bg-input border-street rounded focus:ring-accent focus:ring-2"
                                />
                                <span className="text-sm text-muted-foreground group-hover:text-accent transition-street">
                                  {option?.label}
                                </span>
                              </div>
                              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                {option?.count}
                              </span>
                            </label>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Quick Filters */}
              <div className="mt-6 pt-4 border-t border-street">
                <h4 className="text-sm font-medium text-foreground mb-3">Quick Filters</h4>
                <div className="flex flex-wrap gap-2">
                  {['Flash Sale', 'Clearance', 'New Arrivals', 'Limited Edition']?.map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full hover:bg-accent hover:text-accent-foreground transition-street"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SaleFilters;