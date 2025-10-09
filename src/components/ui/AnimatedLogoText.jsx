import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedLogoText = () => {
  const [showEmojis, setShowEmojis] = useState(false);
  const text = "UrbanSpace";
  const emojis = ["👕", "👖", "🧥", "👟"];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowEmojis(true);
      setTimeout(() => setShowEmojis(false), 2500);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i = 0) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: i * 0.08 },
    }),
  };

  const letterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const emojiContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const emojiVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <span className="font-heading font-bold text-base md:text-lg lg:text-xl text-foreground group-hover:text-accent transition-street">
      <AnimatePresence mode='wait'>
        {!showEmojis ? (
          <motion.div
            key="text"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {text.split('').map((char, index) => (
              <motion.span key={index} variants={letterVariants} style={{display: 'inline-block'}}>
                {char}
              </motion.span>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="emojis"
            variants={emojiContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {emojis.map((emoji, index) => (
              <motion.span key={index} variants={emojiVariants} style={{display: 'inline-block'}}>
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default AnimatedLogoText;