import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductPurchase = ({ product, onAddToCart, onAddToWishlist }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product?.maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    });
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlistToggle = () => {
    setIsInWishlist(!isInWishlist);
    onAddToWishlist(product);
  };

  const getInventoryStatus = () => {
    if (product?.stock === 0) return { status: 'out-of-stock', text: 'Out of Stock', color: 'text-error' };
    if (product?.stock <= 5) return { status: 'low-stock', text: `Only ${product?.stock} left!`, color: 'text-warning' };
    return { status: 'in-stock', text: 'In Stock', color: 'text-success' };
  };

  const inventoryStatus = getInventoryStatus();
  const discountPercentage = product?.originalPrice ? Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-heading font-bold text-foreground">
            ${product?.price?.toFixed(2)}
          </span>
          {product?.originalPrice && (
            <>
              <span className="text-lg text-muted-foreground line-through">
                ${product?.originalPrice?.toFixed(2)}
              </span>
              <span className="bg-error text-error-foreground px-2 py-1 rounded text-sm font-bold">
                -{discountPercentage}%
              </span>
            </>
          )}
        </div>
        
        {/* Inventory Status */}
        <div className="flex items-center space-x-2">
          <Icon 
            name={inventoryStatus?.status === 'in-stock' ? 'Check' : inventoryStatus?.status === 'low-stock' ? 'AlertTriangle' : 'X'} 
            size={16} 
            className={inventoryStatus?.color} 
          />
          <span className={`text-sm font-medium ${inventoryStatus?.color}`}>
            {inventoryStatus?.text}
          </span>
        </div>

        {/* Payment Options */}
        <div className="text-sm text-muted-foreground">
          Or 4 interest-free payments of ${(product?.price / 4)?.toFixed(2)} with 
          <span className="text-accent font-medium ml-1">Klarna</span>
        </div>
      </div>
      {/* Color Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground">Color: {selectedColor?.name}</h3>
        </div>
        <div className="flex space-x-3">
          {product?.colors?.map((color, index) => (
            <motion.button
              key={index}
              onClick={() => handleColorSelect(color)}
              className={`w-12 h-12 rounded-lg border-2 transition-all ${
                selectedColor?.name === color?.name 
                  ? 'border-accent scale-110 shadow-lg' 
                  : 'border-street hover:border-accent/50'
              }`}
              style={{ backgroundColor: color?.hex }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedColor?.name === color?.name && (
                <Icon name="Check" size={20} className="text-white drop-shadow-lg" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
      {/* Size Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground">Size</h3>
          <Button
            variant="link"
            onClick={() => setShowSizeGuide(!showSizeGuide)}
            className="text-sm p-0 h-auto"
          >
            <Icon name="Ruler" size={14} className="mr-1" />
            Size Guide
          </Button>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {product?.sizes?.map((size) => (
            <motion.button
              key={size?.size}
              onClick={() => handleSizeSelect(size?.size)}
              disabled={!size?.available}
              className={`p-3 text-center border rounded-lg font-medium transition-all ${
                selectedSize === size?.size
                  ? 'border-accent bg-accent text-accent-foreground'
                  : size?.available
                  ? 'border-street text-foreground hover:border-accent hover:bg-surface'
                  : 'border-street/30 text-muted-foreground cursor-not-allowed opacity-50'
              }`}
              whileHover={size?.available ? { scale: 1.02 } : {}}
              whileTap={size?.available ? { scale: 0.98 } : {}}
            >
              {size?.size}
              {!size?.available && (
                <div className="text-xs mt-1">Out</div>
              )}
            </motion.button>
          ))}
        </div>

        {!selectedSize && (
          <p className="text-sm text-muted-foreground">Please select a size</p>
        )}
      </div>
      {/* Quantity Selection */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground">Quantity</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-street rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 rounded-r-none"
            >
              <Icon name="Minus" size={16} />
            </Button>
            <span className="px-4 py-2 font-medium text-foreground min-w-[3rem] text-center">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product?.maxQuantity}
              className="w-10 h-10 rounded-l-none"
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            Max {product?.maxQuantity} per order
          </span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleAddToCart}
          disabled={product?.stock === 0 || !selectedSize}
          className="w-full h-12 text-lg font-medium"
          loading={addedToCart}
        >
          {addedToCart ? (
            <>
              <Icon name="Check" size={20} className="mr-2" />
              Added to Cart!
            </>
          ) : (
            <>
              <Icon name="ShoppingBag" size={20} className="mr-2" />
              Add to Cart - ${(product?.price * quantity)?.toFixed(2)}
            </>
          )}
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={handleWishlistToggle}
            className="h-12"
          >
            <Icon 
              name={isInWishlist ? "Heart" : "Heart"} 
              size={18} 
              className={`mr-2 ${isInWishlist ? 'fill-current text-error' : ''}`} 
            />
            {isInWishlist ? 'Saved' : 'Save'}
          </Button>

          <Button
            variant="outline"
            className="h-12"
          >
            <Icon name="Share2" size={18} className="mr-2" />
            Share
          </Button>
        </div>

        {/* Buy Now Button */}
        <Button
          variant="secondary"
          disabled={product?.stock === 0 || !selectedSize}
          className="w-full h-12 text-lg font-medium"
        >
          <Icon name="Zap" size={20} className="mr-2" />
          Buy Now
        </Button>
      </div>
      {/* Features */}
      <div className="space-y-3 pt-4 border-t border-street">
        {product?.features?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Icon name={feature?.icon} size={18} className="text-accent" />
            <span className="text-sm text-foreground">{feature?.text}</span>
          </div>
        ))}
      </div>
      {/* Size Guide Modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSizeGuide(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-street rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e?.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-bold text-foreground">Size Guide</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSizeGuide(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Find your perfect fit with our size guide. All measurements are in inches.
                </p>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">XS:</span>
                    <span className="text-foreground">Chest 32-34"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">S:</span>
                    <span className="text-foreground">Chest 34-36"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">M:</span>
                    <span className="text-foreground">Chest 36-38"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">L:</span>
                    <span className="text-foreground">Chest 38-40"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">XL:</span>
                    <span className="text-foreground">Chest 40-42"</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPurchase;