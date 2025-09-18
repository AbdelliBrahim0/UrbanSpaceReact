import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OnboardingSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    style: '',
    size: '',
    interests: [],
    notifications: true
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Votre Style",
      subtitle: "Définissez votre identité urbaine",
      icon: "Palette",
      component: "StyleSelection"
    },
    {
      id: 2,
      title: "Vos Préférences",
      subtitle: "Personnalisez votre expérience",
      icon: "Settings",
      component: "Preferences"
    },
    {
      id: 3,
      title: "Notifications",
      subtitle: "Restez connecté à l\'actualité",
      icon: "Bell",
      component: "Notifications"
    },
    {
      id: 4,
      title: "Finalisation",
      subtitle: "Votre profil est prêt !",
      icon: "CheckCircle",
      component: "Completion"
    }
  ];

  const styleOptions = [
    { id: 'street', name: 'Street Classic', icon: 'Shirt', color: 'from-accent to-red-500' },
    { id: 'urban', name: 'Urban Elite', icon: 'Crown', color: 'from-success to-green-400' },
    { id: 'minimal', name: 'Minimal Dark', icon: 'Circle', color: 'from-blue-500 to-purple-500' },
    { id: 'bold', name: 'Bold Statement', icon: 'Zap', color: 'from-purple-500 to-pink-500' }
  ];

  const interestOptions = [
    'Nouveautés', 'Éditions Limitées', 'Collaborations', 'Événements VIP', 'Tendances', 'Promotions'
  ];

  const handleNext = () => {
    if (currentStep < steps?.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev?.interests?.includes(interest)
        ? prev?.interests?.filter(i => i !== interest)
        : [...prev?.interests, interest]
    }));
  };

  const renderStepContent = () => {
    switch (steps?.[currentStep]?.component) {
      case 'StyleSelection':
        return (
          <div className="space-y-6">
            <p className="text-text-secondary text-center font-body">
              Choisissez le style qui vous représente le mieux
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {styleOptions?.map((style) => (
                <motion.button
                  key={style?.id}
                  onClick={() => updateFormData('style', style?.id)}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                    formData?.style === style?.id
                      ? 'border-accent bg-accent/10' :'border-border bg-card hover:border-accent/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${style?.color} flex items-center justify-center mb-4 mx-auto`}>
                    <Icon name={style?.icon} size={24} className="text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">{style?.name}</h3>
                  {formData?.style === style?.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <Icon name="Check" size={20} className="text-accent" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 'Preferences':
        return (
          <div className="space-y-6">
            <p className="text-text-secondary text-center font-body">
              Sélectionnez vos centres d'intérêt
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interestOptions?.map((interest) => (
                <motion.button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    formData?.interests?.includes(interest)
                      ? 'border-accent bg-accent/10 text-accent' :'border-border bg-card text-foreground hover:border-accent/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-body text-sm">{interest}</span>
                </motion.button>
              ))}
            </div>
            <div className="mt-8">
              <Input
                label="Taille préférée"
                type="text"
                placeholder="Ex: M, L, XL"
                value={formData?.size}
                onChange={(e) => updateFormData('size', e?.target?.value)}
                className="max-w-xs mx-auto"
              />
            </div>
          </div>
        );

      case 'Notifications':
        return (
          <div className="space-y-6 text-center">
            <p className="text-text-secondary font-body">
              Configurez vos notifications pour ne rien manquer
            </p>
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                <div className="text-left">
                  <h4 className="font-heading font-bold text-foreground">Notifications Push</h4>
                  <p className="text-sm text-text-secondary">Nouveautés et offres exclusives</p>
                </div>
                <button
                  onClick={() => updateFormData('notifications', !formData?.notifications)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    formData?.notifications ? 'bg-accent' : 'bg-border'
                  }`}
                >
                  <motion.div
                    className="absolute top-1 w-4 h-4 bg-white rounded-full"
                    animate={{ x: formData?.notifications ? 26 : 2 }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              </div>
            </div>
          </div>
        );

      case 'Completion':
        return (
          <div className="space-y-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="w-24 h-24 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Icon name="Check" size={40} className="text-white" />
            </motion.div>
            <h3 className="text-2xl font-heading font-bold text-foreground">
              Profil configuré avec succès !
            </h3>
            <p className="text-text-secondary font-body max-w-md mx-auto">
              Votre expérience UrbanSpace est maintenant personnalisée selon vos préférences. 
              Découvrez dès maintenant nos collections exclusives.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  if (isCompleted) {
    return (
      <section className="py-20 px-6 bg-gradient-to-b from-surface to-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="w-32 h-32 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center mx-auto mb-8">
              <Icon name="Sparkles" size={60} className="text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-success mb-6">
              BIENVENUE OFFICIEL !
            </h2>
            <p className="text-xl text-text-secondary font-body mb-8 max-w-2xl mx-auto">
              Vous êtes maintenant membre privilégié de la famille UrbanSpace. 
              Votre aventure dans l'univers du streetwear premium commence maintenant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" iconName="ShoppingBag" iconPosition="left" className="px-8 py-4">
                Découvrir les produits
              </Button>
              <Button variant="outline" iconName="Users" iconPosition="left" className="px-8 py-4">
                Rejoindre la communauté
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-surface to-background">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {steps?.map((step, index) => (
              <div key={step?.id} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  index <= currentStep 
                    ? 'border-accent bg-accent text-white' :'border-border bg-card text-text-secondary'
                }`}>
                  <Icon name={step?.icon} size={20} />
                </div>
                <span className="text-xs font-caption mt-2 text-center max-w-20">
                  {step?.title}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-accent to-success h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps?.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl p-8 border border-border mb-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                {steps?.[currentStep]?.title}
              </h2>
              <p className="text-text-secondary font-body">
                {steps?.[currentStep]?.subtitle}
              </p>
            </div>

            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Précédent
          </Button>

          <span className="text-text-secondary font-caption">
            {currentStep + 1} / {steps?.length}
          </span>

          <Button
            variant="default"
            onClick={handleNext}
            iconName={currentStep === steps?.length - 1 ? "Check" : "ChevronRight"}
            iconPosition="right"
          >
            {currentStep === steps?.length - 1 ? "Terminer" : "Suivant"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OnboardingSteps;