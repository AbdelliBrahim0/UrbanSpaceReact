import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const heroImages = [
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/illustrative-winter-sale-instagram-story-design-template-439c8316293ba1771bebcda6e9d94c58.jpg?ts=1732554290",
    "https://www.aetrex.com/cdn/shop/files/difference_Dahlia4.jpg?v=1757442342&width=1024",
    "https://d3jbu7vaxvlagf.cloudfront.net/small/v2/category_media/16397378751551_Daily_1_jigar_watch_171221_square.jpg"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-surface" />
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, #00FF88 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, #FF0040 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, #FFB800 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, #00FF88 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>
      {/* Street Art Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Main Title */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="text-6xl md:text-8xl lg:text-9xl font-heading font-black mb-4">
            <motion.span
              className="inline-block text-foreground"
              animate={{ rotateX: [0, 360] }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              BLACK
            </motion.span>
            <br />
            <motion.span
              className="inline-block text-accent text-shadow-glow"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 2, delay: 1 }}
            >
              FRIDAY
            </motion.span>
          </div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
            className="text-2xl md:text-4xl font-heading font-bold text-warning mb-6"
          >
            JUSQU'À 80% DE RÉDUCTION
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Les plus grandes soldes streetwear de l'année sont là. Des exclusivités, des éditions limitées et des modèles cultes à des prix imbattables.
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;