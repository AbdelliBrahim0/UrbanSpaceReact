import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ products, title = "You Might Also Like" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const itemsPerView = {
    mobile: 2,
    tablet: 3,
    desktop: 4
  };

  const scrollToIndex = (index) => {
    setCurrentIndex(index);
    if (scrollContainerRef?.current) {
      const itemWidth = scrollContainerRef?.current?.scrollWidth / products?.length;
      scrollContainerRef?.current?.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => {
    const maxIndex = products?.length - itemsPerView?.desktop;
    const newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const maxIndex = products?.length - itemsPerView?.desktop;
    const newIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    scrollToIndex(newIndex);
  };

  const ProductCard = ({ product, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const discountPercentage = product?.originalPrice 
      ? Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)
      : 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2"
      >
        <div
          className="bg-surface/30 rounded-lg overflow-hidden border border-street hover:border-accent/50 transition-all duration-300 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden">
            <Link to={`/product-detail?id=${product?.id}`}>
              <Image
                src={isHovered && product?.hoverImage ? product?.hoverImage : product?.image}
                alt={product?.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </Link>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col space-y-2">
              {product?.isNew && (
                <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
                  NEW
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="bg-error text-error-foreground text-xs font-bold px-2 py-1 rounded">
                  -{discountPercentage}%
                </span>
              )}
              {product?.isLimited && (
                <span className="bg-warning text-warning-foreground text-xs font-bold px-2 py-1 rounded animate-pulse">
                  LIMITED
                </span>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-8 h-8 bg-background/80 hover:bg-background/90"
              >
                <Icon 
                  name="Heart" 
                  size={16} 
                  className={isWishlisted ? 'fill-current text-error' : 'text-foreground'} 
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 bg-background/80 hover:bg-background/90"
              >
                <Icon name="Eye" size={16} />
              </Button>
            </div>

            {/* Quick Add to Cart */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                className="w-full text-xs"
                onClick={(e) => {
                  e?.preventDefault();
                  console.log('Quick add to cart:', product?.id);
                }}
              >
                <Icon name="ShoppingBag" size={14} className="mr-1" />
                Quick Add
              </Button>
            </div>

            {/* Stock Status */}
            {product?.stock <= 5 && product?.stock > 0 && (
              <div className="absolute bottom-3 left-3 bg-warning/90 text-warning-foreground text-xs px-2 py-1 rounded">
                Only {product?.stock} left
              </div>
            )}
            {product?.stock === 0 && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <span className="bg-error text-error-foreground px-4 py-2 rounded font-medium">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-2">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                {product?.brand}
              </span>
              {product?.rating && (
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                  <span className="text-xs text-muted-foreground">{product?.rating}</span>
                </div>
              )}
            </div>

            <Link 
              to={`/product-detail?id=${product?.id}`}
              className="block hover:text-accent transition-colors"
            >
              <h3 className="font-medium text-foreground line-clamp-2 text-sm">
                {product?.name}
              </h3>
            </Link>

            <div className="flex items-center space-x-2">
              <span className="font-bold text-foreground">
                ${product?.price?.toFixed(2)}
              </span>
              {product?.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product?.originalPrice?.toFixed(2)}
                </span>
              )}
            </div>

            {/* Color Options */}
            {product?.colors && product?.colors?.length > 0 && (
              <div className="flex space-x-1 mt-2">
                {product?.colors?.slice(0, 4)?.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="w-4 h-4 rounded-full border border-street"
                    style={{ backgroundColor: color?.hex }}
                    title={color?.name}
                  />
                ))}
                {product?.colors?.length > 4 && (
                  <span className="text-xs text-muted-foreground ml-1">
                    +{product?.colors?.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  if (!products || products?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          {title}
        </h2>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="w-10 h-10"
          >
            <Icon name="ChevronLeft" size={18} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="w-10 h-10"
          >
            <Icon name="ChevronRight" size={18} />
          </Button>
        </div>
      </div>
      {/* Products Carousel */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide space-x-0 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products?.map((product, index) => (
            <ProductCard key={product?.id} product={product} index={index} />
          ))}
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-4 lg:hidden">
          {Array.from({ length: Math.ceil(products?.length / itemsPerView?.mobile) })?.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index * itemsPerView?.mobile)}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(currentIndex / itemsPerView?.mobile) === index
                  ? 'bg-accent' :'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
      {/* View All Link */}
      <div className="text-center">
        <Link to="/collections">
          <Button variant="outline">
            View All Products
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RelatedProducts;