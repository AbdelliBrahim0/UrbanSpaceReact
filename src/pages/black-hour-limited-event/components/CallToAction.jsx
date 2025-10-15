import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e?.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  const urgencyMessages = [
    "Plus que 2h47m pour profiter des offres !",
    "Stock limité - Ne ratez pas cette chance !",
    "Déjà 892 articles vendus aujourd\'hui !",
    "Offres valables uniquement pendant la Black Hour !"
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % urgencyMessages?.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [urgencyMessages?.length]);

  return (
    <div className="space-y-8">
      {/* Main CTA Section */}
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-accent/20 via-error/20 to-accent/20 rounded-3xl p-1"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-background rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-error rounded-full blur-3xl"></div>
          </div>

          <div className="relative text-center space-y-8">
            {/* Urgency Message */}
            <motion.div
              key={currentMessage}
              className="inline-flex items-center space-x-2 bg-error/20 border border-error/30 rounded-full px-6 py-3"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Icon name="AlertTriangle" size={20} className="text-error animate-pulse" />
              <span className="font-caption font-bold text-error">
                {urgencyMessages?.[currentMessage]}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              className="space-y-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl lg:text-6xl font-heading font-bold text-foreground">
                NE RATEZ PAS
                <span className="block bg-gradient-to-r from-accent to-error bg-clip-text text-transparent">
                  LA BLACK HOUR
                </span>
              </h2>
              <p className="text-xl text-text-secondary font-body max-w-2xl mx-auto">
                Profitez de réductions exceptionnelles jusqu'à -70% sur toute notre collection streetwear. 
                Offre limitée dans le temps !
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              
            </motion.div>

            
          </div>
        </div>
      </motion.div>
      {/* Secondary Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          className="text-center p-6 bg-surface/50 backdrop-blur-sm border border-border rounded-xl hover:border-accent/30 transition-all duration-300"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-16 h-16 bg-success/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icon name="Clock" size={32} className="text-success" />
          </div>
          <h3 className="font-heading font-bold text-foreground mb-2">
            ACCÈS ANTICIPÉ
          </h3>
          <p className="text-text-secondary font-body text-sm mb-4">
            Membres VIP : accédez aux offres 30 minutes avant tout le monde
          </p>
          <Link to="/user-authentication">
            <Button variant="outline" className="border-success text-success hover:bg-success hover:text-white">
              DEVENIR VIP
            </Button>
          </Link>
        </motion.div>

        <motion.div
          className="text-center p-6 bg-surface/50 backdrop-blur-sm border border-border rounded-xl hover:border-accent/30 transition-all duration-300"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-16 h-16 bg-warning/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icon name="Gift" size={32} className="text-warning" />
          </div>
          <h3 className="font-heading font-bold text-foreground mb-2">
            PARRAINAGE
          </h3>
          <p className="text-text-secondary font-body text-sm mb-4">
            Invitez vos amis et gagnez des réductions supplémentaires
          </p>
          <Button variant="outline" className="border-warning text-warning hover:bg-warning hover:text-black">
            PARRAINER
          </Button>
        </motion.div>

        <motion.div
          className="text-center p-6 bg-surface/50 backdrop-blur-sm border border-border rounded-xl hover:border-accent/30 transition-all duration-300"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-16 h-16 bg-error/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icon name="Share2" size={32} className="text-error" />
          </div>
          <h3 className="font-heading font-bold text-foreground mb-2">
            PARTAGER
          </h3>
          <p className="text-text-secondary font-body text-sm mb-4">
            Partagez la Black Hour avec vos amis sur les réseaux sociaux
          </p>
          <Button variant="outline" className="border-error text-error hover:bg-error hover:text-white">
            PARTAGER
          </Button>
        </motion.div>
      </div>
      {/* Final Urgency Banner */}
      <motion.div
        className="text-center p-6 bg-gradient-to-r from-error/20 to-accent/20 border border-error/30 rounded-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Zap" size={24} className="text-error animate-pulse" />
          <span className="text-xl font-heading font-bold text-error">
            DERNIÈRE CHANCE !
          </span>
          <Icon name="Zap" size={24} className="text-error animate-pulse" />
        </div>
        <p className="text-text-secondary font-body">
          La Black Hour se commence bientôt. Ne laissez pas passer ces offres exceptionnelles !
        </p>
      </motion.div>
    </div>
  );
};

export default CallToAction;