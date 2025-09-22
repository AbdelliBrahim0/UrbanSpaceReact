import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExclusiveAccess = () => {
  const [isVipMember, setIsVipMember] = useState(false);

  const accessLevels = [
    {
      id: 1,
      title: "MEMBRE STANDARD",
      discount: "50%",
      features: [
        "Accès aux offres Black Hour",
        "Réduction sur articles sélectionnés",
        "Livraison standard gratuite",
        "Support client prioritaire"
      ],
      icon: "User",
      color: "success",
      available: true
    },
    {
      id: 2,
      title: "MEMBRE VIP",
      discount: "70%",
      features: [
        "Accès exclusif 30min avant",
        "Réduction maximale garantie",
        "Livraison express gratuite",
        "Articles en avant-première",
        "Support VIP 24/7"
      ],
      icon: "Crown",
      color: "accent",
      available: false,
      requirement: "Commandes &gt; 500€"
    },
    {
      id: 3,
      title: "GANG ELITE",
      discount: "80%",
      features: [
        "Accès exclusif 1h avant",
        "Réduction maximale + bonus",
        "Livraison premium gratuite",
        "Articles collector exclusifs",
        "Concierge personnel",
        "Événements privés"
      ],
      icon: "Zap",
      color: "error",
      available: false,
      requirement: "Invitation uniquement"
    }
  ];

  const vipBenefits = [
    {
      icon: "Clock",
      title: "Accès Anticipé",
      description: "Profitez des offres 30 minutes avant les autres membres"
    },
    {
      icon: "Shield",
      title: "Garantie Stock",
      description: "Vos articles favoris réservés pendant 15 minutes"
    },
    {
      icon: "Truck",
      title: "Livraison Express",
      description: "Livraison gratuite en 24h partout en France"
    },
    {
      icon: "Gift",
      title: "Bonus Exclusifs",
      description: "Cadeaux surprise et réductions supplémentaires"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
          ACCÈS EXCLUSIF
        </h2>
        <p className="text-text-secondary font-body text-lg max-w-2xl mx-auto">
          Différents niveaux d'accès pour maximiser vos économies pendant la Black Hour
        </p>
      </motion.div>
      {/* Access Levels */}
      <div className="grid lg:grid-cols-3 gap-6">
        {accessLevels?.map((level, index) => (
          <motion.div
            key={level?.id}
            className={`relative group ${level?.available ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            whileHover={level?.available ? { scale: 1.02 } : {}}
          >
            {/* Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br from-${level?.color}/20 to-${level?.color}/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            
            <div className={`relative border-2 rounded-2xl p-6 h-full transition-all duration-300 ${
              level?.available 
                ? `bg-surface/90 backdrop-blur-lg border-${level?.color}/30 hover:border-${level?.color}/60` 
                : 'bg-surface/50 border-border opacity-60'
            }`}>
              {/* Unavailable Overlay */}
              {!level?.available && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                  <div className="text-center">
                    <Icon name="Lock" size={32} className="text-text-secondary mx-auto mb-2" />
                    <div className="text-sm font-caption text-text-secondary">
                      {level?.requirement}
                    </div>
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 bg-${level?.color}/20 rounded-xl flex items-center justify-center`}>
                  <Icon name={level?.icon} size={24} className={`text-${level?.color}`} />
                </div>
                <motion.div
                  className={`text-3xl font-heading font-bold text-${level?.color}`}
                  animate={level?.available ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  -{level?.discount}
                </motion.div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-heading font-bold text-foreground mb-6">
                {level?.title}
              </h3>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {level?.features?.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 bg-${level?.color} rounded-full mt-2 flex-shrink-0`}></div>
                    <span className="text-text-secondary font-body text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <Button
                variant={level?.available ? "default" : "outline"}
                disabled={!level?.available}
                fullWidth
                className={level?.available ? `bg-${level?.color} hover:bg-${level?.color}/80` : ''}
              >
                {level?.available ? 'ACCÉDER MAINTENANT' : 'NON DISPONIBLE'}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      {/* VIP Benefits Section */}
      <motion.div
        className="bg-gradient-to-r from-accent/10 via-error/10 to-accent/10 rounded-2xl p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Crown" size={32} className="text-accent" />
            <h3 className="text-2xl font-heading font-bold text-foreground">
              AVANTAGES VIP
            </h3>
            <Icon name="Crown" size={32} className="text-accent" />
          </div>
          <p className="text-text-secondary font-body">
            Découvrez les privilèges exclusifs des membres VIP
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vipBenefits?.map((benefit, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + (index * 0.1) }}
            >
              <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-colors duration-300">
                <Icon name={benefit?.icon} size={28} className="text-accent" />
              </div>
              <h4 className="font-heading font-bold text-foreground mb-2">
                {benefit?.title}
              </h4>
              <p className="text-text-secondary font-body text-sm">
                {benefit?.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Button
            variant="default"
            iconName="ArrowRight"
            iconPosition="right"
            className="bg-accent hover:bg-accent/80"
          >
            DEVENIR MEMBRE VIP
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ExclusiveAccess;