import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Welcome.css';

// Composant pour l'animation caractère par caractère
const AnimatedText = ({ text, delay = 0, className = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50); // Vitesse d'écriture
      return () => clearTimeout(timeout);
    } else if (showCursor) {
      // Faire clignoter le curseur 3 fois
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      
      const stopCursor = setTimeout(() => {
        clearInterval(cursorInterval);
        setShowCursor(false);
      }, 1500);
      
      return () => {
        clearInterval(cursorInterval);
        clearTimeout(stopCursor);
      };
    }
  }, [currentIndex, text, showCursor]);

  return (
    <span className={`inline-block ${className}`}>
      {displayText}
      <AnimatePresence>
        {showCursor && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ml-1 inline-block w-2 h-8 bg-[#00ffc3]"
            style={{ verticalAlign: 'middle' }}
          />
        )}
      </AnimatePresence>
    </span>
  );
};

// Composant pour l'animation mot par mot
const AnimatedWords = ({ text, delay = 0, className = '' }) => {
  const words = text.split(' ');
  const [visibleWords, setVisibleWords] = useState(0);

  useEffect(() => {
    if (visibleWords < words.length) {
      const timeout = setTimeout(() => {
        setVisibleWords(prev => prev + 1);
      }, 200); // Délai entre chaque mot
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, words.length]);

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: index <= visibleWords ? 1 : 0,
            y: index <= visibleWords ? 0 : 10
          }}
          transition={{ duration: 0.3, delay: delay + (index * 0.1) }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const Welcome = () => {
  const navigate = useNavigate();

  const handleShopAccess = () => {
    navigate('/homepage');
  };

  // Animation des particules flottantes
  const FloatingParticles = () => {
    return (
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00ffc3] rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
          />
        ))}
      </div>
    );
  };

  // États pour contrôler les animations
  const [showWelcome, setShowWelcome] = useState(false);
  const [showUrbanSpace, setShowUrbanSpace] = useState(false);
  const [showAccess, setShowAccess] = useState(false);

  // Démarrer les animations en séquence
  useEffect(() => {
    // Démarrer l'animation de WELCOME après un court délai
    const welcomeTimer = setTimeout(() => setShowWelcome(true), 500);
    
    // Démarrer URBANSPACE après que WELCOME soit terminé
    const urbanSpaceTimer = setTimeout(() => setShowUrbanSpace(true), 3000);
    
    // Démarrer ACCÉDER À LA BOUTIQUE après URBANSPACE
    const accessTimer = setTimeout(() => setShowAccess(true), 4500);
    
    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(urbanSpaceTimer);
      clearTimeout(accessTimer);
    };
  }, []);

  return (
    <div className="welcome-container relative overflow-hidden">
      
      <FloatingParticles />
      
      {/* Contenu principal (toujours visible) */}
      <div className={`absolute bottom-48 md:bottom-8 left-4 right-4 md:left-auto md:right-8 z-50 text-center md:text-right space-y-6 `}>
        <div className="inline-block">
          <div className="font-heading font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
            {/* BIENVENUE SUR (caractère par caractère) */}
            {showWelcome && (
              <div className="flex flex-wrap justify-center md:justify-start items-center">
                <span className="relative inline-block">
                  <span className={`absolute inset-0 bg-black/40 backdrop-blur-sm -z-10 rounded transform scale-x-100 h-[0.9em] top-1/2 -translate-y-1/2`}></span>
                  <span className="relative px-2 leading-tight">
                    <AnimatedText 
                      text="BIENVENUE SUR" 
                      className={`inline-block `} 
                    />
                  </span>
                </span>
                
                {/* URBANSPACE (apparaît après BIENVENUE SUR) */}
                {showUrbanSpace && (
                  <motion.span 
                    className="relative inline-block ml-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10 rounded transform scale-x-100 h-[0.9em] top-1/2 -translate-y-1/2"></span>
                    <span className="relative px-2 leading-tight text-[#00ffc3]">
                      URBANSPACE
                    </span>
                  </motion.span>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Bouton ACCÉDER À LA BOUTIQUE / PAGE D'ACCUEIL */}
        {showAccess && (
          <motion.button 
            onClick={handleShopAccess} 
            className={`font-heading font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl transition-all duration-300 flex items-baseline gap-2 group mx-auto md:ml-auto md:mr-0 `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="relative inline-block">
              <span className={`absolute inset-0 bg-black/40 backdrop-blur-sm -z-10 rounded transform scale-x-100 h-[0.9em] top-1/2 -translate-y-1/2`}></span>
              <span className="relative px-2 leading-tight">
                <span className={`group-hover:hidden text-[#00ffc3] text-outline`}>ACCÉDER À LA BOUTIQUE</span>
                <span className={`hidden group-hover:inline-block text-[#00ffc3] text-outline`}>PAGE D'ACCUEIL</span>
              </span>
            </span>
            <span className="relative inline-block">
              <span className={`absolute inset-0 bg-black/40 backdrop-blur-sm -z-10 rounded transform scale-x-100 h-[0.9em] top-1/2 -translate-y-1/2`}></span>
              <motion.span 
                className={`relative px-2 leading-tight text-[#00ffc3] group-hover:translate-x-2 transition-transform duration-300`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                »
              </motion.span>
            </span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Welcome;
