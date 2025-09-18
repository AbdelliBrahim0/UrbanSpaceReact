import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const GangStyleSeparator = ({ variant = 'default', showText = false, text = '', animated = true }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [animated]);

  const separatorVariants = {
    default: {
      pattern: 'lines',
      colors: 'from-accent to-success',
      elements: 7
    },
    diamond: {
      pattern: 'diamonds',
      colors: 'from-success to-accent',
      elements: 5
    },
    dots: {
      pattern: 'dots',
      colors: 'from-accent via-success to-accent',
      elements: 9
    },
    chains: {
      pattern: 'chains',
      colors: 'from-purple-500 to-pink-500',
      elements: 6
    }
  };

  const currentVariant = separatorVariants?.[variant] || separatorVariants?.default;

  const renderPattern = () => {
    switch (currentVariant?.pattern) {
      case 'lines':
        return (
          <div className="flex items-center justify-center space-x-2">
            {[...Array(currentVariant?.elements)]?.map((_, i) => (
              <motion.div
                key={i}
                className={`h-px bg-gradient-to-r ${currentVariant?.colors} transition-all duration-300`}
                initial={animated ? { width: 0, opacity: 0 } : { width: '2rem', opacity: 1 }}
                animate={isVisible ? { 
                  width: i === Math.floor(currentVariant?.elements / 2) ? '4rem' : '2rem', 
                  opacity: 1 
                } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            ))}
          </div>
        );

      case 'diamonds':
        return (
          <div className="flex items-center justify-center space-x-3">
            {[...Array(currentVariant?.elements)]?.map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 bg-gradient-to-br ${currentVariant?.colors} transform rotate-45 transition-all duration-300`}
                initial={animated ? { scale: 0, opacity: 0, rotate: 0 } : { scale: 1, opacity: 1, rotate: 45 }}
                animate={isVisible ? { 
                  scale: i === Math.floor(currentVariant?.elements / 2) ? 1.5 : 1, 
                  opacity: 1, 
                  rotate: 45 
                } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              />
            ))}
          </div>
        );

      case 'dots':
        return (
          <div className="flex items-center justify-center space-x-2">
            {[...Array(currentVariant?.elements)]?.map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentVariant?.colors} transition-all duration-300`}
                initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                animate={isVisible ? { 
                  scale: i === Math.floor(currentVariant?.elements / 2) ? 1.8 : 1, 
                  opacity: 1 
                } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              />
            ))}
          </div>
        );

      case 'chains':
        return (
          <div className="flex items-center justify-center space-x-1">
            {[...Array(currentVariant?.elements)]?.map((_, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={animated ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className={`w-6 h-6 border-2 border-transparent bg-gradient-to-br ${currentVariant?.colors} rounded-full p-0.5`}>
                  <div className="w-full h-full bg-background rounded-full"></div>
                </div>
                {i < currentVariant?.elements - 1 && (
                  <div className={`absolute top-1/2 -right-1 w-2 h-px bg-gradient-to-r ${currentVariant?.colors} transform -translate-y-1/2`}></div>
                )}
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative py-8 flex items-center justify-center">
      {/* Background Glow Effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${currentVariant?.colors} opacity-5 blur-3xl`}
        initial={animated ? { opacity: 0 } : { opacity: 0.05 }}
        animate={isVisible ? { opacity: 0.05 } : {}}
        transition={{ duration: 1.5 }}
      />
      {/* Main Pattern */}
      <div className="relative z-10">
        {showText && text ? (
          <div className="flex items-center space-x-8">
            <div className="flex-1">
              {renderPattern()}
            </div>
            <motion.div
              initial={animated ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="px-6 py-2 bg-card border border-border rounded-full"
            >
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentVariant?.colors} font-heading font-bold text-sm uppercase tracking-wider`}>
                {text}
              </span>
            </motion.div>
            <div className="flex-1">
              {renderPattern()}
            </div>
          </div>
        ) : (
          renderPattern()
        )}
      </div>
      {/* Side Accent Elements */}
      <motion.div
        className="absolute left-0 top-1/2 transform -translate-y-1/2"
        initial={animated ? { opacity: 0, x: -20 } : { opacity: 0.3, x: 0 }}
        animate={isVisible ? { opacity: 0.3, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <Icon name="ChevronRight" size={16} className={`text-transparent bg-clip-text bg-gradient-to-r ${currentVariant?.colors}`} />
      </motion.div>
      <motion.div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 rotate-180"
        initial={animated ? { opacity: 0, x: 20 } : { opacity: 0.3, x: 0 }}
        animate={isVisible ? { opacity: 0.3, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <Icon name="ChevronRight" size={16} className={`text-transparent bg-clip-text bg-gradient-to-r ${currentVariant?.colors}`} />
      </motion.div>
    </div>
  );
};

export default GangStyleSeparator;