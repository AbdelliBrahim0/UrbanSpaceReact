import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = () => {
  const [progress, setProgress] = useState(75);
  const [activeUsers, setActiveUsers] = useState(1247);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 10) - 5);
      setProgress(prev => Math.min(prev + 0.1, 85));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const milestones = [
    { percentage: 0, label: "Début", icon: "Play", reached: true },
    { percentage: 25, label: "25%", icon: "Zap", reached: true },
    { percentage: 50, label: "Mi-temps", icon: "Clock", reached: true },
    { percentage: 75, label: "75%", icon: "AlertTriangle", reached: true },
    { percentage: 100, label: "Fin", icon: "StopCircle", reached: false }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
          PROGRESSION DE L'ÉVÉNEMENT
        </h3>
        <p className="text-text-secondary font-body">
          Suivez l'avancement de la Black Hour en temps réel
        </p>
      </motion.div>
      {/* Main Progress Bar */}
      <motion.div
        className="relative bg-surface/80 backdrop-blur-sm border border-border rounded-2xl p-6"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Progress Stats */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-accent">
              {progress?.toFixed(1)}%
            </div>
            <div className="text-sm font-caption text-text-secondary">
              Temps écoulé
            </div>
          </div>
          
          <div className="text-center">
            <motion.div
              className="text-2xl font-heading font-bold text-success"
              key={activeUsers}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {activeUsers?.toLocaleString()}
            </motion.div>
            <div className="text-sm font-caption text-text-secondary">
              Utilisateurs actifs
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-warning">
              {(100 - progress)?.toFixed(1)}%
            </div>
            <div className="text-sm font-caption text-text-secondary">
              Temps restant
            </div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="relative">
          <div className="w-full h-4 bg-surface rounded-full overflow-hidden border border-border">
            <motion.div
              className="h-full bg-gradient-to-r from-accent via-warning to-error relative"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Animated Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </motion.div>
          </div>

          {/* Milestone Markers */}
          <div className="absolute -top-8 left-0 right-0">
            <div className="relative flex justify-between">
              {milestones?.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  style={{ left: `${milestone?.percentage}%` }}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    milestone?.reached 
                      ? 'bg-accent text-white' :'bg-surface border-2 border-border text-text-secondary'
                  }`}>
                    <Icon name={milestone?.icon} size={16} />
                  </div>
                  <span className={`text-xs font-caption ${
                    milestone?.reached ? 'text-accent' : 'text-text-secondary'
                  }`}>
                    {milestone?.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Message */}
        <motion.div
          className="mt-8 text-center"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full animate-pulse"></div>
            <span className="font-body font-semibold text-error">
              ÉVÉNEMENT EN COURS - Plus que {(100 - progress)?.toFixed(1)}% avant la fin !
            </span>
            <div className="w-3 h-3 bg-error rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </motion.div>
      {/* Activity Feed */}
      <motion.div
        className="bg-surface/50 backdrop-blur-sm border border-border rounded-xl p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Activity" size={18} className="text-success" />
          <span className="font-heading font-bold text-foreground text-sm">
            ACTIVITÉ EN TEMPS RÉEL
          </span>
        </div>
        
        <div className="space-y-2 text-xs font-body text-text-secondary">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Marie L. vient de commander un hoodie Gang Premium</span>
          </motion.div>
          <motion.div
            className="flex items-center space-x-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <span>Stock limité : Plus que 23 hoodies disponibles</span>
          </motion.div>
          <motion.div
            className="flex items-center space-x-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span>Nouveau membre : Alex R. rejoint UrbanSpace</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressIndicator;