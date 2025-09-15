import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturedCollections from './components/FeaturedCollections';
import PromotionalBanner from './components/PromotionalBanner';
import SocialProof from './components/SocialProof';
import NewsletterSignup from './components/NewsletterSignup';
import NewsletterSection from './components/NewsletterSection';
import LiveNotifications from './components/LiveNotifications';
import TrustSignals from './components/TrustSignals';


const Homepage = () => {
  useEffect(() => {
    // Smooth scroll behavior for the page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Set page title
    document.title = 'UrbanSpace - Premium Streetwear & Urban Fashion';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 'Discover exclusive streetwear collections at StreetVault. Premium urban fashion, limited drops, and authentic street culture. Join the movement.');
    }

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Collections */}
        <FeaturedCollections />

        {/* Promotional Banner */}
        <PromotionalBanner />

     {/* Trust Signals */}
        <TrustSignals />


        {/* Newsletter Signup */}
        <NewsletterSignup />

        {/* Newsletter Section */}
        <NewsletterSection />

        {/* Live Notifications */}
        <LiveNotifications />
      </main>
      {/* Footer */}
      <footer className="bg-surface border-t border-street py-12 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
                  <span className="text-accent-foreground font-heading font-bold text-lg">S</span>
                </div>
                <span className="font-heading font-bold text-xl text-foreground">
                  StreetVault
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Authentic streetwear for the culture. Premium quality, limited drops, unlimited attitude.
              </p>
              <div className="flex space-x-4">
                {['Instagram', 'Twitter', 'TikTok', 'YouTube']?.map((social) => (
                  <div
                    key={social}
                    className="w-8 h-8 bg-background border border-street rounded-full flex items-center justify-center hover:border-accent transition-street cursor-pointer"
                  >
                    <span className="text-xs text-text-secondary hover:text-accent transition-street">
                      {social?.[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-bold text-foreground mb-4">SHOP</h4>
              <ul className="space-y-2 text-sm">
                {['New Arrivals', 'Collections', 'Sale', 'Black Friday', 'Accessories']?.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-text-secondary hover:text-accent transition-street">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-heading font-bold text-foreground mb-4">SUPPORT</h4>
              <ul className="space-y-2 text-sm">
                {['Size Guide', 'Shipping Info', 'Returns', 'Contact Us', 'FAQ']?.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-text-secondary hover:text-accent transition-street">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-heading font-bold text-foreground mb-4">COMPANY</h4>
              <ul className="space-y-2 text-sm">
                {['About Us', 'Careers', 'Press', 'Privacy Policy', 'Terms']?.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-text-secondary hover:text-accent transition-street">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-street pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-secondary text-sm mb-4 md:mb-0">
              © {new Date()?.getFullYear()} StreetVault. All rights reserved. Built for the culture.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-text-secondary">Secure payments</span>
              <span className="text-text-secondary">Free shipping over $100</span>
              <span className="text-text-secondary">30-day returns</span>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Homepage;