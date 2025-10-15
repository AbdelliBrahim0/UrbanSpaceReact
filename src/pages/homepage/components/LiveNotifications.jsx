import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import { useDialog } from '../../../contexts/DialogContext';

const LiveNotifications = () => {
  const { isDialogOpen } = useDialog();
  const [notifications, setNotifications] = useState([]);
  const [currentNotification, setCurrentNotification] = useState(0);

  const purchaseNotifications = [
    {
      id: 1,
      user: "Mohammed Ali",
      location: "Le Bardo",
      product: "LV Sneekers",
      time: "56 minutes ago",
      type: "purchase"
    },
    {
      id: 2,
      user: "Sarah Kamel.",
      location: "El Menzah",
      product: "Jordan Retro Sneakers",
      time: "3 minutes ago",
      type: "purchase"
    },
    {
      id: 3,
      user: "Sami Bargou",
      location: "el manar",
      product: "Street Bomber Jacket",
      time: "5 minutes ago",
      type: "purchase"
    },
    {
      id: 4,
      user: "Emma Lahmar.",
      location: "denden",
      product: "Urban Chain Necklace",
      time: "7 minutes ago",
      type: "purchase"
    },
    {
      id: 5,
      user: "kamel ben youssef",
      location: "ariana",
      product: "High-Top Boots",
      time: "8 minutes ago",
      type: "purchase"
    },
    {
      id: 6,
      user: "lamia sassi",
      location: "manouba",
      product: "Crossbody Bag",
      time: "10 minutes ago",
      type: "purchase"
    }
  ];

  const urgencyNotifications = [
    {
      id: 7,
      message: "🔥 Flash Sale: 80% OFF ends in 15 minutes!",
      type: "flash",
      priority: "high"
    },
    {
      id: 8,
      message: "⚡ Only 5 Supreme Hoodies left in stock!",
      type: "stock",
      priority: "medium"
    },
    {
      id: 9,
      message: "🎯 Free shipping on orders over 100 TND today only!",
      type: "promo",
      priority: "low"
    }
  ];

  const allNotifications = [...purchaseNotifications, ...urgencyNotifications];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification(prev => (prev + 1) % allNotifications?.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [allNotifications?.length]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'purchase':
        return 'ShoppingBag';
      case 'flash':
        return 'Zap';
      case 'stock':
        return 'AlertTriangle';
      case 'promo':
        return 'Gift';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (type === 'flash' || priority === 'high') return 'border-error bg-error/10 text-error';
    if (type === 'stock' || priority === 'medium') return 'border-warning bg-warning/10 text-warning';
    if (type === 'promo' || priority === 'low') return 'border-accent bg-accent/10 text-accent';
    return 'border-accent bg-accent/10 text-accent';
  };

  if (isDialogOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-8 left-4 md:bottom-6 md:left-6 z-50 max-w-xs md:max-w-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNotification}
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`
            ${getNotificationColor(
              allNotifications?.[currentNotification]?.type,
              allNotifications?.[currentNotification]?.priority
            )}
            border rounded-lg p-3 md:p-4 backdrop-blur-sm shadow-lg
          `}
        >
          <div className="flex items-start space-x-2 md:space-x-3">
            <div className="flex-shrink-0">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-current/20 flex items-center justify-center"
              >
                <Icon 
                  name={getNotificationIcon(allNotifications?.[currentNotification]?.type)} 
                  size={14} 
                  className="text-current"
                />
              </motion.div>
            </div>
            
            <div className="flex-1 min-w-0">
              {allNotifications?.[currentNotification]?.type === 'purchase' ? (
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold text-xs md:text-sm">
                      {allNotifications?.[currentNotification]?.user}
                    </span>
                    <span className="text-[10px] md:text-xs opacity-75">
                      from {allNotifications?.[currentNotification]?.location}
                    </span>
                  </div>
                  <div className="text-xs md:text-sm opacity-90">
                    Just purchased{' '}
                    <span className="font-semibold">
                      {allNotifications?.[currentNotification]?.product}
                    </span>
                  </div>
                  <div className="text-[10px] md:text-xs opacity-60 mt-1">
                    {allNotifications?.[currentNotification]?.time}
                  </div>
                </div>
              ) : (
                <div className="text-xs md:text-sm font-medium">
                  {allNotifications?.[currentNotification]?.message}
                </div>
              )}
            </div>

            <button
              onClick={() => setCurrentNotification(prev => (prev + 1) % allNotifications?.length)}
              className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
            >
              <Icon name="X" size={12} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-2 md:mt-3 h-1 bg-current/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-current rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "linear" }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Notification Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-2 text-center"
      >
        <div className="inline-flex items-center space-x-1 bg-surface/80 backdrop-blur-sm border border-street rounded-full px-2 py-1 md:px-3 md:py-1">
          <Icon name="Users" size={10} className="text-accent" />
          <span className="text-[10px] md:text-xs text-muted-foreground">
            {allNotifications?.length} live updates
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default LiveNotifications;