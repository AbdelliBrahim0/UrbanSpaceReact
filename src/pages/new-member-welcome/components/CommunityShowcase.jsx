import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CommunityShowcase = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  const communityStats = [
    { number: "50K+", label: "Membres Actifs", icon: "Users" },
    { number: "200+", label: "Drops Exclusifs", icon: "Package" },
    { number: "95%", label: "Satisfaction", icon: "Heart" },
    { number: "24/7", label: "Support Premium", icon: "Headphones" }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Marcus Rodriguez",
      role: "Membre VIP depuis 2023",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `UrbanSpace a complètement transformé ma garde-robe. Les pièces exclusives et la qualité premium font vraiment la différence. La communauté est incroyable !`,
      rating: 5,
      style: "Urban Elite"
    },
    {
      id: 2,
      name: "Sofia Chen",
      role: "Influenceuse Mode",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `L'accès VIP aux collections avant leur sortie officielle est un game-changer. Je recommande UrbanSpace à tous les passionnés de streetwear authentique.`,
      rating: 5,
      style: "Street Classic"
    },
    {
      id: 3,
      name: "Alex Thompson",
      role: "Collectionneur",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `Les éditions limitées et collaborations exclusives valent largement l'adhésion. Le service client est exceptionnel et la livraison ultra rapide.`,
      rating: 5,
      style: "Bold Statement"
    }
  ];

  const communityFeatures = [
    {
      icon: "MessageCircle",
      title: "Forum Privé",
      description: "Échangez avec d'autres passionnés dans notre forum exclusif",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: "Calendar",
      title: "Événements VIP",
      description: "Participez à des événements exclusifs et des rencontres",
      gradient: "from-accent to-red-500"
    },
    {
      icon: "Star",
      title: "Programme Fidélité",
      description: "Gagnez des points et débloquez des récompenses uniques",
      gradient: "from-success to-green-400"
    },
    {
      icon: "Zap",
      title: "Accès Prioritaire",
      description: "Soyez les premiers informés des nouveautés et drops",
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
        setActiveTestimonial((prev) => (prev + 1) % testimonials?.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isInView, testimonials?.length]);

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-gradient-to-b from-background via-surface to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-success mb-6">
            COMMUNAUTÉ ELITE
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto font-body">
            Rejoignez une communauté exclusive de passionnés qui partagent votre vision du streetwear premium
          </p>
        </motion.div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {communityStats?.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-accent/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-success rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={stat?.icon} size={24} className="text-white" />
                </div>
                <div className="text-3xl font-heading font-black text-foreground mb-2">
                  {stat?.number}
                </div>
                <div className="text-text-secondary font-body text-sm">
                  {stat?.label}
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-accent/20 to-success/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative bg-card border border-border rounded-3xl p-8 md:p-12 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-20 h-20 border-2 border-accent rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-accent to-success rounded-lg rotate-45"></div>
              </div>

              <div className="relative z-10">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  {/* Avatar */}
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <Image
                      src={testimonials?.[activeTestimonial]?.avatar}
                      alt={testimonials?.[activeTestimonial]?.name}
                      className="w-full h-full rounded-full object-cover border-4 border-accent"
                    />
                    <div className="absolute -inset-2 bg-gradient-to-br from-accent to-success rounded-full blur-lg opacity-30"></div>
                  </div>

                  {/* Content */}
                  <blockquote className="text-xl md:text-2xl font-body text-foreground leading-relaxed mb-6 italic">
                    "{testimonials?.[activeTestimonial]?.content}"
                  </blockquote>

                  {/* Rating */}
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(testimonials?.[activeTestimonial]?.rating)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="text-accent fill-current" />
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="text-center">
                    <h4 className="font-heading font-bold text-foreground text-lg">
                      {testimonials?.[activeTestimonial]?.name}
                    </h4>
                    <p className="text-text-secondary font-body text-sm mb-2">
                      {testimonials?.[activeTestimonial]?.role}
                    </p>
                    <span className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-caption">
                      {testimonials?.[activeTestimonial]?.style}
                    </span>
                  </div>
                </motion.div>

                {/* Navigation Dots */}
                <div className="flex justify-center space-x-2 mt-8">
                  {testimonials?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeTestimonial === index 
                          ? 'bg-accent scale-125' :'bg-border hover:bg-accent/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityFeatures?.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              className="relative group"
            >
              <div className="bg-card border border-border rounded-2xl p-6 hover:border-accent/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature?.gradient} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon name={feature?.icon} size={24} className="text-white" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-3">
                  {feature?.title}
                </h3>
                <p className="text-text-secondary font-body text-sm leading-relaxed">
                  {feature?.description}
                </p>
              </div>
              <div className={`absolute -inset-1 bg-gradient-to-br ${feature?.gradient} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-300`}></div>
            </motion.div>
          ))}
        </div>

        {/* Join Community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-center mt-16"
        >
          <button className="group relative px-12 py-4 bg-gradient-to-r from-accent to-success rounded-full text-white font-heading font-bold text-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
            <span className="relative z-10 flex items-center space-x-3">
              <span>Rejoindre la communauté</span>
              <Icon name="Users" size={20} />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-success to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityShowcase;