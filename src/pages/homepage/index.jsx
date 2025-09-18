import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturedCollections from './components/FeaturedCollections';
import PromotionalBanner from './components/PromotionalBanner';
import NewsletterSignup from './components/NewsletterSignup';
import NewsletterSection from './components/NewsletterSection';
import LiveNotifications from './components/LiveNotifications';
import TrustSignals from './components/TrustSignals';
import AnimatedPromo from './components/AnimatedPromo';
import DiscountCard from './components/DiscountCard';
import GangStyleStrip from './components/GangStyleStrip';
import UrgencyBanner from './components/UrgencyBanner';


const Homepage = () => {
  useEffect(() => {
    // Smooth scroll behavior for the page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Set page title
    document.title = 'UrbanSpace - Premium Streetwear & Urban Fashion';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 'Discover exclusive streetwear collections at UrbanSpace. Premium urban fashion, limited drops, and authentic street culture. Join the movement.');
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
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

        {/* Animated Promo Showcase */}
        <motion.section variants={sectionVariants} className="px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <AnimatedPromo />
          </div>
        </motion.section>

        {/* Gang Style Strip 2 */}
        <GangStyleStrip 
          text="URBAN STREETWEAR"
          iconName="Crown"
          direction="right"
        />


        {/* Discount Cards Section */}
        <section className="py-20 bg-gradient-to-b from-black via-surface to-black">
          <div className="max-w-7xl mx-auto px-6">
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
              <DiscountCard 
                discount="70"
                category="Vêtements"
                originalPrice="199"
                discountedPrice="59"
                description="T-shirts, pulls et vestes à prix cassés"
                isLimited={true}
                onActionClick={() => console.log('Voir les vêtements')}
              />
              <DiscountCard 
                discount="60"
                category="Chaussures"
                originalPrice="249"
                discountedPrice="99"
                description="Les meilleures paires aux meilleurs prix"
                isLimited={true}
                onActionClick={() => console.log('Voir les chaussures')}
              />
              <DiscountCard 
                discount="50"
                category="Accessoires"
                originalPrice="149"
                discountedPrice="74"
                description="Sacs, casquettes et plus encore"
                isLimited={true}
                onActionClick={() => console.log('Voir les accessoires')}
              />
            </div>
          </div>
        </section>
      {/* Gang Style Strip 3 */}
        <GangStyleStrip 
          text="EXCLUSIVE ACCESS"
          iconName="Star"
          direction="left"
        />

     {/* Trust Signals */}
        <TrustSignals />

      <GangStyleStrip 
          text="LAST CHANCE"
          iconName="AlertTriangle"
          direction="right"
        />

        {/* Urgency Banner */}
          <motion.section variants={sectionVariants}>
            <UrgencyBanner />
          </motion.section>


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
                  UrbanSpace
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
              © {new Date()?.getFullYear()} UrbanSpace. All rights reserved. Built for the culture.
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