import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FlashSaleCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  const flashDeals = [
    {
      id: 1,
      title: "Supreme Hoodie Collection",
      originalPrice: 299,
      salePrice: 89,
      discount: 70,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      stock: 12,
      sold: 88
    },
    {
      id: 2,
      title: "Jordan Retro Sneakers",
      originalPrice: 450,
      salePrice: 179,
      discount: 60,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?w=400&h=400&fit=crop",
      stock: 8,
      sold: 142
    },
    {
      id: 3,
      title: "Street Art Bomber Jacket",
      originalPrice: 199,
      salePrice: 59,
      discount: 70,
      image: "https://images.pixabay.com/photo/2016/12/06/09/31/blank-1886008_1280.jpg?w=400&h=400&fit=crop",
      stock: 15,
      sold: 65
    },
    {
      id: 4,
      title: "Urban Cap Collection",
      originalPrice: 89,
      salePrice: 25,
      discount: 72,
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
      stock: 23,
      sold: 97
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 3600);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % flashDeals?.length);
    }, 5000);

    return () => clearInterval(slideTimer);
  }, [flashDeals?.length]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % flashDeals?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + flashDeals?.length) % flashDeals?.length);
  };

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-4 mb-6"
          >
            <div className="w-12 h-12 bg-error rounded-full flex items-center justify-center">
              <Icon name="Zap" size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-2">
                FLASH SALE
              </h2>
              <div className="text-error font-bold text-lg">
                Ends in: {formatTime(timeLeft)}
              </div>
            </div>
          </motion.div>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Lightning deals that disappear fast. These prices won't last long!
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-accent/30">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-gradient-to-br from-background to-surface p-8 md:p-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Product Image */}
                  <div className="relative">
                    <motion.div
                      className="relative overflow-hidden rounded-xl"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Image
                        src={flashDeals?.[currentSlide]?.image}
                        alt={flashDeals?.[currentSlide]?.title}
                        className="w-full h-80 object-cover"
                      />
                      
                      {/* Discount Badge */}
                      <div className="absolute top-4 left-4">
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="bg-error text-white font-bold px-4 py-2 rounded-full text-lg"
                        >
                          -{flashDeals?.[currentSlide]?.discount}%
                        </motion.div>
                      </div>

                      {/* Stock Indicator */}
                      <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div className="text-sm text-warning font-bold">
                          Only {flashDeals?.[currentSlide]?.stock} left!
                        </div>
                      </div>
                    </motion.div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Sold: {flashDeals?.[currentSlide]?.sold}</span>
                        <span>Available: {flashDeals?.[currentSlide]?.stock}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className="bg-accent h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${(flashDeals?.[currentSlide]?.sold / (flashDeals?.[currentSlide]?.sold + flashDeals?.[currentSlide]?.stock)) * 100}%` 
                          }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-heading font-bold text-foreground mb-4">
                        {flashDeals?.[currentSlide]?.title}
                      </h3>
                      
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="text-4xl font-bold text-accent">
                          ${flashDeals?.[currentSlide]?.salePrice}
                        </div>
                        <div className="text-xl text-muted-foreground line-through">
                          ${flashDeals?.[currentSlide]?.originalPrice}
                        </div>
                        <div className="bg-error text-white px-3 py-1 rounded-full text-sm font-bold">
                          SAVE ${flashDeals?.[currentSlide]?.originalPrice - flashDeals?.[currentSlide]?.salePrice}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-warning">
                        <Icon name="Clock" size={20} />
                        <span className="font-bold">Limited Time: {formatTime(timeLeft)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-error">
                        <Icon name="Flame" size={20} />
                        <span className="font-bold">Hot Deal - {flashDeals?.[currentSlide]?.sold} already sold!</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        variant="default"
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold flex-1"
                      >
                        ADD TO CART
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                        iconName="Heart"
                        iconPosition="left"
                      >
                        WISHLIST
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-surface border border-accent/30 w-12 h-12"
          >
            <Icon name="ChevronLeft" size={24} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-surface border border-accent/30 w-12 h-12"
          >
            <Icon name="ChevronRight" size={24} />
          </Button>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {flashDeals?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-accent scale-125' :'bg-muted hover:bg-accent/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleCarousel;