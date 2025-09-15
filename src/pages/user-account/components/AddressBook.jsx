import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddressBook = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "home",
      isDefault: true,
      firstName: "Marcus",
      lastName: "Rodriguez",
      company: "",
      address1: "123 Street Avenue",
      address2: "Apt 4B",
      city: "Urban City",
      state: "UC",
      zipCode: "12345",
      country: "United States",
      phone: "+1 (555) 123-4567"
    },
    {
      id: 2,
      type: "work",
      isDefault: false,
      firstName: "Marcus",
      lastName: "Rodriguez",
      company: "StreetGang Studios",
      address1: "456 Business Blvd",
      address2: "Suite 200",
      city: "Metro City",
      state: "MC",
      zipCode: "67890",
      country: "United States",
      phone: "+1 (555) 987-6543"
    }
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: "home",
    isDefault: false,
    firstName: "",
    lastName: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: ""
  });

  const addressTypes = [
    { value: "home", label: "Home", icon: "Home" },
    { value: "work", label: "Work", icon: "Building" },
    { value: "other", label: "Other", icon: "MapPin" }
  ];

  const resetForm = () => {
    setFormData({
      type: "home",
      isDefault: false,
      firstName: "",
      lastName: "",
      company: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: ""
    });
  };

  const handleAddNew = () => {
    resetForm();
    setIsAddingNew(true);
    setEditingId(null);
  };

  const handleEdit = (address) => {
    setFormData({ ...address });
    setEditingId(address?.id);
    setIsAddingNew(false);
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    resetForm();
  };

  const handleSave = () => {
    if (isAddingNew) {
      const newAddress = {
        ...formData,
        id: Date.now()
      };
      setAddresses(prev => [...prev, newAddress]);
    } else {
      setAddresses(prev => prev?.map(addr => 
        addr?.id === editingId ? { ...formData, id: editingId } : addr
      ));
    }
    handleCancel();
  };

  const handleDelete = (addressId) => {
    setAddresses(prev => prev?.filter(addr => addr?.id !== addressId));
  };

  const handleSetDefault = (addressId) => {
    setAddresses(prev => prev?.map(addr => ({
      ...addr,
      isDefault: addr?.id === addressId
    })));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getAddressTypeConfig = (type) => {
    return addressTypes?.find(t => t?.value === type) || addressTypes?.[0];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl border border-border p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">Address Book</h2>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={handleAddNew}
          className="animate-scale-hover"
        >
          Add Address
        </Button>
      </div>
      <div className="space-y-6">
        {/* Address Form */}
        <AnimatePresence>
          {(isAddingNew || editingId) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-surface rounded-lg border border-border p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">
                {isAddingNew ? 'Add New Address' : 'Edit Address'}
              </h3>

              <div className="space-y-6">
                {/* Address Type */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Address Type
                  </label>
                  <div className="flex items-center space-x-4">
                    {addressTypes?.map((type) => (
                      <button
                        key={type?.value}
                        onClick={() => handleInputChange('type', type?.value)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-150 ${
                          formData?.type === type?.value
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background text-foreground border-border hover:border-primary'
                        }`}
                      >
                        <Icon name={type?.icon} size={16} />
                        <span>{type?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    type="text"
                    value={formData?.firstName}
                    onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                    required
                  />
                  <Input
                    label="Last Name"
                    type="text"
                    value={formData?.lastName}
                    onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                    required
                  />
                </div>

                {/* Company */}
                <Input
                  label="Company (Optional)"
                  type="text"
                  value={formData?.company}
                  onChange={(e) => handleInputChange('company', e?.target?.value)}
                />

                {/* Address Fields */}
                <Input
                  label="Address Line 1"
                  type="text"
                  value={formData?.address1}
                  onChange={(e) => handleInputChange('address1', e?.target?.value)}
                  required
                />

                <Input
                  label="Address Line 2 (Optional)"
                  type="text"
                  value={formData?.address2}
                  onChange={(e) => handleInputChange('address2', e?.target?.value)}
                />

                {/* City, State, Zip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    type="text"
                    value={formData?.city}
                    onChange={(e) => handleInputChange('city', e?.target?.value)}
                    required
                  />
                  <Input
                    label="State"
                    type="text"
                    value={formData?.state}
                    onChange={(e) => handleInputChange('state', e?.target?.value)}
                    required
                  />
                  <Input
                    label="ZIP Code"
                    type="text"
                    value={formData?.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
                    required
                  />
                </div>

                {/* Phone */}
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  required
                />

                {/* Default Address Checkbox */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={formData?.isDefault}
                    onChange={(e) => handleInputChange('isDefault', e?.target?.checked)}
                    className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <label htmlFor="isDefault" className="text-sm text-foreground">
                    Set as default address
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 pt-4">
                  <Button
                    variant="default"
                    onClick={handleSave}
                    className="animate-scale-hover"
                  >
                    {isAddingNew ? 'Add Address' : 'Save Changes'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="animate-scale-hover"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Address List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {addresses?.map((address) => {
              const typeConfig = getAddressTypeConfig(address?.type);
              return (
                <motion.div
                  key={address?.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-surface rounded-lg border border-border p-6 relative"
                >
                  {/* Default Badge */}
                  {address?.isDefault && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                      Default
                    </div>
                  )}
                  {/* Address Type */}
                  <div className="flex items-center space-x-2 mb-4">
                    <Icon name={typeConfig?.icon} size={18} className="text-primary" />
                    <span className="font-semibold text-foreground capitalize">
                      {typeConfig?.label}
                    </span>
                  </div>
                  {/* Address Details */}
                  <div className="space-y-2 mb-6">
                    <div className="font-medium text-foreground">
                      {address?.firstName} {address?.lastName}
                    </div>
                    {address?.company && (
                      <div className="text-muted-foreground">{address?.company}</div>
                    )}
                    <div className="text-muted-foreground">
                      {address?.address1}
                      {address?.address2 && <><br />{address?.address2}</>}
                    </div>
                    <div className="text-muted-foreground">
                      {address?.city}, {address?.state} {address?.zipCode}
                    </div>
                    <div className="text-muted-foreground">{address?.country}</div>
                    <div className="text-muted-foreground font-mono">{address?.phone}</div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Edit"
                      iconPosition="left"
                      onClick={() => handleEdit(address)}
                      className="animate-scale-hover"
                    >
                      Edit
                    </Button>
                    {!address?.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(address?.id)}
                        className="animate-scale-hover"
                      >
                        Set Default
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => handleDelete(address?.id)}
                      className="animate-scale-hover text-error hover:text-error"
                    >
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {addresses?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Addresses Added</h3>
            <p className="text-muted-foreground mb-6">
              Add your shipping addresses to make checkout faster.
            </p>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={handleAddNew}
              className="animate-scale-hover"
            >
              Add Your First Address
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AddressBook;