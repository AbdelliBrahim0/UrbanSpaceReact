import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const UrgencyBanner = () => {
  return (
    <motion.div
      className="relative overflow-hidden bg-gradient-to-r from-error via-accent to-error p-1 rounded-2xl"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-background rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              className="w-12 h-12 bg-error rounded-full flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Icon name="Clock" size={24} className="text-white" />
            </motion.div>
            <div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                ALERTE BLACK HOUR
              </h3>
              <p className="text-text-secondary font-body">
                Réductions exceptionnelles pendant une heure seulement
              </p>
            </div>
          </div>
          
          <motion.div
            className="text-right"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="text-3xl font-heading font-bold text-accent">
              -70%
            </div>
            <div className="text-sm font-caption text-text-secondary">
              SUR TOUT
            </div>
          </motion.div>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="mt-4 bg-surface rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-error"
            initial={{ width: "0%" }}
            animate={{ width: "75%" }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-xs font-caption text-text-secondary mt-1">
          <span>Début</span>
          <span>75% écoulé</span>
          <span>Fin</span>
        </div>
      </div>
    </motion.div>
  );
};

export default UrgencyBanner;