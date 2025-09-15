import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Secure Checkout',
      description: '256-bit SSL encryption protects your data',
      color: 'text-success'
    },
    {
      icon: 'Truck',
      title: 'Free Express Shipping',
      description: 'On orders over $100 during Black Friday',
      color: 'text-accent'
    },
    {
      icon: 'RotateCcw',
      title: '30-Day Returns',
      description: 'Easy returns and exchanges guaranteed',
      color: 'text-warning'
    },
    {
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Live chat and phone support available',
      color: 'text-accent'
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

  const testimonials = [
    {
      id: 1,
      name: "Marcus Johnson",
      rating: 5,
      comment: "Best streetwear deals I\'ve ever seen! Quality is amazing and shipping was super fast.",
      verified: true,
      purchase: "Supreme Hoodie Collection"
    },
    {
      id: 2,
      name: "Sofia Rodriguez",
      rating: 5,
      comment: "StreetVault never disappoints. Got my Black Friday order in 2 days!",
      verified: true,
      purchase: "Jordan Retro Sneakers"
    },
    {
      id: 3,
      name: "Tyler Chen",
      rating: 5,
      comment: "Authentic gear, unbeatable prices. This Black Friday sale is insane!",
      verified: true,
      purchase: "Bomber Jacket"
    }
  ];

  const stats = [
    { number: '500K+', label: 'Happy Customers' },
    { number: '99.8%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Customer Support' },
    { number: '100%', label: 'Authentic Products' }
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4"
          >
            SHOP WITH CONFIDENCE
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your security and satisfaction are our top priorities. Join thousands of satisfied streetwear enthusiasts.
          </p>
        </div>

        {/* Trust Features */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {trustFeatures?.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-background border border-street rounded-xl hover:border-accent/50 transition-all duration-300"
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-current/10 flex items-center justify-center ${feature?.color}`}>
                <Icon name={feature?.icon} size={24} className="text-current" />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-2">
                {feature?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature?.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats?.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="text-center p-6 bg-background border border-accent/30 rounded-xl"
            >
              <div className="text-3xl md:text-4xl font-heading font-bold text-accent mb-2">
                {stat?.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat?.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-xl font-heading font-bold text-foreground mb-6">
            SECURE PAYMENT OPTIONS
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {paymentMethods?.map((method, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="flex items-center space-x-2 bg-background border border-street rounded-lg px-4 py-3 hover:border-accent/50 transition-all duration-300"
              >
                <Icon name={method?.icon} size={20} className="text-accent" />
                <span className="text-sm font-medium text-foreground">
                  {method?.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Customer Testimonials */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-heading font-bold text-foreground text-center mb-8">
            WHAT OUR CUSTOMERS SAY
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials?.map((testimonial, index) => (
              <motion.div
                key={testimonial?.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background border border-street rounded-xl p-6 hover:border-accent/50 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial?.rating)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className="text-warning fill-current"
                      />
                    ))}
                  </div>
                  {testimonial?.verified && (
                    <div className="ml-auto flex items-center space-x-1 text-success">
                      <Icon name="CheckCircle" size={16} />
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  "{testimonial?.comment}"
                </p>
                
                <div className="border-t border-street pt-4">
                  <div className="font-medium text-foreground text-sm">
                    {testimonial?.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Purchased: {testimonial?.purchase}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Badges */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-sm font-medium">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={20} className="text-success" />
              <span className="text-sm font-medium">PCI Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span className="text-sm font-medium">Verified Merchant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} className="text-success" />
              <span className="text-sm font-medium">A+ Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignals;