import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const heroSlides = [
    {
      id: 1,
      title: "STREET LEGENDS",
      subtitle: "BORN FROM THE CONCRETE",
      description: "Exclusive drops that define the culture. Limited quantities, unlimited attitude.",
      cta: "SHOP THE DROP",
      videoUrl: "https://player.vimeo.com/video/76979871?autoplay=1&loop=1&muted=1&background=1",
      overlayColor: "from-black/80 via-black/60 to-transparent"
    },
    {
      id: 2,
      title: "GANG MENTALITY",
      subtitle: "UNITY THROUGH STYLE",
      description: "Join the movement. Wear the rebellion. Express your truth through authentic streetwear.",
      cta: "JOIN THE CREW",
      videoUrl: "https://player.vimeo.com/video/158284739?autoplay=1&loop=1&muted=1&background=1",
      overlayColor: "from-error/80 via-error/40 to-transparent"
    },
    {
      id: 3,
      title: "VAULT EXCLUSIVE",
      subtitle: "UNDERGROUND COLLECTION",
      description: "Rare pieces for the real ones. When you know, you know.",
      cta: "ACCESS VAULT",
      videoUrl: "https://player.vimeo.com/video/169599296?autoplay=1&loop=1&muted=1&background=1",
      overlayColor: "from-accent/80 via-accent/40 to-transparent"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [heroSlides?.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const glitchVariants = {
    initial: { x: 0 },
    animate: {
      x: [-2, 2, -1, 1, 0],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          src={heroSlides?.[currentSlide]?.videoUrl}
          className="w-full h-full object-cover scale-110"
          frameBorder="0"
          allow="autoplay; fullscreen"
          onLoad={() => setIsVideoLoaded(true)}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides?.[currentSlide]?.overlayColor}`} />
      </div>
      {/* Animated Particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      {/* Main Content */}
      <motion.div
        className="relative z-20 h-full flex items-center justify-center px-4 lg:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center max-w-4xl">
          {/* Subtitle */}
          <motion.p
            variants={textVariants}
            className="text-accent font-caption text-lg md:text-xl mb-4 tracking-wider"
          >
            {heroSlides?.[currentSlide]?.subtitle}
          </motion.p>

          {/* Main Title with Glitch Effect */}
          <motion.h1
            variants={glitchVariants}
            initial="initial"
            animate="animate"
            className="font-heading font-black text-4xl md:text-6xl lg:text-8xl text-foreground mb-6 text-shadow-glow"
          >
            {heroSlides?.[currentSlide]?.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={textVariants}
            className="text-text-secondary text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {heroSlides?.[currentSlide]?.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={textVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/collections">
              <Button
                variant="default"
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-bold tracking-wide transition-street hover-lift"
              >
                {heroSlides?.[currentSlide]?.cta}
              </Button>
            </Link>
            
            <Link to="/black-friday">
              <Button
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg font-bold tracking-wide transition-street"
              >
                BLACK FRIDAY DEALS
              </Button>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-text-secondary"
            >
              <span className="text-sm font-caption mb-2">SCROLL TO EXPLORE</span>
              <Icon name="ChevronDown" size={24} className="text-accent" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      {/* Slide Indicators */}
      <div className="absolute bottom-6 right-6 z-30 flex space-x-2">
        {heroSlides?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-street ${
              index === currentSlide ? 'bg-accent' : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
      {/* Street Art Overlay */}
      <div className="absolute top-0 right-0 z-10 w-64 h-64 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M20,20 L180,20 L180,180 L20,180 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-accent"
          />
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;