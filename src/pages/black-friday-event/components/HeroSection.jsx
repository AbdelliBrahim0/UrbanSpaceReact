import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = ({ countdown, onExploreClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-success/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-warning/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(229, 9, 20, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(229, 9, 20, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Main Title with 3D Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-success leading-tight">
            BLACK
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-success via-accent to-white leading-tight -mt-4">
            FRIDAY
          </h1>
        </motion.div>

        {/* Subtitle with Gang Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl font-caption text-text-secondary uppercase tracking-widest">
            L'ÉVÉNEMENT URBAIN DE L'ANNÉE
          </p>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent w-20"></div>
            <Icon name="Zap" size={24} className="text-accent animate-pulse" />
            <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent w-20"></div>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <div className="bg-surface/50 backdrop-blur-lg border border-accent/30 rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-text-secondary font-caption uppercase tracking-wider mb-4">
              Temps Restant
            </p>
            <div className="text-4xl md:text-5xl font-mono font-bold text-accent">
              {countdown}
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-success rounded-full animate-ping delay-200"></div>
              <div className="w-2 h-2 bg-warning rounded-full animate-ping delay-400"></div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button
            variant="default"
            size="lg"
            iconName="ShoppingBag"
            iconPosition="left"
            onClick={onExploreClick}
            className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-bold uppercase tracking-wider transform hover:scale-105 transition-all duration-300"
          >
            Explorer les Offres
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            iconName="Users"
            iconPosition="left"
            className="border-success text-success hover:bg-success hover:text-black px-8 py-4 text-lg font-bold uppercase tracking-wider transform hover:scale-105 transition-all duration-300"
          >
            Devenir Membre
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-2 text-text-secondary">
            <span className="text-sm font-caption uppercase tracking-wider">Découvrir</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon name="ChevronDown" size={24} className="text-accent" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;