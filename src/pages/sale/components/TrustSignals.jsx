import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
     {
      icon: 'Shield',
      title: 'Paiements Sécurisés',
      description: '',
      color: 'text-success'
    },
    {
      icon: 'Truck',
      title: 'Livraison Gratuite',
      description: ' ',
      color: 'text-accent'
    },
    {
      icon: 'RotateCcw',
      title: 'Retours sous 7 Jours',
      description: '',
      color: 'text-warning'
    },
    {
      icon: 'Headphones',
      title: 'Support 24/7',
      description: '',
      color: 'text-success'
    }
  ];

  

  

  return (
    <div className="space-y-8">
      {/* Trust Features */}
      <div className="bg-surface border border-street rounded-lg p-6">
        <h3 className="text-lg font-heading font-bold text-foreground mb-6 text-center">
          Pourquoi acheter chez nous 
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
      
      
    </div>
  );
};

export default TrustSignals;