import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "credit",
      brand: "visa",
      last4: "4242",
      expiryMonth: "12",
      expiryYear: "2027",
      holderName: "Marcus Rodriguez",
      isDefault: true,
      addedDate: "2024-01-15"
    },
    {
      id: 2,
      type: "credit",
      brand: "mastercard",
      last4: "8888",
      expiryMonth: "08",
      expiryYear: "2026",
      holderName: "Marcus Rodriguez",
      isDefault: false,
      addedDate: "2024-03-22"
    }
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    holderName: "",
    isDefault: false
  });

  const cardBrands = {
    visa: { name: "Visa", color: "text-blue-500", icon: "CreditCard" },
    mastercard: { name: "Mastercard", color: "text-red-500", icon: "CreditCard" },
    amex: { name: "American Express", color: "text-green-500", icon: "CreditCard" },
    discover: { name: "Discover", color: "text-orange-500", icon: "CreditCard" }
  };

  const detectCardBrand = (cardNumber) => {
    const number = cardNumber?.replace(/\s/g, '');
    if (number?.startsWith('4')) return 'visa';
    if (number?.startsWith('5') || number?.startsWith('2')) return 'mastercard';
    if (number?.startsWith('3')) return 'amex';
    if (number?.startsWith('6')) return 'discover';
    return 'visa';
  };

  const formatCardNumber = (value) => {
    const number = value?.replace(/\s/g, '')?.replace(/[^0-9]/gi, '');
    const matches = number?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return number;
    }
  };

  const handleAddNew = () => {
    setFormData({
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      holderName: "",
      isDefault: false
    });
    setIsAddingNew(true);
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setFormData({
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      holderName: "",
      isDefault: false
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const cardNumber = formData?.cardNumber?.replace(/\s/g, '');
    const newPaymentMethod = {
      id: Date.now(),
      type: "credit",
      brand: detectCardBrand(cardNumber),
      last4: cardNumber?.slice(-4),
      expiryMonth: formData?.expiryMonth,
      expiryYear: formData?.expiryYear,
      holderName: formData?.holderName,
      isDefault: formData?.isDefault,
      addedDate: new Date()?.toISOString()?.split('T')?.[0]
    };

    if (formData?.isDefault) {
      setPaymentMethods(prev => prev?.map(method => ({
        ...method,
        isDefault: false
      })));
    }

    setPaymentMethods(prev => [...prev, newPaymentMethod]);
    setIsLoading(false);
    handleCancel();
  };

  const handleDelete = (methodId) => {
    setPaymentMethods(prev => prev?.filter(method => method?.id !== methodId));
  };

  const handleSetDefault = (methodId) => {
    setPaymentMethods(prev => prev?.map(method => ({
      ...method,
      isDefault: method?.id === methodId
    })));
  };

  const handleInputChange = (field, value) => {
    if (field === 'cardNumber') {
      value = formatCardNumber(value);
    }
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const currentYear = new Date()?.getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1)?.toString()?.padStart(2, '0');
    return { value: month, label: month };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl border border-border p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Payment Methods</h2>
          <p className="text-muted-foreground font-mono">
            Manage your saved payment methods securely
          </p>
        </div>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={handleAddNew}
          className="animate-scale-hover"
        >
          Add Card
        </Button>
      </div>
      <div className="space-y-6">
        {/* Add New Card Form */}
        <AnimatePresence>
          {isAddingNew && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-surface rounded-lg border border-border p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">Add New Card</h3>

              <div className="space-y-6">
                {/* Card Number */}
                <Input
                  label="Card Number"
                  type="text"
                  value={formData?.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e?.target?.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />

                {/* Expiry and CVV */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Expiry Month
                    </label>
                    <select
                      value={formData?.expiryMonth}
                      onChange={(e) => handleInputChange('expiryMonth', e?.target?.value)}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Month</option>
                      {months?.map((month) => (
                        <option key={month?.value} value={month?.value}>
                          {month?.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Expiry Year
                    </label>
                    <select
                      value={formData?.expiryYear}
                      onChange={(e) => handleInputChange('expiryYear', e?.target?.value)}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Year</option>
                      {years?.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="CVV"
                    type="text"
                    value={formData?.cvv}
                    onChange={(e) => handleInputChange('cvv', e?.target?.value)}
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>

                {/* Cardholder Name */}
                <Input
                  label="Cardholder Name"
                  type="text"
                  value={formData?.holderName}
                  onChange={(e) => handleInputChange('holderName', e?.target?.value)}
                  placeholder="Name as it appears on card"
                  required
                />

                {/* Default Card Checkbox */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={formData?.isDefault}
                    onChange={(e) => handleInputChange('isDefault', e?.target?.checked)}
                    className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <label htmlFor="isDefault" className="text-sm text-foreground">
                    Set as default payment method
                  </label>
                </div>

                {/* Security Notice */}
                <div className="bg-muted/20 border border-border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Shield" size={20} className="text-success mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Secure Payment</h4>
                      <p className="text-sm text-muted-foreground">
                        Your payment information is encrypted and stored securely. We never store your CVV.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 pt-4">
                  <Button
                    variant="default"
                    loading={isLoading}
                    onClick={handleSave}
                    className="animate-scale-hover"
                  >
                    Add Card
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="animate-scale-hover"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment Methods List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {paymentMethods?.map((method) => {
              const brandConfig = cardBrands?.[method?.brand];
              return (
                <motion.div
                  key={method?.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-surface rounded-lg border border-border p-6 relative"
                >
                  {/* Default Badge */}
                  {method?.isDefault && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                      Default
                    </div>
                  )}
                  {/* Card Visual */}
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 mb-4 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8">
                        <Icon name="CreditCard" size={32} className="text-white/80" />
                        <div className={`text-lg font-bold ${brandConfig?.color}`}>
                          {brandConfig?.name}
                        </div>
                      </div>
                      
                      <div className="font-mono text-lg tracking-wider mb-4">
                        •••• •••• •••• {method?.last4}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-white/60 uppercase tracking-wide">
                            Cardholder
                          </div>
                          <div className="font-medium">{method?.holderName}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/60 uppercase tracking-wide">
                            Expires
                          </div>
                          <div className="font-mono">{method?.expiryMonth}/{method?.expiryYear}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Added</span>
                      <span className="text-sm text-foreground font-mono">
                        {new Date(method.addedDate)?.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    {!method?.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(method?.id)}
                        className="animate-scale-hover"
                      >
                        Set Default
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => handleDelete(method?.id)}
                      className="animate-scale-hover text-error hover:text-error"
                    >
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {paymentMethods?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Icon name="CreditCard" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Payment Methods</h3>
            <p className="text-muted-foreground mb-6">
              Add a payment method to make checkout faster and more secure.
            </p>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={handleAddNew}
              className="animate-scale-hover"
            >
              Add Your First Card
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PaymentMethods;