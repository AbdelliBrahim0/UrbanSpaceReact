import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserAccountMenu = ({ 
  isAuthenticated = false, 
  user = null,
  onSignOut = () => {},
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const defaultUser = {
    name: 'Alex Chen',
    email: 'alex@urbanspace.com',
    avatar: null,
    memberSince: '2024'
  };

  const currentUser = user || defaultUser;

  const menuItems = [
    {
      label: 'Profile',
      icon: 'User',
      path: '/profile',
      description: 'Manage your account'
    },
    {
      label: 'Orders',
      icon: 'Package',
      path: '/orders',
      description: 'Track your purchases'
    },
    {
      label: 'Wishlist',
      icon: 'Heart',
      path: '/3d-wishlist',
      description: 'Saved items'
    },
    {
      label: 'Settings',
      icon: 'Settings',
      path: '/settings',
      description: 'Account preferences'
    }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSignOut = () => {
    onSignOut();
    closeMenu();
    navigate('/user-authentication');
  };

  const handleMenuItemClick = (path) => {
    closeMenu();
    navigate(path);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        closeMenu();
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

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!isAuthenticated) {
    return (
      <Link to="/user-authentication" className={className}>
        <Button variant="outline" size="sm" iconName="LogIn">
          Sign In
        </Button>
      </Link>
    );
  }

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      {/* Account Trigger Button */}
      <button
        onClick={toggleMenu}
        className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 hover:bg-muted ${
          isOpen ? 'bg-muted' : ''
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center overflow-hidden">
          {currentUser?.avatar ? (
            <img 
              src={currentUser?.avatar} 
              alt={currentUser?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon name="User" size={16} className="text-primary-foreground" />
          )}
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-text-primary truncate max-w-24">
            {currentUser?.name}
          </p>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-text-secondary transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-popover border border-border rounded-lg shadow-elevation-3 animate-fade-in z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                {currentUser?.avatar ? (
                  <img 
                    src={currentUser?.avatar} 
                    alt={currentUser?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon name="User" size={18} className="text-primary-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-popover-foreground truncate">
                  {currentUser?.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {currentUser?.email}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  Member since {currentUser?.memberSince}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleMenuItemClick(item?.path)}
                className="flex items-center space-x-3 px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200 w-full text-left group"
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  className="text-muted-foreground group-hover:text-accent transition-colors" 
                />
                <div className="flex-1">
                  <p className="font-medium">{item?.label}</p>
                  <p className="text-xs text-muted-foreground">{item?.description}</p>
                </div>
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" 
                />
              </button>
            ))}
          </div>

          {/* Divider */}
          <hr className="border-border" />

          {/* Sign Out */}
          <div className="py-2">
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-3 px-4 py-3 text-sm text-error hover:bg-error/10 transition-colors duration-200 w-full text-left group"
            >
              <Icon name="LogOut" size={16} className="group-hover:scale-110 transition-transform" />
              <div className="flex-1">
                <p className="font-medium">Sign Out</p>
                <p className="text-xs text-muted-foreground">End your session</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccountMenu;