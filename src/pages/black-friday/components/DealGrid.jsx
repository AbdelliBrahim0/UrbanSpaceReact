import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { blackfriday } from '../../../api';

const DealGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlackFridayProducts = async () => {
      try {
        setLoading(true);
        const response = await blackfriday.list();
        if (response.success && Array.isArray(response.data)) {
          const formattedProducts = response.data.map(product => ({
            id: product.id,
            title: product.name,
            category: product.categories?.[0]?.name?.toLowerCase() || 'all',
            originalPrice: product.price,
            salePrice: product.promotion?.newPrice || product.price,
            discount: product.promotion ? Math.round(((product.price - product.promotion.newPrice) / product.price) * 100) : 0,
            image: product.urlImage,
            imageHover: product.urlImageHover || product.urlImage,
            badge: product.promotion ? 'SALE' : 'NEW',
            stock: product.stock,
            description: product.description,
            promotion: product.promotion
          }));
          setProducts(formattedProducts);
        } else {
          setError('Erreur lors du chargement des produits Black Friday');
        }
      } catch (err) {
        console.error('Erreur API:', err);
        setError('Impossible de charger les produits. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlackFridayProducts();
  }, []);

  const categories = [
    { id: 'all', label: 'Tous les produits', icon: 'Grid3X3' },
    ...Array.from(
      new Set(products.flatMap(product => 
        product.categories?.map(cat => cat.name) || []
      ))
    ).map((category, index) => ({
      id: category.toLowerCase(),
      label: category,
      icon: index % 4 === 0 ? 'Shirt' : 
            index % 4 === 1 ? 'Footprints' : 
            index % 4 === 2 ? 'Watch' : 'Coat'
    }))
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => 
        product.categories?.some(cat => cat.name.toLowerCase() === selectedCategory)
      );

  const getBadgeColor = (badge) => {
    const colors = {
      'BESTSELLER': 'bg-accent text-accent-foreground',
      'LIMITED': 'bg-error text-white',
      'NEW': 'bg-success text-success-foreground',
      'HOT': 'bg-warning text-warning-foreground',
      'FLASH': 'bg-error text-white animate-pulse',
      'EXCLUSIVE': 'bg-primary text-primary-foreground',
      'TRENDING': 'bg-accent text-accent-foreground',
      'PREMIUM': 'bg-warning text-warning-foreground',
      'SALE': 'bg-accent text-accent-foreground'
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
          {loading ? (
            // Afficher un indicateur de chargement
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-surface border border-street rounded-xl overflow-hidden animate-pulse h-96">
                <div className="bg-muted h-64 w-full"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-error">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4"
                variant="outline"
                iconName="RefreshCw"
              >
                Réessayer
              </Button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Aucun produit trouvé pour cette catégorie</p>
            </div>
          ) : (
            filteredProducts?.map((product, index) => (
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
                {/* Badge de promotion */}
                {product?.badge && (
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold ${getBadgeColor(product?.badge)} z-10`}>
                    {product?.badge}
                  </div>
                )}
                
                {/* Badge de stock limité */}
                {product?.stock < 10 && (
                  <div className="absolute top-3 right-3 bg-error text-error-foreground px-2 py-1 rounded-full text-xs font-bold z-10">
                    {product?.stock} restant{product?.stock > 1 ? 's' : ''}
                  </div>
                )}

                {/* Image du produit */}
                <div className="relative overflow-hidden aspect-square">
                  <Image
                    src={hoveredProduct === product?.id && product?.imageHover ? product?.imageHover : product?.image}
                    alt={product?.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Boutons d'action au survol */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Button variant="secondary" size="icon" className="rounded-full">
                      <Icon name="Heart" size={20} />
                    </Button>
                    <Button variant="secondary" size="icon" className="rounded-full">
                      <Icon name="Eye" size={20} />
                    </Button>
                    <Button variant="secondary" size="icon" className="rounded-full">
                      <Icon name="ShoppingCart" size={20} />
                    </Button>
                  </div>
                </div>

                {/* Détails du produit */}
                <div className="p-4">
                  <h3 className="font-heading font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2 h-14">
                    {product?.title}
                  </h3>
                  
                  <div className="mt-2 flex items-center gap-2">
                    {product?.promotion ? (
                      <>
                        <span className="text-lg font-bold text-foreground">
                          {product.promotion.newPrice.toFixed(2)} TND
                        </span>
                        <span className="text-muted-foreground line-through text-sm">
                          {product.promotion.originalPrice.toFixed(2)} TND
                        </span>
                        <span className="bg-accent/10 text-accent text-xs font-bold px-2 py-0.5 rounded-full">
                          -{product.promotion.discountPercentage}%
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-foreground">
                        {product?.originalPrice?.toFixed(2)} TND
                      </span>
                    )}
                  </div>

                  {/* Description du produit */}
                  {product?.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {/* Bouton d'ajout au panier */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3 group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Ajouter au panier
                  </Button>
                </div>
              </motion.div>
            ))
          )}
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