import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const VisualEffects = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles?.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 2
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const floatingElements = [
    { icon: 'Zap', color: 'accent', size: 24, x: 10, y: 20 },
    { icon: 'Star', color: 'warning', size: 20, x: 85, y: 15 },
    { icon: 'Crown', color: 'error', size: 28, x: 15, y: 80 },
    { icon: 'Gem', color: 'success', size: 22, x: 90, y: 75 },
    { icon: 'Sparkles', color: 'accent', size: 18, x: 50, y: 10 },
    { icon: 'Award', color: 'warning', size: 26, x: 75, y: 85 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, #E50914 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, #FF4757 0%, transparent 50%)',
            'radial-gradient(circle at 50% 20%, #E50914 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, #FF4757 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {/* Floating Particles */}
      {particles?.map((particle) => (
        <motion.div
          key={particle?.id}
          className="absolute bg-accent/20 rounded-full"
          style={{
            left: `${particle?.x}%`,
            top: `${particle?.y}%`,
            width: `${particle?.size}px`,
            height: `${particle?.size}px`
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: particle?.duration,
            delay: particle?.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      {/* Floating Icons */}
      {floatingElements?.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${element?.x}%`,
            top: `${element?.y}%`
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 6 + index,
            delay: index * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className={`w-12 h-12 bg-${element?.color}/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-${element?.color}/20`}>
            <Icon 
              name={element?.icon} 
              size={element?.size} 
              className={`text-${element?.color}/60`} 
            />
          </div>
        </motion.div>
      ))}
      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E50914" stopOpacity="0" />
            <stop offset="50%" stopColor="#E50914" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E50914" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M0,100 Q150,50 300,100 T600,100"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.path
          d="M0,200 Q200,150 400,200 T800,200"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 4,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
      {/* Pulsing Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/5 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-error/5 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 5,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* Lightning Effects */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
        animate={{
          opacity: [0, 1, 0],
          scaleX: [0, 1, 0]
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut"
        }}
      />
      {/* Corner Decorations */}
      <motion.div
        className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-accent/30 rounded-tl-lg"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-error/30 rounded-tr-lg"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 3,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-success/30 rounded-bl-lg"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 3,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-warning/30 rounded-br-lg"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 3,
          delay: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default VisualEffects;