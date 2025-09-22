import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 47,
    seconds: 23
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'HEURES', value: timeLeft?.hours },
    { label: 'MINUTES', value: timeLeft?.minutes },
    { label: 'SECONDES', value: timeLeft?.seconds }
  ];

  return (
    <div className="relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-error/20 to-accent/20 blur-3xl animate-pulse"></div>
      <motion.div 
        className="relative bg-surface/90 backdrop-blur-lg border border-accent/30 rounded-2xl p-8 shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="flex items-center justify-center space-x-2 mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon name="Zap" size={32} className="text-accent" />
            <h2 className="text-3xl font-heading font-bold text-accent">BLACK HOUR</h2>
            <Icon name="Zap" size={32} className="text-accent" />
          </motion.div>
          <p className="text-text-secondary font-caption text-lg">
            Offres limitées - Dépêchez-vous !
          </p>
        </div>

        {/* Countdown Display */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {timeUnits?.map((unit, index) => (
            <motion.div
              key={unit?.label}
              className="relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              {/* 3D Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-error/30 rounded-xl transform rotate-3 scale-105"></div>
              
              <div className="relative bg-background border-2 border-accent/50 rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <motion.div
                  className="text-4xl md:text-5xl font-heading font-bold text-accent mb-2"
                  key={unit?.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {unit?.value?.toString()?.padStart(2, '0')}
                </motion.div>
                <div className="text-sm font-caption text-text-secondary uppercase tracking-wider">
                  {unit?.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Urgency Message */}
        <motion.div
          className="text-center"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center justify-center space-x-2 text-error">
            <Icon name="AlertTriangle" size={20} />
            <span className="font-body font-semibold">
              Temps limité - Ne ratez pas cette chance !
            </span>
            <Icon name="AlertTriangle" size={20} />
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent rounded-full animate-ping opacity-75"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-error rounded-full animate-ping opacity-75" style={{ animationDelay: '1s' }}></div>
      </motion.div>
    </div>
  );
};

export default CountdownTimer;