import React from 'react';

const CombinedFilter = ({
  filterData,
  activeFilters,
  onFilterChange,
  onReset,
  priceRange,
  onPriceChange,
  maxPrice,
}) => {

  // This assumes activeFilters is now an object like { categories: [], subcategories: [] }
  const isFilterActive = 
    (activeFilters.categories && activeFilters.categories.length > 0) || 
    (activeFilters.subcategories && activeFilters.subcategories.length > 0) ||
    priceRange.min > 0 ||
    priceRange.max < maxPrice;

  return (
    <div className="p-4 bg-surface rounded-lg shadow-sm w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-foreground">Filters</h3>
        {isFilterActive && ( 
          <button
            onClick={onReset}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {/* Categories & Subcategories */}
      <div className="space-y-4">
        {filterData?.map((category) => (
          <div key={category.id}>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 text-accent bg-surface border-street rounded focus:ring-accent focus:ring-2"
                checked={activeFilters.categories?.includes(category.id) || false}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  
                  const newCategories = isChecked
                    ? [...(activeFilters.categories || []), category.id]
                    : (activeFilters.categories || []).filter(c => c !== category.id);
                  onFilterChange('categories', newCategories);

                  const subIdsForCategory = category.subcategories?.map(sub => sub.id) || [];
                  const currentSubcategories = activeFilters.subcategories || [];
                  let newSubcategories;

                  if (isChecked) {
                    newSubcategories = [...new Set([...currentSubcategories, ...subIdsForCategory])];
                  } else {
                    newSubcategories = currentSubcategories.filter(subId => !subIdsForCategory.includes(subId));
                  }
                  onFilterChange('subcategories', newSubcategories);
                }}
              />
              <span className="font-bold text-foreground group-hover:text-accent transition-street">{category.name}</span>
            </label>

            {category.subcategories && category.subcategories.length > 0 && (
              <div className="pl-6 mt-2 space-y-2 border-l border-street">
                {category.subcategories.map((subcategory) => (
                  <label key={subcategory.id} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-accent bg-surface border-street rounded focus:ring-accent focus:ring-2"
                      checked={activeFilters.subcategories?.includes(subcategory.id) || false}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        const parentCategoryId = category.id;

                        const currentSubcategories = activeFilters.subcategories || [];
                        const newSubcategories = isChecked
                          ? [...currentSubcategories, subcategory.id]
                          : currentSubcategories.filter(id => id !== subcategory.id);
                        onFilterChange('subcategories', newSubcategories);

                        const siblingSubcategoryIds = category.subcategories.map(s => s.id);
                        const allSiblingsChecked = siblingSubcategoryIds.every(id => newSubcategories.includes(id));

                        const currentCategories = activeFilters.categories || [];
                        if (allSiblingsChecked) {
                          if (!currentCategories.includes(parentCategoryId)) {
                            onFilterChange('categories', [...currentCategories, parentCategoryId]);
                          }
                        } else {
                          if (currentCategories.includes(parentCategoryId)) {
                            onFilterChange('categories', currentCategories.filter(id => id !== parentCategoryId));
                          }
                        }
                      }}
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{subcategory.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mt-6 pt-4 border-t border-street">
        <h4 className="font-semibold text-md mb-3 text-foreground">Price Range</h4>
        
        <div className="mb-2">
            <label className="flex justify-between text-sm text-muted-foreground">
                <span>Min Price</span>
                <span>{priceRange.min} TND</span>
            </label>
            <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange.min}
                onChange={(e) => {
                    const newMin = Math.min(Number(e.target.value), priceRange.max - 1);
                    onPriceChange({ ...priceRange, min: newMin });
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
        </div>

        <div>
            <label className="flex justify-between text-sm text-muted-foreground">
                <span>Max Price</span>
                <span>{priceRange.max} TND</span>
            </label>
            <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange.max}
                onChange={(e) => {
                    const newMax = Math.max(Number(e.target.value), priceRange.min + 1);
                    onPriceChange({ ...priceRange, max: newMax });
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
        </div>
      </div>
    </div>
  );
};

export default CombinedFilter;