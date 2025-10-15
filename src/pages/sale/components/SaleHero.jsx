import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SaleHero = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const difference = midnight.getTime() - now.getTime();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [currentBanner, setCurrentBanner] = useState(0);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const banners = [
    {
      id: 1,
      title: "Elegance Urbaine",
      subtitle: "70 % de réduction sur certains styles",
      description: "Découvrez une sélection streetwear sophistiquée. Offre limitée.",
      accentColor: "text-yellow-400",
      buttonVariant: "default"
    },
    {
      id: 2,
      title: "Midnight Drop",
      subtitle: "Nouvelle collection arrivée",
      description: "Découvrez les dernières nouveautés en matière de designs monochromes et minimalistes.",
      accentColor: "text-cyan-400",
      buttonVariant: "secondary"
    },
    {
      id: 3,
      title: "Dernier appel ",
      subtitle: "Dernière chance",
      description: "Ne manquez pas les dernières réductions de la saison.",
      accentColor: "text-red-500",
      buttonVariant: "destructive"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const currentBannerData = banners[currentBanner];

  const formatTime = (time) => time.toString().padStart(2, '0');

  return (
    <div className="relative h-[70vh] lg:h-[80vh] overflow-hidden bg-gray-900 text-white">
      <AnimatePresence>
        <motion.div
          key={currentBanner}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
        />
      </AnimatePresence>
      
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-yellow-400 rounded-full`}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.6, 0.1]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 3
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-2">
              {currentBannerData.title}
            </h1>
            <p className={`text-3xl md:text-4xl lg:text-5xl font-semibold ${currentBannerData.accentColor} mb-4`}>
              {currentBannerData.subtitle}
            </p>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
              {currentBannerData.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex items-center justify-center space-x-4 mb-8"
        >
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 w-28">
            <div className="text-4xl font-bold">{formatTime(timeLeft.hours)}</div>
            <div className="text-xs text-gray-400">HOURS</div>
          </div>
          <div className="text-4xl font-bold">:</div>
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 w-28">
            <div className="text-4xl font-bold">{formatTime(timeLeft.minutes)}</div>
            <div className="text-xs text-gray-400">MINUTES</div>
          </div>
          <div className="text-4xl font-bold">:</div>
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 w-28">
            <div className="text-4xl font-bold">{formatTime(timeLeft.seconds)}</div>
            <div className="text-xs text-gray-400">SECONDS</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Button size="lg" variant={currentBannerData.buttonVariant} className="font-bold text-lg px-10 py-6">
            Shop The Sale
          </Button>
          <Button size="lg" variant="outline" className="font-bold text-lg px-10 py-6 border-white/20 hover:bg-white/10">
            Explore Collections
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentBanner ? `bg-white scale-125` : 'bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-4 right-6 text-white/50"
      >
        <Icon name="ChevronDown" size={24} />
      </motion.div>
    </div>
  );
};

export default SaleHero;
