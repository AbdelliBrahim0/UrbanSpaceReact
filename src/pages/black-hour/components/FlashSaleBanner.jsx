import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/uiii/Button';

const FlashSaleBanner = () => {
  const [currentDeal, setCurrentDeal] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

  const flashDeals = [
    {
      id: 1,
      title: 'FOLIE DE MINUIT',
      subtitle: '20% de réduction supplémentaire sur tout',
      discount: '-80%',
      originalPrice: '299 TND',
      salePrice: '59 TND',
      productName: 'Hoodie Gang Boss',
      endTime: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
      bgGradient: 'from-error/20 via-background to-background',
      accentColor: 'error'
    },
    {
      id: 2,
      title: 'OFFRES ÉCLAIRS',
      subtitle: 'Vente flash à durée limitée',
      discount: '-75%',
      originalPrice: '199 TND',
      salePrice: '49 TND',
      productName: 'Veste Street Warrior',
      endTime: new Date(Date.now() + 12 * 60 * 1000), // 12 minutes from now
      bgGradient: 'from-warning/20 via-background to-background',
      accentColor: 'warning'
    },
    {
      id: 3,
      title: 'DERNIÈRES HEURES',
      subtitle: 'Dernière chance pour économiser',
      discount: '-70%',
      originalPrice: '149 TND',
      salePrice: '44 TND',
      productName: 'T-shirt Urban Legend',
      endTime: new Date(Date.now() + 8 * 60 * 1000), // 8 minutes from now
      bgGradient: 'from-accent/20 via-background to-background',
      accentColor: 'accent'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()?.getTime();
      const distance = flashDeals?.[currentDeal]?.endTime?.getTime() - now;

      if (distance < 0) {
        setCurrentDeal((prev) => (prev + 1) % flashDeals?.length);
        return;
      }

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentDeal]);

  useEffect(() => {
    const dealRotation = setInterval(() => {
      setCurrentDeal((prev) => (prev + 1) % flashDeals?.length);
    }, 30000); // Change deal every 30 seconds

    return () => clearInterval(dealRotation);
  }, []);

  const currentFlashDeal = flashDeals?.[currentDeal];

  return (
    <div className="py-8 px-6 bg-gradient-to-r from-gray-900 via-background to-gray-900">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDeal}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${currentFlashDeal?.bgGradient} gang-border-active`}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                className="w-full h-full"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300FF41' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Flash Sale Badge */}
                  <motion.div
                    className="inline-flex items-center space-x-2 mb-4"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className={`bg-${currentFlashDeal?.accentColor} text-${currentFlashDeal?.accentColor}-foreground px-4 py-2 rounded-full flex items-center space-x-2`}>
                      <Icon name="Zap" size={20} />
                      <span className="font-data font-bold text-sm">PROCHAINE OFFRE DANS</span>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    className="font-heading font-black text-3xl md:text-5xl text-foreground mb-2"
                    animate={{
                      textShadow: [
                        `0 0 20px rgba(${currentFlashDeal?.accentColor === 'error' ? '255, 59, 48' : currentFlashDeal?.accentColor === 'warning' ? '255, 184, 0' : '0, 255, 65'}, 0.5)`,
                        `0 0 40px rgba(${currentFlashDeal?.accentColor === 'error' ? '255, 59, 48' : currentFlashDeal?.accentColor === 'warning' ? '255, 184, 0' : '0, 255, 65'}, 0.8)`,
                        `0 0 20px rgba(${currentFlashDeal?.accentColor === 'error' ? '255, 59, 48' : currentFlashDeal?.accentColor === 'warning' ? '255, 184, 0' : '0, 255, 65'}, 0.5)`,
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {currentFlashDeal?.title}
                  </motion.h2>

                  <p className="text-lg text-muted-foreground font-body mb-6">
                    {currentFlashDeal?.subtitle}
                  </p>

                  {/* Product Info */}
                  <div className="mb-6">
                    <div className="font-data font-bold text-2xl text-foreground/80">
                      NE MANQUEZ PAS ÇA ! <span className="text-accent">VENTE FLASH</span> SE TERMINE BIENTÔT
                    </div>
                    <div className="flex items-center justify-center lg:justify-start space-x-4">
                      <span className={`font-data font-black text-3xl text-${currentFlashDeal?.accentColor}`}>
                        {currentFlashDeal?.salePrice}
                      </span>
                      <span className="font-data text-muted-foreground line-through text-xl">
                        {currentFlashDeal?.originalPrice}
                      </span>
                      <motion.span
                        className={`font-data font-bold text-lg text-${currentFlashDeal?.accentColor}`}
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {currentFlashDeal?.discount}
                      </motion.span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link to="/black-hour-flash-sale">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="default"
                        size="lg"
                        className={`bg-${currentFlashDeal?.accentColor} text-${currentFlashDeal?.accentColor}-foreground hover:bg-${currentFlashDeal?.accentColor}/90 font-heading font-bold text-lg px-8 py-4 gang-shadow`}
                      >
                        <Icon name="ShoppingBag" size={24} className="mr-3" />
                        PROFITER DE L'OFFRE
                      </Button>
                    </motion.div>
                  </Link>
                </div>

                {/* Right Content - Timer */}
                <div className="flex-shrink-0">
                  <div className="text-center">
                    <h3 className="font-heading font-bold text-lg text-muted-foreground mb-4">
                      DEAL ENDS IN
                    </h3>
                    
                    <div className="flex items-center space-x-4">
                      {/* Minutes */}
                      <div className="flex flex-col items-center">
                        <motion.div
                          className={`w-20 h-20 bg-${currentFlashDeal?.accentColor}/20 border-2 border-${currentFlashDeal?.accentColor} rounded-lg flex items-center justify-center`}
                          animate={{
                            borderColor: [
                              `rgba(${currentFlashDeal?.accentColor === 'error' ? '255, 59, 48' : currentFlashDeal?.accentColor === 'warning' ? '255, 184, 0' : '0, 255, 65'}, 0.5)`,
                              `rgba(${currentFlashDeal?.accentColor === 'error' ? '255, 59, 48' : currentFlashDeal?.accentColor === 'warning' ? '255, 184, 0' : '0, 255, 65'}, 1)`,
                              `rgba(${currentFlashDeal?.accentColor === 'error' ? '255, 59, 48' : currentFlashDeal?.accentColor === 'warning' ? '255, 184, 0' : '0, 255, 65'}, 0.5)`,
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <span className={`font-data font-black text-2xl text-${currentFlashDeal?.accentColor}`}>
                            {timeLeft?.minutes?.toString()?.padStart(2, '0')}
                          </span>
                        </motion.div>
                        <span className="font-body font-medium text-sm text-muted-foreground mt-2">
                          MIN
                        </span>
                      </div>

                      {/* Separator */}
                      <div className={`text-2xl font-data font-black text-${currentFlashDeal?.accentColor} animate-pulse`}>
                        :
                      </div>

                      {/* Seconds */}
                      <div className="flex flex-col items-center">
                        <motion.div
                          className={`w-20 h-20 bg-${currentFlashDeal?.accentColor}/20 border-2 border-${currentFlashDeal?.accentColor} rounded-lg flex items-center justify-center`}
                          animate={{
                            borderColor: [
                              `rgba(${currentFlashDeal?.accentColor === 'error' ? '255, 59, 48' : currentFlashDeal?.accentColor === 'warning' ? '255, 184, 0' : '0, 255, 65'}, 0.5)`,
                              `rgba(${currentFlashDeal?.accentColor === 'error' ? '255, 59, 48' : currentFlashDeal?.accentColor === 'warning' ? '255, 184, 0' : '0, 255, 65'}, 1)`,
                              `rgba(${currentFlashDeal?.accentColor === 'error' ? '255, 59, 48' : currentFlashDeal?.accentColor === 'warning' ? '255, 184, 0' : '0, 255, 65'}, 0.5)`,
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <span className={`font-data font-black text-2xl text-${currentFlashDeal?.accentColor}`}>
                            {timeLeft?.seconds?.toString()?.padStart(2, '0')}
                          </span>
                        </motion.div>
                        <span className="font-body font-medium text-sm text-muted-foreground mt-2">
                          SEC
                        </span>
                      </div>
                    </div>

                    {/* Urgency Message */}
                    <motion.p
                      className={`text-sm font-data font-medium text-${currentFlashDeal?.accentColor} mt-4`}
                      animate={{
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      ⚡ Limited quantity available!
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Deal Indicators */}
              <div className="flex items-center justify-center space-x-2 mt-8">
                {flashDeals?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentDeal(index)}
                    className={`w-3 h-3 rounded-full gang-transition ${
                      index === currentDeal 
                        ? `bg-${currentFlashDeal?.accentColor}` 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-4 right-4 opacity-20"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Icon name="Zap" size={48} className={`text-${currentFlashDeal?.accentColor}`} />
            </motion.div>

            <motion.div
              className="absolute bottom-4 left-4 opacity-10"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon name="Tag" size={32} className={`text-${currentFlashDeal?.accentColor}`} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlashSaleBanner;