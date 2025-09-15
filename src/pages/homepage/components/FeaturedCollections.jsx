import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeaturedCollections = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const collections = [
    {
      id: 1,
      title: "UNDERGROUND KINGS",
      subtitle: "Limited Edition",
      description: "Exclusive pieces for the culture leaders. Only 100 pieces available worldwide.",
      price: "$299",
      originalPrice: "$399",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=800&fit=crop",
      badge: "EXCLUSIVE",
      badgeColor: "bg-accent",
      category: "Hoodies",
      inStock: true,
      stockCount: 23
    },
    {
      id: 2,
      title: "STREET ROYALTY",
      subtitle: "Gang Collection",
      description: "Premium streetwear that speaks your language. Crafted for the real ones.",
      price: "$189",
      originalPrice: "$249",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=800&fit=crop",
      badge: "HOT",
      badgeColor: "bg-error",
      category: "Jackets",
      inStock: true,
      stockCount: 45
    },
    {
      id: 3,
      title: "VAULT CLASSICS",
      subtitle: "Timeless Pieces",
      description: "Iconic designs that never go out of style. Built for the streets, made to last.",
      price: "$149",
      originalPrice: "$199",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop",
      badge: "CLASSIC",
      badgeColor: "bg-warning",
      category: "T-Shirts",
      inStock: true,
      stockCount: 78
    },
    {
      id: 4,
      title: "NEON NIGHTS",
      subtitle: "Glow Collection",
      description: "Light up the darkness with reflective details and neon accents.",
      price: "$229",
      originalPrice: "$299",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
      badge: "NEW",
      badgeColor: "bg-accent",
      category: "Accessories",
      inStock: false,
      stockCount: 0
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 lg:py-24 px-4 lg:px-6 bg-background">
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
            FEATURED <span className="text-accent">DROPS</span>
          </h2>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
            Curated drops from the underground. Each piece tells a story of rebellion, authenticity, and street culture.
          </p>
        </motion.div>

        {/* Collections Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {collections?.map((collection) => (
            <motion.div
              key={collection?.id}
              variants={cardVariants}
              className="group relative bg-surface border border-street rounded-lg overflow-hidden transition-street hover:border-accent hover-lift"
              onMouseEnter={() => setHoveredCard(collection?.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <motion.div
                  variants={imageVariants}
                  whileHover="hover"
                  className="w-full h-full"
                >
                  <Image
                    src={hoveredCard === collection?.id ? collection?.hoverImage : collection?.image}
                    alt={collection?.title}
                    className="w-full h-full object-cover transition-street"
                  />
                </motion.div>

                {/* Badge */}
                <div className={`absolute top-4 left-4 ${collection?.badgeColor} text-background px-3 py-1 rounded-full text-xs font-bold tracking-wide`}>
                  {collection?.badge}
                </div>

                {/* Stock Status */}
                <div className="absolute top-4 right-4">
                  {collection?.inStock ? (
                    <div className="bg-success text-success-foreground px-2 py-1 rounded text-xs font-bold">
                      {collection?.stockCount} LEFT
                    </div>
                  ) : (
                    <div className="bg-error text-error-foreground px-2 py-1 rounded text-xs font-bold">
                      SOLD OUT
                    </div>
                  )}
                </div>

                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center"
                >
                  <Link to="/product-detail">
                    <Button
                      variant="default"
                      className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold tracking-wide"
                    >
                      QUICK VIEW
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-accent text-sm font-caption tracking-wider">
                    {collection?.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={16} className="text-text-secondary hover:text-accent cursor-pointer transition-street" />
                    <Icon name="Share2" size={16} className="text-text-secondary hover:text-accent cursor-pointer transition-street" />
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                  {collection?.title}
                </h3>
                
                <p className="text-accent text-sm font-medium mb-3">
                  {collection?.subtitle}
                </p>

                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                  {collection?.description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-foreground font-bold text-lg">
                      {collection?.price}
                    </span>
                    <span className="text-text-secondary line-through text-sm">
                      {collection?.originalPrice}
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-accent hover:bg-accent hover:text-accent-foreground transition-street"
                    disabled={!collection?.inStock}
                  >
                    <Icon name="ShoppingBag" size={20} />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/collections">
            <Button
              variant="outline"
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg font-bold tracking-wide transition-street"
              iconName="ArrowRight"
              iconPosition="right"
            >
              VIEW ALL COLLECTIONS
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCollections;