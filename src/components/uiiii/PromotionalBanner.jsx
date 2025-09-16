import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const PromotionalBanner = ({ 
  isActive = false, 
  campaign = null,
  onClose = () => {} 
}) => {
  const [isVisible, setIsVisible] = useState(isActive);
  const [timeRemaining, setTimeRemaining] = useState('');

  // Default Black Friday campaign data
  const defaultCampaign = {
    id: 'black-friday-2025',
    title: 'BLACK FRIDAY 3D SALE',
    subtitle: 'Up to 70% OFF Premium Streetwear',
    description: 'Exclusive 3D shopping experience with limited drops',
    ctaText: 'Shop Now',
    ctaLink: '/black-friday-3d-sale',
    endDate: '2025-11-29T23:59:59',
    backgroundColor: 'bg-primary',
    textColor: 'text-primary-foreground',
    accentColor: 'text-accent',
    urgency: true
  };

  const activeCampaign = campaign || defaultCampaign;

  useEffect(() => {
    setIsVisible(isActive);
  }, [isActive]);

  useEffect(() => {
    if (!isActive || !activeCampaign?.endDate) return;

    const updateCountdown = () => {
      const now = new Date()?.getTime();
      const endTime = new Date(activeCampaign.endDate)?.getTime();
      const distance = endTime - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days > 0) {
          setTimeRemaining(`${days}d ${hours}h ${minutes}m left`);
        } else if (hours > 0) {
          setTimeRemaining(`${hours}h ${minutes}m left`);
        } else {
          setTimeRemaining(`${minutes}m left`);
        }
      } else {
        setTimeRemaining('Sale ended');
        setIsVisible(false);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [isActive, activeCampaign?.endDate]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={`relative ${activeCampaign?.backgroundColor} ${activeCampaign?.textColor} animate-fade-in`}>
      {/* Desktop Banner */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} className={activeCampaign?.accentColor} />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight">
                    {activeCampaign?.title}
                  </h3>
                  <p className="text-sm opacity-90">
                    {activeCampaign?.subtitle}
                  </p>
                </div>
              </div>
              
              {activeCampaign?.urgency && timeRemaining && (
                <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-accent/20 rounded-full">
                  <Icon name="Clock" size={16} className={activeCampaign?.accentColor} />
                  <span className="text-sm font-mono font-medium">
                    {timeRemaining}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <Link to={activeCampaign?.ctaLink}>
                <Button 
                  variant="secondary" 
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {activeCampaign?.ctaText}
                </Button>
              </Link>
              
              <button
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
                aria-label="Close banner"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Banner */}
      <div className="md:hidden">
        <div className="px-4 py-3">
          <div className="flex items-start justify-between space-x-3">
            <div className="flex items-start space-x-3 flex-1 min-w-0">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Zap" size={16} className={activeCampaign?.accentColor} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold tracking-tight truncate">
                  {activeCampaign?.title}
                </h3>
                <p className="text-xs opacity-90 mt-0.5">
                  {activeCampaign?.subtitle}
                </p>
                {activeCampaign?.urgency && timeRemaining && (
                  <div className="flex items-center space-x-1 mt-2">
                    <Icon name="Clock" size={12} className={activeCampaign?.accentColor} />
                    <span className="text-xs font-mono font-medium">
                      {timeRemaining}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <Link to={activeCampaign?.ctaLink}>
                <Button 
                  variant="secondary" 
                  size="xs"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs px-3"
                >
                  Shop
                </Button>
              </Link>
              
              <button
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
                aria-label="Close banner"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Animated accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
    </div>
  );
};

export default PromotionalBanner;