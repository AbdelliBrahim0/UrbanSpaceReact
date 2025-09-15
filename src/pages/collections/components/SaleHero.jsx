import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/uiii/Button';

const SaleHero = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev?.seconds > 0) {
          return { ...prev, seconds: prev?.seconds - 1 };
        } else if (prev?.minutes > 0) {
          return { ...prev, minutes: prev?.minutes - 1, seconds: 59 };
        } else if (prev?.hours > 0) {
          return { ...prev, hours: prev?.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-accent/20 via-background to-error/20 gang-border-active">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-accent via-transparent to-error animate-pulse-glow"></div>
      </div>
      <div className="relative px-6 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                <div className="p-2 bg-error/20 rounded-lg">
                  <Icon name="Zap" size={32} className="text-error" />
                </div>
                <span className="bg-error text-error-foreground px-3 py-1 rounded-full text-sm font-data font-bold animate-pulse">
                  FLASH SALE
                </span>
              </div>

              <h1 className="font-heading font-black text-4xl lg:text-6xl text-foreground mb-4">
                STREET
                <span className="text-accent block">CLEARANCE</span>
              </h1>

              <p className="text-xl lg:text-2xl text-error font-heading font-bold mb-2">
                UP TO 70% OFF
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                Limited time deals on premium streetwear.\nDon't sleep on these prices.
              </p>

              {/* Countdown Timer */}
              <div className="flex items-center justify-center lg:justify-start space-x-4 mb-8">
                <span className="text-foreground font-body font-medium">Sale ends in:</span>
                <div className="flex items-center space-x-2">
                  {[
                    { value: timeLeft?.hours, label: 'H' },
                    { value: timeLeft?.minutes, label: 'M' },
                    { value: timeLeft?.seconds, label: 'S' }
                  ]?.map((unit, index) => (
                    <div key={unit?.label} className="flex items-center">
                      <div className="bg-error text-error-foreground px-3 py-2 rounded-lg text-lg font-data font-bold min-w-[3rem] text-center">
                        {unit?.value?.toString()?.padStart(2, '0')}
                      </div>
                      <span className="text-xs font-data ml-1 text-error font-medium">
                        {unit?.label}
                      </span>
                      {index < 2 && <span className="text-muted-foreground mx-2">:</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  variant="default"
                  className="bg-error text-error-foreground hover:bg-error/90 gang-hover-scale font-heading font-bold text-lg px-8 py-3"
                >
                  Shop Sale Now
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                
                <Link to="/black-friday-event">
                  <Button 
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent/10 gang-hover-scale font-heading font-semibold text-lg px-8 py-3"
                  >
                    Black Friday Deals
                    <Icon name="Tag" size={20} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-error/30 rounded-2xl blur-xl"></div>
                <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-8 gang-border">
                  <div className="text-center">
                    <div className="text-6xl lg:text-8xl font-heading font-black text-error mb-4">
                      70%
                    </div>
                    <div className="text-2xl font-heading font-bold text-foreground mb-2">
                      MAX DISCOUNT
                    </div>
                    <div className="text-muted-foreground">
                      On selected streetwear items
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-data font-bold text-sm"
              >
                LIMITED TIME
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-warning text-warning-foreground px-4 py-2 rounded-full font-data font-bold text-sm"
              >
                WHILE STOCKS LAST
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleHero;