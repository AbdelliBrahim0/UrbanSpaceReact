import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/uiiii/Button';
import Input from '../../../components/uiiii/Input';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../api';

const LoginForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData?.email)) {  // Correction de l'expression régulière
      newErrors.email = 'Veuillez entrer une adresse email valide';
    }

    if (!formData?.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Le mot de passe doit comporter au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    // Validation du formulaire
    if (!validateForm()) {
      console.log('Échec de la validation du formulaire');
      return;
    }

    setIsLoading(true);
    setErrors({}); // Réinitialiser les erreurs précédentes
    
    try {
      console.log('Tentative de connexion...');
      
      // Appel de l'API de connexion
      const response = await api.privateApi.auth.login({
        email: formData.email.trim(),
        password: formData.password
      });
      
      console.log('Réponse de l\'API :', response);
      
      if (response && response.success && response.token) {
        console.log('Connexion réussie, redirection...');
        // Connexion réussie
        login(response.user, response.token);
        onSuccess?.(response.user);
        navigate('/user-account');
      } else {
        // Gestion des erreurs de l'API
        const errorMessage = response?.message || 'Échec de la connexion. Veuillez vérifier vos identifiants.';
        console.error('Échec de la connexion :', errorMessage);
        setErrors({ form: errorMessage });
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      const errorMessage = error.data?.message || error.message || 'Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.';
      setErrors({ form: errorMessage });
      
      // Afficher plus de détails sur l'erreur dans la console
      if (error.response) {
        console.error('Détails de l\'erreur:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.general && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg animate-fade-in">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        </div>
      )}
      <Input
        label="Adresse Email"
        type="email"
        name="email"
        placeholder="Entrez votre email"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
        className="animate-fade-in"
      />
      <div className="relative animate-fade-in">
        <Input
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Entrez votre mot de passe"
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
      <div className="flex items-center justify-between animate-fade-in">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent focus:ring-2"
          />
          <span className="text-sm text-text-secondary">Se souvenir de moi</span>
        </label>
        <button
          type="button"
          className="text-sm text-accent hover:text-accent/80 transition-colors"
        >
          Mot de passe oublié ?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="right"
        className="animate-fade-in"
      >
        {isLoading ? 'Connexion en cours...' : 'Se connecter'}
      </Button>
    </form>
  );
};

export default LoginForm;
