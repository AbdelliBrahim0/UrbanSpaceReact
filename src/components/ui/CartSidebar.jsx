import React, { useCallback } from 'react';
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

  // Close cart when clicking outside
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  }, [closeCart]);

  // Close cart when pressing Escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeCart();
      }
    };

    if (isCartOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Ne pas réinitialiser le défilement ici, c'est géré par closeCart
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  // Handle continue shopping button click
  const handleContinueShopping = () => {
    closeCart();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={handleBackdropClick}
      />

      {/* Cart Sidebar */}
      <div 
        className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-street shadow-street z-50 transform transition-transform duration-300 ease-street flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-street bg-background">
          <div className="flex items-center space-x-2">
            <Icon name="ShoppingBag" size={24} className="text-accent" />
            <h2 className="font-heading font-bold text-xl text-foreground">
              Panier
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
            aria-label="Fermer le panier"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Service Client Info Banner */}
        <div className="bg-accent/10 border-l-4 border-accent p-4 mx-6 mt-4 rounded-r">
          <div className="flex items-start">
            <Icon name="PhoneCall" size={18} className="text-accent mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-foreground">
              Notre service client vous appellera pour confirmer votre commande et les détails de produit et livraison.
            </p>
          </div>
        </div>

        {/* Cart Items - Scrollable Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Icon name="ShoppingBag" size={64} className="text-muted mb-4 opacity-30" />
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  Votre panier est vide
                </h3>
                <p className="text-muted-foreground text-sm">
                  Ajoutez des articles pour commencer
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start space-x-4 p-4 bg-surface rounded-lg border border-street hover:border-accent transition-street group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-body font-semibold text-foreground truncate">
                        {item.name}
                      </h4>
                      {item.source && (
                        <span className="inline-block bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full mb-1">
                          {item.source}
                        </span>
                      )}
                      <div className="flex items-center space-x-2 mt-1">
                        {item.color && (
                          <>
                            <span className="text-sm text-muted-foreground">
                              {item.color}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                          </>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {item.size ? `Taille: ${item.size}` : 'Taille unique'}
                        </span>
                      </div>
                      <div className="font-heading font-bold text-accent mt-1">
                        {Number(item.price).toFixed(3)} TND
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
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="flex-shrink-0 p-6 border-t border-street bg-background">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sous-total</span>
                <span className="font-body font-medium text-foreground">
                  {getTotalPrice().toFixed(3)} TND
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Livraison</span>
                <span className="font-body font-medium text-foreground">
                  Gratuite
                </span>
              </div>
              <div className="border-t border-street pt-3">
                <div className="flex justify-between font-heading font-bold text-lg">
                  <span className="text-foreground">Total</span>
                  <span className="text-accent">
                    {getTotalPrice().toFixed(3)} TND
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <Button
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold transition-street"
                size="lg"
              >
                Passer la commande
              </Button>
              <Button
                variant="outline"
                className="w-full border-street hover:border-accent hover:text-accent font-body"
                onClick={handleContinueShopping}
              >
                Continuer mes achats
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
