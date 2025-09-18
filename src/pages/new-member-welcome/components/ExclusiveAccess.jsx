import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ExclusiveAccess = () => {
  const [isInView, setIsInView] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef(null);

  const exclusiveFeatures = [
    {
      id: 1,
      title: "Collections Privées",
      description: "Accédez à des collections exclusives créées spécialement pour nos membres VIP",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      icon: "Lock",
      benefits: ["Designs uniques", "Éditions limitées", "Matériaux premium"],
      gradient: "from-accent to-red-500"
    },
    {
      id: 2,
      title: "Pré-commandes VIP",
      description: "Commandez les nouveautés 48h avant leur sortie officielle",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=400&fit=crop",
      icon: "Clock",
      benefits: ["Accès prioritaire", "Prix préférentiels", "Garantie de stock"],
      gradient: "from-success to-green-400"
    },
    {
      id: 3,
      title: "Collaborations Exclusives",
      description: "Participez à la création de pièces uniques avec nos designers",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=400&fit=crop",
      icon: "Palette",
      benefits: ["Co-création", "Signature personnelle", "Série limitée"],
      gradient: "from-blue-500 to-purple-500"
    },
    {
      id: 4,
      title: "Événements Privés",
      description: "Invitations exclusives aux défilés, lancements et soirées VIP",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
      icon: "Calendar",
      benefits: ["Défilés privés", "Meet & Greet", "Networking premium"],
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const upcomingDrops = [
    {
      name: "Shadow Collection",
      date: "Dans 3 jours",
      image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop",
      status: "VIP Only",
      pieces: 50
    },
    {
      name: "Urban Legends",
      date: "Dans 1 semaine",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      status: "Pre-order",
      pieces: 100
    },
    {
      name: "Neon Nights",
      date: "Dans 2 semaines",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop",
      status: "Coming Soon",
      pieces: 75
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
        setActiveFeature((prev) => (prev + 1) % exclusiveFeatures?.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInView, exclusiveFeatures?.length]);

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-gradient-to-b from-surface to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-success mb-6">
            ACCÈS EXCLUSIF
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto font-body">
            Débloquez un monde de privilèges réservés aux membres VIP de UrbanSpace
          </p>
        </motion.div>

        {/* Main Feature Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Feature Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="relative">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Feature Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${exclusiveFeatures?.[activeFeature]?.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon name={exclusiveFeatures?.[activeFeature]?.icon} size={32} className="text-white" />
                </div>

                {/* Feature Title & Description */}
                <h3 className="text-3xl font-heading font-bold text-foreground mb-4">
                  {exclusiveFeatures?.[activeFeature]?.title}
                </h3>
                <p className="text-lg text-text-secondary font-body leading-relaxed mb-6">
                  {exclusiveFeatures?.[activeFeature]?.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-3">
                  {exclusiveFeatures?.[activeFeature]?.benefits?.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${exclusiveFeatures?.[activeFeature]?.gradient}`}></div>
                      <span className="text-foreground font-body">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Feature Navigation */}
            <div className="flex space-x-2">
              {exclusiveFeatures?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeFeature === index 
                      ? 'w-12 bg-gradient-to-r from-accent to-success' :'w-6 bg-border hover:bg-accent/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Feature Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl">
              <motion.div
                key={activeFeature}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="aspect-[4/3]"
              >
                <Image
                  src={exclusiveFeatures?.[activeFeature]?.image}
                  alt={exclusiveFeatures?.[activeFeature]?.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Overlay Effect */}
              <div className={`absolute inset-0 bg-gradient-to-t ${exclusiveFeatures?.[activeFeature]?.gradient} opacity-20`}></div>
              
              {/* 3D Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-accent/30 to-success/30 rounded-3xl blur-xl"></div>
            </div>
          </motion.div>
        </div>

        {/* Upcoming Drops Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-heading font-bold text-foreground mb-4">
              Prochains Drops Exclusifs
            </h3>
            <p className="text-text-secondary font-body">
              Soyez les premiers à découvrir nos nouvelles collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingDrops?.map((drop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                className="relative group"
              >
                <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  {/* Drop Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={drop?.image}
                      alt={drop?.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        drop?.status === 'VIP Only' ?'bg-accent text-white' 
                          : drop?.status === 'Pre-order' ?'bg-success text-white' :'bg-border text-foreground'
                      }`}>
                        {drop?.status}
                      </span>
                    </div>
                  </div>

                  {/* Drop Info */}
                  <div className="p-6">
                    <h4 className="font-heading font-bold text-foreground text-lg mb-2">
                      {drop?.name}
                    </h4>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-text-secondary font-body">{drop?.date}</span>
                      <span className="text-accent font-caption">{drop?.pieces} pièces</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-accent/20 to-success/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-center bg-gradient-to-r from-accent/10 to-success/10 rounded-3xl p-12 border border-accent/20"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-heading font-bold text-foreground mb-4">
              Prêt pour l'expérience VIP ?
            </h3>
            <p className="text-text-secondary font-body mb-8 leading-relaxed">
              Activez dès maintenant votre accès exclusif et découvrez un monde de privilèges 
              réservés aux membres les plus passionnés de UrbanSpace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-accent to-success rounded-full text-white font-heading font-bold text-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                <span className="relative z-10 flex items-center space-x-3">
                  <span>Activer l'accès VIP</span>
                  <Icon name="Crown" size={20} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-success to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="px-8 py-4 border-2 border-accent text-accent rounded-full font-heading font-bold text-lg hover:bg-accent hover:text-white transition-all duration-300">
                En savoir plus
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExclusiveAccess;