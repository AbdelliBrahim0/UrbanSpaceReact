import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const EventMechanics = () => {
  const mechanics = [
    {
      id: 1,
      step: "01",
      title: "INSCRIPTION EXPRESS",
      description: "Créez votre compte UrbanSpace en moins de 2 minutes pour accéder aux offres exclusives.",
      icon: "UserPlus",
      color: "accent"
    },
    {
      id: 2,
      step: "02",
      title: "SÉLECTION RAPIDE",
      description: "Parcourez notre catalogue et ajoutez vos articles préférés au panier avant la fin du timer.",
      icon: "ShoppingCart",
      color: "success"
    },
    {
      id: 3,
      step: "03",
      title: "VALIDATION IMMÉDIATE",
      description: "Finalisez votre commande avec notre système sécurisé en un clic.",
      icon: "CreditCard",
      color: "warning"
    },
    {
      id: 4,
      step: "04",
      title: "LIVRAISON EXPRESS",
      description: "Recevez vos articles streetwear en 24-48h partout en Grand Tunis.",
      icon: "Truck",
      color: "error"
    }
  ];

  const eligibilityCriteria = [
    "Être membre UrbanSpace (inscription gratuite)",
    "Stock limité - Premier arrivé, premier servi",
    "Offre valable uniquement pendant la Black Hour",
    "Une commande par membre maximum",
    "Livraison en Grand Tunis uniquement"
  ];

  return (
    <div className="space-y-12">
      {/* How it Works Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            COMMENT ÇA MARCHE ?
          </h2>
          <p className="text-text-secondary font-body text-lg">
            4 étapes simples pour profiter des offres Black Hour
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mechanics?.map((mechanic, index) => (
            <motion.div
              key={mechanic?.id}
              className="relative group"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              {/* Connection Line */}
              {index < mechanics?.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent to-transparent z-10"></div>
              )}

              <div className="relative bg-surface/80 backdrop-blur-sm border border-border rounded-xl p-6 h-full hover:border-accent/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-heading font-bold text-sm">
                  {mechanic?.step}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 bg-${mechanic?.color}/20 rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                  <Icon name={mechanic?.icon} size={32} className={`text-${mechanic?.color}`} />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                    {mechanic?.title}
                  </h3>
                  <p className="text-text-secondary font-body text-sm leading-relaxed">
                    {mechanic?.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Eligibility Section */}
      <motion.div
        className="bg-surface/50 backdrop-blur-sm border border-border rounded-2xl p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center">
            <Icon name="AlertCircle" size={24} className="text-warning" />
          </div>
          <div>
            <h3 className="text-2xl font-heading font-bold text-foreground">
              CONDITIONS D'ÉLIGIBILITÉ
            </h3>
            <p className="text-text-secondary font-body">
              Vérifiez que vous remplissez tous les critères
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {eligibilityCriteria?.map((criterion, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-background/50 transition-colors duration-200"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + (index * 0.1) }}
            >
              <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Check" size={14} className="text-success" />
              </div>
              <span className="text-text-secondary font-body text-sm leading-relaxed">
                {criterion}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Warning Notice */}
        <motion.div
          className="mt-6 p-4 bg-error/10 border border-error/30 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-error" />
            <span className="font-heading font-bold text-error">ATTENTION</span>
          </div>
          <p className="text-text-secondary font-body text-sm mt-2">
            Les stocks sont limités et les offres ne sont valables que pendant la durée de la Black Hour. 
            Une fois le timer écoulé, les prix reviennent à la normale.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EventMechanics;