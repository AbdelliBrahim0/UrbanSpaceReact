import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WelcomeHero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const welcomeTexts = [
    "Bienvenue dans la famille UrbanSpace",
    "Votre style urbain commence ici",
    "Rejoignez l\'élite du streetwear"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % welcomeTexts?.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-surface to-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/20 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      

      {/* Main Welcome Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-accent via-success to-accent mb-6">
            WELCOME
          </h1>
          <div className="h-20 flex items-center justify-center">
            <motion.p
              key={currentText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-3xl font-body text-foreground font-medium"
            >
              {welcomeTexts?.[currentText]}
            </motion.p>
          </div>
        </motion.div>

        {/* Gang-style decorative elements */}
        <div className="flex justify-center items-center space-x-8 mb-12">
          {[...Array(5)]?.map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-16 bg-gradient-to-b from-accent to-transparent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 1 + i * 0.1 }}
            />
          ))}
        </div>

        {/* Floating Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="relative"
        >
          <button className="group relative px-12 py-4 bg-gradient-to-r from-accent to-success rounded-full text-white font-heading font-bold text-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
            <span className="relative z-10 flex items-center space-x-3">
              <span>Commencer l'aventure</span>
              <Icon name="ArrowRight" size={20} />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-success to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <div className="absolute -inset-2 bg-gradient-to-r from-accent to-success rounded-full blur-lg opacity-30 animate-pulse"></div>
        </motion.div>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-text-secondary font-caption text-sm">Découvrez plus</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon name="ChevronDown" size={24} className="text-accent" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeHero;