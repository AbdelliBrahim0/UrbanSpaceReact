import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { eventsApi } from '../../api';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import PromotionalBanner from './components/PromotionalBanner';
import GangStyleStrip from './components/GangStyleStrip';
import CountdownTimer from './components/CountdownTimer';
import VisualEffects from './components/VisualEffects';
import InteractiveElements from './components/InteractiveElements';
import AnimatedCallToAction from './components/AnimatedCallToAction';
import LoadingSpinner from '../../components/LoadingSpinner';

const BlackFridayEventContent = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState('5j 12h');

  // Update countdown timer to next Friday
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      
      // Calculate days until next Friday (5 = Friday)
      let daysUntilFriday = 5 - currentDay;
      if (daysUntilFriday <= 0) {
        // If it's Friday or Saturday, go to next week's Friday
        daysUntilFriday += 7;
      }
      
      // Set target date to next Friday at 00:00:00
      const nextFriday = new Date(now);
      nextFriday.setDate(now.getDate() + daysUntilFriday);
      nextFriday.setHours(0, 0, 0, 0);
      
      const timeLeft = nextFriday - now;
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      
      setCountdown(`${days}j ${hours}h ${minutes}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Mock promotional data
  const promotionalBanners = [
    {
      discount: 40,
      title: "Collection Streetwear Complète",
      description: "Hoodies, t-shirts, pantalons et accessoires avec des designs urbains exclusifs.",
      isFlashing: true
    },
    {
      discount: 35,
      title: "Éditions Limitées Urban Style",
      description: "Pièces uniques inspirées de la culture urbaine avec des finitions premium.",
      isFlashing: false
    },
    {
      discount: 50,
      title: "Accessoires & Sneakers",
      description: "Complétez votre look avec nos casquettes, sacs et chaussures streetwear.",
      isFlashing: true
    }
  ];

  
  // Navigation handlers
  const handleExploreClick = () => {
    navigate('/collections');
  };

  

  const handleNavigate = (route) => {
    navigate(route);
  };

  

  const handlePrimaryAction = () => {
    navigate('/products-catalog');
  };

  const handleSecondaryAction = () => {
    navigate('/new-member-welcome');
  };

  // Target date for countdown (next Friday)
  const getNextFriday = () => {
    const now = new Date();
    const currentDay = now.getDay();
    let daysUntilFriday = 5 - currentDay;
    if (daysUntilFriday <= 0) {
      daysUntilFriday += 7;
    }
    const nextFriday = new Date(now);
    nextFriday.setDate(now.getDate() + daysUntilFriday);
    nextFriday.setHours(0, 0, 0, 0);
    return nextFriday;
  };
  
  const targetDate = getNextFriday();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <VisualEffects />
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection 
          countdown={countdown}
          onExploreClick={handleExploreClick}
        />

        

        {/* Countdown Timer Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <CountdownTimer 
              targetDate={targetDate}
              title="Black Friday se commence dans"
            />
          </div>
        </section>

        {/* Gang Style Strip 1 */}
        <GangStyleStrip 
          text="BLACK FRIDAY DEALS"
          iconName="Zap"
          direction="left"
        />

        {/* Promotional Banners Section */}
        <section className="py-20 bg-gradient-to-b from-surface to-black">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-success mb-6">
                OFFRES EXCEPTIONNELLES
              </h2>
              <p className="text-xl text-text-secondary font-body max-w-3xl mx-auto">
                Découvrez nos réductions les plus importantes de la semaine sur toute notre collection streetwear.
              </p>
            </motion.div>

            <div className="space-y-8">
              {promotionalBanners?.map((banner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <PromotionalBanner {...banner} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        

        {/* Gang Style Strip 2 */}
        <GangStyleStrip 
          text="URBAN STREETWEAR"
          iconName="Crown"
          direction="right"
        />

        {/* Interactive Elements Section */}
        <InteractiveElements onNavigate={handleNavigate} />

        {/* Gang Style Strip 4 */}
        <GangStyleStrip 
          text="LAST CHANCE"
          iconName="AlertTriangle"
          direction="right"
        />

        {/* Animated Call to Action */}
        <AnimatedCallToAction 
          onPrimaryAction={handlePrimaryAction}
          onSecondaryAction={handleSecondaryAction}
        />
      </main>
    </div>
  );
};

const BlackFridayEvent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkEventStatus = async () => {
      try {
        const response = await eventsApi.checkStatus();
        
        if (response.success && response.events.black_friday) {
          // Si l'événement est actif, rediriger vers la page principale
          navigate('/black-friday', { replace: true });
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to check event status:', error);
        setIsLoading(false);
      }
    };

    checkEventStatus();
  }, [navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <BlackFridayEventContent />;
};

export default BlackFridayEvent;