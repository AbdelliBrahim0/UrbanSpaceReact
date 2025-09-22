import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const CountdownTimer = ({ targetDate, title = "Black Friday se termine dans" }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate)?.getTime() - new Date()?.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Jours', value: timeLeft?.days, icon: 'Calendar' },
    { label: 'Heures', value: timeLeft?.hours, icon: 'Clock' },
    { label: 'Minutes', value: timeLeft?.minutes, icon: 'Timer' },
    { label: 'Secondes', value: timeLeft?.seconds, icon: 'Zap' }
  ];

  return (
    <div className="bg-surface/80 backdrop-blur-lg border border-accent/30 rounded-3xl p-8 max-w-4xl mx-auto">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
          {title}
        </h2>
        <div className="flex items-center justify-center space-x-2">
          <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent w-20"></div>
          <Icon name="Clock" size={20} className="text-accent animate-pulse" />
          <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent w-20"></div>
        </div>
      </motion.div>
      {/* Timer Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {timeUnits?.map((unit, index) => (
          <motion.div
            key={unit?.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center"
          >
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-accent/50 transition-all duration-300 group">
              {/* Icon */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                className="flex justify-center mb-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name={unit?.icon} size={24} className="text-white" />
                </div>
              </motion.div>

              {/* Value */}
              <motion.div
                key={unit?.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-4xl md:text-5xl font-mono font-bold text-accent mb-2"
              >
                {unit?.value?.toString()?.padStart(2, '0')}
              </motion.div>

              {/* Label */}
              <p className="text-text-secondary font-caption uppercase tracking-wider text-sm">
                {unit?.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Urgency Message */}
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-center mt-8"
      >
        <p className="text-warning font-body font-medium text-lg">
          ⚡ Offres limitées - Ne ratez pas cette opportunité unique !
        </p>
      </motion.div>
    </div>
  );
};

export default CountdownTimer;