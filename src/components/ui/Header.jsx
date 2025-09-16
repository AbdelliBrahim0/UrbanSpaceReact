import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(3);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigationItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Collections', path: '/collections', icon: 'Grid3X3' },
    { label: 'Sale', path: '/sale', icon: 'Tag' },
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

  const isActiveRoute = (path) => location?.pathname === path;

  const getPromotionalEmphasis = (path) => {
    if (path === '/black-hour') return 'text-error animate-pulse-glow';
    if (path === '/black-friday') return 'text-warning';
    if (path === '/sale') return 'text-accent';
    return '';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-street">
      <nav className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/homepage" className="flex items-center space-x-2 group">
          <img
            src="/logo.png"
            alt="UrbanSpace Logo"
            className="w-28 h-28 object-contain transition-street group-hover:scale-110"
          />
          <span className="font-heading font-bold text-xl text-foreground group-hover:text-accent transition-street">
            UrbanSpace
          </span>
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
                  placeholder="Search streetwear..."
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
            onClick={() => console.log('Cart clicked')}
          >
            <Icon name="ShoppingBag" size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse-glow">
                {cartCount}
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
                {user.name.charAt(0).toUpperCase()}
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
                placeholder="Search streetwear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full bg-surface border-street focus:border-accent"
              />
            </form>

            {/* Mobile Navigation */}
            <div className="space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-street ${
                    isActiveRoute(item?.path)
                      ? `bg-surface text-accent ${getPromotionalEmphasis(item?.path)}`
                      : `text-foreground hover:bg-surface hover:text-accent ${getPromotionalEmphasis(item?.path)}`
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-body font-medium">{item?.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-street">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 hover:bg-surface hover:text-accent transition-street"
                onClick={() => console.log('Cart clicked')}
              >
                <Icon name="ShoppingBag" size={20} />
                <span>Cart ({cartCount})</span>
              </Button>

              <Link
                to="/user-account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 hover:bg-surface hover:text-accent transition-street px-4 py-2 rounded-lg"
              >
                <Icon name="User" size={20} />
                <span>Account</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;