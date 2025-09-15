import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialShare = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = window.location?.href;
  const shareText = `Check out this amazing ${product?.name} from ${product?.brand}!`;
  const shareImage = product?.mainImage;

  const shareOptions = [
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'Pinterest',
      icon: 'Image',
      color: 'bg-red-600 hover:bg-red-700',
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&media=${encodeURIComponent(shareImage)}&description=${encodeURIComponent(shareText)}`
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'bg-green-600 hover:bg-green-700',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`
    },
    {
      name: 'Telegram',
      icon: 'Send',
      color: 'bg-blue-500 hover:bg-blue-600',
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
    }
  ];

  const handleShare = (option) => {
    if (option?.name === 'Copy Link') {
      handleCopyLink();
    } else {
      window.open(option?.url, '_blank', 'width=600,height=400');
    }
    setIsOpen(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: shareText,
          url: currentUrl
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative">
      {/* Share Button */}
      <Button
        variant="outline"
        onClick={handleNativeShare}
        className="flex items-center space-x-2"
      >
        <Icon name="Share2" size={18} />
        <span>Share</span>
      </Button>
      {/* Share Options Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Share Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute top-full right-0 mt-2 bg-card border border-street rounded-lg shadow-modal p-4 z-50 w-80"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg text-foreground">
                  Share Product
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>

              {/* Product Preview */}
              <div className="flex items-center space-x-3 mb-4 p-3 bg-surface/30 rounded-lg">
                <div className="w-12 h-12 bg-surface rounded-lg overflow-hidden">
                  <img
                    src={product?.mainImage}
                    alt={product?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm truncate">
                    {product?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    ${product?.price?.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Share Options Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {shareOptions?.map((option) => (
                  <motion.button
                    key={option?.name}
                    onClick={() => handleShare(option)}
                    className={`flex flex-col items-center space-y-2 p-3 rounded-lg text-white transition-colors ${option?.color}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon name={option?.icon} size={20} />
                    <span className="text-xs font-medium">{option?.name}</span>
                  </motion.button>
                ))}
              </div>

              {/* Copy Link Section */}
              <div className="border-t border-street pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-surface border border-street rounded-lg px-3 py-2">
                    <input
                      type="text"
                      value={currentUrl}
                      readOnly
                      className="w-full bg-transparent text-sm text-foreground truncate focus:outline-none"
                    />
                  </div>
                  <Button
                    variant={copied ? "success" : "outline"}
                    size="sm"
                    onClick={handleCopyLink}
                    className="flex-shrink-0"
                  >
                    {copied ? (
                      <>
                        <Icon name="Check" size={16} className="mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Icon name="Copy" size={16} className="mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* QR Code Option */}
              <div className="mt-4 pt-4 border-t border-street">
                <Button
                  variant="ghost"
                  className="w-full justify-center"
                  onClick={() => {
                    // In a real app, this would generate and show a QR code
                    console.log('Generate QR code for:', currentUrl);
                  }}
                >
                  <Icon name="QrCode" size={16} className="mr-2" />
                  Show QR Code
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Success Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-4 right-4 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} />
              <span className="text-sm font-medium">Link copied to clipboard!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialShare;