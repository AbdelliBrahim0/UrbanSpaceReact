import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const PromotionalBanner = ({ 
  type = 'black-friday', 
  isVisible = true, 
  onClose,
  endTime = null 
}) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isClosing, setIsClosing] = useState(false);

  const bannerConfig = {
    'black-friday': {
      title: 'BLACK FRIDAY MEGA SALE',
      subtitle: 'Up to 70% OFF Premium Streetwear',
      ctaText: 'Shop Now',
      ctaLink: '/black-friday-event',
      bgGradient: 'from-accent/20 via-background to-background',
      textColor: 'text-accent',
      icon: 'Tag'
    },
    'flash-sale': {
      title: 'FLASH SALE ACTIVE',
      subtitle: 'Limited Time - 24 Hours Only',
      ctaText: 'Grab Deals',
      ctaLink: '/black-hour-flash-sale',
      bgGradient: 'from-warning/20 via-background to-background',
      textColor: 'text-warning',
      icon: 'Zap'
    },
    'new-drop': {
      title: 'NEW DROP ALERT',
      subtitle: 'Fresh Streetwear Collection Available',
      ctaText: 'Explore',
      ctaLink: '/collections-catalog',
      bgGradient: 'from-success/20 via-background to-background',
      textColor: 'text-success',
      icon: 'Sparkles'
    }
  };

  const config = bannerConfig?.[type] || bannerConfig?.['black-friday'];

  useEffect(() => {
    if (!endTime) return;

    const timer = setInterval(() => {
      const now = new Date()?.getTime();
      const distance = new Date(endTime)?.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`relative overflow-hidden gang-transition ${isClosing ? 'animate-slide-in-left reverse' : 'animate-slide-in-left'}`}>
      <div className={`bg-gradient-to-r ${config?.bgGradient} gang-border-active`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Content */}
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg bg-current/10 ${config?.textColor}`}>
                <Icon name={config?.icon} size={24} className={config?.textColor} />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                <div>
                  <h3 className={`font-heading font-bold text-lg ${config?.textColor}`}>
                    {config?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {config?.subtitle}
                  </p>
                </div>

                {/* Countdown Timer */}
                {endTime && (timeLeft?.hours > 0 || timeLeft?.minutes > 0 || timeLeft?.seconds > 0) && (
                  <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    <span className="text-muted-foreground text-sm font-data">Ends in:</span>
                    <div className="flex items-center space-x-1">
                      {[
                        { value: timeLeft?.hours, label: 'H' },
                        { value: timeLeft?.minutes, label: 'M' },
                        { value: timeLeft?.seconds, label: 'S' }
                      ]?.map((unit, index) => (
                        <div key={unit?.label} className="flex items-center">
                          <div className={`bg-current/20 ${config?.textColor} px-2 py-1 rounded text-sm font-data font-medium min-w-[2.5rem] text-center`}>
                            {unit?.value?.toString()?.padStart(2, '0')}
                          </div>
                          <span className={`text-xs font-data ml-1 ${config?.textColor}`}>
                            {unit?.label}
                          </span>
                          {index < 2 && <span className="text-muted-foreground mx-1">:</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Link to={config?.ctaLink}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`gang-hover-scale border-current ${config?.textColor} hover:bg-current/10`}
                >
                  {config?.ctaText}
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </Link>

              {onClose && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="text-muted-foreground hover:text-foreground gang-hover-scale"
                >
                  <Icon name="X" size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Animated background effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-r ${config?.bgGradient} animate-pulse-glow`}></div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;