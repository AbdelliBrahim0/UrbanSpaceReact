import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SocialProof = () => {
  const [liveStats, setLiveStats] = useState({
    activeUsers: 1247,
    itemsSold: 892,
    timeLeft: '2h 47m'
  });

  const testimonials = [
    {
      id: 1,
      name: "Marie L.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "Incroyable ! J\'ai économisé 180€ sur ma commande. La qualité est au rendez-vous !",
      purchase: "Hoodie Gang Premium",
      timeAgo: "Il y a 2 minutes",
      verified: true
    },
    {
      id: 2,
      name: "Alex R.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "Black Hour = le meilleur moment pour acheter ! Livraison ultra rapide en plus.",
      purchase: "Sneakers Street Edition",
      timeAgo: "Il y a 5 minutes",
      verified: true
    },
    {
      id: 3,
      name: "Sarah M.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "Je recommande à 100% ! Le style UrbanSpace est unique et les prix défient toute concurrence.",
      purchase: "Pack Accessoires Urban",
      timeAgo: "Il y a 8 minutes",
      verified: true
    }
  ];

  const liveActivities = [
    "Emma vient de commander un Hoodie Gang (-70%)",
    "Lucas a ajouté 3 articles à son panier",
    "Chloé a rejoint le programme VIP",
    "Thomas vient de finaliser sa commande (189€ économisés)",
    "Léa a partagé sa commande sur Instagram",
    "Maxime vient de s\'inscrire à UrbanSpace"
  ];

  const [currentActivity, setCurrentActivity] = useState(0);

  useEffect(() => {
    const statsInterval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        activeUsers: prev?.activeUsers + Math.floor(Math.random() * 20) - 10,
        itemsSold: prev?.itemsSold + Math.floor(Math.random() * 5)
      }));
    }, 3000);

    const activityInterval = setInterval(() => {
      setCurrentActivity(prev => (prev + 1) % liveActivities?.length);
    }, 2500);

    return () => {
      clearInterval(statsInterval);
      clearInterval(activityInterval);
    };
  }, [liveActivities?.length]);

  return (
    <div className="space-y-8">
      {/* Live Stats Bar */}
      <motion.div
        className="bg-surface/80 backdrop-blur-sm border border-border rounded-2xl p-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="text-center"
            key={liveStats?.activeUsers}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-2xl font-heading font-bold text-success">
                {liveStats?.activeUsers?.toLocaleString()}
              </span>
            </div>
            <div className="text-sm font-caption text-text-secondary">
              Utilisateurs actifs
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            key={liveStats?.itemsSold}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="ShoppingBag" size={16} className="text-accent" />
              <span className="text-2xl font-heading font-bold text-accent">
                {liveStats?.itemsSold}
              </span>
            </div>
            <div className="text-sm font-caption text-text-secondary">
              Articles vendus
            </div>
          </motion.div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-error" />
              <span className="text-2xl font-heading font-bold text-error">
                {liveStats?.timeLeft}
              </span>
            </div>
            <div className="text-sm font-caption text-text-secondary">
              Temps restant
            </div>
          </div>
        </div>
      </motion.div>
      {/* Live Activity Feed */}
      <motion.div
        className="bg-surface/50 backdrop-blur-sm border border-border rounded-xl p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
          <span className="font-heading font-bold text-foreground text-sm">
            ACTIVITÉ EN DIRECT
          </span>
        </div>
        
        <motion.div
          key={currentActivity}
          className="text-text-secondary font-body text-sm"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {liveActivities?.[currentActivity]}
        </motion.div>
      </motion.div>
      {/* Customer Testimonials */}
      <div className="space-y-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
            ILS ONT PROFITÉ DE LA BLACK HOUR
          </h3>
          <p className="text-text-secondary font-body">
            Découvrez les témoignages de nos membres satisfaits
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials?.map((testimonial, index) => (
            <motion.div
              key={testimonial?.id}
              className="bg-surface/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-accent/30 transition-all duration-300"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + (index * 0.1), duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <img
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {testimonial?.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-heading font-bold text-foreground text-sm">
                      {testimonial?.name}
                    </span>
                    {testimonial?.verified && (
                      <Icon name="BadgeCheck" size={16} className="text-success" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial?.rating)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
                    ))}
                  </div>
                </div>
                <div className="text-xs font-caption text-text-secondary">
                  {testimonial?.timeAgo}
                </div>
              </div>

              {/* Comment */}
              <p className="text-text-secondary font-body text-sm mb-4 leading-relaxed">
                "{testimonial?.comment}"
              </p>

              {/* Purchase Info */}
              <div className="flex items-center space-x-2 p-3 bg-background/50 rounded-lg">
                <Icon name="ShoppingBag" size={14} className="text-accent" />
                <span className="text-xs font-caption text-text-secondary">
                  A acheté : {testimonial?.purchase}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Trust Badges */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {[
          { icon: "Shield", text: "Paiement sécurisé", color: "success" },
          { icon: "Truck", text: "Livraison 24-48h", color: "accent" },
          { icon: "RotateCcw", text: "Retour gratuit", color: "warning" },
          { icon: "Headphones", text: "Support 24/7", color: "error" }
        ]?.map((badge, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-2 p-3 bg-surface/50 rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Icon name={badge?.icon} size={16} className={`text-${badge?.color}`} />
            <span className="text-xs font-caption text-text-secondary">
              {badge?.text}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SocialProof;