import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
import ScrollVelocity from './components/ScrollVelocity';
import StickerPeel from './components/StickerPeel';
const Homepage = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

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
        <div className="w-full overflow-hidden">
        <ScrollVelocity   
            texts={[
              <span key="text1" style={{ whiteSpace: 'nowrap' }}>
                <span style={{ color: '#00ffc3' }}>U</span>rban <span style={{ color: '#00ffc3' }}>S</span>pace : Style infini.
              </span>,
              <span key="text2">
                <span style={{ color: '#00ffc3' }}>Vibe</span> urbaine. <span style={{ color: '#00ffc3' }}>Mode</span>, liberté.
              </span>
            ]}
            className="whitespace-nowrap"
            velocity={50}
            velocityMapping={{
              input: [0, 500],
              output: [0, 3],
            }}
          />
          <div className="mt-8 flex justify-center w-full mb-12 md:mb-0">
            <StickerPeel 
              imageSrc="/logo.png"
              rotate={15}
            />
          </div>
        </div>

        {/* Espace de 1cm */}
        <div style={{ height: '50px' }}></div>

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
                originalPrice="299"
                discountedPrice="199"
                description="T-shirts, pulls et vestes à prix cassés"
                isLimited={true}
                onActionClick={() => console.log('Voir les vêtements')}
              />
              <DiscountCard 
                discount="60"
                category="Chaussures"
                originalPrice="549"
                discountedPrice="399"
                description="Les meilleures paires aux meilleurs prix"
                isLimited={true}
                onActionClick={() => console.log('Voir les chaussures')}
              />
              <DiscountCard 
                discount="50"
                category="Accessoires"
                originalPrice="200"
                discountedPrice="149"
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
          text="DERNIERE CHANCE"
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
        <div className="hidden md:block">
          <LiveNotifications />
        </div>
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
                Streetwear authentique pour la culture. Qualité premium, drops limités, attitude illimitée.
              </p>
              
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-bold text-foreground mb-4">BOUTIQUE</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/homepage" className="text-text-secondary hover:text-accent transition-street">Accueil</Link></li>
                <li><Link to="/collections" className="text-text-secondary hover:text-accent transition-street">Collections</Link></li>
                <li><Link to="/sale" className="text-text-secondary hover:text-accent transition-street">Remise</Link></li>
                <li><Link to="/black-friday" className="text-text-secondary hover:text-accent transition-street">Black Friday</Link></li>
                <li><Link to="/black-hour" className="text-text-secondary hover:text-accent transition-street">Black Hour</Link></li>
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

          {/* Bottom Bar */}
          <div className="border-t border-street pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-secondary text-sm order-2 md:order-1">
              © {new Date()?.getFullYear()} UrbanSpace. Tous droits réservés.
            </p>
            <p style={{ fontFamily: 'Dancing Script, cursive', color: '#FFD700' }} className="text-sm order-1 md:order-2 mb-4 md:mb-0">
              code by 3b2li || decode if you can.
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Homepage;