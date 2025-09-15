import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickCheckout = ({ isOpen, onClose, product }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleQuickPurchase = async () => {
    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Quick purchase completed:', { product, formData });
    setIsProcessing(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-background/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-card border border-street rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden shadow-modal"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-street">
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-8 h-8 bg-accent rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Icon name="Zap" size={16} className="text-accent-foreground" />
              </motion.div>
              <div>
                <h2 className="font-heading font-bold text-lg text-foreground">
                  Quick Checkout
                </h2>
                <p className="text-sm text-muted-foreground">
                  Step {step} of 3
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-surface"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-2">
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className="h-2 bg-accent rounded-full"
                initial={{ width: '33%' }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-96">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="font-heading font-bold text-foreground mb-4">
                    Contact Information
                  </h3>
                  
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    value={formData?.email}
                    onChange={(e) => handleInputChange('email', e?.target?.value)}
                    required
                  />
                  
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData?.phone}
                    onChange={(e) => handleInputChange('phone', e?.target?.value)}
                    required
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="font-heading font-bold text-foreground mb-4">
                    Shipping Address
                  </h3>
                  
                  <Input
                    label="Street Address"
                    type="text"
                    placeholder="123 Main Street"
                    value={formData?.address}
                    onChange={(e) => handleInputChange('address', e?.target?.value)}
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City"
                      type="text"
                      placeholder="New York"
                      value={formData?.city}
                      onChange={(e) => handleInputChange('city', e?.target?.value)}
                      required
                    />
                    
                    <Input
                      label="ZIP Code"
                      type="text"
                      placeholder="10001"
                      value={formData?.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
                      required
                    />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="font-heading font-bold text-foreground mb-4">
                    Payment & Review
                  </h3>
                  
                  {/* Product Summary */}
                  {product && (
                    <div className="bg-surface rounded-lg p-4 border border-street">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Icon name="Package" size={20} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{product?.name}</p>
                          <p className="text-sm text-muted-foreground">{product?.brand}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-accent">${product?.salePrice}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Methods */}
                  <div className="space-y-3">
                    <p className="font-medium text-foreground">Payment Method</p>
                    
                    <div className="space-y-2">
                      {[
                        { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard' },
                        { id: 'paypal', name: 'PayPal', icon: 'Wallet' },
                        { id: 'apple', name: 'Apple Pay', icon: 'Smartphone' }
                      ]?.map((method) => (
                        <button
                          key={method?.id}
                          onClick={() => handleInputChange('paymentMethod', method?.id)}
                          className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-street ${
                            formData?.paymentMethod === method?.id
                              ? 'border-accent bg-accent/10 text-accent' :'border-street bg-surface text-foreground hover:border-accent'
                          }`}
                        >
                          <Icon name={method?.icon} size={20} />
                          <span className="font-medium">{method?.name}</span>
                          {formData?.paymentMethod === method?.id && (
                            <Icon name="Check" size={16} className="ml-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-street">
            <Button
              variant="ghost"
              onClick={step === 1 ? onClose : handlePreviousStep}
              disabled={isProcessing}
            >
              {step === 1 ? 'Cancel' : 'Previous'}
            </Button>

            <Button
              variant="default"
              onClick={step === 3 ? handleQuickPurchase : handleNextStep}
              loading={isProcessing}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              iconName={step === 3 ? "CreditCard" : "ArrowRight"}
              iconPosition="right"
            >
              {step === 3 ? 'Complete Purchase' : 'Next'}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickCheckout;