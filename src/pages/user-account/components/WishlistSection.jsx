import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WishlistSection = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Urban Rebel Hoodie",
      price: 149.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop",
      brand: "StreetGang",
      inStock: true,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White", "Gray"],
      addedDate: "2024-09-01"
    },
    {
      id: 2,
      name: "Gang Leader Jacket",
      price: 299.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
      brand: "StreetGang",
      inStock: true,
      sizes: ["M", "L", "XL"],
      colors: ["Navy", "Black"],
      addedDate: "2024-08-28"
    },
    {
      id: 3,
      name: "Streetwear Sneakers",
      price: 179.99,
      originalPrice: 229.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
      brand: "StreetGang",
      inStock: false,
      sizes: ["8", "9", "10", "11"],
      colors: ["White/Black", "All Black"],
      addedDate: "2024-08-15"
    },
    {
      id: 4,
      name: "Urban Cap Collection",
      price: 69.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=300&fit=crop",
      brand: "StreetGang",
      inStock: true,
      sizes: ["OS"],
      colors: ["Black", "White", "Red"],
      addedDate: "2024-08-10"
    },
    {
      id: 5,
      name: "Street King Joggers",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop",
      brand: "StreetGang",
      inStock: true,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Charcoal", "Black", "Navy"],
      addedDate: "2024-07-25"
    },
    {
      id: 6,
      name: "Graffiti Print Tee",
      price: 49.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      brand: "StreetGang",
      inStock: true,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "White"],
      addedDate: "2024-07-20"
    }
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const removeFromWishlist = (itemId) => {
    setWishlistItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const addToCart = async (item) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate adding to cart
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItem = {
      ...item,
      quantity: 1,
      selectedSize: item?.sizes?.[0],
      selectedColor: item?.colors?.[0]
    };
    currentCart?.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    
    setIsLoading(false);
  };

  const moveToCart = async (item) => {
    await addToCart(item);
    removeFromWishlist(item?.id);
  };

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => 
      prev?.includes(itemId) 
        ? prev?.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const removeSelectedItems = () => {
    setWishlistItems(prev => prev?.filter(item => !selectedItems?.includes(item?.id)));
    setSelectedItems([]);
  };

  const moveSelectedToCart = async () => {
    const itemsToMove = wishlistItems?.filter(item => selectedItems?.includes(item?.id));
    
    for (const item of itemsToMove) {
      await addToCart(item);
    }
    
    removeSelectedItems();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl border border-border p-8"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Wishlist</h2>
          <p className="text-muted-foreground font-mono">
            {wishlistItems?.length} item{wishlistItems?.length !== 1 ? 's' : ''} saved
          </p>
        </div>

        {selectedItems?.length > 0 && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ShoppingCart"
              iconPosition="left"
              onClick={moveSelectedToCart}
              loading={isLoading}
              className="animate-scale-hover"
            >
              Move to Cart ({selectedItems?.length})
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              onClick={removeSelectedItems}
              className="animate-scale-hover text-error hover:text-error"
            >
              Remove ({selectedItems?.length})
            </Button>
          </div>
        )}
      </div>
      {wishlistItems?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Your Wishlist is Empty</h3>
          <p className="text-muted-foreground mb-6">
            Save items you love to your wishlist and shop them later.
          </p>
          <Button
            variant="default"
            iconName="ShoppingBag"
            iconPosition="left"
            onClick={() => window.location.href = '/product-catalog'}
            className="animate-scale-hover"
          >
            Browse Products
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {wishlistItems?.map((item) => (
              <motion.div
                key={item?.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-surface rounded-lg border border-border overflow-hidden group hover:shadow-lg transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Selection Checkbox */}
                  <div className="absolute top-3 left-3">
                    <button
                      onClick={() => toggleItemSelection(item?.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-150 ${
                        selectedItems?.includes(item?.id)
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'bg-background/80 border-border hover:border-primary'
                      }`}
                    >
                      {selectedItems?.includes(item?.id) && (
                        <Icon name="Check" size={14} />
                      )}
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item?.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-background/80 hover:bg-error hover:text-error-foreground rounded-full flex items-center justify-center transition-all duration-150 opacity-0 group-hover:opacity-100"
                  >
                    <Icon name="X" size={16} />
                  </button>

                  {/* Stock Status */}
                  {!item?.inStock && (
                    <div className="absolute bottom-3 left-3 px-2 py-1 bg-error/90 text-error-foreground text-xs font-medium rounded">
                      Out of Stock
                    </div>
                  )}

                  {/* Sale Badge */}
                  {item?.originalPrice && (
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                      Sale
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
                      {item?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-mono">
                      {item?.brand}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-foreground">
                      ${item?.price}
                    </span>
                    {item?.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${item?.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Sizes & Colors */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-muted-foreground">Sizes:</span>
                      <div className="flex items-center space-x-1">
                        {item?.sizes?.slice(0, 3)?.map((size) => (
                          <span key={size} className="text-xs bg-muted px-1.5 py-0.5 rounded">
                            {size}
                          </span>
                        ))}
                        {item?.sizes?.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{item?.sizes?.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-muted-foreground">Colors:</span>
                      <div className="flex items-center space-x-1">
                        {item?.colors?.slice(0, 2)?.map((color) => (
                          <span key={color} className="text-xs bg-muted px-1.5 py-0.5 rounded">
                            {color}
                          </span>
                        ))}
                        {item?.colors?.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{item?.colors?.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 pt-2">
                    <Button
                      variant="default"
                      size="sm"
                      fullWidth
                      iconName="ShoppingCart"
                      iconPosition="left"
                      onClick={() => moveToCart(item)}
                      disabled={!item?.inStock || isLoading}
                      loading={isLoading}
                      className="animate-scale-hover"
                    >
                      {item?.inStock ? 'Add to Cart' : 'Notify Me'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                      onClick={() => window.location.href = `/product-details?id=${item?.id}`}
                      className="animate-scale-hover"
                    />
                  </div>

                  {/* Added Date */}
                  <p className="text-xs text-muted-foreground font-mono">
                    Added {new Date(item.addedDate)?.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default WishlistSection;