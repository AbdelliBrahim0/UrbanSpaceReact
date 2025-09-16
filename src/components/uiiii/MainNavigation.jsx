import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const MainNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Home',
      path: '/3d-homepage',
      icon: 'Home'
    },
    {
      label: 'Shop',
      path: '/3d-product-catalog',
      icon: 'ShoppingBag'
    },
    {
      label: 'Wishlist',
      path: '/3d-wishlist',
      icon: 'Heart'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path || 
           (path === '/3d-product-catalog' && location?.pathname === '/3d-product-details');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/3d-homepage" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-sm">U</span>
            </div>
            <span className="text-xl font-bold text-primary tracking-tight">UrbanSpace</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-muted ${
                  isActivePath(item?.path)
                    ? 'text-accent font-medium bg-accent/10' :'text-text-primary hover:text-accent'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Indicator */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg hover:bg-muted transition-colors duration-200 group"
            >
              <Icon name="ShoppingCart" size={20} className="text-text-primary group-hover:text-accent transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            {isAuthenticated ? (
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="User"
                  className="hover:bg-muted"
                >
                  Account
                </Button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="User" size={16} />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="Package" size={16} />
                      <span>Orders</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </Link>
                    <hr className="my-2 border-border" />
                    <button
                      onClick={() => setIsAuthenticated(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors w-full text-left"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/user-authentication">
                <Button variant="outline" size="sm" iconName="LogIn">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            onClick={toggleMobileMenu}
            className="md:hidden"
          />
        </nav>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm" onClick={closeMobileMenu} />
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border shadow-elevation-4 animate-slide-in">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="text-lg font-semibold text-primary">Menu</span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={closeMobileMenu}
                />
              </div>
              
              <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-2 px-6">
                  {navigationItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      onClick={closeMobileMenu}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActivePath(item?.path)
                          ? 'text-accent font-medium bg-accent/10' :'text-text-primary hover:bg-muted hover:text-accent'
                      }`}
                    >
                      <Icon name={item?.icon} size={20} />
                      <span>{item?.label}</span>
                    </Link>
                  ))}
                </div>

                <hr className="my-6 mx-6 border-border" />

                <div className="space-y-2 px-6">
                  <Link
                    to="/cart"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-between px-4 py-3 rounded-lg text-text-primary hover:bg-muted hover:text-accent transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="ShoppingCart" size={20} />
                      <span>Cart</span>
                    </div>
                    {cartCount > 0 && (
                      <span className="bg-accent text-accent-foreground text-xs font-medium rounded-full px-2 py-1">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary hover:bg-muted hover:text-accent transition-all duration-200"
                      >
                        <Icon name="User" size={20} />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/orders"
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary hover:bg-muted hover:text-accent transition-all duration-200"
                      >
                        <Icon name="Package" size={20} />
                        <span>Orders</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary hover:bg-muted hover:text-accent transition-all duration-200"
                      >
                        <Icon name="Settings" size={20} />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={() => {
                          setIsAuthenticated(false);
                          closeMobileMenu();
                        }}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-error hover:bg-error/10 transition-all duration-200 w-full text-left"
                      >
                        <Icon name="LogOut" size={20} />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/user-authentication"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary hover:bg-muted hover:text-accent transition-all duration-200"
                    >
                      <Icon name="LogIn" size={20} />
                      <span>Sign In</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainNavigation;