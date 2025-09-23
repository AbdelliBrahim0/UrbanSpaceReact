import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnimatedCallToAction = ({ onPrimaryAction, onSecondaryAction }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-b from-black via-surface to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 50%, rgba(229, 9, 20, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(0, 208, 132, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, rgba(229, 9, 20, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(0, 208, 132, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(229, 9, 20, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        />
      </div>
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.3
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          >
            <Icon 
              name={['Star', 'Zap', 'Crown', 'Gift', 'Sparkles', 'Award']?.[i]} 
              size={24} 
              className="text-accent/30" 
            />
          </motion.div>
        ))}
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main CTA Content */}
          <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="bg-surface/80 backdrop-blur-lg border border-accent/30 rounded-3xl p-12 relative overflow-hidden"
          >
            {/* Animated Border */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: isHovered ? 1.02 : 1
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 0.3 }
              }}
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent via-success to-accent opacity-20"
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon Animation */}
              <motion.div
                animate={{ 
                  rotate: isHovered ? [0, 10, -10, 0] : 0,
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <Icon name="Zap" size={32} className="text-white" />
              </motion.div>

              {/* Title */}
              <motion.h2
                animate={{ 
                  scale: isHovered ? 1.05 : 1
                }}
                transition={{ duration: 0.3 }}
                className="text-4xl md:text-6xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-success mb-6"
              >
                NE RATEZ RIEN !
              </motion.h2>

              {/* Description */}
              <p className="text-xl text-text-secondary font-body mb-8 leading-relaxed">
                Chaque vendredi est votre chance 
                de profiter de réductions exceptionnelles sur notre collection streetwear exclusive.
              </p>

              {/* Urgency Indicators */}
              <div className="flex items-center justify-center space-x-8 mb-10">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center space-x-2 text-warning"
                >
                  <Icon name="Clock" size={20} />
                  <span className="font-mono font-bold">Temps Limité</span>
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="flex items-center space-x-2 text-accent"
                >
                  <Icon name="TrendingUp" size={20} />
                  <span className="font-mono font-bold">Stock Limité</span>
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="flex items-center space-x-2 text-success"
                >
                  <Icon name="Users" size={20} />
                  <span className="font-mono font-bold">Demande Élevée</span>
                </motion.div>
              </div>

              

              {/* Trust Signals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center justify-center space-x-8 mt-10 text-text-secondary"
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-sm font-caption">Paiement en livraison</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Truck" size={16} className="text-accent" />
                  <span className="text-sm font-caption">Livraison Gratuite</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="RotateCcw" size={16} className="text-warning" />
                  <span className="text-sm font-caption">Retour 7j</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-lg text-warning font-body font-medium"
            >
              
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedCallToAction;