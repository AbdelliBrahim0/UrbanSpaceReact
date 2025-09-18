import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const benefits = [
    {
      icon: "Zap",
      title: "FIRST ACCESS",
      description: "Get early access to limited drops before they sell out"
    },
    {
      icon: "Tag",
      title: "EXCLUSIVE DEALS",
      description: "Member-only discounts and special pricing on premium pieces"
    },
    {
      icon: "Crown",
      title: "VIP TREATMENT",
      description: "Priority customer service and exclusive vault member perks"
    },
    {
      icon: "Truck",
      title: "FREE SHIPPING",
      description: "Complimentary shipping on all orders for newsletter subscribers"
    }
  ];

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!email?.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(0, 255, 136, 0.3)",
        "0 0 40px rgba(0, 255, 136, 0.5)",
        "0 0 20px rgba(0, 255, 136, 0.3)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-16 lg:py-24 px-4 lg:px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center bg-surface border border-accent rounded-2xl p-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Icon name="Check" size={32} className="text-accent-foreground" />
            </motion.div>

            <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground mb-4">
              WELCOME TO THE <span className="text-accent">VAULT</span>
            </h2>
            
            <p className="text-text-secondary text-lg mb-8">
              You're now part of the inner circle. Get ready for exclusive drops, early access, and street culture updates.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                iconName="ShoppingBag"
                iconPosition="left"
              >
                START SHOPPING
              </Button>
              
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                iconName="Users"
                iconPosition="left"
              >
                JOIN COMMUNITY
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 px-4 lg:px-6 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-error rounded-full blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content Side */}
          <div>
            <motion.div variants={itemVariants}>
              <h2 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl text-foreground mb-6">
                JOIN THE <span className="text-accent">UNDERGROUND</span>
              </h2>
              
              <p className="text-text-secondary text-lg md:text-xl mb-8 leading-relaxed">
                Get exclusive access to limited drops, street culture updates, and member-only deals. 
                Be the first to know when fire pieces drop.
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            >
              {benefits?.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start space-x-3 p-4 bg-surface border border-street rounded-lg hover:border-accent transition-street"
                >
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name={benefit?.icon} size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-foreground mb-1">
                      {benefit?.title}
                    </h4>
                    <p className="text-text-secondary text-xs leading-relaxed">
                      {benefit?.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-4 text-text-secondary text-sm"
            >
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                ]?.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`Member ${index + 1}`}
                    className="w-8 h-8 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <span>Join 50,000+ street culture enthusiasts</span>
            </motion.div>
          </div>

          {/* Form Side */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              variants={glowVariants}
              animate="animate"
              className="bg-surface border border-street rounded-2xl p-8 lg:p-12"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={32} className="text-accent" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-2">
                  GET VAULT ACCESS
                </h3>
                <p className="text-text-secondary">
                  Enter your email to unlock exclusive streetwear drops
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="email"
                  label="Email Address"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  error={error}
                  required
                  className="text-center"
                />

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  loading={isLoading}
                  fullWidth
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold tracking-wide"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  {isLoading ? 'JOINING...' : 'JOIN THE VAULT'}
                </Button>

                <p className="text-text-secondary text-xs text-center">
                  By subscribing, you agree to receive marketing emails from UrbanSpace. 
                  You can unsubscribe at any time. Privacy policy applies.
                </p>
              </form>

              {/* Trust Badges */}
              <div className="flex justify-center items-center space-x-6 mt-8 pt-6 border-t border-street">
                <div className="flex items-center space-x-2 text-text-secondary text-xs">
                  <Icon name="Shield" size={16} className="text-accent" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2 text-text-secondary text-xs">
                  <Icon name="Zap" size={16} className="text-accent" />
                  <span>Instant Access</span>
                </div>
                <div className="flex items-center space-x-2 text-text-secondary text-xs">
                  <Icon name="X" size={16} className="text-accent" />
                  <span>Unsubscribe Anytime</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full opacity-60"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-error rounded-full opacity-40"
              animate={{
                y: [0, 10, 0],
                scale: [1, 0.9, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSignup;