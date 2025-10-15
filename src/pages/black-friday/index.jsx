import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CountdownTimer from './components/CountdownTimer';
import HeroSection from './components/HeroSection';
import FlashSaleCarousel from './components/FlashSaleCarousel';
import DealGrid from './components/DealGrid';
import LiveNotifications from './components/LiveNotifications';
import EventWrapper from '../../components/EventWrapper';

const BlackFridayContent = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Black Friday Mega Sale - UrbanSpace | Up to 80% Off';
    
    // Add special Black Friday meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 'Black Friday mega sale at UrbanSpace! Up to 80% off premium streetwear, limited time deals, and exclusive collections. Shop now before deals expire!');
    }

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const handleCountdownExpire = () => {
    console.log('Black Friday deals have expired!');
    // Here you could redirect to a different page or show expired deals message
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Page Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Countdown Timer Section */}
        <section className="py-16 bg-gradient-to-br from-background via-surface to-background">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-surface/50 backdrop-blur-sm border border-accent/30 rounded-2xl p-8 md:p-12"
            >
              <CountdownTimer 
                onExpire={handleCountdownExpire}
              />
            </motion.div>
          </div>
        </section>

        {/* Deal Grid */}
        <DealGrid />

        {/* Flash Sale Carousel */}
        <FlashSaleCarousel />


        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-br from-surface via-background to-surface">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                À NE PAS MANQUER!
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ces offres du Black Friday ne dureront pas éternellement. Rejoignez la révolution streetwear et profitez de vos articles préférés avant qu'ils ne disparaissent.
              </p>
              
            </motion.div>
          </div>
        </section>
      </main>
      {/* Live Notifications */}
      <LiveNotifications />
      {/* Footer */}
      <footer className="bg-background border-t border-street py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
                  <span className="text-accent-foreground font-heading font-bold text-lg">S</span>
                </div>
                <span className="font-heading font-bold text-xl text-foreground">
                 UrbanSpace 
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Streetwear haut de gamme pour la culture urbaine. Des vêtements authentiques et un style incomparable.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading font-bold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/collections" className="hover:text-accent transition-colors">Collections</a></li>
                <li><a href="/sale" className="hover:text-accent transition-colors">Sale</a></li>
                <li><a href="/black-hour" className="hover:text-accent transition-colors">Black Hour</a></li>
                <li><a href="/product-detail" className="hover:text-accent transition-colors">New Arrivals</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-heading font-bold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-heading font-bold text-foreground mb-4">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Bénéficiez d'offres exclusives et d'un accès anticipé aux nouvelles versions.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 bg-surface border border-street rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
                />
                <button className="bg-accent text-accent-foreground px-4 py-2 rounded-r-lg text-sm font-bold hover:bg-accent/90 transition-colors">
                  S'abonner'
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-street mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} UrbanSpace. All rights reserved. | Black Friday Sale - Limited Time Only</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const BlackFridayPage = () => {
  return (
    <EventWrapper 
      eventType="black_friday"
      fallbackRoute="/black-friday-event"
    >
      <BlackFridayContent />
    </EventWrapper>
  );
};

export default BlackFridayPage;