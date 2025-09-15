import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ cartCount = 0, onCartClick, onSearchClick }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/home-landing', icon: 'Home' },
    { label: 'Collections', path: '/collections-catalog', icon: 'Grid3X3' },
    { label: 'Sale', path: '/sale-items', icon: 'Tag' },
    { label: 'Events', path: '/black-friday-event', icon: 'Calendar' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (onSearchClick) onSearchClick(!isSearchOpen);
  };

  const handleCartClick = () => {
    if (onCartClick) onCartClick();
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 gang-transition ${
          isScrolled ? 'bg-background/95 backdrop-blur-md gang-shadow' : 'bg-background'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link to="/home-landing" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center gang-hover-scale">
                <span className="text-accent-foreground font-heading font-bold text-lg">SG</span>
              </div>
              <div className="absolute -inset-1 bg-accent/20 rounded-sm opacity-0 group-hover:opacity-100 gang-transition -z-10"></div>
            </div>
            <span className="font-heading font-bold text-xl text-foreground hidden sm:block">
              StreetGang Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md gang-transition gang-hover-scale ${
                  isActiveRoute(item?.path)
                    ? 'text-accent bg-accent/10 gang-border-active' :'text-foreground hover:text-accent hover:bg-accent/5'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span className="font-body font-medium">{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSearchToggle}
              className={`gang-hover-scale ${isSearchOpen ? 'text-accent' : 'text-foreground'}`}
            >
              <Icon name={isSearchOpen ? 'X' : 'Search'} size={20} />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCartClick}
              className="relative gang-hover-scale text-foreground hover:text-accent"
            >
              <Icon name="ShoppingBag" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-data font-medium rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMobileMenuToggle}
              className="lg:hidden gang-hover-scale text-foreground hover:text-accent"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </Button>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-card gang-shadow-modal animate-slide-in-left">
            <div className="p-6">
              <div className="relative max-w-2xl mx-auto">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <input
                  type="text"
                  placeholder="Search streetwear, brands, collections..."
                  className="w-full pl-12 pr-4 py-3 bg-input border gang-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent gang-transition"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={handleMobileMenuToggle}></div>
          <div className="fixed top-16 left-0 right-0 bg-card gang-shadow-modal animate-slide-in-left">
            <nav className="p-6 space-y-4">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={handleMobileMenuToggle}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg gang-transition gang-hover-scale ${
                    isActiveRoute(item?.path)
                      ? 'text-accent bg-accent/10 gang-border-active' :'text-foreground hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-body font-medium text-lg">{item?.label}</span>
                </Link>
              ))}
              
              {/* Mobile-only promotional links */}
              <div className="pt-4 border-t gang-border">
                <Link
                  to="/black-hour-flash-sale"
                  onClick={handleMobileMenuToggle}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-warning hover:bg-warning/10 gang-transition gang-hover-scale"
                >
                  <Icon name="Zap" size={20} />
                  <span className="font-body font-medium text-lg">Flash Sale</span>
                  <span className="ml-auto bg-warning text-warning-foreground px-2 py-1 rounded text-xs font-data font-medium">
                    LIVE
                  </span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;