import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import ShoppingCart from '../uiii/ShoppingCart';
import AnimatedLogoText from './AnimatedLogoText';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartItems, isCartOpen, setIsCartOpen, getTotalItems } = useCart();

  const navigationItems = [
    { label: 'Accueil', path: '/homepage', icon: 'Home' },
    { label: 'Collections', path: '/collections', icon: 'Grid3X3' },
    { label: 'Remise', path: '/sale', icon: 'Tag' },
    { label: 'Black Friday', path: '/black-friday', icon: 'Zap' },
    { label: 'Black Hour', path: '/black-hour', icon: 'Clock' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchOpen && !event?.target?.closest('.search-container')) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Search:', searchQuery);
      setIsSearchOpen(false);
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const isActiveRoute = (path) => location?.pathname === path;

  const getPromotionalEmphasis = (path) => {
    if (path === '/black-hour') return 'text-error animate-pulse-glow';
    if (path === '/black-friday') return 'text-warning';
    if (path === '/sale') return 'text-accent';
    return '';
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-street w-screen max-w-[100vw] overflow-x-hidden">
        <nav className="flex items-center justify-between h-16 px-3 sm:px-4 lg:px-6 w-full max-w-[100%] mx-auto">
          {/* Logo */}
          <Link to="/homepage" className="flex items-center space-x-1 sm:space-x-2 group flex-shrink-0">
            <img
              src="/logo.png"
              alt="UrbanSpace Logo"
              className="w-14 h-14 md:w-16 md:h-16 lg:w-24 lg:h-24 object-contain transition-street group-hover:scale-110"
            />
            <AnimatedLogoText />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`relative font-body font-medium transition-street hover:text-accent ${
                  isActiveRoute(item?.path) 
                    ? `text-accent ${getPromotionalEmphasis(item?.path)}` 
                    : `text-foreground hover:scale-105 ${getPromotionalEmphasis(item?.path)}`
                }`}
              >
                {item?.label}
                {isActiveRoute(item?.path) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <div className="search-container relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <Input
                    type="search"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-64 bg-surface border-street focus:border-accent"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:bg-surface hover:text-accent transition-street"
                >
                  <Icon name="Search" size={20} />
                </Button>
              )}
            </div>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-surface hover:text-accent transition-street"
              onClick={toggleCart}
            >
              <Icon name="ShoppingBag" size={20} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse-glow">
                  {getTotalItems()}
                </span>
              )}
            </Button>

            {/* Account */}
            <button
              onClick={() => {
                if (user) {
                  navigate('/user-account');
                } else {
                  navigate('/user-authentication');
                }
              }}
              className="relative p-2 text-foreground hover:text-accent transition-street group"
            >
              <Icon name="User" size={20} className="group-hover:scale-110 transition-transform" />
              {user && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                  {(user.nom || user.email || 'U').charAt(0).toUpperCase()}
                </span>
              )}
            </button>
            
            {/* Logout Button (only shown when user is logged in) */}
            {user && (
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-2 text-foreground hover:text-error transition-street"
                title="Déconnexion"
              >
                <Icon name="LogOut" size={20} />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-surface hover:text-accent transition-street"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </Button>
        </nav>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-street">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit}>
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full bg-surface border-street focus:border-accent"
                />
              </form>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 p-2 rounded-lg ${
                      isActiveRoute(item.path)
                        ? 'bg-surface text-accent'
                        : 'text-foreground hover:bg-surface/50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name={item.icon} size={18} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-street">
                <button
                  onClick={() => {
                    toggleCart();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full p-2 rounded-lg text-foreground hover:bg-surface/50"
                >
                  <div className="relative">
                    <Icon name="ShoppingBag" size={20} />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </div>
                  <span>Panier</span>
                </button>

                <button
                  onClick={() => {
                    if (user) {
                      navigate('/user-account');
                    } else {
                      navigate('/user-authentication');
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full p-2 rounded-lg text-foreground hover:bg-surface/50"
                >
                  <Icon name="User" size={20} />
                  <span>{user ? 'Mon compte' : 'Connexion'}</span>
                </button>

                {user && (
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full p-2 rounded-lg text-foreground hover:bg-surface/50 text-left"
                  >
                    <Icon name="LogOut" size={20} />
                    <span>Déconnexion</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
      
      {/* Shopping Cart */}
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;