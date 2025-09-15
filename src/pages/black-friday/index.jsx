import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import CountdownTimer from './components/CountdownTimer';
import HeroSection from './components/HeroSection';
import FlashSaleCarousel from './components/FlashSaleCarousel';
import DealGrid from './components/DealGrid';
import LiveNotifications from './components/LiveNotifications';

const BlackFridayPage = () => {
  // Black Friday end date - November 24, 2025 at 11:59 PM
  const blackFridayEndDate = new Date('2025-11-24T23:59:59');

  useEffect(() => {
    // Set page title
    document.title = 'Black Friday Mega Sale - StreetVault | Up to 80% Off';
    
    // Add special Black Friday meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 'Black Friday mega sale at StreetVault! Up to 80% off premium streetwear, limited time deals, and exclusive collections. Shop now before deals expire!');
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
                targetDate={blackFridayEndDate}
                onExpire={handleCountdownExpire}
              />
            </motion.div>
          </div>
        </section>

        {/* Flash Sale Carousel */}
        <FlashSaleCarousel />

        {/* Deal Grid */}
        <DealGrid />

        
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
                DON'T MISS OUT!
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                These Black Friday deals won't last forever. Join the streetwear revolution and grab your favorites before they're gone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300"
                >
                  SHOP ALL DEALS
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-warning text-warning hover:bg-warning hover:text-warning-foreground font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300"
                >
                  JOIN NEWSLETTER
                </motion.button>
              </div>
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
                  StreetVault
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Premium streetwear for the urban culture. Authentic gear, unbeatable style.
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
                Get exclusive deals and early access to new drops.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 bg-surface border border-street rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
                />
                <button className="bg-accent text-accent-foreground px-4 py-2 rounded-r-lg text-sm font-bold hover:bg-accent/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-street mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} StreetVault. All rights reserved. | Black Friday Sale - Limited Time Only</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlackFridayPage;