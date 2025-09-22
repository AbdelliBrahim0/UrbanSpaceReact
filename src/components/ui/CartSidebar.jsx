import React, { useCallback, useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Dialog from './Dialog';
import { ordersApi } from '../../api';
import { toast } from 'react-hot-toast';

const CartSidebar = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  const {
    isCartOpen,
    closeCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart
  } = useCart();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Ne pas retourner null si showSuccessPopup est vrai
  if (!isCartOpen && !showSuccessPopup) return null;
  
  console.log('Rendering CartSidebar', { 
    isCartOpen, 
    showSuccessPopup, 
    cartItemsCount: cartItems.length 
  });

  // Handle continue shopping button click
  const handleContinueShopping = () => {
    closeCart();
  };

  return (
    <>
      {/* Backdrop for cart */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={handleBackdropClick}
        />
      )}

      {/* Cart Sidebar */}
      {(isCartOpen || showSuccessPopup) && (
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
                onClick={() => {
                  if (!isAuthenticated) {
                    setShowLoginAlert(true);
                    return;
                  }
                  setShowConfirmation(true);
                }}
              >
                Passer la commande
              </Button>
              
              {/* Modal de confirmation de commande */}
              {showConfirmation && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-background rounded-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold">Confirmer la commande</h3>
                      <button 
                        onClick={() => setShowConfirmation(false)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Icon name="X" size={20} />
                      </button>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="p-4 bg-muted/20 rounded-lg">
                        <h4 className="font-medium mb-2">Vos coordonnées</h4>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-muted-foreground">Nom complet :</span> {user?.fullName || 'Non renseigné'}</p>
                          <p><span className="text-muted-foreground">Téléphone :</span> {user?.phone || 'Non renseigné'}</p>
                          <p><span className="text-muted-foreground">Adresse :</span> {user?.address ? `${user.address.street}, ${user.address.city} ${user.address.postalCode}` : 'Non renseignée'}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        Vérifiez vos informations avant de confirmer votre commande.
                      </p>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => navigate('/mon-compte')}
                      >
                        <Icon name="User" className="mr-2" />
                        Modifier mes informations
                      </Button>
                      
                      <Button
                        className={`w-full bg-accent hover:bg-accent/90 text-accent-foreground ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        disabled={isSubmitting}
                        onClick={async () => {
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
                              console.log('Commande réussie, affichage de la popup de succès');
                              setShowConfirmation(false);
                              setShowSuccessPopup(true);
                              // Ne pas vider le panier ni fermer le panier ici
                              // La popup de succès gérera ces actions
                            } else {
                              toast.error(result.message || 'Erreur lors de la confirmation de la commande');
                            }
                          } catch (error) {
                            console.error('Erreur lors de la commande:', error);
                            toast.error(error.message || 'Une erreur est survenue lors de la commande');
                          } finally {
                            setIsSubmitting(false);
                          }
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2">
                              <Icon name="Loader" size={18} className="animate-spin" />
                            </span>
                            Traitement...
                          </>
                        ) : (
                          'Confirmer la commande'
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Dialogue de connexion */}
              <Dialog
                isOpen={showLoginAlert}
                onClose={() => setShowLoginAlert(false)}
                title="Connexion requise"
                confirmText="Se connecter"
                cancelText="Annuler"
                onConfirm={() => {
                  setShowLoginAlert(false);
                  navigate('/user-authentication');
                }}
              >
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Icon name="AlertTriangle" className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Vous devez être connecté pour passer une commande. Voulez-vous être redirigé vers la page de connexion ?
                      </p>
                    </div>
                  </div>
                </div>
              </Dialog>
              
              {/* Dialogue de confirmation de commande */}
              <Dialog
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                title="Confirmer la commande"
                confirmText="Confirmer la commande"
                cancelText="Annuler"
                onConfirm={async () => {
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
                      setShowConfirmation(false);
                      setShowSuccessPopup(true);
                      // Ne pas vider le panier ni fermer le panier ici
                      // La popup de succès gérera ces actions
                    } else {
                      toast.error(result.message || 'Erreur lors de la confirmation de la commande');
                    }
                  } catch (error) {
                    console.error('Erreur lors de la commande:', error);
                    toast.error(error.message || 'Une erreur est survenue lors de la commande');
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                confirmButtonProps={{
                  disabled: isSubmitting,
                  children: isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">
                        <Icon name="Loader" size={18} className="animate-spin" />
                      </span>
                      Traitement...
                    </>
                  ) : 'Confirmer la commande'
                }}
              >
                <div className="space-y-4">
                  {/* Message d'information sur l'appel téléphonique */}
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Icon name="PhoneCall" className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          <strong>Important :</strong> Notre équipe vous contactera par téléphone dans les prochaines minutes pour confirmer votre commande, la taille souhaitée et les détails de livraison.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-lg border border-muted">
                    <h4 className="font-medium mb-3 text-foreground">Vos coordonnées</h4>
                    <div className="space-y-4 text-sm">
                      <div className="flex items-start">
                        <Icon name="User" className="h-4 w-4 mt-0.5 text-muted-foreground mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">Nom complet</p>
                          <p className="text-muted-foreground">{user?.nom || 'Non renseigné'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Icon name="Phone" className="h-4 w-4 mt-0.5 text-muted-foreground mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">Téléphone</p>
                          <p className="text-muted-foreground">{user?.telephone || 'Non renseigné'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Icon name="MapPin" className="h-4 w-4 mt-0.5 text-muted-foreground mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">Adresse de livraison</p>
                          <p className="text-muted-foreground">
                            {user?.adresse || 'Aucune adresse enregistrée'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Bouton pour modifier les informations */}
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => {
                            setShowConfirmation(false);
                            navigate('/user-account?tab=profile');
                          }}
                        >
                          <Icon name="Edit" className="mr-2 h-3.5 w-3.5" />
                          Modifier mes informations
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog>
              
              
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

        {/* Success Popup - Inside the cart */}
        {showSuccessPopup && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">Commande confirmée !</h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSuccessPopup(false);
                    clearCart(); // Vider le panier quand on ferme avec la croix
                    closeCart();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                  <svg className="w-5 h-5 mt-0.5 mr-3 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <div>
                    <p className="text-sm text-blue-700">
                      <strong>À bientôt !</strong> Notre équipe d'assistance vous contactera sous peu pour confirmer les détails de votre commande, y compris la taille et les informations de livraison.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-green-50 border-l-4 border-green-500 rounded-r">
                  <svg className="w-5 h-5 mt-0.5 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <p className="text-sm text-green-700">
                      Votre commande a bien été enregistrée. Vous recevrez un e-mail de confirmation sous peu.
                    </p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-gray-600">
                    N'hésitez pas à nous contacter si vous avez des questions concernant votre commande.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end mt-6 space-x-3">
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSuccessPopup(false);
                    clearCart(); // Vider le panier uniquement quand on ferme la popup
                    closeCart();
                  }}
                  className="border-street hover:border-accent hover:text-accent"
                >
                  Fermer
                </Button>
                <Button
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSuccessPopup(false);
                    clearCart(); // Vider le panier avant la redirection
                    closeCart();
                    navigate('/mes-commandes');
                  }}
                >
                  Voir mes commandes
                </Button>
              </div>
            </div>
          </div>
        )}
        
        </div>
      )}
      
    </>
  );
};

export default CartSidebar;
