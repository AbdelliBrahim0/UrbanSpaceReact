import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const benefits = [
  {
    icon: "Zap",
    title: "ACCÈS PRIORITAIRE",
    description: "Profitez des nouvelles collections avant tout le monde, avant qu’elles ne soient épuisées."
  },
  {
    icon: "Tag",
    title: "OFFRES EXCLUSIVES",
    description: "Des réductions réservées aux membres et des prix spéciaux sur les pièces premium."
  },
  {
    icon: "Crown",
    title: "TRAITEMENT VIP",
    description: "Service client prioritaire et avantages exclusifs pour nos membres UrbanSpace."
  },
  {
    icon: "Truck",
    title: "LIVRAISON GRATUITE",
    description: "Expédition offerte sur toutes vos commandes pour nos abonnés à la newsletter."
  }
];


  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    
    if (!email) {
      setError('Un email est requis');
      return;
    }

    if (!email?.includes('@')) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(0, 255, 136, 0.3)",
        "0 0 40px rgba(0, 255, 136, 0.5)",
        "0 0 20px rgba(0, 255, 136, 0.3)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-16 lg:py-24 px-4 lg:px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center bg-surface border border-accent rounded-2xl p-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Icon name="Check" size={32} className="text-accent-foreground" />
            </motion.div>

            <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground mb-4">
              Bienvenue dans <span className="text-accent">UrbanSpace</span>
            </h2>
            
            <p className="text-text-secondary text-lg mb-8">
              Vous faites maintenant partie du cercle privilégié. Préparez-vous pour des exclusivités, un accès anticipé et des mises à jour sur la culture urbaine.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                iconName="ShoppingBag"
                iconPosition="left"
              >
                COMMENCER MES ACHATS
              </Button>
              
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                iconName="Users"
                iconPosition="left"
              >
                REJOINDRE LA COMMUNAUTÉ
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 px-4 lg:px-6 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-error rounded-full blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content Side */}
          <div>
            <motion.div variants={itemVariants}>
              <h2 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl text-foreground mb-6">
                REJOIGNEZ LE <span className="text-accent">MOUVEMENT</span>
              </h2>
              
              <p className="text-text-secondary text-lg md:text-xl mb-8 leading-relaxed">
                Accédez en exclusivité aux collections limitées, aux dernières tendances de la culture urbaine et aux offres réservées aux membres. 
                Soyez le premier informé des nouvelles sorties.
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            >
              {benefits?.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start space-x-3 p-4 bg-surface border border-street rounded-lg hover:border-accent transition-street"
                >
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name={benefit?.icon} size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-foreground mb-1">
                      {benefit?.title}
                    </h4>
                    <p className="text-text-secondary text-xs leading-relaxed">
                      {benefit?.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-4 text-text-secondary text-sm"
            >
              
            </motion.div>
          </div>

          {/* Form Side */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              variants={glowVariants}
              animate="animate"
              className="bg-surface border border-street rounded-2xl p-8 lg:p-12"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={32} className="text-accent" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-2">
                  OBTENEZ UN ACCÈS EXCLUSIF
                </h3>
                <p className="text-text-secondary">
                  Entrez votre adresse email pour débloquer les dernières sorties de streetwear
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-32 py-5 bg-surface border-street focus:border-accent"
                />
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
                  disabled={isLoading}
                >
                  {isLoading ? 'ENVOI...' : 'S\'INSCRIRE'}
                </Button>
              </form>

              {error && <p className="mt-2 text-sm text-error">{error}</p>}
              <p className="text-xs text-text-secondary mt-3">
                En vous inscrivant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité.
              </p>

              {/* Trust Badges */}
              <div className="flex justify-center items-center space-x-6 mt-8 pt-6 border-t border-street">
                <div className="flex items-center space-x-2 text-text-secondary text-xs">
                  <Icon name="Shield" size={16} className="text-accent" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2 text-text-secondary text-xs">
                  <Icon name="Zap" size={16} className="text-accent" />
                  <span>Instant Access</span>
                </div>
                <div className="flex items-center space-x-2 text-text-secondary text-xs">
                  <Icon name="X" size={16} className="text-accent" />
                  <span>Unsubscribe Anytime</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full opacity-60"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-error rounded-full opacity-40"
              animate={{
                y: [0, 10, 0],
                scale: [1, 0.9, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSignup;