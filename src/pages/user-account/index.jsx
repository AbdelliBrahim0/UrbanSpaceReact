import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/uii/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/uii/Button';

// Import all components
import ProfileSection from './components/ProfileSection';
import OrderHistory from './components/OrderHistory';
import WishlistSection from './components/WishlistSection';
import AddressBook from './components/AddressBook';
import PaymentMethods from './components/PaymentMethods';
import AccountSettings from './components/AccountSettings';
import ActivityFeed from './components/ActivityFeed';

const UserAccount = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Mettre à jour l'onglet actif en fonction du paramètre d'URL
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && tabs.some(tab => tab.id === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User', component: ProfileSection }
    
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ProfileSection;

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage' },
    { label: 'Account', path: '/user-account', isActive: true }
  ];

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');  // Remove token from localStorage
    navigate('/user-authentication');  // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <Breadcrumb customItems={breadcrumbItems} />
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                My Account
              </h1>
              <p className="text-muted-foreground font-mono">
                Manage your profile, orders, and preferences
              </p>
            </div>
            
            
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-xl border border-border p-6 sticky top-28">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Account Menu
              </h2>
              
              {/* Desktop Navigation */}
              <nav className={`space-y-2 ${isMobile ? 'hidden' : 'block'}`}>
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-150 animate-scale-hover ${
                      activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-surface hover:text-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span className="font-medium">{tab?.label}</span>
                  </button>
                ))}
              </nav>

              {/* Logout Button */}
              <div className="mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full mt-4"
                  onClick={handleLogout}
                >
                  
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
      {/* Footer Spacer */}
      <div className="h-20" />
    </div>
  );
};

export default UserAccount;
