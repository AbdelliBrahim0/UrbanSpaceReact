import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { eventsApi } from '../../api';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import PromotionalBanner from './components/PromotionalBanner';
import GangStyleStrip from './components/GangStyleStrip';
import DiscountCard from './components/DiscountCard';
import CountdownTimer from './components/CountdownTimer';
import ExclusiveAccess from './components/ExclusiveAccess';
import VisualEffects from './components/VisualEffects';
import InteractiveElements from './components/InteractiveElements';
import AnimatedCallToAction from './components/AnimatedCallToAction';
import LoadingSpinner from '../../components/LoadingSpinner';

const BlackFridayEventContent = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState('5j 12h');

  // Update countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const blackFridayEnd = new Date();
      blackFridayEnd?.setDate(blackFridayEnd?.getDate() + 5);
      blackFridayEnd?.setHours(blackFridayEnd?.getHours() + 12);
      
      const timeLeft = blackFridayEnd?.getTime() - new Date()?.getTime();
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      setCountdown(`${days}j ${hours}h`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  // Mock promotional data
  const promotionalBanners = [
    {
      discount: 70,
      title: "Collection Streetwear Complète",
      description: "Hoodies, t-shirts, pantalons et accessoires avec des designs urbains exclusifs.",
      isFlashing: true
    },
    {
      discount: 60,
      title: "Éditions Limitées Gang Style",
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

  const discountCards = [
    {
      discount: 75,
      category: "Hoodies Premium",
      originalPrice: 120,
      discountedPrice: 30,
      description: "Hoodies en coton bio avec designs exclusifs et broderies gang-style de haute qualité.",
      isLimited: true
    },
    {
      discount: 65,
      category: "T-Shirts Graphiques",
      originalPrice: 45,
      discountedPrice: 16,
      description: "Collection de t-shirts avec impressions artistiques urbaines et coupes modernes.",
      isLimited: false
    },
    {
      discount: 80,
      category: "Pantalons Cargo",
      originalPrice: 90,
      discountedPrice: 18,
      description: "Pantalons cargo multi-poches avec style militaire urbain et matières résistantes.",
      isLimited: true
    },
    {
      discount: 55,
      category: "Casquettes & Bonnets",
      originalPrice: 35,
      discountedPrice: 16,
      description: "Accessoires de tête avec logos brodés et designs streetwear authentiques.",
      isLimited: false
    },
    {
      discount: 70,
      category: "Vestes Bomber",
      originalPrice: 150,
      discountedPrice: 45,
      description: "Vestes bomber avec détails gang-style, fermetures éclair et patches exclusifs.",
      isLimited: true
    },
    {
      discount: 60,
      category: "Sneakers Urbaines",
      originalPrice: 180,
      discountedPrice: 72,
      description: "Chaussures streetwear avec semelles épaisses et designs urbains contemporains.",
      isLimited: false
    }
  ];

  // Navigation handlers
  const handleExploreClick = () => {
    navigate('/products-catalog');
  };

  const handleJoinClick = () => {
    navigate('/new-member-welcome');
  };

  const handleLoginClick = () => {
    navigate('/user-authentication');
  };

  const handleNavigate = (route) => {
    navigate(route);
  };

  const handleDiscountCardClick = () => {
    navigate('/products-catalog');
  };

  const handlePrimaryAction = () => {
    navigate('/products-catalog');
  };

  const handleSecondaryAction = () => {
    navigate('/new-member-welcome');
  };

  // Target date for countdown (5 days from now)
  const targetDate = new Date();
  targetDate?.setDate(targetDate?.getDate() + 5);

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
                Découvrez nos réductions les plus importantes de l'année sur toute notre collection streetwear.
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

        {/* Countdown Timer Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <CountdownTimer 
              targetDate={targetDate}
              title="Black Friday se termine dans"
            />
          </div>
        </section>

        {/* Gang Style Strip 2 */}
        <GangStyleStrip 
          text="URBAN STREETWEAR"
          iconName="Crown"
          direction="right"
        />

        {/* Discount Cards Section */}
        <section className="py-20 bg-gradient-to-b from-black via-surface to-black">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-success via-white to-accent mb-6">
                CATÉGORIES EN PROMO
              </h2>
              <p className="text-xl text-text-secondary font-body max-w-3xl mx-auto">
                Chaque catégorie de notre collection bénéficie de réductions massives pendant le Black Friday.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {discountCards?.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <DiscountCard 
                    {...card}
                    onActionClick={handleDiscountCardClick}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gang Style Strip 3 */}
        <GangStyleStrip 
          text="EXCLUSIVE ACCESS"
          iconName="Star"
          direction="left"
        />

        {/* Exclusive Access Section */}
        <ExclusiveAccess 
          onJoinClick={handleJoinClick}
          onLoginClick={handleLoginClick}
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