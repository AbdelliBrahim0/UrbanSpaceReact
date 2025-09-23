import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/uii/Button';
import Input from '../../../components/uii/Input';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simuler un appel API
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 2000);
  };

  const socialLinks = [
    { name: 'Instagram', icon: 'Instagram', url: '#', followers: '1K' },
    { name: 'Facebook', icon: 'Facebook', url: '#', followers: '2K' },
    { name: 'TikTok', icon: 'Music', url: '#', followers: '203K' },
  ];

  const benefits = [
    { icon: 'Zap', text: 'Accès prioritaire aux nouveautés' },
    { icon: 'Gift', text: 'Réductions exclusives pour membres' },
    { icon: 'Crown', text: 'Statut VIP pour les membres UrbanSpace' },
    { icon: 'Bell', text: 'Infos et tendances streetwear' }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
                <Icon name="Users" size={16} className="text-primary" />
                <span className="text-primary font-mono text-sm font-bold">
                  REJOIGNEZ LA GANG
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                RESTEZ DANS LA
                <span className="block text-primary">LOOP STREET</span>
              </h2>
              
              <p className="text-xl text-muted-foreground">
                Recevez un accès exclusif aux nouveautés, des réductions pour membres et toutes les tendances streetwear avant tout le monde.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits?.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Icon name={benefit?.icon} size={16} className="text-primary" />
                  </div>
                  <span className="text-foreground font-medium">
                    {benefit?.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Newsletter Form */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    En vous inscrivant, vous acceptez nos conditions et notre politique de confidentialité. Désinscription possible à tout moment.
                  </p>
                </form>
              ) : (
                <motion.div
                  className="bg-success/10 border border-success/20 rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Check" size={24} className="text-success" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Bienvenue dans la Gang ! 🔥
                  </h3>
                  <p className="text-muted-foreground">
                    Vous faites maintenant partie de la communauté exclusive UrbanSpace. Vérifiez votre email pour votre pack de bienvenue !
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Social Proof */}
            <motion.div
              className="flex items-center space-x-4 pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5]?.map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-primary rounded-full border-2 border-background flex items-center justify-center"
                  >
                    <Icon name="User" size={14} color="white" />
                  </div>
                ))}
              </div>
              
            </motion.div>
          </motion.div>

          {/* Right Side - Social Links */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                SUIVEZ LE MOUVEMENT
              </h3>
              <p className="text-muted-foreground">
                Restez connecté avec les dernières tendances streetwear et les actualités de la Gang.
              </p>
            </div>

            {/* Social Links Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {socialLinks?.map((social, index) => (
                <motion.a
                  key={social?.name}
                  href={social?.url}
                  className="group bg-surface border border-border rounded-2xl p-6 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <Icon name={social?.icon} size={24} className="text-primary" />
                    </div>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Icon name="ArrowUpRight" size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-foreground mb-1">
                      {social?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground font-mono">
                      {social?.followers} abonnés
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Élément Street Art */}
            <motion.div
              className="relative bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={24} className="text-primary" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  EXCLUSIF AUX MEMBRES
                </h4>
                <p className="text-muted-foreground text-sm">
                  Les membres bénéficient de 20 % de réduction sur leur premier achat + livraison gratuite sur toutes les commandes.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;

           
