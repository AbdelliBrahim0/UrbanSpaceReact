import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import WelcomeHero from './components/WelcomeHero';
import OnboardingSteps from './components/OnboardingSteps';
import GangStyleSeparator from './components/GangStyleSeparator';
import WelcomeFooter from './components/WelcomeFooter';

const NewMemberWelcome = () => {
  useEffect(() => {
    // Smooth scroll to top on component mount
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Add welcome animation class to body
    document.body?.classList?.add('welcome-page');
    
    return () => {
      document.body?.classList?.remove('welcome-page');
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Bienvenue dans la Famille UrbanSpace | Nouveau Membre VIP</title>
        <meta 
          name="description" 
          content="Bienvenue chez UrbanSpace ! Découvrez vos privilèges exclusifs, accédez aux collections VIP et rejoignez notre communauté élite de passionnés de streetwear premium." 
        />
        <meta name="keywords" content="UrbanSpace, nouveau membre, VIP, streetwear, mode urbaine, exclusif, bienvenue, privilèges" />
        <meta property="og:title" content="Bienvenue dans la Famille UrbanSpace | Nouveau Membre VIP" />
        <meta property="og:description" content="Découvrez vos privilèges exclusifs et rejoignez l'élite du streetwear premium avec UrbanSpace." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/new-member-welcome" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="relative">
          {/* Welcome Hero Section */}
          <WelcomeHero />

          
          {/* Onboarding Steps */}
          <OnboardingSteps />

       

          

          {/* Gang Style Separator */}
          <GangStyleSeparator 
            variant="default" 
            animated={true} 
          />

          

          {/* Gang Style Separator */}
          <GangStyleSeparator 
            variant="diamond" 
            showText={true} 
            text="Votre Aventure Commence" 
            animated={true} 
          />
          
          {/* Welcome Footer */}
          <WelcomeFooter />
        </main>
      </div>

      {/* Custom Styles for Welcome Page */}
      <style jsx>{`
        .welcome-page {
          overflow-x: hidden;
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(229, 9, 20, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(229, 9, 20, 0.5);
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: var(--color-background);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, var(--color-accent), var(--color-success));
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, var(--color-success), var(--color-accent));
        }
      `}</style>
    </>
  );
};

export default NewMemberWelcome;