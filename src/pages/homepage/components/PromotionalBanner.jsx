import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { format, addDays, isAfter, nextFriday, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { fr } from 'date-fns/locale';

const PromotionalBanner = () => {
  // Calculer la date du prochain vendredi à 00:00:00
  const getNextFriday = () => {
    const now = new Date();
    const nextFridayDate = nextFriday(now);
    nextFridayDate.setHours(0, 0, 0, 0); // Réinitialiser à minuit
    return nextFridayDate;
  };

  const [nextFridayDate] = useState(getNextFriday());
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Fonction pour calculer le temps restant jusqu'au prochain vendredi
  function calculateTimeLeft() {
    const now = new Date();
    const difference = nextFridayDate - now;
    
    if (difference <= 0) {
      // Si le vendredi est passé, on passe au vendredi suivant
      nextFridayDate.setDate(nextFridayDate.getDate() + 7);
      return calculateTimeLeft();
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  // Mettre à jour le compte à rebours toutes les secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Formatage de la date du prochain vendredi pour l'affichage
  const formattedNextFriday = useMemo(() => {
    return format(nextFridayDate, "EEEE d MMMM yyyy", { locale: fr });
  }, [nextFridayDate]);

  // Pour le Black Hour, on garde un compte à rebours simple
  const [blackHourTime, setBlackHourTime] = useState({ hours: 2, minutes: 45, seconds: 30 });

  useEffect(() => {
    const interval = setInterval(() => {
      setBlackHourTime(prev => {
        if (prev?.seconds > 0) return { ...prev, seconds: prev?.seconds - 1 };
        if (prev?.minutes > 0) return { ...prev, minutes: prev?.minutes - 1, seconds: 59 };
        if (prev?.hours > 0) return { ...prev, hours: prev?.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const promotions = [
    {
      id: 'black-friday',
      title: 'VENDREDI FOU',
      subtitle: 'MEGA SOLDES',
      description: `Jusqu'à 70% de réduction sur toute la collection streetwear - Prochaine édition le ${formattedNextFriday}`,
      discount: '70%',
      countdown: timeLeft,
      bgGradient: 'from-red-900/90 via-black to-red-900/90',
      accentColor: 'text-red-400',
      borderColor: 'border-red-500/30',
      link: '/black-friday-event',
      icon: 'Zap',
      badge: 'ÉVÉNEMENT SPÉCIAL'
    },
    {
      id: 'black-hour',
      title: 'BLACK HOUR',
      subtitle: 'FLASH SALE',
      description: 'Offres limitées dans le temps - Dépêchez-vous !',
      discount: '50%',
      countdown: blackHourTime,
      bgGradient: 'from-purple-900/90 via-black to-purple-900/90',
      accentColor: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      link: '/black-hour-limited-event',
      icon: 'Clock',
      badge: 'TEMPS LIMITÉ'
    }
  ];

  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-accent/20 border border-accent/30 rounded-full px-6 py-3 mb-6">
            <Icon name="Flame" size={20} className="text-accent" />
            <span className="text-accent font-caption font-bold">OFFRES EXCEPTIONNELLES</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-heading font-black text-foreground mb-4">
            ÉVÉNEMENTS
            <span className="text-accent ml-4">EXCLUSIFS</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Ne manquez pas nos événements promotionnels exceptionnels avec des réductions incroyables sur toute la collection UrbanSpace
          </p>
        </motion.div>

        {/* Promotional Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {promotions?.map((promo, index) => (
            <motion.div
              key={promo?.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${promo?.bgGradient} border ${promo?.borderColor} p-8 lg:p-12 hover:scale-105 transition-all duration-500`}>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(15)]?.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 ${promo?.accentColor?.replace('text-', 'bg-')} rounded-full`}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute top-4 right-4"
                >
                  <div className={`bg-gradient-to-r ${promo?.bgGradient} border ${promo?.borderColor} rounded-full px-3 py-1`}>
                    <span className={`text-xs font-bold ${promo?.accentColor}`}>
                      {promo?.badge}
                    </span>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    initial={{ opacity: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mb-6"
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${promo?.bgGradient} border ${promo?.borderColor} flex items-center justify-center`}>
                      <Icon name={promo?.icon} size={28} className={promo?.accentColor} />
                    </div>
                  </motion.div>

                  {/* Title & Discount */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-heading font-black text-foreground">
                        {promo?.title}
                      </h3>
                      <p className={`text-lg font-heading font-bold ${promo?.accentColor}`}>
                        {promo?.subtitle}
                      </p>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`text-4xl lg:text-5xl font-heading font-black ${promo?.accentColor}`}
                    >
                      -{promo?.discount}
                    </motion.div>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary mb-8 text-lg">
                    {promo?.description}
                  </p>

                  {/* Countdown Timer */}
                  <div className="mb-8">
                    <p className="text-sm text-text-secondary mb-4 font-caption">
                      Temps restant :
                    </p>
                    <div className="flex space-x-4">
                      {promo?.id === 'black-friday' ? (
                        <>
                          <div className={`text-center bg-surface/50 rounded-lg p-3 border ${promo?.borderColor}`}>
                            <div className={`text-2xl font-heading font-bold ${promo?.accentColor}`}>
                              {promo?.countdown?.days}
                            </div>
                            <div className="text-xs text-text-secondary">JOURS</div>
                          </div>
                          <div className={`text-center bg-surface/50 rounded-lg p-3 border ${promo?.borderColor}`}>
                            <div className={`text-2xl font-heading font-bold ${promo?.accentColor}`}>
                              {promo?.countdown?.hours}
                            </div>
                            <div className="text-xs text-text-secondary">HEURES</div>
                          </div>
                          <div className={`text-center bg-surface/50 rounded-lg p-3 border ${promo?.borderColor}`}>
                            <div className={`text-2xl font-heading font-bold ${promo?.accentColor}`}>
                              {promo?.countdown?.minutes}
                            </div>
                            <div className="text-xs text-text-secondary">MIN</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={`text-center bg-surface/50 rounded-lg p-3 border ${promo?.borderColor}`}>
                            <div className={`text-2xl font-heading font-bold ${promo?.accentColor}`}>
                              {promo?.countdown?.hours}
                            </div>
                            <div className="text-xs text-text-secondary">H</div>
                          </div>
                          <div className={`text-center bg-surface/50 rounded-lg p-3 border ${promo?.borderColor}`}>
                            <div className={`text-2xl font-heading font-bold ${promo?.accentColor}`}>
                              {promo?.countdown?.minutes}
                            </div>
                            <div className="text-xs text-text-secondary">M</div>
                          </div>
                          <div className={`text-center bg-surface/50 rounded-lg p-3 border ${promo?.borderColor}`}>
                            <div className={`text-2xl font-heading font-bold ${promo?.accentColor}`}>
                              {promo?.countdown?.seconds}
                            </div>
                            <div className="text-xs text-text-secondary">S</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link to={promo?.link}>
                    <Button
                      variant="outline"
                      size="lg"
                      iconName="ArrowRight"
                      iconPosition="right"
                      className={`w-full border-2 ${promo?.borderColor} ${promo?.accentColor} hover:bg-gradient-to-r ${promo?.bgGradient} hover:text-foreground font-bold text-lg group-hover:scale-105 transition-all duration-300`}
                    >
                      Découvrir l'Événement
                    </Button>
                  </Link>
                </div>

                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${promo?.bgGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl blur-xl`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-text-secondary mb-6">
            Rejoignez notre communauté pour être informé en premier des événements exclusifs
          </p>
          <Link to="/new-member-welcome">
            <Button
              variant="default"
              size="lg"
              iconName="Users"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-4"
            >
              Devenir Membre VIP
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PromotionalBanner;