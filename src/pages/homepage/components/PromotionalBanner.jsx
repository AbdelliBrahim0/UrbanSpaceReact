import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PromotionalBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [currentPromo, setCurrentPromo] = useState(0);

  const promotions = [
    {
      id: 1,
      title: "BLACK FRIDAY MADNESS",
      subtitle: "UP TO 70% OFF",
      description: "The biggest sale of the year is here. Limited time, unlimited savings.",
      endDate: new Date('2024-11-29T23:59:59'),
      bgColor: "from-error via-error/80 to-error/60",
      textColor: "text-white",
      ctaText: "SHOP BLACK FRIDAY",
      ctaLink: "/black-friday",
      icon: "Zap",
      particles: true
    },
    {
      id: 2,
      title: "BLACK HOUR EXCLUSIVE",
      subtitle: "FLASH SALE - 1 HOUR ONLY",
      description: "Ultra-limited drops at unbeatable prices. When it's gone, it's gone.",
      endDate: new Date(Date.now() + 3600000), // 1 hour from now
      bgColor: "from-background via-surface to-background",
      textColor: "text-accent",
      ctaText: "ACCESS BLACK HOUR",
      ctaLink: "/black-hour",
      icon: "Clock",
      particles: false
    },
    {
      id: 3,
      title: "VAULT MEMBERS ONLY",
      subtitle: "EXCLUSIVE ACCESS",
      description: "Join the inner circle. Get early access to drops and member-only prices.",
      endDate: new Date('2024-12-31T23:59:59'),
      bgColor: "from-accent via-accent/80 to-accent/60",
      textColor: "text-accent-foreground",
      ctaText: "JOIN THE VAULT",
      ctaLink: "/collections",
      icon: "Crown",
      particles: true
    }
  ];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()?.getTime();
      const endTime = promotions?.[currentPromo]?.endDate?.getTime();
      const difference = endTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [currentPromo, promotions]);

  useEffect(() => {
    const promoInterval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promotions?.length);
    }, 10000);

    return () => clearInterval(promoInterval);
  }, [promotions?.length]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const currentPromotion = promotions?.[currentPromo];

  return (
    <section className="py-16 lg:py-24 px-4 lg:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`relative rounded-2xl overflow-hidden bg-gradient-to-r ${currentPromotion?.bgColor} p-8 lg:p-12`}
        >
          {/* Animated Background Particles */}
          {currentPromotion?.particles && (
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(15)]?.map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full"
                  initial={{
                    x: Math.random() * 100 + '%',
                    y: Math.random() * 100 + '%',
                  }}
                  animate={{
                    x: [null, Math.random() * 100 + '%'],
                    y: [null, Math.random() * 100 + '%'],
                    opacity: [0.2, 0.8, 0.2]
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </div>
          )}

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center justify-center lg:justify-start mb-4"
              >
                <Icon 
                  name={currentPromotion?.icon} 
                  size={32} 
                  className={`${currentPromotion?.textColor} mr-3`} 
                />
                <span className={`${currentPromotion?.textColor} font-caption text-lg tracking-wider`}>
                  LIMITED TIME
                </span>
              </motion.div>

              <motion.h2
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`font-heading font-black text-3xl md:text-4xl lg:text-5xl ${currentPromotion?.textColor} mb-2`}
              >
                {currentPromotion?.title}
              </motion.h2>

              <motion.p
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`${currentPromotion?.textColor} text-2xl md:text-3xl font-bold mb-4`}
              >
                {currentPromotion?.subtitle}
              </motion.p>

              <motion.p
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className={`${currentPromotion?.textColor} text-lg mb-8 opacity-90`}
              >
                {currentPromotion?.description}
              </motion.p>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link to={currentPromotion?.ctaLink}>
                  <motion.div variants={pulseVariants} animate="animate">
                    <Button
                      variant="default"
                      size="lg"
                      className="bg-background text-foreground hover:bg-surface px-8 py-4 text-lg font-bold tracking-wide transition-street hover-lift"
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      {currentPromotion?.ctaText}
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <h3 className={`${currentPromotion?.textColor} font-heading font-bold text-xl mb-6`}>
                TIME REMAINING
              </h3>
              
              <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                {[
                  { label: 'DAYS', value: timeLeft?.days },
                  { label: 'HOURS', value: timeLeft?.hours },
                  { label: 'MINS', value: timeLeft?.minutes },
                  { label: 'SECS', value: timeLeft?.seconds }
                ]?.map((item, index) => (
                  <motion.div
                    key={item?.label}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="bg-background/20 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  >
                    <div className={`${currentPromotion?.textColor} font-heading font-black text-2xl md:text-3xl`}>
                      {item?.value?.toString()?.padStart(2, '0')}
                    </div>
                    <div className={`${currentPromotion?.textColor} font-caption text-sm opacity-80`}>
                      {item?.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Progress Indicators */}
              <div className="flex justify-center space-x-2 mt-8">
                {promotions?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPromo(index)}
                    className={`w-3 h-3 rounded-full transition-street ${
                      index === currentPromo 
                        ? 'bg-white' :'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon 
                points="50,10 90,90 10,90" 
                fill="currentColor" 
                className={currentPromotion?.textColor}
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromotionalBanner;