import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SaleHero = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  const banners = [
    {
      id: 1,
      title: "MEGA SALE",
      subtitle: "UP TO 70% OFF",
      description: "Limited time streetwear blowout",
      gradient: "from-error via-warning to-accent",
      particles: true
    },
    {
      id: 2,
      title: "FLASH DEALS",
      subtitle: "50% OFF EVERYTHING",
      description: "Exclusive 24-hour sale event",
      gradient: "from-accent via-success to-warning",
      particles: true
    },
    {
      id: 3,
      title: "CLEARANCE",
      subtitle: "FINAL MARKDOWNS",
      description: "Last chance to grab these pieces",
      gradient: "from-warning via-error to-accent",
      particles: true
    }
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners?.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners?.length]);

  const currentBannerData = banners?.[currentBanner];

  return (
    <div className="relative h-[60vh] lg:h-[70vh] overflow-hidden bg-gradient-to-br from-background via-surface to-muted">
      {/* Animated Background */}
      <motion.div
        key={currentBanner}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className={`absolute inset-0 bg-gradient-to-br ${currentBannerData?.gradient} opacity-10`}
      />
      {/* Particles Effect */}
      {currentBannerData?.particles && (
        <div className="absolute inset-0">
          {[...Array(20)]?.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full opacity-30"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3]
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
      )}
      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <motion.div
            key={`title-${currentBanner}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <h1 className="text-6xl lg:text-8xl font-heading font-black text-foreground mb-2 text-shadow-glow">
              {currentBannerData?.title}
            </h1>
            <div className="text-4xl lg:text-6xl font-heading font-bold text-accent animate-pulse-glow">
              {currentBannerData?.subtitle}
            </div>
          </motion.div>

          <motion.p
            key={`desc-${currentBanner}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl text-muted-foreground mb-8 font-body"
          >
            {currentBannerData?.description}
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center space-x-4 mb-8"
          >
            <div className="bg-surface border border-accent rounded-lg p-4 min-w-[80px]">
              <div className="text-2xl lg:text-3xl font-heading font-bold text-accent">
                {timeLeft?.hours?.toString()?.padStart(2, '0')}
              </div>
              <div className="text-xs text-muted-foreground font-caption">HOURS</div>
            </div>
            <div className="text-accent text-2xl">:</div>
            <div className="bg-surface border border-accent rounded-lg p-4 min-w-[80px]">
              <div className="text-2xl lg:text-3xl font-heading font-bold text-accent">
                {timeLeft?.minutes?.toString()?.padStart(2, '0')}
              </div>
              <div className="text-xs text-muted-foreground font-caption">MINUTES</div>
            </div>
            <div className="text-accent text-2xl">:</div>
            <div className="bg-surface border border-accent rounded-lg p-4 min-w-[80px]">
              <div className="text-2xl lg:text-3xl font-heading font-bold text-accent">
                {timeLeft?.seconds?.toString()?.padStart(2, '0')}
              </div>
              <div className="text-xs text-muted-foreground font-caption">SECONDS</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <button className="bg-accent text-accent-foreground px-8 py-4 rounded-lg font-heading font-bold text-lg hover:scale-105 transition-street box-shadow-street">
              SHOP NOW
            </button>
            <button className="border border-accent text-accent px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-accent hover:text-accent-foreground transition-street">
              VIEW ALL DEALS
            </button>
          </motion.div>
        </div>
      </div>
      {/* Banner Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-3 h-3 rounded-full transition-street ${
              index === currentBanner ? 'bg-accent' : 'bg-muted-foreground opacity-50'
            }`}
          />
        ))}
      </div>
      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 right-6 text-accent"
      >
        <Icon name="ChevronDown" size={24} />
      </motion.div>
    </div>
  );
};

export default SaleHero;