import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ShoppingCartIndicator = ({ 
  cartCount = 0, 
  cartItems = [],
  onRemoveItem = () => {},
  onUpdateQuantity = () => {},
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animateCount, setAnimateCount] = useState(false);
  const dropdownRef = useRef(null);

  // Sample cart items for demo
  const defaultCartItems = [
    {
      id: 1,
      name: 'Urban Tech Hoodie',
      price: 129.99,
      quantity: 1,
      image: '/assets/images/hoodie-1.jpg',
      size: 'M',
      color: 'Black'
    },
    {
      id: 2,
      name: 'Street Runner Sneakers',
      price: 189.99,
      quantity: 2,
      image: '/assets/images/sneakers-1.jpg',
      size: '10',
      color: 'White/Blue'
    }
  ];

  const items = cartItems?.length > 0 ? cartItems : (cartCount > 0 ? defaultCartItems : []);
  const totalPrice = items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleRemoveItem = (itemId) => {
    onRemoveItem(itemId);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      onUpdateQuantity(itemId, newQuantity);
    } else {
      handleRemoveItem(itemId);
    }
  };

  // Animate count when it changes
  useEffect(() => {
    if (cartCount > 0) {
      setAnimateCount(true);
      const timer = setTimeout(() => setAnimateCount(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Cart Button */}
      <button
        onClick={toggleDropdown}
        className={`relative p-2 rounded-lg transition-all duration-200 hover:bg-muted group ${
          isOpen ? 'bg-muted' : ''
        }`}
        aria-label={`Shopping cart with ${cartCount} items`}
      >
        <Icon 
          name="ShoppingCart" 
          size={20} 
          className="text-text-primary group-hover:text-accent transition-colors" 
        />
        
        {/* Cart Count Badge */}
        {cartCount > 0 && (
          <span 
            className={`absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-200 ${
              animateCount ? 'scale-125' : 'scale-100'
            }`}
          >
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
      </button>
      {/* Cart Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevation-3 animate-fade-in z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-sm font-semibold text-popover-foreground">
              Shopping Cart ({cartCount})
            </h3>
            <button
              onClick={closeDropdown}
              className="p-1 rounded-full hover:bg-muted transition-colors"
              aria-label="Close cart"
            >
              <Icon name="X" size={16} className="text-muted-foreground" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="max-h-80 overflow-y-auto">
            {items?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4">
                <Icon name="ShoppingCart" size={48} className="text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Your cart is empty
                </p>
                <Link to="/3d-product-catalog" onClick={closeDropdown}>
                  <Button variant="outline" size="sm">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="py-2">
                {items?.map((item) => (
                  <div key={item?.id} className="flex items-center space-x-3 px-4 py-3 hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 bg-surface rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item?.image} 
                        alt={item?.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-popover-foreground truncate">
                        {item?.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {item?.size && `Size: ${item?.size}`}
                        {item?.size && item?.color && ' • '}
                        {item?.color && `Color: ${item?.color}`}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-semibold text-popover-foreground font-mono">
                          ${item?.price?.toFixed(2)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item?.id, item?.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Icon name="Minus" size={12} />
                          </button>
                          <span className="text-xs font-mono w-6 text-center">
                            {item?.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item?.id, item?.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Icon name="Plus" size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveItem(item?.id)}
                      className="p-1 rounded-full hover:bg-error/10 text-muted-foreground hover:text-error transition-colors"
                      aria-label="Remove item"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items?.length > 0 && (
            <>
              <hr className="border-border" />
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-popover-foreground">
                    Total
                  </span>
                  <span className="text-lg font-bold text-popover-foreground font-mono">
                    ${totalPrice?.toFixed(2)}
                  </span>
                </div>
                <div className="space-y-2">
                  <Link to="/cart" onClick={closeDropdown} className="block">
                    <Button variant="outline" fullWidth>
                      View Cart
                    </Button>
                  </Link>
                  <Link to="/checkout" onClick={closeDropdown} className="block">
                    <Button variant="default" fullWidth>
                      Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ShoppingCartIndicator;