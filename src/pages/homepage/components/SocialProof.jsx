import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const SocialProof = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Marcus Rodriguez",
      username: "@streetking_marcus",
      role: "Street Style Influencer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `StreetVault isn't just clothing, it's a lifestyle. Every piece I've copped from them has been fire. The quality is unmatched and the designs speak to the culture.`,
      rating: 5,
      verified: true,
      followers: "125K",
      platform: "Instagram"
    },
    {
      id: 2,
      name: "Zara Chen",
      username: "@urban_zara",
      role: "Fashion Blogger",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `The Underground Kings collection is absolutely insane! Got so many compliments wearing their pieces. StreetVault understands what real streetwear should be.`,
      rating: 5,
      verified: true,
      followers: "89K",
      platform: "TikTok"
    },
    {
      id: 3,
      name: "Jamal Thompson",
      username: "@jamal_fresh",
      role: "Hip-Hop Artist",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `Been wearing StreetVault since day one. Their pieces are in my music videos because they represent authenticity. This is what the streets need.`,
      rating: 5,
      verified: true,
      followers: "234K",
      platform: "YouTube"
    },
    {
      id: 4,
      name: "Sofia Martinez",
      username: "@sofia_street",
      role: "Style Creator",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `StreetVault's Vault Classics collection is everything! The attention to detail and the way they capture street culture is phenomenal. Obsessed!`,
      rating: 5,
      verified: true,
      followers: "67K",
      platform: "Instagram"
    }
  ];

  const influencerStats = [
    { label: "Influencer Partners", value: "500+", icon: "Users" },
    { label: "Social Mentions", value: "50K+", icon: "MessageCircle" },
    { label: "User Reviews", value: "4.9/5", icon: "Star" },
    { label: "Community Members", value: "1M+", icon: "Heart" }
  ];

  const featuredInfluencers = [
    {
      name: "Alex Rivera",
      username: "@alex_streetwear",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      followers: "156K"
    },
    {
      name: "Maya Johnson",
      username: "@maya_urban",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
      followers: "203K"
    },
    {
      name: "Diego Santos",
      username: "@diego_fresh",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
      followers: "98K"
    },
    {
      name: "Aria Kim",
      username: "@aria_style",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
      followers: "187K"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < rating ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  return (
    <section className="py-16 lg:py-24 px-4 lg:px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl text-foreground mb-4">
            STREET <span className="text-accent">APPROVED</span>
          </h2>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
            Trusted by influencers, worn by legends. See what the culture is saying about StreetVault.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {influencerStats?.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center bg-background border border-street rounded-lg p-6 hover:border-accent transition-street"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name={stat?.icon} size={24} className="text-accent" />
                </div>
              </div>
              <div className="font-heading font-black text-2xl md:text-3xl text-foreground mb-2">
                {stat?.value}
              </div>
              <div className="text-text-secondary text-sm font-medium">
                {stat?.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Main Testimonial */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="bg-background border border-street rounded-2xl p-8 relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Icon name="Quote" size={48} className="text-accent" />
              </div>

              {/* Testimonial Content */}
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <Image
                      src={testimonials?.[currentTestimonial]?.avatar}
                      alt={testimonials?.[currentTestimonial]?.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {testimonials?.[currentTestimonial]?.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <Icon name="Check" size={12} className="text-accent-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <h4 className="font-heading font-bold text-lg text-foreground">
                      {testimonials?.[currentTestimonial]?.name}
                    </h4>
                    <p className="text-accent text-sm font-medium">
                      {testimonials?.[currentTestimonial]?.username}
                    </p>
                    <p className="text-text-secondary text-sm">
                      {testimonials?.[currentTestimonial]?.role} • {testimonials?.[currentTestimonial]?.followers} followers
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      {renderStars(testimonials?.[currentTestimonial]?.rating)}
                    </div>
                    <span className="text-text-secondary text-xs">
                      {testimonials?.[currentTestimonial]?.platform}
                    </span>
                  </div>
                </div>

                <blockquote className="text-foreground text-lg leading-relaxed mb-6">
                  "{testimonials?.[currentTestimonial]?.content}"
                </blockquote>

                {/* Navigation Dots */}
                <div className="flex justify-center space-x-2">
                  {testimonials?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-street ${
                        index === currentTestimonial 
                          ? 'bg-accent' :'bg-muted-foreground hover:bg-accent/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Influencers */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="font-heading font-bold text-2xl text-foreground mb-8">
              FEATURED CREATORS
            </h3>

            <div className="space-y-4">
              {featuredInfluencers?.map((influencer, index) => (
                <motion.div
                  key={index}
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center p-4 bg-background border border-street rounded-lg hover:border-accent transition-street group"
                >
                  <Image
                    src={influencer?.avatar}
                    alt={influencer?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  
                  <div className="ml-4 flex-1">
                    <h4 className="font-heading font-bold text-foreground group-hover:text-accent transition-street">
                      {influencer?.name}
                    </h4>
                    <p className="text-text-secondary text-sm">
                      {influencer?.username}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-accent font-bold text-sm">
                      {influencer?.followers}
                    </p>
                    <p className="text-text-secondary text-xs">
                      followers
                    </p>
                  </div>

                  <Icon 
                    name="ExternalLink" 
                    size={16} 
                    className="ml-4 text-text-secondary group-hover:text-accent transition-street" 
                  />
                </motion.div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="bg-background border border-street rounded-lg p-6">
              <h4 className="font-heading font-bold text-lg text-foreground mb-4">
                FOLLOW THE MOVEMENT
              </h4>
              <div className="flex space-x-4">
                {[
                  { name: 'Instagram', icon: 'Instagram', followers: '2.1M' },
                  { name: 'TikTok', icon: 'Music', followers: '1.8M' },
                  { name: 'YouTube', icon: 'Play', followers: '890K' },
                  { name: 'Twitter', icon: 'Twitter', followers: '1.2M' }
                ]?.map((social, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2 hover:bg-accent/20 transition-street cursor-pointer">
                      <Icon name={social?.icon} size={20} className="text-accent" />
                    </div>
                    <p className="text-text-secondary text-xs">
                      {social?.followers}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;