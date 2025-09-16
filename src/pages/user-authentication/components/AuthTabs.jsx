import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'login',
      label: 'Sign In',
      icon: 'LogIn',
      description: 'Access your account'
    },
    {
      id: 'register',
      label: 'Sign Up',
      icon: 'UserPlus',
      description: 'Create new account'
    }
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex bg-surface rounded-lg p-1 relative">
        {/* Active Tab Indicator */}
        <div 
          className={`absolute top-1 bottom-1 bg-card rounded-md shadow-elevation-2 transition-all duration-300 ease-out ${
            activeTab === 'login' ? 'left-1 right-1/2 mr-0.5' : 'right-1 left-1/2 ml-0.5'
          }`}
        />
        
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`relative flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-300 ${
              activeTab === tab?.id
                ? 'text-primary font-semibold' :'text-muted-foreground hover:text-text-primary'
            }`}
          >
            <Icon 
              name={tab?.icon} 
              size={18} 
              className={`transition-all duration-300 ${
                activeTab === tab?.id ? 'scale-110' : 'scale-100'
              }`}
            />
            <div className="text-left">
              <p className="text-sm font-medium">{tab?.label}</p>
              <p className="text-xs opacity-70 hidden sm:block">{tab?.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AuthTabs;