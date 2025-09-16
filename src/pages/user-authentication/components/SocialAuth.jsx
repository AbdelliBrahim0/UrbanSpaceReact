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
            Or continue with
          </span>
        </div>
      </div>
      {/* Social Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fade-in">
        {socialProviders?.map((provider) => (
          <button
            key={provider?.id}
            onClick={() => handleSocialLogin(provider)}
            disabled={loadingProvider !== null}
            className={`
              relative flex items-center justify-center space-x-2 py-3 px-4 rounded-lg
              transition-all duration-200 transform hover:scale-105 active:scale-95
              ${provider?.color} ${provider?.textColor}
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              shadow-elevation-1 hover:shadow-elevation-2
            `}
          >
            {loadingProvider === provider?.id ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Icon name={provider?.icon} size={18} />
            )}
            <span className="text-sm font-medium hidden sm:block">
              {provider?.name}
            </span>
            <span className="text-sm font-medium sm:hidden">
              {provider?.name?.[0]}
            </span>
          </button>
        ))}
      </div>
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