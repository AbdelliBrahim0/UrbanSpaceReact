import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeaturedDeals = () => {
  const [currentDeal, setCurrentDeal] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 23,
    seconds: 45
  });

  const featuredDeals = [
    {
      id: 1,
      title: "HYPEBEAST HOODIE",
      brand: "STREET KINGS",
      originalPrice: 149.99,
      salePrice: 44.99,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
      discount: 70,
      description: "Premium streetwear hoodie with embroidered logo",
      stock: 3,
      isFlashSale: true,
      socialProof: "127 people bought this today"
    },
    {
      id: 2,
      title: "URBAN BOMBER JACKET",
      brand: "CITY REBELS",
      originalPrice: 199.99,
      salePrice: 79.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
      discount: 60,
      description: "Limited edition bomber with street art design",
      stock: 8,
      isLimitedEdition: true,
      socialProof: "Featured in Hypebeast Magazine"
    },
    {
      id: 3,
      title: "GRAFFITI CARGO PANTS",
      brand: "UNDERGROUND",
      originalPrice: 129.99,
      salePrice: 38.99,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      discount: 70,
      description: "Hand-painted cargo pants with utility pockets",
      stock: 12,
      isClearance: true,
      socialProof: "Last chance - Final markdowns"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev?.seconds > 0) {
          return { ...prev, seconds: prev?.seconds - 1 };
        } else if (prev?.minutes > 0) {
          return { ...prev, minutes: prev?.minutes - 1, seconds: 59 };
        } else if (prev?.hours > 0) {
          return { hours: prev?.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDeal((prev) => (prev + 1) % featuredDeals?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredDeals?.length]);

  const currentDealData = featuredDeals?.[currentDeal];
  const savings = currentDealData?.originalPrice - currentDealData?.salePrice;

  return (
    <div className="bg-surface border border-street rounded-lg overflow-hidden mb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent to-success p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={24} className="text-accent-foreground" />
            <h2 className="text-xl font-heading font-bold text-accent-foreground">
              DEAL OF THE HOUR
            </h2>
          </div>
          <div className="flex items-center space-x-2 bg-accent-foreground/20 rounded-lg px-3 py-1">
            <Icon name="Clock" size={16} className="text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">
              {timeLeft?.hours?.toString()?.padStart(2, '0')}:
              {timeLeft?.minutes?.toString()?.padStart(2, '0')}:
              {timeLeft?.seconds?.toString()?.padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
      {/* Deal Content */}
      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Product Image */}
          <motion.div
            key={currentDeal}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={currentDealData?.image}
                alt={currentDealData?.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Discount Badge */}
            <div className="absolute top-4 left-4 bg-error text-error-foreground px-3 py-2 rounded-full font-bold text-lg animate-pulse-glow">
              -{currentDealData?.discount}%
            </div>

            {/* Special Badges */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              {currentDealData?.isFlashSale && (
                <div className="bg-error text-error-foreground px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                  FLASH SALE
                </div>
              )}
              {currentDealData?.isLimitedEdition && (
                <div className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-bold">
                  LIMITED
                </div>
              )}
              {currentDealData?.isClearance && (
                <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold">
                  FINAL SALE
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            key={`details-${currentDeal}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Brand & Title */}
            <div>
              <p className="text-accent font-medium text-sm uppercase tracking-wide mb-1">
                {currentDealData?.brand}
              </p>
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                {currentDealData?.title}
              </h3>
              <p className="text-muted-foreground mt-2">
                {currentDealData?.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-accent">
                  ${currentDealData?.salePrice?.toFixed(2)}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  ${currentDealData?.originalPrice?.toFixed(2)}
                </span>
              </div>
              <div className="bg-success text-success-foreground inline-block px-3 py-1 rounded-full text-sm font-bold">
                YOU SAVE ${savings?.toFixed(2)}
              </div>
            </div>

            {/* Stock & Social Proof */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Package" size={16} className={currentDealData?.stock <= 5 ? 'text-error' : 'text-success'} />
                <span className={`text-sm font-medium ${currentDealData?.stock <= 5 ? 'text-error' : 'text-success'}`}>
                  {currentDealData?.stock <= 5 ? `Only ${currentDealData?.stock} left!` : `${currentDealData?.stock} in stock`}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-accent" />
                <span className="text-sm text-muted-foreground">
                  {currentDealData?.socialProof}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button className="flex-1 bg-accent text-accent-foreground py-3 px-6 rounded-lg font-heading font-bold text-lg hover:scale-105 transition-street box-shadow-street">
                ADD TO CART
              </button>
              <button className="flex-1 border border-accent text-accent py-3 px-6 rounded-lg font-heading font-bold text-lg hover:bg-accent hover:text-accent-foreground transition-street">
                VIEW DETAILS
              </button>
            </div>

            {/* Trust Signals */}
            <div className="flex items-center justify-between pt-4 border-t border-street">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-xs text-muted-foreground">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Truck" size={16} className="text-success" />
                <span className="text-xs text-muted-foreground">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="RotateCcw" size={16} className="text-success" />
                <span className="text-xs text-muted-foreground">30-Day Returns</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Deal Navigation */}
        <div className="flex justify-center space-x-2 mt-6">
          {featuredDeals?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentDeal(index)}
              className={`w-3 h-3 rounded-full transition-street ${
                index === currentDeal ? 'bg-accent' : 'bg-muted-foreground opacity-50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedDeals;