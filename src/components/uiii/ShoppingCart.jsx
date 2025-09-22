import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Image from '../AppImage';
import { useCart } from '../../contexts/CartContext';
import { ordersApi } from '../../api';
import { toast } from 'react-hot-toast';

const ShoppingCart = ({ isOpen = false, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getTotalItems, 
    getTotalPrice 
  } = useCart();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      if (onClose) onClose();
    }, 300);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error('Votre panier est vide');
      return;
    }

    // Valider les articles du panier
    const hasInvalidItems = cartItems.some(item => !item.id || item.quantity < 1);
    if (hasInvalidItems) {
      toast.error('Certains articles du panier sont invalides');
      return;
    }

    // Préparer les données de la commande
    const orderData = {
      items: cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        source: item.source || null
      }))
    };

    try {
      setIsSubmitting(true);
      const result = await ordersApi.create(orderData);
      
      if (result.success) {
        toast.success('Commande passée avec succès !');
        // Vider le panier après une commande réussie
        // Vous pourriez vouloir rediriger vers une page de confirmation ici
        // navigate('/commande-confirmee');
      } else {
        toast.error(result.message || 'Erreur lors de la commande');
      }
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
      toast.error(error.message || 'Une erreur est survenue lors de la commande');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={handleClose}
      />
      
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
                Panier
              </h2>
              <span className="bg-accent text-accent-foreground text-sm font-bold px-2 py-0.5 rounded-full">
                {getTotalItems()}
              </span>
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
            {cartItems?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Icon name="ShoppingBag" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  Votre panier est vide
                </h3>
                <p className="text-muted-foreground mb-6">
                  Ajoutez des articles pour commencer
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleClose}
                  className="gang-hover-scale"
                >
                  Continuer vos achats
                </Button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {cartItems?.map((item) => (
                  <div key={item?.id} className="flex items-start space-x-4 p-4 bg-surface rounded-lg gang-border">
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
                      {item?.source && (
                        <span className="inline-block bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full mb-1">
                          {item.source}
                        </span>
                      )}
                      <p className="text-muted-foreground text-sm">
                        {item?.size && `Taille: ${item?.size}`}
                        {item?.color && ` • Couleur: ${item?.color}`}
                      </p>
                      <p className="font-data font-medium text-accent">
                        {Number(item?.price).toFixed(3)} TND
                      </p>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item?.id)}
                        className="w-8 h-8 text-muted-foreground hover:text-error gang-hover-scale"
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                      
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
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems?.length > 0 && (
            <div className="p-6 gang-border-t bg-surface">
              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="font-body font-medium text-foreground">Sous-total</span>
                  <span className="font-data font-bold text-xl text-accent">
                    {getTotalPrice().toFixed(3)} TND
                  </span>
                </div>

                {/* Shipping Notice */}
                <p className="text-muted-foreground text-sm text-center">
                  Frais de livraison calculés à la caisse
                </p>

                {/* Checkout Button */}
                <Button
                  variant="default"
                  fullWidth
                  onClick={handleCheckout}
                  disabled={isSubmitting || cartItems.length === 0}
                  className={`bg-accent text-accent-foreground hover:bg-accent/90 gang-hover-scale font-heading font-semibold ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">
                        <Icon name="Loader" size={18} className="animate-spin" />
                      </span>
                      Traitement...
                    </>
                  ) : (
                    <>
                      Passer la commande
                      <Icon name="ArrowRight" size={18} className="ml-2" />
                    </>
                  )}
                </Button>

                {/* Continue Shopping */}
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={handleClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Continuer vos achats
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