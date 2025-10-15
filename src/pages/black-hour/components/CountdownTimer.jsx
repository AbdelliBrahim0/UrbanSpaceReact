import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 59,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev?.seconds > 0) {
          return { ...prev, seconds: prev?.seconds - 1 };
        } else if (prev?.minutes > 0) {
          return { ...prev, minutes: prev?.minutes - 1, seconds: 59 };
        } else if (prev?.hours > 0) {
          return { hours: prev?.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isUrgent = timeLeft?.hours === 0 && timeLeft?.minutes < 30;
  const isCritical = timeLeft?.hours === 0 && timeLeft?.minutes < 10;

  return (
    <div className="relative">
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)]?.map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${isCritical ? 'bg-error' : isUrgent ? 'bg-warning' : 'bg-accent'}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * 400,
              y: Math.random() * 200,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      {/* Main Timer */}
      <motion.div 
        className="text-center relative z-10"
        animate={isCritical ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <motion.h1 
          className={`font-heading text-4xl md:text-6xl lg:text-8xl font-black mb-4 ${
            isCritical ? 'text-error animate-pulse' : isUrgent ?'text-warning' : 'text-accent'
          } text-shadow-glow`}
          animate={isCritical ? { textShadow: ['0 0 10px rgba(255, 0, 64, 0.5)', '0 0 30px rgba(255, 0, 64, 0.8)', '0 0 10px rgba(255, 0, 64, 0.5)'] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          BLACK HOUR
        </motion.h1>
        
        <div className="flex justify-center items-center space-x-4 md:space-x-8">
          {/* Hours */}
          <motion.div 
            className="text-center"
            animate={isCritical ? { y: [-2, 2, -2] } : {}}
            transition={{ duration: 0.3, repeat: Infinity }}
          >
            <motion.div 
              className={`text-5xl md:text-7xl lg:text-9xl font-black font-mono ${
                isCritical ? 'text-error' : isUrgent ? 'text-warning' : 'text-foreground'
              }`}
              key={timeLeft?.hours}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {timeLeft?.hours?.toString()?.padStart(2, '0')}
            </motion.div>
            <div className="text-sm md:text-base text-muted-foreground font-caption uppercase tracking-wider">
              Hours
            </div>
          </motion.div>

          <div className={`text-4xl md:text-6xl lg:text-8xl font-black ${
            isCritical ? 'text-error animate-pulse' : 'text-accent'
          }`}>:</div>

          {/* Minutes */}
          <motion.div 
            className="text-center"
            animate={isUrgent ? { y: [-1, 1, -1] } : {}}
            transition={{ duration: 0.4, repeat: Infinity }}
          >
            <motion.div 
              className={`text-5xl md:text-7xl lg:text-9xl font-black font-mono ${
                isCritical ? 'text-error' : isUrgent ? 'text-warning' : 'text-foreground'
              }`}
              key={timeLeft?.minutes}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {timeLeft?.minutes?.toString()?.padStart(2, '0')}
            </motion.div>
            <div className="text-sm md:text-base text-muted-foreground font-caption uppercase tracking-wider">
              Minutes
            </div>
          </motion.div>

          <div className={`text-4xl md:text-6xl lg:text-8xl font-black ${
            isCritical ? 'text-error animate-pulse' : 'text-accent'
          }`}>:</div>

          {/* Seconds */}
          <motion.div 
            className="text-center"
            animate={{ y: [-1, 1, -1] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          >
            <motion.div 
              className={`text-5xl md:text-7xl lg:text-9xl font-black font-mono ${
                isCritical ? 'text-error' : isUrgent ? 'text-warning' : 'text-foreground'
              }`}
              key={timeLeft?.seconds}
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {timeLeft?.seconds?.toString()?.padStart(2, '0')}
            </motion.div>
            <div className="text-sm md:text-base text-muted-foreground font-caption uppercase tracking-wider">
              Seconds
            </div>
          </motion.div>
        </div>

        <motion.p 
          className={`mt-6 text-lg md:text-xl font-body ${
            isCritical ? 'text-error' : isUrgent ? 'text-warning' : 'text-muted-foreground'
          }`}
          animate={isCritical ? { opacity: [0.7, 1, 0.7] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {isCritical ? 'FINAL MINUTES - ACT NOW!' : isUrgent ?'Limited time remaining!': 'Offres ultra-exclusives se terminant bientôt'}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default CountdownTimer;