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
  isMobile,
  categories,
  subcategories
}) => {

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
              value={filters?.priceRange?.[0] || 0}
              onChange={(e) => onFilterChange('priceRange', [parseInt(e.target.value), filters?.priceRange?.[1] || 1000])}
              className="flex-1 h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-sm text-muted-foreground w-16">{filters?.priceRange?.[0] || 0}TND</span>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="1000"
              value={filters?.priceRange?.[1] || 1000}
              onChange={(e) => onFilterChange('priceRange', [filters?.priceRange?.[0] || 0, parseInt(e.target.value)])}
              className="flex-1 h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-sm text-muted-foreground w-16">{filters?.priceRange?.[1] || 1000}TND</span>
          </div>
        </div>
      </div>

      {/* Categories & Subcategories */}
      <div>
        <h3 className="font-heading font-bold text-lg mb-4 text-foreground">Categories</h3>
        <div className="space-y-4">
          {categories?.map((category) => (
            <div key={category.id}>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters?.categories?.includes(category.id)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    
                    // Update categories filter
                    const newCategories = isChecked
                      ? [...(filters?.categories || []), category.id]
                      : filters?.categories?.filter(c => c !== category.id);
                    onFilterChange('categories', newCategories);

                    // Find subcategory IDs for the current category
                    const subIdsForCategory = subcategories
                      ?.filter(sub => sub.category_id === category.id)
                      ?.map(sub => sub.id) || [];

                    // Update subcategories filter
                    const currentSubcategories = filters?.subcategories || [];
                    let newSubcategories;

                    if (isChecked) {
                      // Add this category's subcategories to the selection
                      newSubcategories = [...new Set([...currentSubcategories, ...subIdsForCategory])];
                    } else {
                      // Remove this category's subcategories from the selection
                      newSubcategories = currentSubcategories.filter(subId => !subIdsForCategory.includes(subId));
                    }
                    onFilterChange('subcategories', newSubcategories);
                  }}
                  className="w-4 h-4 text-accent bg-surface border-street rounded focus:ring-accent focus:ring-2"
                />
                <span className="font-bold text-foreground group-hover:text-accent transition-street">{category.name}</span>
              </label>
              <div className="pl-6 mt-2 space-y-2">
                {subcategories
                  ?.filter(sub => sub.category_id === category.id)
                  ?.map((subcategory) => (
                  <label key={subcategory.id} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters?.subcategories?.includes(subcategory.id)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        const subcategoryId = subcategory.id;
                        const parentCategoryId = subcategory.category_id;

                        // 1. Update subcategories filter
                        const currentSubcategories = filters?.subcategories || [];
                        const newSubcategories = isChecked
                          ? [...currentSubcategories, subcategoryId]
                          : currentSubcategories.filter(id => id !== subcategoryId);
                        onFilterChange('subcategories', newSubcategories);

                        // 2. Check siblings to update parent category state
                        const siblingSubcategoryIds = subcategories
                          .filter(s => s.category_id === parentCategoryId)
                          .map(s => s.id);
                        
                        const allSiblingsChecked = siblingSubcategoryIds.every(id => newSubcategories.includes(id));

                        const currentCategories = filters?.categories || [];
                        if (allSiblingsChecked) {
                          // Add parent category if not already present
                          if (!currentCategories.includes(parentCategoryId)) {
                            onFilterChange('categories', [...currentCategories, parentCategoryId]);
                          }
                        } else {
                          // Remove parent category if it's present
                          if (currentCategories.includes(parentCategoryId)) {
                            onFilterChange('categories', currentCategories.filter(id => id !== parentCategoryId));
                          }
                        }
                      }}
                      className="w-4 h-4 text-accent bg-surface border-street rounded focus:ring-accent focus:ring-2"
                    />
                    <span className="text-foreground group-hover:text-accent transition-street">{subcategory.name}</span>
                  </label>
                ))}
              </div>
            </div>
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