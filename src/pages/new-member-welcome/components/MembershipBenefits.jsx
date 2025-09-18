import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const MembershipBenefits = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  const benefits = [
    {
      id: 1,
      icon: "Crown",
      title: "Accès VIP Exclusif",
      description: "Découvrez les collections avant tout le monde avec un accès prioritaire aux nouveautés et éditions limitées.",
      features: ["Pré-commandes exclusives", "Collections privées", "Événements VIP"],
      gradient: "from-accent to-red-500"
    },
    {
      id: 2,
      icon: "Zap",
      title: "Réductions Privilégiées",
      description: "Bénéficiez de remises exceptionnelles et d\'offres spéciales réservées aux membres premium.",
      features: ["Jusqu\'à 40% de réduction", "Codes promo exclusifs", "Ventes flash privées"],
      gradient: "from-success to-green-400"
    },
    {
      id: 3,
      icon: "Users",
      title: "Communauté Elite",
      description: "Rejoignez une communauté sélecte de passionnés de streetwear et partagez votre style unique.",
      features: ["Forum privé", "Événements communautaires", "Collaborations exclusives"],
      gradient: "from-blue-500 to-purple-500"
    },
    {
      id: 4,
      icon: "Gift",
      title: "Cadeaux & Surprises",
      description: "Recevez des cadeaux surprise, des échantillons gratuits et des accessoires exclusifs.",
      features: ["Box surprise mensuelle", "Échantillons gratuits", "Goodies exclusifs"],
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef?.current) {
      observer?.observe(sectionRef?.current);
    }

    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveCard((prev) => (prev + 1) % benefits?.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInView, benefits?.length]);

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-gradient-to-b from-background to-surface">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-success mb-6">
            PRIVILÈGES MEMBRES
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto font-body">
            Découvrez les avantages exclusifs qui vous attendent en tant que membre privilégié de la famille UrbanSpace
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {benefits?.map((benefit, index) => (
            <motion.div
              key={benefit?.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.2 }}
              className={`relative group cursor-pointer ${
                activeCard === index ? 'z-10' : 'z-0'
              }`}
              onMouseEnter={() => setActiveCard(index)}
            >
              <div className={`relative p-8 rounded-2xl border transition-all duration-500 ${
                activeCard === index 
                  ? 'border-accent bg-surface/80 backdrop-blur-sm transform scale-105' 
                  : 'border-border bg-card hover:border-accent/50'
              }`}>
                {/* 3D Icon Effect */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit?.gradient} flex items-center justify-center transform ${
                    activeCard === index ? 'rotate-12 scale-110' : 'rotate-6'
                  } transition-all duration-500`}>
                    <Icon name={benefit?.icon} size={28} className="text-white" />
                  </div>
                  {activeCard === index && (
                    <div className={`absolute -inset-2 bg-gradient-to-br ${benefit?.gradient} rounded-xl blur-xl opacity-30 animate-pulse`}></div>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  {benefit?.title}
                </h3>
                <p className="text-text-secondary font-body mb-6 leading-relaxed">
                  {benefit?.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3">
                  {benefit?.features?.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={activeCard === index ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                      transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${benefit?.gradient}`}></div>
                      <span className="text-foreground font-body text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit?.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gang-style Separator */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          {benefits?.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeCard === index 
                  ? 'w-12 bg-gradient-to-r from-accent to-success' :'w-4 bg-border'
              }`}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="text-center"
        >
          <p className="text-lg text-text-secondary font-body mb-6">
            Prêt à débloquer tous ces avantages exclusifs ?
          </p>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-accent to-success rounded-full text-white font-heading font-bold text-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
            <span className="relative z-10 flex items-center space-x-3">
              <span>Activer mes privilèges</span>
              <Icon name="Sparkles" size={20} />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-success to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipBenefits;