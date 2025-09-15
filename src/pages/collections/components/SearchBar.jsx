import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit, placeholder = "Search streetwear..." }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSearchSubmit(searchQuery);
  };

  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`relative transition-street ${isFocused ? 'transform scale-105' : ''}`}>
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <Icon name="Search" size={20} className="text-muted-foreground" />
        </div>
        
        <Input
          type="search"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-12 pr-20 py-4 bg-surface border-street focus:border-accent rounded-full text-lg"
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="hover:bg-muted rounded-full"
            >
              <Icon name="X" size={16} />
            </Button>
          )}
          
          <Button
            type="submit"
            variant="default"
            size="icon"
            className="rounded-full bg-accent hover:bg-accent/90"
          >
            <Icon name="ArrowRight" size={16} />
          </Button>
        </div>
      </div>
      {/* Search Suggestions */}
      {isFocused && searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-popover border border-street rounded-lg shadow-modal overflow-hidden z-50"
        >
          <div className="p-2">
            <div className="text-xs text-muted-foreground px-3 py-2 font-medium">
              Popular Searches
            </div>
            {['Supreme Hoodie', 'Off-White Sneakers', 'Stone Island Jacket', 'Palace Tee']?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSearchChange(suggestion)}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-surface rounded transition-street"
              >
                <Icon name="TrendingUp" size={14} className="text-muted-foreground" />
                <span className="text-popover-foreground">{suggestion}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.form>
  );
};

export default SearchBar;