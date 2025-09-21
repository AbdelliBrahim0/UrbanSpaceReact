import React from 'react';
import { useCart } from '../../contexts/CartContext';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const CartSidebar = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Cart Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-street shadow-street z-50 transform transition-transform duration-300 ease-street">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-street">
          <div className="flex items-center space-x-2">
            <Icon name="ShoppingBag" size={24} className="text-accent" />
            <h2 className="font-heading font-bold text-xl text-foreground">
              Shopping Cart
            </h2>
            <span className="bg-accent text-accent-foreground text-sm font-bold px-2 py-1 rounded-full">
              {getTotalItems()}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeCart}
            className="hover:bg-surface hover:text-accent transition-street"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Icon name="ShoppingBag" size={64} className="text-muted mb-4 opacity-30" />
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                Your cart is empty
              </h3>
              <p className="text-muted-foreground text-sm">
                Add some streetwear items to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 bg-surface rounded-lg border border-street hover:border-accent transition-street group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-body font-semibold text-foreground truncate">
                      {item.name}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {item.color}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        Size: {item.size}
                      </span>
                    </div>
                    <div className="font-heading font-bold text-accent mt-1">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="opacity-0 group-hover:opacity-100 hover:text-error transition-all"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0 border-street hover:border-accent"
                      >
                        <Icon name="Minus" size={14} />
                      </Button>

                      <span className="font-body font-medium text-foreground min-w-[2rem] text-center">
                        {item.quantity}
                      </span>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0 border-street hover:border-accent"
                      >
                        <Icon name="Plus" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Promo Code */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-street">
            <div className="mb-4">
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Promo Code
              </label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter promo code"
                  className="bg-surface border-street focus:border-accent"
                />
                <Button
                  variant="outline"
                  className="border-street hover:border-accent hover:text-accent"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-street bg-surface/50">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-body font-medium text-foreground">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-body font-medium text-foreground">
                  Free
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-body font-medium text-foreground">
                  ${(getTotalPrice() * 0.08).toFixed(2)}
                </span>
              </div>
              <div className="border-t border-street pt-3">
                <div className="flex justify-between font-heading font-bold text-lg">
                  <span className="text-foreground">Total</span>
                  <span className="text-accent">
                    ${(getTotalPrice() * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold transition-street"
                size="lg"
              >
                Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full border-street hover:border-accent hover:text-accent font-body"
                onClick={closeCart}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
