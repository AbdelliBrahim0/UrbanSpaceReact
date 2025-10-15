import React from 'react';
import AppIcon from './AppIcon';

const FloatingContactButtons = () => {
  const phoneNumber = '21628889555';
  const whatsappLink = `https://wa.me/${phoneNumber}`;
  const phoneLink = `tel:+${phoneNumber}`;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-4">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-success text-success-foreground p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all"
        aria-label="Contact us on WhatsApp"
      >
        <AppIcon name="MessageCircle" size={24} />
      </a>
      <a
        href={phoneLink}
        className="bg-accent text-accent-foreground p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all"
        aria-label="Call us"
      >
        <AppIcon name="Phone" size={24} />
      </a>
    </div>
  );
};

export default FloatingContactButtons;
