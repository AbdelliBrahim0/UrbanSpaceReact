import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const SocialAuth = ({ onSuccess }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      color: 'bg-gray-900 hover:bg-black',
      textColor: 'text-white'
    }
  ];

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider?.id);
    
    // Simulate social auth
    setTimeout(() => {
      onSuccess();
      setLoadingProvider(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Divider */}
      <div className="relative animate-fade-in">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">
            
          </span>
        </div>
      </div>
      {/* Social Buttons */}
      
      {/* Trust Signals */}
      <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground animate-fade-in">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} className="text-success" />
          <span>Secure</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Lock" size={14} className="text-success" />
          <span>Encrypted</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Zap" size={14} className="text-accent" />
          <span>Fast</span>
        </div>
      </div>
    </div>
  );
};

export default SocialAuth;