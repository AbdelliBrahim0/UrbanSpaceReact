import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const heroImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?w=800&h=600&fit=crop",
    "https://images.pixabay.com/photo/2016/11/19/18/06/feet-1840619_1280.jpg?w=800&h=600&fit=crop"
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
            UP TO 80% OFF
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          The biggest streetwear sale of the year is here. Exclusive drops, limited editions, and gang-approved styles at unbeatable prices.
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button
            variant="default"
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-4 text-lg"
          >
            SHOP BLACK FRIDAY
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-warning text-warning hover:bg-warning hover:text-warning-foreground font-bold px-8 py-4 text-lg"
          >
            VIEW ALL DEALS
          </Button>
        </motion.div>

        {/* Featured Images */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {heroImages?.map((image, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative overflow-hidden rounded-lg border border-accent/30 h-64">
                <Image
                  src={image}
                  alt={`Black Friday Collection ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-accent font-heading font-bold text-lg mb-1">
                    {index === 0 ? 'HOODIES' : index === 1 ? 'SNEAKERS' : 'ACCESSORIES'}
                  </div>
                  <div className="text-warning font-bold">
                    UP TO {60 + index * 10}% OFF
                  </div>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-lg border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-muted-foreground"
          >
            <span className="text-sm mb-2">Scroll for deals</span>
            <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-accent rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;