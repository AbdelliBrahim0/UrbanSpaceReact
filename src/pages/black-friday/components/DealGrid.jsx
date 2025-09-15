import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DealGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const categories = [
    { id: 'all', label: 'All Deals', icon: 'Grid3X3' },
    { id: 'hoodies', label: 'Hoodies', icon: 'Shirt' },
    { id: 'sneakers', label: 'Sneakers', icon: 'Footprints' },
    { id: 'accessories', label: 'Accessories', icon: 'Watch' },
    { id: 'jackets', label: 'Jackets', icon: 'Coat' }
  ];

  const products = [
    {
      id: 1,
      title: "Street Gang Hoodie",
      category: 'hoodies',
      originalPrice: 199,
      salePrice: 79,
      discount: 60,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      badge: "BESTSELLER",
      stock: 15,
      rating: 4.8,
      reviews: 234
    },
    {
      id: 2,
      title: "Urban Runner Sneakers",
      category: 'sneakers',
      originalPrice: 299,
      salePrice: 149,
      discount: 50,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?w=400&h=400&fit=crop",
      badge: "LIMITED",
      stock: 8,
      rating: 4.9,
      reviews: 156
    },
    {
      id: 3,
      title: "Graffiti Bomber Jacket",
      category: 'jackets',
      originalPrice: 349,
      salePrice: 139,
      discount: 60,
      image: "https://images.pixabay.com/photo/2016/12/06/09/31/blank-1886008_1280.jpg?w=400&h=400&fit=crop",
      badge: "NEW",
      stock: 12,
      rating: 4.7,
      reviews: 89
    },
    {
      id: 4,
      title: "Street Chain Necklace",
      category: 'accessories',
      originalPrice: 89,
      salePrice: 35,
      discount: 61,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      badge: "HOT",
      stock: 25,
      rating: 4.6,
      reviews: 67
    },
    {
      id: 5,
      title: "Oversized Streetwear Tee",
      category: 'hoodies',
      originalPrice: 79,
      salePrice: 29,
      discount: 63,
      image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?w=400&h=400&fit=crop",
      badge: "FLASH",
      stock: 30,
      rating: 4.5,
      reviews: 123
    },
    {
      id: 6,
      title: "High-Top Street Boots",
      category: 'sneakers',
      originalPrice: 259,
      salePrice: 129,
      discount: 50,
      image: "https://images.pixabay.com/photo/2017/07/02/12/18/boot-2468404_1280.jpg?w=400&h=400&fit=crop",
      badge: "EXCLUSIVE",
      stock: 18,
      rating: 4.8,
      reviews: 91
    },
    {
      id: 7,
      title: "Urban Crossbody Bag",
      category: 'accessories',
      originalPrice: 129,
      salePrice: 49,
      discount: 62,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      badge: "TRENDING",
      stock: 22,
      rating: 4.7,
      reviews: 78
    },
    {
      id: 8,
      title: "Leather Street Jacket",
      category: 'jackets',
      originalPrice: 449,
      salePrice: 179,
      discount: 60,
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?w=400&h=400&fit=crop",
      badge: "PREMIUM",
      stock: 6,
      rating: 4.9,
      reviews: 145
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products?.filter(product => product?.category === selectedCategory);

  const getBadgeColor = (badge) => {
    const colors = {
      'BESTSELLER': 'bg-accent text-accent-foreground',
      'LIMITED': 'bg-error text-white',
      'NEW': 'bg-success text-success-foreground',
      'HOT': 'bg-warning text-warning-foreground',
      'FLASH': 'bg-error text-white animate-pulse',
      'EXCLUSIVE': 'bg-primary text-primary-foreground',
      'TRENDING': 'bg-accent text-accent-foreground',
      'PREMIUM': 'bg-warning text-warning-foreground'
    };
    return colors?.[badge] || 'bg-muted text-muted-foreground';
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4"
          >
            BLACK FRIDAY DEALS
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Massive discounts on premium streetwear. Limited quantities, unlimited style.
          </p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories?.map((category) => (
            <Button
              key={category?.id}
              variant={selectedCategory === category?.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category?.id)}
              className={`${
                selectedCategory === category?.id
                  ? 'bg-accent text-accent-foreground'
                  : 'border-accent/30 text-foreground hover:bg-accent hover:text-accent-foreground'
              } font-bold transition-all duration-300`}
              iconName={category?.icon}
              iconPosition="left"
            >
              {category?.label}
            </Button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts?.map((product, index) => (
            <motion.div
              key={product?.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-surface border border-street rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300"
              onMouseEnter={() => setHoveredProduct(product?.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={product?.image}
                  alt={product?.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3">
                  <div className={`${getBadgeColor(product?.badge)} px-2 py-1 rounded-full text-xs font-bold`}>
                    {product?.badge}
                  </div>
                </div>
                
                <div className="absolute top-3 right-3">
                  <div className="bg-error text-white px-2 py-1 rounded-full text-sm font-bold">
                    -{product?.discount}%
                  </div>
                </div>

                {/* Stock Indicator */}
                {product?.stock <= 10 && (
                  <div className="absolute bottom-3 left-3 bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-bold">
                    Only {product?.stock} left!
                  </div>
                )}

                {/* Hover Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredProduct === product?.id ? 1 : 0,
                    y: hoveredProduct === product?.id ? 0 : 20
                  }}
                  className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center space-x-2"
                >
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
                  >
                    Quick Add
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    <Icon name="Heart" size={16} />
                  </Button>
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-heading font-bold text-foreground mb-2 line-clamp-2">
                  {product?.title}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={`${
                          i < Math.floor(product?.rating) 
                            ? 'text-warning fill-current' :'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product?.rating} ({product?.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xl font-bold text-accent">
                    ${product?.salePrice}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${product?.originalPrice}
                  </span>
                  <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full font-bold">
                    SAVE ${product?.originalPrice - product?.salePrice}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <Button
                  variant="outline"
                  fullWidth
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold"
                  iconName="ShoppingCart"
                  iconPosition="left"
                >
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold px-8"
          >
            Load More Deals
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DealGrid;