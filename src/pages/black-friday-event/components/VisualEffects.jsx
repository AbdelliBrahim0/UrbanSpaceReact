import React from 'react';
import { motion } from 'framer-motion';

const VisualEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Particles */}
      {[...Array(20)]?.map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-accent/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            opacity: 0
          }}
          animate={{
            y: -50,
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
      {/* Glowing Orbs */}
      {[...Array(8)]?.map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-xl"
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? 'rgba(229, 9, 20, 0.1)' : 'rgba(0, 208, 132, 0.1)'
            }, transparent)`
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
      {/* Lightning Effects */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: Math.random() * 10 + 5
        }}
      >
        <div className="w-full h-full bg-gradient-to-b from-accent/5 to-transparent"></div>
      </motion.div>
      {/* Scanning Lines */}
      <motion.div
        className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        initial={{ y: -10 }}
        animate={{ y: window.innerHeight + 10 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 2
        }}
      />
      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border-l-2 border-t-2 border-accent/30 rounded-tl-3xl"
        />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border-r-2 border-t-2 border-success/30 rounded-tr-3xl"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border-l-2 border-b-2 border-success/30 rounded-bl-3xl"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border-r-2 border-b-2 border-accent/30 rounded-br-3xl"
        />
      </div>
    </div>
  );
};

export default VisualEffects;