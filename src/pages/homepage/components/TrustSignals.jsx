import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Paiement en Livraison',
      description: 'Payez uniquement à la réception de votre commande',
      color: 'text-success'
    },
    {
      icon: 'Truck',
      title: 'Livraison Express Gratuite',
      description: ' Livraison rapide et gratuite',
      color: 'text-accent'
    },
    {
      icon: 'RotateCcw',
      title: 'Retours 7 Jours',
      description: 'Échanges et retours simplifiés et garantis',
      color: 'text-warning'
    },
    {
      icon: 'Headphones',
      title: 'Support 24/7',
      description: 'Assistance par chat en direct et téléphone',
      color: 'text-accent'
    }
  ];

  const paymentMethods = [
  { name: 'D17', icon: 'Smartphone' }, 
  { name: 'App Banque', icon: 'Smartphone' },
  { name: 'Visa', icon: 'CreditCard' },
  { name: 'Mastercard', icon: 'CreditCard' },
  { name: 'PayPal', icon: 'Wallet' }
];

  
  const stats = [
    { number: '5 K+', label: 'Clients satisfaits' },
    { number: '90.8%', label: 'Taux de satisfaction' },
    { number: '24/7', label: 'Support client' },
    { number: '100%', label: 'Produits authentiques' }
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
            ACHETEZ EN TOUTE CONFIANCE
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Votre sécurité et votre satisfaction sont notre priorité. Rejoignez des milliers de passionnés de streetwear comblés.
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
            Moyens de paiement à venir
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
          
          
        </motion.div>

        {/* Security Badges */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignals;
