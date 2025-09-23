import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const InteractiveElements = ({ onNavigate }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const interactiveCards = [
    {
      id: 'products',
      title: 'Catalogue Produits',
      description: 'Découvrez notre collection complète de streetwear urbain avec des designs uniques.',
      icon: 'ShoppingBag',
      color: 'accent',
      route: '/collections',
      stats: '200+ Articles'
    },
    {
      id: 'blackhour',
      title: 'Black Hour',
      description: 'Ventes flash ultra-limitées avec des réductions exceptionnelles pendant 1 heure seulement.',
      icon: 'Clock',
      color: 'warning',
      route: '/black-hour',
      stats: 'Jusqu\'à 80% OFF'
    },
    {
      id: 'member',
      title: 'Profitez des réductions VIP',
      description: 'Bénéficiez de réductions exclusives et profitez de nos offres spéciales.',
      icon: 'Crown',
      color: 'success',
      route: '/sale',
      stats: 'Accès VIP'
    }
  ];

  const handleCardClick = (route) => {
    onNavigate(route);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-surface to-black relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-success mb-6">
            EXPLOREZ URBANSPACE
          </h2>
          <p className="text-xl text-text-secondary font-body max-w-2xl mx-auto">
            Plongez dans l'univers du streetwear urbain et découvrez tout ce que nous avons à offrir.
          </p>
        </motion.div>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {interactiveCards?.map((card, index) => (
            <motion.div
              key={card?.id}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: hoveredCard === card?.id ? 10 : 0,
                z: 50
              }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCard(card?.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group cursor-pointer"
              onClick={() => handleCardClick(card?.route)}
            >
              <div className="relative bg-card border border-border rounded-3xl p-8 h-full overflow-hidden hover:border-accent/50 transition-all duration-500">
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${card?.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                {/* Stats Badge */}
                <motion.div
                  animate={{ 
                    scale: hoveredCard === card?.id ? [1, 1.1, 1] : 1 
                  }}
                  transition={{ duration: 0.5 }}
                  className={`absolute top-6 right-6 bg-${card?.color}/20 text-${card?.color} px-3 py-1 rounded-full text-sm font-bold`}
                >
                  {card?.stats}
                </motion.div>

                {/* Icon */}
                <motion.div
                  animate={{ 
                    rotate: hoveredCard === card?.id ? [0, 10, -10, 0] : 0,
                    scale: hoveredCard === card?.id ? 1.1 : 1
                  }}
                  transition={{ duration: 0.5 }}
                  className={`w-20 h-20 bg-gradient-to-br from-${card?.color} to-${card?.color}/70 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-${card?.color}/25`}
                >
                  <Icon name={card?.icon} size={32} className="text-white" />
                </motion.div>

                {/* Content */}
                <h3 className={`text-2xl font-heading font-bold text-foreground mb-4 group-hover:text-${card?.color} transition-colors duration-300`}>
                  {card?.title}
                </h3>
                
                <p className="text-text-secondary font-body leading-relaxed mb-6">
                  {card?.description}
                </p>

                {/* Action Button */}
                <motion.div
                  animate={{ 
                    x: hoveredCard === card?.id ? 10 : 0 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    variant="ghost"
                    iconName="ArrowRight"
                    iconPosition="right"
                    className={`text-${card?.color} hover:bg-${card?.color}/10 p-0 font-bold uppercase tracking-wider`}
                  >
                    Explorer
                  </Button>
                </motion.div>

                {/* Animated Border */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: hoveredCard === card?.id ? 1 : 0,
                    opacity: hoveredCard === card?.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 rounded-3xl border-2 border-${card?.color}/50`}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-surface/50 backdrop-blur-lg border border-accent/30 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
              Expérience Interactive Complète
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <Icon name="MousePointer" size={20} className="text-accent" />
                </div>
                <div className="text-left">
                  <h4 className="font-heading font-bold text-foreground">Navigation Fluide</h4>
                  
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                </div>
                
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center">
                  <Icon name="Zap" size={20} className="text-warning" />
                </div>
                <div className="text-left">
                  <h4 className="font-heading font-bold text-foreground">Assistance 24/7</h4>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="lg"
              iconName="Play"
              iconPosition="left"
              className="border-accent text-accent hover:bg-accent hover:text-white px-8 py-4 font-bold uppercase tracking-wider"
            >
              <Link to="/homepage">Commencer l'Exploration</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveElements;