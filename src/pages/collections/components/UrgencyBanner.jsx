import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const UrgencyBanner = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const urgencyMessages = [
    {
      icon: 'Clock',
      text: 'BLACK HOUR ENDING SOON - Don\'t miss out!',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      icon: 'Zap',
      text: 'FLASH SALE - Up to 80% off exclusive items',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      icon: 'TrendingUp',
      text: 'SELLING FAST - Join 1,247 shoppers online now',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: 'AlertTriangle',
      text: 'LIMITED STOCK - Most items have less than 5 left',
      color: 'text-error',
      bgColor: 'bg-error/10'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % urgencyMessages?.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [urgencyMessages?.length]);

  if (!isVisible) return null;

  const currentMsg = urgencyMessages?.[currentMessage];

  return (
    <motion.div
      className={`relative ${currentMsg?.bgColor} border-l-4 border-l-accent overflow-hidden`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(10)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-full bg-accent"
            style={{ left: `${i * 10}%` }}
            animate={{
              x: [-20, 100],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "linear"
            }}
          />
        ))}
      </div>
      <div className="relative z-10 flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <motion.div
            className={currentMsg?.color}
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon name={currentMsg?.icon} size={24} />
          </motion.div>

          <motion.div
            key={currentMessage}
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className={`font-heading font-bold text-lg ${currentMsg?.color}`}>
              {currentMsg?.text}
            </p>
          </motion.div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Message Indicators */}
          <div className="hidden md:flex space-x-1">
            {urgencyMessages?.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentMessage ? 'bg-accent' : 'bg-muted'
                }`}
                animate={index === currentMessage ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:text-foreground transition-street p-1"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
      </div>
      {/* Pulsing Border Effect */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-accent"
        animate={{ 
          width: ['0%', '100%', '0%']
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default UrgencyBanner;