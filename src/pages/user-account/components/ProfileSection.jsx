import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Marcus",
    lastName: "Rodriguez",
    email: "marcus.rodriguez@streetgang.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1995-08-15",
    bio: "Street fashion enthusiast and collector. Always hunting for the latest drops and exclusive pieces.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...profileData });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setProfileData({ ...editData });
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl border border-border p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">Profile Information</h2>
        {!isEditing && (
          <Button
            variant="outline"
            iconName="Edit"
            iconPosition="left"
            onClick={handleEdit}
            className="animate-scale-hover"
          >
            Edit Profile
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
              <Image
                src={profileData?.avatar}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute bottom-2 right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors duration-150"
              >
                <Icon name="Camera" size={18} />
              </motion.button>
            )}
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground">
              {profileData?.firstName} {profileData?.lastName}
            </h3>
            <p className="text-muted-foreground font-mono">Member since 2023</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name"
              type="text"
              value={isEditing ? editData?.firstName : profileData?.firstName}
              onChange={(e) => handleInputChange('firstName', e?.target?.value)}
              disabled={!isEditing}
              className="transition-all duration-300"
            />
            <Input
              label="Last Name"
              type="text"
              value={isEditing ? editData?.lastName : profileData?.lastName}
              onChange={(e) => handleInputChange('lastName', e?.target?.value)}
              disabled={!isEditing}
              className="transition-all duration-300"
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            value={isEditing ? editData?.email : profileData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!isEditing}
            description="Your email is used for order confirmations and account notifications"
            className="transition-all duration-300"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Phone Number"
              type="tel"
              value={isEditing ? editData?.phone : profileData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              disabled={!isEditing}
              className="transition-all duration-300"
            />
            <Input
              label="Date of Birth"
              type="date"
              value={isEditing ? editData?.dateOfBirth : profileData?.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
              disabled={!isEditing}
              className="transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Bio
            </label>
            <textarea
              value={isEditing ? editData?.bio : profileData?.bio}
              onChange={(e) => handleInputChange('bio', e?.target?.value)}
              disabled={!isEditing}
              rows={4}
              className={`w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none ${
                !isEditing ? 'opacity-70' : ''
              }`}
              placeholder="Tell us about your street style..."
            />
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4 pt-4"
            >
              <Button
                variant="default"
                loading={isSaving}
                iconName="Save"
                iconPosition="left"
                onClick={handleSave}
                className="animate-scale-hover"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
                className="animate-scale-hover"
              >
                Cancel
              </Button>
            </motion.div>
          )}
        </div>
      </div>
      {/* Account Stats */}
      <div className="mt-8 pt-8 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">47</div>
            <div className="text-sm text-muted-foreground font-mono">Orders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">$2,847</div>
            <div className="text-sm text-muted-foreground font-mono">Total Spent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">23</div>
            <div className="text-sm text-muted-foreground font-mono">Wishlist</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">Gold</div>
            <div className="text-sm text-muted-foreground font-mono">Status</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileSection;