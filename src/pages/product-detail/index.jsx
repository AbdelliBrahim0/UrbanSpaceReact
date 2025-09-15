import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductPurchase from './components/ProductPurchase';
import CustomerReviews from './components/CustomerReviews';
import RelatedProducts from './components/RelatedProducts';
import SocialShare from './components/SocialShare';

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams?.get('id') || '1';
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Mock product data
  const mockProduct = {
    id: productId,
    name: "Urban Rebellion Oversized Hoodie",
    subtitle: "Premium streetwear with attitude",
    brand: "StreetVault",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviewCount: 247,
    stock: 12,
    maxQuantity: 5,
    isLimited: true,
    isNew: false,
    mainImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=800&fit=crop"
    ],
    colors: [
      { name: "Midnight Black", hex: "#1a1a1a" },
      { name: "Storm Grey", hex: "#6b7280" },
      { name: "Electric Blue", hex: "#3b82f6" },
      { name: "Neon Green", hex: "#10b981" }
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: false },
      { size: "XL", available: true },
      { size: "XXL", available: true }
    ],
    description: `Embrace the streets with our Urban Rebellion Oversized Hoodie. Crafted from premium cotton blend with a rebellious spirit, this hoodie represents the essence of street culture.\n\nFeaturing bold graphics inspired by underground art movements and constructed with attention to detail that speaks to authenticity. The oversized fit provides comfort while maintaining that coveted streetwear silhouette.\n\nPerfect for layering or wearing solo, this piece transitions seamlessly from day to night, from the streets to the scene.`,
    material: "80% Cotton, 20% Polyester",
    fit: "Oversized",
    origin: "Made in Portugal",
    season: "All Season",
    sizeChart: [
      { size: "XS", chest: "40", length: "26", shoulder: "18" },
      { size: "S", chest: "42", length: "27", shoulder: "19" },
      { size: "M", chest: "44", length: "28", shoulder: "20" },
      { size: "L", chest: "46", length: "29", shoulder: "21" },
      { size: "XL", chest: "48", length: "30", shoulder: "22" },
      { size: "XXL", chest: "50", length: "31", shoulder: "23" }
    ],
    careInstructions: [
      {
        icon: "Droplets",
        title: "Machine Wash Cold",
        description: "Wash in cold water to preserve colors and fabric integrity"
      },
      {
        icon: "Wind",
        title: "Air Dry",
        description: "Hang dry to maintain shape and prevent shrinkage"
      },
      {
        icon: "Flame",
        title: "Low Heat Iron",
        description: "Iron on low heat if needed, avoid direct contact with graphics"
      },
      {
        icon: "Ban",
        title: "No Bleach",
        description: "Do not use bleach or harsh chemicals"
      }
    ],
    authenticityInfo: "Every StreetVault product comes with our authenticity guarantee. We source directly from authorized suppliers and conduct rigorous quality checks.",
    authenticityFeatures: [
      "Holographic authenticity tag",
      "Unique serial number",
      "Premium packaging",
      "Certificate of authenticity",
      "QR code verification",
      "Lifetime authenticity guarantee"
    ],
    features: [
      { icon: "Truck", text: "Free shipping on orders over $75" },
      { icon: "RotateCcw", text: "30-day return policy" },
      { icon: "Shield", text: "1-year warranty included" },
      { icon: "Award", text: "Authenticity guaranteed" }
    ],
    reviews: [
      {
        id: 1,
        name: "Marcus Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        date: "2024-01-15",
        verified: true,
        comment: "Absolutely love this hoodie! The quality is incredible and the fit is perfect. The oversized style is exactly what I was looking for. The material feels premium and the graphics are sharp. Definitely worth the investment.",
        helpful: 23,
        purchaseDetails: { size: "L", color: "Midnight Black" },
        photos: [
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop"
        ]
      },
      {
        id: 2,
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4,
        date: "2024-01-10",
        verified: true,
        comment: "Great hoodie overall. The design is sick and the quality is solid. Only reason I'm giving 4 stars instead of 5 is because it runs a bit larger than expected, but that might be intentional for the oversized look.",
        helpful: 18,
        purchaseDetails: { size: "M", color: "Storm Grey" }
      },
      {
        id: 3,
        name: "Alex Rivera",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        rating: 5,
        date: "2024-01-08",
        verified: true,
        comment: "This is my third purchase from StreetVault and they never disappoint. The attention to detail is amazing and the streetwear aesthetic is on point. Highly recommend!",
        helpful: 15,
        purchaseDetails: { size: "XL", color: "Electric Blue" }
      },
      {
        id: 4,
        name: "Jordan Kim",
        avatar: "https://randomuser.me/api/portraits/women/23.jpg",
        rating: 4,
        date: "2024-01-05",
        verified: false,
        comment: "Love the style and comfort. Perfect for casual wear and the quality seems durable. Shipping was fast too!",
        helpful: 12,
        purchaseDetails: { size: "S", color: "Neon Green" }
      },
      {
        id: 5,
        name: "Tyler Brooks",
        avatar: "https://randomuser.me/api/portraits/men/89.jpg",
        rating: 5,
        date: "2024-01-02",
        verified: true,
        comment: "Exceeded my expectations! The hoodie has that premium feel and the graphics are fire. Definitely going to order more from this brand.",
        helpful: 9,
        purchaseDetails: { size: "L", color: "Midnight Black" },
        photos: [
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&h=200&fit=crop"
        ]
      }
    ]
  };

  const mockRelatedProducts = [
    {
      id: "2",
      name: "Street Warrior Cargo Pants",
      brand: "StreetVault",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
      rating: 4.6,
      stock: 8,
      isNew: true,
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Olive", hex: "#6b7c32" }
      ]
    },
    {
      id: "3",
      name: "Underground Graphic Tee",
      brand: "StreetVault",
      price: 34.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=400&h=400&fit=crop",
      rating: 4.9,
      stock: 15,
      colors: [
        { name: "White", hex: "#ffffff" },
        { name: "Black", hex: "#000000" },
        { name: "Grey", hex: "#808080" }
      ]
    },
    {
      id: "4",
      name: "Rebel Denim Jacket",
      brand: "StreetVault",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop",
      rating: 4.7,
      stock: 5,
      isLimited: true,
      colors: [
        { name: "Indigo", hex: "#4b0082" },
        { name: "Black", hex: "#000000" }
      ]
    },
    {
      id: "5",
      name: "Urban Explorer Backpack",
      brand: "StreetVault",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=400&fit=crop",
      rating: 4.8,
      stock: 12,
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Grey", hex: "#808080" },
        { name: "Camo", hex: "#3d4f3d" }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProduct(mockProduct);
      setRelatedProducts(mockRelatedProducts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [productId]);

  const handleAddToCart = (productData) => {
    console.log('Adding to cart:', productData);
    // In a real app, this would add to cart state/context
  };

  const handleAddToWishlist = (productData) => {
    console.log('Adding to wishlist:', productData);
    // In a real app, this would add to wishlist state/context
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <Icon name="AlertCircle" size={48} className="text-error mx-auto" />
            <h2 className="text-2xl font-heading font-bold text-foreground">Product Not Found</h2>
            <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
            <Link to="/collections">
              <Button>
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Back to Collections
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Breadcrumb */}
      <div className="pt-20 pb-4 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/homepage" className="hover:text-accent transition-colors">
              Home
            </Link>
            <Icon name="ChevronRight" size={16} />
            <Link to="/collections" className="hover:text-accent transition-colors">
              Collections
            </Link>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">{product?.name}</span>
          </nav>
        </div>
      </div>
      {/* Main Product Section */}
      <main className="px-4 lg:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProductImageGallery product={product} />
            </motion.div>

            {/* Product Purchase Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <ProductPurchase
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
              
              {/* Social Share */}
              <div className="flex items-center justify-between pt-6 border-t border-street">
                <span className="text-sm text-muted-foreground">Share this product:</span>
                <SocialShare product={product} />
              </div>
            </motion.div>
          </div>

          {/* Product Information Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <ProductInfo product={product} />
          </motion.div>

          {/* Customer Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <CustomerReviews product={product} />
          </motion.div>

          {/* Related Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <RelatedProducts products={relatedProducts} />
          </motion.div>
        </div>
      </main>
      {/* Sticky Add to Cart (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-street p-4 z-40">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="text-lg font-bold text-foreground">
              ${product?.price?.toFixed(2)}
            </div>
            {product?.originalPrice && (
              <div className="text-sm text-muted-foreground line-through">
                ${product?.originalPrice?.toFixed(2)}
              </div>
            )}
          </div>
          <Button
            onClick={() => handleAddToCart(product)}
            className="flex-1"
            disabled={product?.stock === 0}
          >
            <Icon name="ShoppingBag" size={18} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;