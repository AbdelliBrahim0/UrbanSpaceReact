import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Image from '../AppImage';

const ShoppingCart = ({ 
  isOpen = false, 
  onClose, 
  items = [], 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const total = items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
    setSubtotal(total);
  }, [items]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      if (onClose) onClose();
    }, 300);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      if (onRemoveItem) onRemoveItem(itemId);
    } else {
      if (onUpdateQuantity) onUpdateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (onCheckout) onCheckout(items, subtotal);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={handleClose}
      ></div>
      {/* Cart Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-card gang-shadow-modal z-50 gang-transition ${
        isClosing ? 'animate-slide-in-right reverse' : 'animate-slide-in-right'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 gang-border-b">
            <div className="flex items-center space-x-3">
              <Icon name="ShoppingBag" size={24} className="text-accent" />
              <h2 className="font-heading font-bold text-xl text-foreground">
                Shopping Cart
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground gang-hover-scale"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {items?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Icon name="ShoppingBag" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground mb-6">
                  Add some fresh streetwear to get started
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleClose}
                  className="gang-hover-scale"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {items?.map((item) => (
                  <div key={item?.id} className="flex items-center space-x-4 p-4 bg-surface rounded-lg gang-border">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-body font-medium text-foreground truncate">
                        {item?.name}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {item?.size && `Size: ${item?.size}`}
                        {item?.color && ` • Color: ${item?.color}`}
                      </p>
                      <p className="font-data font-medium text-accent">
                        ${item?.price?.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(item?.id, item?.quantity - 1)}
                        className="w-8 h-8 text-muted-foreground hover:text-foreground"
                      >
                        <Icon name="Minus" size={14} />
                      </Button>
                      
                      <span className="font-data font-medium text-foreground min-w-[2rem] text-center">
                        {item?.quantity}
                      </span>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(item?.id, item?.quantity + 1)}
                        className="w-8 h-8 text-muted-foreground hover:text-foreground"
                      >
                        <Icon name="Plus" size={14} />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem && onRemoveItem(item?.id)}
                      className="w-8 h-8 text-muted-foreground hover:text-error gang-hover-scale"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items?.length > 0 && (
            <div className="p-6 gang-border-t bg-surface">
              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="font-body font-medium text-foreground">Subtotal</span>
                  <span className="font-data font-bold text-xl text-accent">
                    ${subtotal?.toFixed(2)}
                  </span>
                </div>

                {/* Shipping Notice */}
                <p className="text-muted-foreground text-sm text-center">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Checkout Button */}
                <Button
                  variant="default"
                  fullWidth
                  onClick={handleCheckout}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 gang-hover-scale font-heading font-semibold"
                >
                  Proceed to Checkout
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>

                {/* Continue Shopping */}
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={handleClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;