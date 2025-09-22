import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExclusiveAccess = ({ onJoinClick, onLoginClick }) => {
  const benefits = [
    {
      icon: 'Crown',
      title: 'Accès Prioritaire',
      description: 'Soyez les premiers à découvrir nos nouvelles collections avant tout le monde.'
    },
    {
      icon: 'Percent',
      title: 'Réductions Exclusives',
      description: 'Bénéficiez de remises supplémentaires réservées uniquement aux membres VIP.'
    },
    {
      icon: 'Gift',
      title: 'Cadeaux Gratuits',
      description: 'Recevez des articles bonus et des surprises avec vos commandes.'
    },
    {
      icon: 'Zap',
      title: 'Ventes Flash',
      description: 'Accédez aux ventes flash exclusives avec des prix imbattables.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black via-surface to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-success/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-3 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-6 py-3 mb-6">
            <Icon name="Crown" size={24} className="text-accent" />
            <span className="text-accent font-caption uppercase tracking-wider font-bold">
              Accès Exclusif
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-success mb-6">
            REJOIGNEZ L'ÉLITE
          </h2>
          
          <p className="text-xl text-text-secondary font-body max-w-3xl mx-auto leading-relaxed">
            Devenez membre VIP d'UrbanSpace et débloquez un monde d'avantages exclusifs, 
            de réductions privilégiées et d'accès anticipé à nos collections les plus convoitées.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits?.map((benefit, index) => (
            <motion.div
              key={benefit?.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 h-full hover:border-accent/50 transition-all duration-300">
                {/* Icon */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  className="w-16 h-16 bg-gradient-to-br from-accent to-success rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                >
                  <Icon name={benefit?.icon} size={28} className="text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {benefit?.title}
                </h3>
                <p className="text-text-secondary font-body leading-relaxed">
                  {benefit?.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-surface/80 backdrop-blur-lg border border-accent/30 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              Prêt à Rejoindre l'Élite ?
            </h3>
            <p className="text-text-secondary font-body mb-8">
              Créez votre compte membre dès maintenant et commencez à profiter 
              de tous ces avantages exclusifs immédiatement.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="UserPlus"
                iconPosition="left"
                onClick={onJoinClick}
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 font-bold uppercase tracking-wider transform hover:scale-105 transition-all duration-300"
              >
                Devenir Membre VIP
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="LogIn"
                iconPosition="left"
                onClick={onLoginClick}
                className="border-success text-success hover:bg-success hover:text-black px-8 py-4 font-bold uppercase tracking-wider transform hover:scale-105 transition-all duration-300"
              >
                Se Connecter
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-6 mt-8 text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm font-caption">100% Sécurisé</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-accent" />
                <span className="text-sm font-caption">+10k Membres</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} className="text-warning" />
                <span className="text-sm font-caption">5/5 Étoiles</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExclusiveAccess;