import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { productsApi } from '../../../api';
import { useCart } from '../../../contexts/CartContext';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const FeaturedCollections = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingProductId, setAddingProductId] = useState(null);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

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
        // Adapter les propriétés pour correspondre à ton composant
        const formatted = random4.map(product => ({
          id: product.id,
          title: product.name,
          subtitle: product.subtitle || "",
          description: product.description || "",
          price: `${product.price} TND`,
          originalPrice: product.originalPrice ? `${product.originalPrice} TND` : "",
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

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      toast.error('Veuillez vous connecter pour ajouter des articles au panier');
      return;
    }

    setAddingProductId(product.id);
    
    try {
      await addToCart({
        id: product.id,
        name: product.title,
        price: parseFloat(product.price.replace(' TND', '')),
        image: product.image,
        quantity: 1,
        stock: product.stockCount,
        source: 'Featured Collections'
      });
      
      toast.success('Produit ajouté au panier');
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      toast.error('Une erreur est survenue lors de l\'ajout au panier');
    } finally {
      setAddingProductId(null);
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
        {loading ? (
          <div className="text-center text-muted-foreground">Chargement des produits...</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {collections.map((collection) => (
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
                      src={hoveredCard === collection?.id && collection?.hoverImage ? collection.hoverImage : collection?.image}
                      alt={collection?.title}
                      className="w-full h-full object-cover transition-street"
                    />
                  </motion.div>

                  {/* Badge */}
                  {collection?.badge && (
                    <div className={`absolute top-4 left-4 ${collection?.badgeColor} text-background px-3 py-1 rounded-full text-xs font-bold tracking-wide`}>
                      {collection?.badge}
                    </div>
                  )}

                  {/* Stock Status */}
                  <div className="absolute top-4 right-4">
                    {collection?.inStock ? (
                      <div className="bg-success text-success-foreground px-2 py-1 rounded text-xs font-bold">
                        {collection?.stockCount} EN STOCK
                      </div>
                    ) : (
                      <div className="bg-error text-error-foreground px-2 py-1 rounded text-xs font-bold">
                        RUPTURE
                      </div>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center"
                  >
                    <Link to={`/product/${collection?.id}`}>
                      <Button
                        variant="default"
                        className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold tracking-wide"
                      >
                        VUE RAPIDE
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

                  {/* Price and Add to Cart */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-foreground font-bold">{collection.price}</span>
                        {collection.originalPrice && (
                          <span className="text-muted-foreground line-through text-sm ml-2">
                            {collection.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(collection);
                      }}
                      disabled={!collection.inStock || addingProductId === collection.id}
                    >
                      {addingProductId === collection.id ? (
                        <>
                          <span className="inline-block animate-spin mr-2">
                            <Icon name="Loader" className="h-4 w-4" />
                          </span>
                          Ajout en cours...
                        </>
                      ) : (
                        <>
                          <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
                          {collection.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

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
