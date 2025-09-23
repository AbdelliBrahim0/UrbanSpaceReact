import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const DiscountShowcase = () => {
  const discountTiers = [
    {
      id: 1,
      title: "GANG PREMIUM",
      discount: "70%",
      originalPrice: "",
      newPrice: "89€",
      items: ["Hoodies exclusifs", "Sneakers limitées", "Accessoires premium"],
      icon: "Crown",
      gradient: "from-accent to-error"
    },
    {
      id: 2,
      title: "STREET ELITE",
      discount: "60%",
      originalPrice: "",
      newPrice: "",
      items: ["T-shirts design", "Casquettes custom", "Sacs streetwear"],
      icon: "Star",
      gradient: "from-error to-warning"
    },
    {
      id: 3,
      title: "URBAN BASIC",
      discount: "50%",
      originalPrice: "",
      newPrice: "",
      items: ["Basiques urbains", "Stickers gang", "Pins collection"],
      icon: "Zap",
      gradient: "from-warning to-success"
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        className="text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
          RÉDUCTIONS EXPLOSIVES
        </h2>
        <p className="text-text-secondary font-body text-lg max-w-2xl mx-auto">
          Des prix jamais vus sur notre collection streetwear. 
          Profitez de ces offres limitées avant qu'il ne soit trop tard !
        </p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {discountTiers?.map((tier, index) => (
          <motion.div
            key={tier?.id}
            className="relative group"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Glowing Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${tier?.gradient} opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity duration-300`}></div>
            
            <div className="relative bg-surface/90 backdrop-blur-lg border border-border rounded-2xl p-6 h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${tier?.gradient} rounded-xl flex items-center justify-center`}>
                  <Icon name={tier?.icon} size={24} className="text-white" />
                </div>
                <motion.div
                  className={`text-3xl font-heading font-bold bg-gradient-to-r ${tier?.gradient} bg-clip-text text-transparent`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  -{tier?.discount}
                </motion.div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                {tier?.title}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-heading font-bold text-accent">
                    {tier?.newPrice}
                  </span>
                  <span className="text-lg text-text-secondary line-through">
                    {tier?.originalPrice}
                  </span>
                </div>
                <div className="text-sm font-caption text-success mt-1">
                  Économisez {parseInt(tier?.originalPrice) - parseInt(tier?.newPrice)}€
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {tier?.items?.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className="flex items-center space-x-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: (index * 0.2) + (itemIndex * 0.1) }}
                  >
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-text-secondary font-body text-sm">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Action Button */}
              <motion.button
                className={`w-full mt-6 bg-gradient-to-r ${tier?.gradient} text-white font-heading font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                PROFITER MAINTENANT
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DiscountShowcase;