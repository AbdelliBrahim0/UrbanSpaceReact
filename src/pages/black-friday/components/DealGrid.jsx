import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blackfriday } from '../../../api';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { useCart } from '../../../contexts/CartContext';
import { useDialog } from '../../../contexts/DialogContext';
import { toast } from 'react-hot-toast';
import Dialog from '../../../components/ui/Dialog';
import { formatPrice } from '../../../utils/formatters';

const DealGrid = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const [addingProductId, setAddingProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isDialogOpen, setIsDialogOpen } = useDialog();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  // Formater les données des produits
  const formatProductData = (products) => {
    return products.map(product => ({
      id: product.id,
      name: product.name,
      brand: product.brand || 'Urban Space',
      originalPrice: product.price,
      salePrice: product.promotion?.newPrice || product.price,
      price: product.promotion?.newPrice || product.price,
      image: product.urlImage,
      imageHover: product.urlImageHover || product.urlImage,
      rating: 4.5, // Default rating
      reviews: Math.floor(Math.random() * 100), // Random reviews for demo
      stock: product.stock || Math.floor(Math.random() * 30) + 5,
      stockCount: product.stock || Math.floor(Math.random() * 30) + 5,
      inStock: (product.stock || 0) > 0,
      description: product.description || "Description non disponible.",
      category: product.categories?.[0]?.name || "Non classé",
      availableSizes: product.size ? product.size.split(',').map(s => s.trim()) : ['S', 'M', 'L', 'XL'],
      isFlashSale: product.isFlashSale || false,
      isLimitedEdition: product.isLimitedEdition || false,
      isClearance: product.isClearance || false,
      categories: product.categories || [],
      promotion: product.promotion
    }));
  };

  // Charger les produits Black Friday
  useEffect(() => {
    const fetchBlackFridayProducts = async () => {
      try {
        setLoading(true);
        const response = await blackfriday.list();
        
        if (response.success && Array.isArray(response.data)) {
          const formattedProducts = formatProductData(response.data);
          setProducts(formattedProducts);
          
          // Initialiser l'état des favoris
          const initialWishlistState = {};
          formattedProducts.forEach(product => {
            initialWishlistState[product.id] = false;
          });
          setIsWishlisted(initialWishlistState);
        } else {
          setError(response.message || 'Aucun produit Black Friday disponible');
        }
      } catch (err) {
        console.error('Erreur lors du chargement des produits Black Friday:', err);
        setError('Impossible de charger les produits Black Friday. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlackFridayProducts();
  }, []);

  // Gestion des favoris
  const handleWishlistToggle = (productId, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsWishlisted(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  // Gestion de l'ajout au panier
  const handleAddToCart = async (product, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setAddingProductId(product.id);
    
    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: parseFloat(product.salePrice || product.originalPrice),
        image: product.image,
        size: product.availableSizes?.[0] || 'Unique',
        color: 'Standard',
        source: 'From Black Friday',
        quantity: 1
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
      toast.error("Erreur lors de l'ajout au panier");
    } finally {
      setAddingProductId(null);
    }
  };

  // Calculer le pourcentage de réduction
  const getDiscountPercentage = (originalPrice, salePrice) => {
    if (!originalPrice || !salePrice) return 0;
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };

  // Obtenir la couleur du badge en fonction du pourcentage de réduction
  const getBadgeColor = (discount) => {
    if (discount >= 70) return 'bg-error text-error-foreground';
    if (discount >= 50) return 'bg-warning text-warning-foreground';
    if (discount >= 30) return 'bg-accent text-accent-foreground';
    return 'bg-success text-success-foreground';
  };

  // Obtenir le niveau d'urgence du stock
  const getUrgencyLevel = (stock) => {
    if (stock <= 3) return 'critical';
    if (stock <= 10) return 'low';
    return 'normal';
  };

  // Filtrer les produits par catégorie
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => 
        product.categories.some(cat => cat.name?.toLowerCase() === selectedCategory)
      );

  // Catégories uniques pour les filtres
  const categories = [
    { id: 'all', name: 'Tout voir' },
    ...Array.from(
      new Map(
        products.flatMap(p => 
          p.categories?.map(c => [
            c.id, 
            { 
              id: c.id, // Utiliser l'ID de la catégorie comme clé unique
              name: c.name 
            }
          ]) || []
        )
      ).values()
    )
  ];

  // Supprimer les doublons de catégories (au cas où)
  const uniqueCategories = Array.from(
    new Map(categories.map(cat => [cat.id, cat])).values()
  );

  // Afficher un indicateur de chargement
  if (loading) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card rounded-lg overflow-hidden border border-street">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Afficher un message d'erreur si nécessaire
  if (error || products.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-warning">
            <Icon name="AlertTriangle" size={48} className="mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Aucun produit disponible</h3>
            <p className="text-muted-foreground">
              {error || 'Aucun produit Black Friday n\'est disponible pour le moment.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Filtres de catégorie */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {uniqueCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="transition-all duration-200"
            >
              {category.name}
              {selectedCategory === category.id && (
                <span className="ml-2">
                  <Icon name="Check" size={16} />
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const discount = getDiscountPercentage(product.originalPrice, product.salePrice);
            const urgencyLevel = getUrgencyLevel(product.stock);

            
            return (
              <div 
                key={product.id}
                className="group relative bg-card border border-street rounded-lg overflow-hidden hover:border-accent transition-street box-shadow-street hover:box-shadow-modal cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => handleProductClick(product)}
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={hoveredProduct === product.id && product.imageHover ? product.imageHover : product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-street duration-500"
                  />
                  
                  {/* Discount Badge */}
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold ${getBadgeColor(discount)} animate-pulse-glow`}>
                    -{discount}%
                  </div>

                  {/* Special Badges */}
                  <div className="absolute top-3 right-3 flex flex-col space-y-1">
                    {product.isFlashSale && (
                      <div className="bg-error text-error-foreground px-2 py-1 rounded-full text-xs font-bold">
                        FLASH
                      </div>
                    )}
                    {product.isLimitedEdition && (
                      <div className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-bold">
                        LIMITED
                      </div>
                    )}
                    {product.isClearance && (
                      <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold">
                        FINAL SALE
                      </div>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => handleWishlistToggle(product.id, e)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-street ${
                      isWishlisted[product.id] 
                        ? 'bg-error text-error-foreground' 
                        : 'bg-background/80 text-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                    style={{ 
                      marginTop: (product.isFlashSale || product.isLimitedEdition || product.isClearance) ? '2.5rem' : '0' 
                    }}
                  >
                    <Icon 
                      name="Heart" 
                      size={16} 
                      className={isWishlisted[product.id] ? 'fill-current' : ''} 
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Brand & Name */}
                  <div className="mb-2">
                    <p className="text-xs text-accent font-medium uppercase tracking-wide">
                      {product.brand}
                    </p>
                    <h3 className="text-sm font-medium text-foreground truncate group-hover:text-accent transition-street" title={product.name}>
                      {product.name}
                    </h3>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline space-x-2 mb-2">
                    <div>
                      <div className="text-lg font-bold text-accent">
                        {product.salePrice?.toFixed(3)}
                      </div>
                      <div className="text-accent text-sm font-medium">TND</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground line-through">
                        {product.originalPrice?.toFixed(3)}
                      </div>
                      <div className="text-xs text-muted-foreground line-through">TND</div>
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1">
                      <Icon 
                        name="Package" 
                        size={14} 
                        className={urgencyLevel === 'critical' ? 'text-error' : urgencyLevel === 'low' ? 'text-warning' : 'text-success'} 
                      />
                      <span className={`text-xs font-medium ${
                        urgencyLevel === 'critical' ? 'text-error' : 
                        urgencyLevel === 'low' ? 'text-warning' : 'text-success'
                      }`}>
                        {product.stock > 0 ? `${product.stock} restant(s)` : 'Rupture de stock'}
                      </span>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-warning fill-current" />
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Bouton Ajouter au panier - Version mobile/visible par défaut */}
                  <div className="lg:hidden mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={!product.stock || product.stock <= 0}
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      {product.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
                    </Button>
                  </div>
                </div>
                
                {/* Bouton Ajouter au panier - Version desktop (visible au survol) */}
                <div className="hidden lg:block absolute bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-street">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={!product.stock || product.stock <= 0}
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    {product.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Detail Dialog */}
      {selectedProduct && (
        <Dialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          title={selectedProduct.name}
          showCancel={false}
          showConfirm={false}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="aspect-[3/4] overflow-hidden rounded-lg md:rounded-lg w-1/2 mx-auto md:w-full md:mx-0">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col p-4 md:p-0">
              <div className="flex-grow">
                <p className="text-sm text-muted-foreground mb-1">{selectedProduct.category}</p>
                <h3 className="text-2xl font-bold text-foreground mb-3">{selectedProduct.name}</h3>
                
                <p className="text-md text-foreground mb-4">{selectedProduct.description}</p>

                <div className="flex items-baseline mb-4">
                  <p className="text-3xl text-accent font-extrabold">
                    {formatPrice(selectedProduct.price)}
                  </p>
                  {selectedProduct.originalPrice && (
                    <span className="ml-3 text-lg text-muted-foreground line-through">
                      {formatPrice(selectedProduct.originalPrice)}
                    </span>
                  )}
                </div>

                {selectedProduct.inStock ? (
                  <p className="text-md font-semibold text-success mb-4">
                    <Icon name="CheckCircle" className="inline-block mr-2" />
                    En stock ({selectedProduct.stockCount} restants)
                  </p>
                ) : (
                  <p className="text-md font-semibold text-error mb-4">
                    <Icon name="XCircle" className="inline-block mr-2" />
                    Rupture de stock
                  </p>
                )}
              </div>

              <div className="mt-auto">
                <Button 
                  variant="solid" 
                  size="lg"
                  className="w-full bg-accent text-white hover:bg-accent/90 transition-colors py-4"
                  onClick={(e) => handleAddToCart(selectedProduct, e)}
                  disabled={!selectedProduct.inStock || addingProductId === selectedProduct.id}
                >
                  {addingProductId === selectedProduct.id ? (
                    <span className="flex items-center justify-center text-lg">
                      <Icon name="Loader" className="h-6 w-6 animate-spin mr-3" />
                      Ajout...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center text-lg">
                      <Icon name="ShoppingBag" className="mr-3 h-6 w-6" />
                      Ajouter au panier
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </section>
  );
};

export default DealGrid;