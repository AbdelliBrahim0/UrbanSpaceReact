import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/uiiii/Button';
import Input from '../../../components/uiiii/Input';
import { useAuth } from '../../../contexts/AuthContext';

const RegisterForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    nom: '',       
    email: '',
    telephone: '',
    adresse: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Réinitialiser les erreurs du champ
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Fonction de validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!formData?.nom?.trim()) {
      newErrors.nom = 'Le nom complet est requis';
    }

    if (!formData?.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData?.email)) {
      newErrors.email = 'Veuillez entrer un email valide';
    }

    if (!formData?.telephone) {
      newErrors.telephone = 'Le numéro de téléphone est requis';
    } else if (!/^(\+216)?[0-9]{8}$/.test(formData?.telephone)) {
      newErrors.telephone = 'Veuillez entrer un numéro de téléphone valide (+216)';
    }

    if (!formData?.adresse) {
      newErrors.adresse = 'L\'adresse est requise';
    }

    if (!formData?.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Le mot de passe doit comporter au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful registration
      const userData = {
        email: formData.email,
        name: formData.nom,
        phone: formData.telephone,
        address: formData.adresse
      };
      
      // Call the login function from our auth context
      login(userData);
      onSuccess?.(userData);
      
      // Redirect to account page
      navigate('/new-member-welcome');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors(prev => ({
        ...prev,
        general: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg animate-fade-in">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <p className="text-sm text-error">{errors.general}</p>
          </div>
        </div>
      )}

      <Input
        label="Nom complet"
        type="text"
        name="nom"  // 'fullName' changé en 'nom'
        placeholder="Entrez votre nom complet"
        value={formData?.nom}  // 'fullName' changé en 'nom'
        onChange={handleInputChange}
        error={errors?.nom}  // 'fullName' changé en 'nom'
        required
      />
      <Input
        label="Adresse Email"
        type="email"
        name="email"
        placeholder="Entrez votre email"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
      />
      <Input
        label="Numéro de téléphone (+216)"
        type="text"
        name="telephone"
        placeholder="Entrez votre numéro de téléphone"
        value={formData?.telephone}
        onChange={handleInputChange}
        error={errors?.telephone}
        required
      />
      <Input
        label="Adresse"
        type="text"
        name="adresse"
        placeholder="Entrez votre adresse"
        value={formData?.adresse}
        onChange={handleInputChange}
        error={errors?.adresse}
        required
      />
      <div className="relative">
        <Input
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Créez un mot de passe sécurisé"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-text-primary transition-colors"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
        </button>
      </div>

      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="right"
        className="animate-fade-in"
      >
        {isLoading ? 'Création du compte...' : 'Créer un compte'}
      </Button>
    </form>
  );
};

export default RegisterForm;
