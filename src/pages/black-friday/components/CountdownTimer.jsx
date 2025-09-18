import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer = ({ onExpire }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const [isExpired, setIsExpired] = useState(false);
  const [startTime] = useState(() => new Date());
  const [endTime] = useState(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 0); // Fin de la journée à 23:59:59
    return end;
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endTime - now;
      
      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({
          hours: hours,
          minutes: minutes,
          seconds: seconds
        });
      } else {
        // Si le temps est écoulé, réinitialiser pour le jour suivant
        endTime.setDate(endTime.getDate() + 1);
        setTimeLeft({
          hours: 23,
          minutes: 59,
          seconds: 59
        });
        if (onExpire) onExpire();
      }
    };

    // Mettre à jour immédiatement
    calculateTimeLeft();
    
    // Puis toutes les secondes
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime, onExpire]);

  const timeUnits = [
    { label: 'Heures', value: timeLeft?.hours },
    { label: 'Minutes', value: timeLeft?.minutes },
    { label: 'Secondes', value: timeLeft?.seconds }
  ];

  if (isExpired) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-8"
      >
        <div className="text-4xl font-heading font-bold text-error mb-2">
          DEALS EXPIRED!
        </div>
        <div className="text-lg text-muted-foreground">
          Check back for our next mega sale event
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {/* Particle Effects Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            animate={{
              x: [0, Math.random() * 400 - 200],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
      <div className="text-center mb-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl md:text-3xl font-heading font-bold text-warning mb-2"
        >
          OFFRE SPÉCIALE SE TERMINE DANS
        </motion.div>
        <div className="text-sm text-muted-foreground">
          Profitez de nos offres exceptionnelles avant la fin du compte à rebours !
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
        {timeUnits?.map((unit, index) => (
          <motion.div
            key={unit?.label}
            initial={{ scale: 0, rotateY: 180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ delay: index * 0.1, type: "spring" }}
            className="relative"
          >
            <div className="bg-surface border border-accent rounded-lg p-4 text-center relative overflow-hidden">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-lg" />
              
              <motion.div
                key={unit?.value}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10"
              >
                <div className="text-2xl md:text-3xl font-heading font-bold text-accent mb-1">
                  {String(unit?.value)?.padStart(2, '0')}
                </div>
                <div className="text-xs font-caption text-muted-foreground uppercase tracking-wider">
                  {unit?.label}
                </div>
              </motion.div>

              {/* Pulse Animation */}
              <motion.div
                className="absolute inset-0 border-2 border-accent rounded-lg"
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      {/* Urgency Message */}
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-center mt-6"
      >
        <div className="inline-flex items-center space-x-2 bg-error/20 border border-error/50 rounded-full px-4 py-2">
          <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
          <span className="text-sm font-medium text-error">
            Limited Time Only - Act Fast!
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default CountdownTimer;