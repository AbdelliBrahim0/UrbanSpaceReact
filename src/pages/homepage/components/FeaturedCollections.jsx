import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { productsApi } from '../../../api';
import { useCart } from '../../../contexts/CartContext';
import { toast } from 'react-hot-toast';

const FeaturedCollections = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingProductId, setAddingProductId] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Fonction pour mélanger un tableau
  const shuffleArray = (array) => {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  // Charger 4 produits depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.list();
        const products = data.items || [];
        const random4 = shuffleArray(products).slice(0, 4);
        // Adapter les propriétés pour correspondre au composant
        const formatted = random4.map(product => ({
          id: product.id,
          title: product.name,
          subtitle: product.subtitle || "",
          description: product.description || "",
          price: parseFloat(product.price) || 0,
          originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : null,
          image: product.urlImage,
          hoverImage: product.urlImageHover,
          badge: product.badge || "",
          badgeColor: product.badgeColor || "bg-accent",
          category: product.categories?.[0]?.name || "",
          inStock: product.stock > 0,
          stockCount: product.stock || 0
        }));
        setCollections(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const imageVariants = {
    hover: { scale: 1.1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const handleAddToCart = async (product, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setAddingProductId(product.id);
    
    try {
      addToCart({
        id: product.id,
        name: product.title || product.name,
        price: product.price,
        image: product.image || product.urlImage,
        size: product.size || 'Unique',
        color: product.color || 'Standard',
        source: 'From Featured Collections'
      });
      
      toast.success('Produit ajouté au panier', {
        position: 'bottom-center',
        duration: 2000,
        style: {
          background: '#10B981',
          color: '#fff',
        }
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Erreur lors de l\'ajout au panier');
    } finally {
      setAddingProductId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

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
            NOUVEAUTÉS <span className="text-accent">URBANSPACE</span>
          </h2>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
            Découvrez nos dernières collections exclusives. Pièces uniques, qualité supérieure, style urbain.
          </p>
        </motion.div>

        {/* Collections Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              variants={cardVariants}
              className="relative group overflow-hidden rounded-lg bg-surface border border-street transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
              onMouseEnter={() => setHoveredCard(collection.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Link to={`/product/${collection.id}`} className="block">
                {/* Product Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <motion.div
                    variants={imageVariants}
                    whileHover="hover"
                    className="w-full h-full"
                  >
                    <Image
                      src={hoveredCard === collection.id && collection.hoverImage ? collection.hoverImage : collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover transition-street"
                    />
                  </motion.div>

                  {/* Badge */}
                  {collection.badge && (
                    <div className={`absolute top-4 left-4 ${collection.badgeColor} text-background px-3 py-1 rounded-full text-xs font-bold tracking-wide`}>
                      {collection.badge}
                    </div>
                  )}

                  {/* Stock Status */}
                  <div className="absolute top-4 right-4">
                    {collection.inStock ? (
                      <div className="bg-success text-success-foreground px-2 py-1 rounded text-xs font-bold">
                        {collection.stockCount} EN STOCK
                      </div>
                    ) : (
                      <div className="bg-error text-error-foreground px-2 py-1 rounded text-xs font-bold">
                        RUPTURE
                      </div>
                    )}
                  </div>
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4">
                <Link to={`/product/${collection.id}`} className="block mb-2">
                  <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-accent transition-colors">
                    {collection.title}
                  </h3>
                  <p className="text-accent font-bold">
                    {collection.price.toFixed(3)} TND
                    {collection.originalPrice && (
                      <span className="ml-2 text-muted-foreground line-through text-sm">
                        {collection.originalPrice.toFixed(3)} TND
                      </span>
                    )}
                  </p>
                </Link>
                
                <Button 
                  variant="outline" 
                  className="w-full border-accent text-accent hover:bg-accent hover:text-white transition-colors"
                  onClick={(e) => handleAddToCart(collection, e)}
                  disabled={!collection.inStock || addingProductId === collection.id}
                >
                  {addingProductId === collection.id ? (
                    <span className="flex items-center justify-center">
                      <Icon name="Loader" className="h-4 w-4 animate-spin mr-2" />
                      Ajout en cours...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Icon name="ShoppingBag" className="mr-2 h-4 w-4" />
                      {collection.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
                    </span>
                  )}
                </Button>
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
              TOUTES LES COLLECTIONS
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
