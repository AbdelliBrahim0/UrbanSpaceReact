import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const WelcomeFooter = () => {
  const [isVisible, setIsVisible] = useState(false);

  const quickActions = [
    {
      title: "Découvrir les Produits",
      description: "Explorez notre collection exclusive de streetwear premium",
      icon: "ShoppingBag",
      link: "/collections",
      gradient: "from-accent to-red-500",
      delay: 0.2
    },
    {
      title: "Profitez des réductions",
      description: "Bénéficiez d’offres exclusives et économisez sur vos achats.",
      icon: "Users",
      link: "/sale",
      gradient: "from-success to-green-400",
      delay: 0.4
    },
    {
      title: "Événements VIP",
      description: "Accédez aux événements exclusifs et aux ventes privées",
      icon: "Calendar",
      link: "/black-hour",
      gradient: "from-blue-500 to-purple-500",
      delay: 0.6
    }
  ];

  const socialLinks = [
    { name: "Instagram", icon: "Instagram", url: "https://www.instagram.com/urbanspace717" },
    { name: "Facebook", icon: "Facebook", url: "https://www.facebook.com/profile.php?id=61568055260818" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="relative py-20 px-6 bg-gradient-to-t from-background via-surface to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-accent rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-accent to-success rounded-lg rotate-45"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-success rounded-full"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-success mb-6">
            VOTRE AVENTURE COMMENCE
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto font-body leading-relaxed">
            Félicitations ! Vous faites maintenant partie de l'élite UrbanSpace. 
            Découvrez tout ce qui vous attend en tant que membre privilégié.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {quickActions?.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: action?.delay }}
              className="relative group"
            >
              <Link to={action?.link} className="block">
                <div className="relative bg-card border border-border rounded-2xl p-8 hover:border-accent/50 transition-all duration-300 group-hover:transform group-hover:scale-105 overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${action?.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Icon */}
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${action?.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={action?.icon} size={28} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="relative text-xl font-heading font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                    {action?.title}
                  </h3>
                  <p className="relative text-text-secondary font-body text-sm leading-relaxed mb-4">
                    {action?.description}
                  </p>

                  {/* Arrow */}
                  <div className="relative flex items-center text-accent group-hover:translate-x-2 transition-transform duration-300">
                    <span className="font-caption text-sm font-bold mr-2">Découvrir</span>
                    <Icon name="ArrowRight" size={16} />
                  </div>
                </div>

                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${action?.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Social Media & Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
            Restez Connecté
          </h3>
          <p className="text-text-secondary font-body mb-8 max-w-2xl mx-auto">
            Suivez-nous sur nos réseaux sociaux pour ne rien manquer des dernières tendances, 
            des drops exclusifs et des événements communautaires.
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks?.map((social, index) => (
              <motion.a
                key={social?.name}
                href={social?.url}
                initial={{ opacity: 0, scale: 0 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="group relative w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all duration-300"
              >
                <Icon name={social?.icon} size={20} className="text-foreground group-hover:text-accent transition-colors duration-300" />
                <div className="absolute -inset-1 bg-gradient-to-br from-accent to-success rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
              </motion.a>
            ))}
          </div>

          
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="border-t border-border pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo & Copyright */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">U</span>
              </div>
              <div>
                <p className="text-foreground font-heading font-bold">UrbanSpace</p>
                <p className="text-xs text-text-secondary">
                  © {new Date()?.getFullYear()} Tous droits réservés
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/homepage" className="text-text-secondary hover:text-accent transition-colors duration-300">
                Accueil
              </Link>
              <Link to="/collections" className="text-text-secondary hover:text-accent transition-colors duration-300">
                Produits
              </Link>
              <a href="#" className="text-text-secondary hover:text-accent transition-colors duration-300">
                Support
              </a>
              <a href="#" className="text-text-secondary hover:text-accent transition-colors duration-300">
                Confidentialité
              </a>
            </div>
          </div>
        </motion.div>

        {/* Final Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-center mt-12 p-6 bg-gradient-to-r from-accent/10 to-success/10 rounded-2xl border border-accent/20"
        >
          <p className="text-lg font-body text-foreground">
            <span className="font-bold text-accent">Bienvenue dans la famille UrbanSpace !</span>
            <br />
            Votre style urbain n'a jamais été aussi authentique.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default WelcomeFooter;