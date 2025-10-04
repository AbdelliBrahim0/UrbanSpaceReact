import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: true,
    orderUpdates: true,
    newArrivals: false,
    salesAlerts: true,
    newsletter: true,
    twoFactorAuth: false,
    profileVisibility: 'private',
    dataSharing: false,
    cookiePreferences: 'essential'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const handleChangePassword = async () => {
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsChangingPassword(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsChangingPassword(false);
  };

  const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        checked ? 'bg-primary' : 'bg-muted'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl border border-border p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">Account Settings</h2>
        <Button
          variant="default"
          loading={isSaving}
          onClick={handleSaveSettings}
          className="animate-scale-hover"
        >
          Save Changes
        </Button>
      </div>
      <div className="space-y-8">
        {/* Notification Preferences */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-primary" />
            <span>Notification Preferences</span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="font-medium text-foreground">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <ToggleSwitch
                checked={settings?.emailNotifications}
                onChange={(value) => handleSettingChange('emailNotifications', value)}
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="font-medium text-foreground">SMS Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via text message
                </p>
              </div>
              <ToggleSwitch
                checked={settings?.smsNotifications}
                onChange={(value) => handleSettingChange('smsNotifications', value)}
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="font-medium text-foreground">Push Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  Receive browser push notifications
                </p>
              </div>
              <ToggleSwitch
                checked={settings?.pushNotifications}
                onChange={(value) => handleSettingChange('pushNotifications', value)}
              />
            </div>
          </div>
        </div>

        {/* Marketing Preferences */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center space-x-2">
            <Icon name="Mail" size={20} className="text-primary" />
            <span>Marketing Preferences</span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="font-medium text-foreground">Marketing Emails</h4>
                <p className="text-sm text-muted-foreground">
                  Promotional offers and product updates
                </p>
              </div>
              <ToggleSwitch
                checked={settings?.marketingEmails}
                onChange={(value) => handleSettingChange('marketingEmails', value)}
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="font-medium text-foreground">Order Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Shipping and delivery notifications
                </p>
              </div>
              <ToggleSwitch
                checked={settings?.orderUpdates}
                onChange={(value) => handleSettingChange('orderUpdates', value)}
                disabled
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="font-medium text-foreground">New Arrivals</h4>
                <p className="text-sm text-muted-foreground">
                  Be first to know about new products
                </p>
              </div>
              <ToggleSwitch
                checked={settings?.newArrivals}
                onChange={(value) => handleSettingChange('newArrivals', value)}
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="font-medium text-foreground">Sales Alerts</h4>
                <p className="text-sm text-muted-foreground">
                  Special discounts and flash sales
                </p>
              </div>
              <ToggleSwitch
                checked={settings?.salesAlerts}
                onChange={(value) => handleSettingChange('salesAlerts', value)}
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="font-medium text-foreground">Newsletter</h4>
                <p className="text-sm text-muted-foreground">
                  Weekly streetwear trends and style tips
                </p>
              </div>
              <ToggleSwitch
                checked={settings?.newsletter}
                onChange={(value) => handleSettingChange('newsletter', value)}
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center space-x-2">
            <Icon name="Shield" size={20} className="text-primary" />
            <span>Security Settings</span>
          </h3>

          <div className="space-y-6">
            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <ToggleSwitch
                checked={settings?.twoFactorAuth}
                onChange={(value) => handleSettingChange('twoFactorAuth', value)}
              />
            </div>

            {/* Change Password */}
            <div className="border-t border-border pt-6">
              <h4 className="font-medium text-foreground mb-4">Change Password</h4>
              <div className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  value={passwordData?.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
                  placeholder="Enter current password"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="New Password"
                    type="password"
                    value={passwordData?.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
                    placeholder="Enter new password"
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    value={passwordData?.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
                    placeholder="Confirm new password"
                  />
                </div>
                <Button
                  variant="outline"
                  loading={isChangingPassword}
                  onClick={handleChangePassword}
                  className="animate-scale-hover"
                >
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center space-x-2">
            <Icon name="Lock" size={20} className="text-primary" />
            <span>Privacy Settings</span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="font-medium text-foreground">Profile Visibility</h4>
                <p className="text-sm text-muted-foreground">
                  Control who can see your profile information
                </p>
              </div>
              <select
                value={settings?.profileVisibility}
                onChange={(e) => handleSettingChange('profileVisibility', e?.target?.value)}
                className="px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="font-medium text-foreground">Data Sharing</h4>
                <p className="text-sm text-muted-foreground">
                  Allow sharing of anonymized data for analytics
                </p>
              </div>
              <ToggleSwitch
                checked={settings?.dataSharing}
                onChange={(value) => handleSettingChange('dataSharing', value)}
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="font-medium text-foreground">Cookie Preferences</h4>
                <p className="text-sm text-muted-foreground">
                  Manage your cookie and tracking preferences
                </p>
              </div>
              <select
                value={settings?.cookiePreferences}
                onChange={(e) => handleSettingChange('cookiePreferences', e?.target?.value)}
                className="px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Cookies</option>
                <option value="functional">Functional Only</option>
                <option value="essential">Essential Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-surface rounded-lg border border-error/20 p-6">
          <h3 className="text-lg font-semibold text-error mb-6 flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} />
            <span>Danger Zone</span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="font-medium text-foreground">Delete Account</h4>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button
                variant="outline"
                className="text-error border-error hover:bg-error hover:text-error-foreground animate-scale-hover"
              >
                Delete Account
              </Button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                
                <p className="text-sm text-muted-foreground">
                  Download a copy of your account data
                </p>
              </div>
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                className="animate-scale-hover"
              >
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AccountSettings;