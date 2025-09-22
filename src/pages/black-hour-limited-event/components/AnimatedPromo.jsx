import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AnimatedPromo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const promoSlides = [
    {
      id: 1,
      title: "HOODIES GANG",
      subtitle: "Collection Exclusive",
      discount: "70%",
      originalPrice: "299€",
      newPrice: "89€",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      gradient: "from-accent to-error"
    },
    {
      id: 2,
      title: "SNEAKERS STREET",
      subtitle: "Édition Limitée",
      discount: "60%",
      originalPrice: "199€",
      newPrice: "79€",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      gradient: "from-error to-warning"
    },
    {
      id: 3,
      title: "ACCESSOIRES URBAN",
      subtitle: "Style Authentique",
      discount: "50%",
      originalPrice: "99€",
      newPrice: "49€",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      gradient: "from-warning to-success"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides?.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [promoSlides?.length]);

  const currentPromo = promoSlides?.[currentSlide];

  return (
    <div className="relative overflow-hidden">
      {/* Main Promo Display */}
      <motion.div
        className="relative bg-surface/90 backdrop-blur-lg border border-border rounded-3xl p-8 overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-accent via-transparent to-error"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative grid lg:grid-cols-2 gap-8 items-center">
          {/* Content Side */}
          <motion.div
            key={currentPromo?.id}
            className="space-y-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-error/20 border border-error/30 rounded-full px-4 py-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon name="Zap" size={16} className="text-error" />
              <span className="font-caption font-bold text-error text-sm">
                OFFRE LIMITÉE
              </span>
            </motion.div>

            {/* Title */}
            <div>
              <motion.h2
                className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentPromo?.title}
              </motion.h2>
              <motion.p
                className="text-text-secondary font-body text-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentPromo?.subtitle}
              </motion.p>
            </div>

            {/* Discount Display */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <div className={`text-6xl font-heading font-bold bg-gradient-to-r ${currentPromo?.gradient} bg-clip-text text-transparent`}>
                -{currentPromo?.discount}
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-heading font-bold text-accent">
                  {currentPromo?.newPrice}
                </div>
                <div className="text-lg text-text-secondary line-through">
                  {currentPromo?.originalPrice}
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                className={`bg-gradient-to-r ${currentPromo?.gradient} text-white font-heading font-bold py-4 px-8 rounded-xl hover:shadow-lg transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ACHETER MAINTENANT
              </motion.button>
              <motion.button
                className="border-2 border-accent text-accent font-heading font-bold py-4 px-8 rounded-xl hover:bg-accent hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                VOIR DÉTAILS
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            key={`image-${currentPromo?.id}`}
            className="relative"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* 3D Effect Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentPromo?.gradient} rounded-2xl transform rotate-6 scale-105 opacity-20`}></div>
            
            <div className="relative bg-background rounded-2xl overflow-hidden border border-border">
              <img
                src={currentPromo?.image}
                alt={currentPromo?.title}
                className="w-full h-80 object-cover"
              />
              
              {/* Overlay Effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute top-4 right-4 w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Icon name="Star" size={24} className="text-accent" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-3 mt-8">
          {promoSlides?.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-accent scale-125' : 'bg-border hover:bg-accent/50'
              }`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </motion.div>
      {/* Floating Promotional Elements */}
      <motion.div
        className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-accent to-error rounded-full flex items-center justify-center text-white font-heading font-bold text-lg shadow-2xl"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity }
        }}
      >
        HOT
      </motion.div>
      <motion.div
        className="absolute -bottom-4 -left-4 w-16 h-16 bg-success/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-success/30"
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon name="TrendingUp" size={20} className="text-success" />
      </motion.div>
    </div>
  );
};

export default AnimatedPromo;