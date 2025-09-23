import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { eventsApi } from '../../api';
import Header from '../../components/ui/Header';
import CountdownTimer from './components/CountdownTimer';
import UrgencyBanner from './components/UrgencyBanner';
import DiscountShowcase from './components/DiscountShowcase';
import EventMechanics from './components/EventMechanics';
import ProgressIndicator from './components/ProgressIndicator';
import ExclusiveAccess from './components/ExclusiveAccess';
import AnimatedPromo from './components/AnimatedPromo';
import SocialProof from './components/SocialProof';
import CallToAction from './components/CallToAction';
import VisualEffects from './components/VisualEffects';
import LoadingSpinner from '../../components/LoadingSpinner';

const BlackHourLimitedEventContent = () => {
  useEffect(() => {
    document.title = 'Black Hour - Offres Limitées | UrbanSpace';
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Visual Effects Background */}
      <VisualEffects />
      {/* Header */}
      <Header />
      {/* Main Content */}
      <motion.main
        className="relative z-10 pt-24 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {/* Hero Section with Countdown */}
          <motion.section variants={sectionVariants} className="text-center space-y-8">
            <div className="space-y-4">
              <motion.div
                className="inline-flex items-center space-x-2 bg-error/20 border border-error/30 rounded-full px-6 py-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
                <span className="font-caption font-bold text-error text-sm">
                  ÉVÉNEMENT EN COURS
                </span>
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-heading font-bold text-foreground">
                BLACK HOUR
                <span className="block bg-gradient-to-r from-accent to-error bg-clip-text text-transparent">
                  ÉVÉNEMENT LIMITÉ
                </span>
              </h1>
              
              <p className="text-xl text-text-secondary font-body max-w-3xl mx-auto leading-relaxed">
                Profitez de réductions exceptionnelles jusqu'à -70% sur notre collection streetwear exclusive. 
                Offre limitée dans le temps - Dépêchez-vous !
              </p>
            </div>
            
            <CountdownTimer />
          </motion.section>


          
          {/* Discount Showcase */}
          <motion.section variants={sectionVariants}>
            <DiscountShowcase />
          </motion.section>

          {/* Progress Indicator */}
          <motion.section variants={sectionVariants}>
            <ProgressIndicator />
          </motion.section>

          
          {/* Event Mechanics & Rules */}
          <motion.section variants={sectionVariants}>
            <EventMechanics />
          </motion.section>

          {/* Social Proof & Testimonials */}
          <motion.section variants={sectionVariants}>
            <SocialProof />
          </motion.section>

          {/* Final Call to Action */}
          <motion.section variants={sectionVariants}>
            <CallToAction />
          </motion.section>
        </div>
      </motion.main>
      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.button
          className="w-16 h-16 bg-gradient-to-r from-accent to-error rounded-full flex items-center justify-center text-white shadow-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(229, 9, 20, 0.3)',
              '0 0 40px rgba(229, 9, 20, 0.6)',
              '0 0 20px rgba(229, 9, 20, 0.3)'
            ]
          }}
          transition={{ 
            boxShadow: { duration: 2, repeat: Infinity }
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
};

const BlackHourLimitedEvent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkEventStatus = async () => {
      try {
        const response = await eventsApi.checkStatus();
        
        if (response.success && response.events.black_hour) {
          // Si l'événement est actif, rediriger vers la page principale
          navigate('/black-hour', { replace: true });
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

  return <BlackHourLimitedEventContent />;
};

export default BlackHourLimitedEvent;