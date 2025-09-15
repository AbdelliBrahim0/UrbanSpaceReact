import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Secure Payments',
      description: 'SSL encrypted checkout',
      color: 'text-success'
    },
    {
      icon: 'Truck',
      title: 'Free Shipping',
      description: 'On orders over $75',
      color: 'text-accent'
    },
    {
      icon: 'RotateCcw',
      title: '30-Day Returns',
      description: 'Hassle-free returns',
      color: 'text-warning'
    },
    {
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Always here to help',
      color: 'text-success'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Marcus Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      comment: "Amazing quality streetwear! The sale prices are unbeatable and shipping was super fast.",
      verified: true,
      purchase: "Urban Bomber Jacket"
    },
    {
      id: 2,
      name: "Sofia Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      comment: "Love the authentic street style. Got 3 hoodies during the flash sale - incredible deals!",
      verified: true,
      purchase: "Hypebeast Hoodie Collection"
    },
    {
      id: 3,
      name: "Tyler Chen",
      avatar: "https://randomuser.me/api/portraits/men/18.jpg",
      rating: 5,
      comment: "Best streetwear site hands down. The limited drops are fire and customer service is top tier.",
      verified: true,
      purchase: "Graffiti Cargo Pants"
    }
  ];

  const paymentMethods = [
    { name: 'Visa', icon: 'CreditCard' },
    { name: 'Mastercard', icon: 'CreditCard' },
    { name: 'PayPal', icon: 'Wallet' },
    { name: 'Apple Pay', icon: 'Smartphone' },
    { name: 'Google Pay', icon: 'Smartphone' },
    { name: 'Crypto', icon: 'Bitcoin' }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Features */}
      <div className="bg-surface border border-street rounded-lg p-6">
        <h3 className="text-lg font-heading font-bold text-foreground mb-6 text-center">
          Why Shop With Us
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trustFeatures?.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center space-y-2"
            >
              <div className={`w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center ${feature?.color}`}>
                <Icon name={feature?.icon} size={24} />
              </div>
              <h4 className="font-medium text-foreground text-sm">
                {feature?.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {feature?.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Customer Reviews */}
      <div className="bg-surface border border-street rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-bold text-foreground">
            Customer Reviews
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)]?.map((_, i) => (
                <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">4.9/5 (2,847 reviews)</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {testimonials?.map((testimonial, index) => (
            <motion.div
              key={testimonial?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-muted rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground text-sm">
                      {testimonial?.name}
                    </h4>
                    {testimonial?.verified && (
                      <Icon name="BadgeCheck" size={14} className="text-accent" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial?.rating)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                "{testimonial?.comment}"
              </p>
              
              <div className="text-xs text-accent">
                Verified purchase: {testimonial?.purchase}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Payment Methods & Security */}
      <div className="bg-surface border border-street rounded-lg p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-heading font-bold text-foreground mb-4">
              Secure Payment Options
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {paymentMethods?.map((method, index) => (
                <div
                  key={index}
                  className="bg-muted rounded-lg p-3 flex flex-col items-center space-y-2 hover:bg-accent/10 transition-street"
                >
                  <Icon name={method?.icon} size={20} className="text-accent" />
                  <span className="text-xs text-muted-foreground font-medium">
                    {method?.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Security Badges */}
          <div>
            <h3 className="text-lg font-heading font-bold text-foreground mb-4">
              Security & Trust
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Shield" size={20} className="text-success" />
                <div>
                  <p className="text-sm font-medium text-foreground">SSL Encrypted</p>
                  <p className="text-xs text-muted-foreground">256-bit security encryption</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Lock" size={20} className="text-success" />
                <div>
                  <p className="text-sm font-medium text-foreground">PCI Compliant</p>
                  <p className="text-xs text-muted-foreground">Secure payment processing</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="BadgeCheck" size={20} className="text-success" />
                <div>
                  <p className="text-sm font-medium text-foreground">Verified Merchant</p>
                  <p className="text-xs text-muted-foreground">Trusted by 50K+ customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;