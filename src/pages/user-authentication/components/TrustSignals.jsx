import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Secure Authentication',
      description: 'Vos données sont protégées par une sécurité de niveau entreprise'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'Nous ne partageons jamais vos informations personnelles'
    },
    {
      icon: 'Zap',
      title: 'Instant Access',
      description: 'Obtenez un accès immédiat à des nouveautés streetwear exclusives'
    }
  ];

  const securityBadges = [
    {
      name: 'SSL Secured',
      icon: 'ShieldCheck',
      color: 'text-success'
    },
    {
      name: 'GDPR Compliant',
      icon: 'FileCheck',
      color: 'text-accent'
    },
    {
      name: 'ISO Certified',
      icon: 'Award',
      color: 'text-warning'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
        {trustFeatures?.map((feature, index) => (
          <div 
            key={index}
            className="text-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/30 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name={feature?.icon} size={24} className="text-accent" />
            </div>
            <h3 className="text-sm font-semibold text-text-primary mb-2">
              {feature?.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-6 animate-fade-in">
        {securityBadges?.map((badge, index) => (
          <div 
            key={index}
            className="flex items-center space-x-2 px-3 py-2 rounded-full bg-surface/80 backdrop-blur-sm border border-border/50"
          >
            <Icon name={badge?.icon} size={16} className={badge?.color} />
            <span className="text-xs font-medium text-text-secondary">
              {badge?.name}
            </span>
          </div>
        ))}
      </div>
      {/* Privacy Policy Link */}
      <div className="text-center animate-fade-in">
        <p className="text-xs text-muted-foreground">
          Protected by our{' '}
          <button className="text-accent hover:text-accent/80 underline transition-colors">
            Privacy Policy
          </button>{' '}
          and{' '}
          <button className="text-accent hover:text-accent/80 underline transition-colors">
            Terms of Service
          </button>
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;