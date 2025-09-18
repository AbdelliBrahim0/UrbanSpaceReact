import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const GangStyleStrip = ({ text, iconName = "Star", direction = "left" }) => {
  return (
    <div className="relative py-16 overflow-hidden bg-gradient-to-r from-black via-surface to-black">
      {/* Animated Background Lines */}
      <div className="absolute inset-0">
        {[...Array(5)]?.map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: direction === "left" ? -1000 : 1000 }}
            animate={{ x: direction === "left" ? 1000 : -1000 }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }}
            className={`absolute h-px bg-gradient-to-r from-transparent via-accent to-transparent`}
            style={{ top: `${20 + i * 15}%` }}
          />
        ))}
      </div>
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center space-x-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Icon name={iconName} size={32} className="text-accent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-success uppercase tracking-widest"
        >
          {text}
        </motion.h2>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Icon name={iconName} size={32} className="text-success" />
        </motion.div>
      </div>
      {/* Side Decorations */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
        <div className="w-4 h-32 bg-gradient-to-b from-accent to-success"></div>
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        <div className="w-4 h-32 bg-gradient-to-b from-success to-accent"></div>
      </div>
    </div>
  );
};

export default GangStyleStrip;