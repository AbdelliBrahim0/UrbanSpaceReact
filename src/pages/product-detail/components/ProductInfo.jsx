import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [expandedSection, setExpandedSection] = useState(null);

  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'sizing', label: 'Size Guide', icon: 'Ruler' },
    { id: 'care', label: 'Care Instructions', icon: 'Shirt' },
    { id: 'authenticity', label: 'Authenticity', icon: 'Shield' }
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">{product?.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Material:</span>
                <span className="ml-2 text-foreground">{product?.material}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Fit:</span>
                <span className="ml-2 text-foreground">{product?.fit}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Origin:</span>
                <span className="ml-2 text-foreground">{product?.origin}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Season:</span>
                <span className="ml-2 text-foreground">{product?.season}</span>
              </div>
            </div>
          </div>
        );
      case 'sizing':
        return (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-street">
                    <th className="text-left py-2 text-muted-foreground">Size</th>
                    <th className="text-left py-2 text-muted-foreground">Chest (in)</th>
                    <th className="text-left py-2 text-muted-foreground">Length (in)</th>
                    <th className="text-left py-2 text-muted-foreground">Shoulder (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {product?.sizeChart?.map((size, index) => (
                    <tr key={index} className="border-b border-street/50">
                      <td className="py-2 font-medium text-foreground">{size?.size}</td>
                      <td className="py-2 text-foreground">{size?.chest}</td>
                      <td className="py-2 text-foreground">{size?.length}</td>
                      <td className="py-2 text-foreground">{size?.shoulder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-surface/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <Icon name="Info" size={16} className="inline mr-2" />
                Measurements are approximate and may vary by ±0.5 inches
              </p>
            </div>
          </div>
        );
      case 'care':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product?.careInstructions?.map((instruction, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-surface/30 rounded-lg">
                  <Icon name={instruction?.icon} size={20} className="text-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">{instruction?.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{instruction?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'authenticity':
        return (
          <div className="space-y-4">
            <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Icon name="ShieldCheck" size={24} className="text-accent" />
                <h3 className="font-heading font-bold text-lg text-foreground">100% Authentic Guarantee</h3>
              </div>
              <p className="text-foreground mb-4">{product?.authenticityInfo}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product?.authenticityFeatures?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-accent" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Title and Brand */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm font-medium text-accent bg-accent/10 px-2 py-1 rounded">
            {product?.brand}
          </span>
          {product?.isLimited && (
            <span className="text-xs font-bold text-error bg-error/10 px-2 py-1 rounded animate-pulse">
              LIMITED EDITION
            </span>
          )}
        </div>
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
          {product?.name}
        </h1>
        <p className="text-muted-foreground">{product?.subtitle}</p>
      </div>
      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {[...Array(5)]?.map((_, i) => (
            <Icon
              key={i}
              name="Star"
              size={16}
              className={i < Math.floor(product?.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
            />
          ))}
          <span className="text-sm font-medium text-foreground ml-2">{product?.rating}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          ({product?.reviewCount} reviews)
        </span>
        <Button variant="link" className="text-sm p-0 h-auto">
          Read Reviews
        </Button>
      </div>
      {/* Desktop Tabs */}
      <div className="hidden md:block">
        <div className="flex space-x-1 border-b border-street mb-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all ${
                activeTab === tab?.id
                  ? 'text-accent border-b-2 border-accent' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Mobile Expandable Sections */}
      <div className="md:hidden space-y-2">
        {tabs?.map((tab) => (
          <div key={tab?.id} className="border border-street rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(tab?.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-surface/30 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon name={tab?.icon} size={18} className="text-accent" />
                <span className="font-medium text-foreground">{tab?.label}</span>
              </div>
              <Icon
                name="ChevronDown"
                size={18}
                className={`text-muted-foreground transition-transform ${
                  expandedSection === tab?.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {expandedSection === tab?.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 border-t border-street">
                    {(() => {
                      const currentTab = activeTab;
                      setActiveTab(tab?.id);
                      const content = renderTabContent();
                      setActiveTab(currentTab);
                      return content;
                    })()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;