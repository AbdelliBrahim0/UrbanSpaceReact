import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { userApi } from '../../../api';
import { useAuth } from '../../../contexts/AuthContext';

const ProfileSection = () => {
  const { user: authUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const [profileData, setProfileData] = useState({
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    dateInscription: "",
    avatar: null
  });

  const [editData, setEditData] = useState({ ...profileData });

  // Charger les données du profil
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await userApi.getProfile();

        if (response.success) {
          setProfileData({
            ...response.user,
            // Formater la date d'inscription pour l'affichage
            dateInscription: new Date(response.user.dateInscription).toLocaleDateString('fr-FR')
          });
          setEditData({
            ...response.user,
            // Garder la date d'inscription formatée
            dateInscription: new Date(response.user.dateInscription).toLocaleDateString('fr-FR')
          });
        } else {
          setError(response.message || "Erreur lors du chargement du profil");
        }
      } catch (err) {
        console.error("Erreur lors du chargement du profil:", err);
        setError("Une erreur est survenue lors du chargement de votre profil");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [authUser]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...profileData });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);

      // Préparer les données pour l'API
      const updateData = {
        nom: editData.nom,
        email: editData.email,
        telephone: editData.telephone,
        adresse: editData.adresse
      };

      const response = await userApi.updateProfile(updateData);

      if (response.success) {
        // Mettre à jour les données du profil avec la réponse du serveur
        setProfileData(prev => ({
          ...prev,
          ...response.user,
          // Conserver la date d'inscription formatée
          dateInscription: prev.dateInscription
        }));

        // Mettre à jour également le contexte d'authentification si nécessaire
        if (authUser) {
          // Vous pourriez vouloir mettre à jour le contexte d'authentification ici
          // Cela dépend de comment vous gérez l'état d'authentification
        }

        setIsEditing(false);
      } else {
        setError(response.message || "Erreur lors de la mise à jour du profil");
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour du profil:", err);
      setError("Une erreur est survenue lors de la mise à jour de votre profil");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card rounded-xl border border-border p-8">
        <div className="text-center py-8">
          <Icon name="AlertCircle" className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Erreur</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            iconName="RefreshCw"
          >
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl border border-border p-6 w-full max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">Informations du profil</h2>
        {!isEditing && (
          <Button
            variant="outline"
            iconName="Edit"
            iconPosition="left"
            onClick={handleEdit}
            className="animate-scale-hover"
          >
            Modifier le profil
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Avatar Section - Prend 3 colonnes sur 12 */}
        <div className="flex flex-col items-center space-y-4 lg:col-span-3">
          <div className="relative group">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-colors duration-300 bg-muted flex items-center justify-center">
              <Image
                src="/assets/images/avatar-1.png"
                alt="Photo de profil"
                className="w-full h-full object-cover scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/images/avatar-1.png";
                }}
              />
            </div>
            {isEditing && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute bottom-2 right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors duration-150"
              >
                <Icon name="Camera" size={18} />
              </motion.button>
            )}
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground">
              {profileData?.nom || 'Utilisateur'}
            </h3>
            <p className="text-muted-foreground font-mono">
              Membre depuis {profileData?.dateInscription || 'récemment'}
            </p>
          </div>
        </div>

        {/* Profile Form - Prend 9 colonnes sur 12 */}
        <div className="space-y-6 lg:col-span-9">
          {/* Première ligne : Nom et Email côte à côte */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Nom complet</label>
              {isEditing ? (
                <Input
                  value={editData.nom || ''}
                  onChange={(e) => handleInputChange('nom', e.target.value)}
                  className="w-full"
                  placeholder="Votre nom complet"
                />
              ) : (
                <p className="text-foreground">{profileData.nom || 'Non renseigné'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
              {isEditing ? (
                <Input
                  type="email"
                  value={editData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full"
                  placeholder="Votre adresse email"
                />
              ) : (
                <p className="text-foreground">{profileData.email}</p>
              )}
            </div>
          </div>

          {/* Deuxième ligne : Téléphone et Adresse côte à côte */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Téléphone</label>
              {isEditing ? (
                <Input
                  type="tel"
                  value={editData.telephone || ''}
                  onChange={(e) => handleInputChange('telephone', e.target.value)}
                  className="w-full"
                  placeholder="Votre numéro de téléphone"
                />
              ) : (
                <p className="text-foreground">{profileData.telephone || 'Non renseigné'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Adresse</label>
              {isEditing ? (
                <Input
                  value={editData.adresse || ''}
                  onChange={(e) => handleInputChange('adresse', e.target.value)}
                  className="w-full"
                  placeholder="Votre adresse complète"
                />
              ) : (
                <p className="text-foreground">{profileData.adresse || 'Non renseignée'}</p>
              )}
            </div>
          </div>

          {/* Information Alert */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Icon name="AlertCircle" className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Important Notice</h3>
                <div className="mt-1 text-sm text-red-700">
                  <p>
                    Please ensure your contact information is accurate and up-to-date to prevent any issues with your orders and deliveries. 
                    Incorrect information may lead to delivery delays or order cancellations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4 pt-4"
            >
              {error && (
                <div className="p-4 bg-destructive/10 text-destructive rounded-md mt-4">
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t border-border mt-6">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSaving}
                  type="button"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleSave}
                  isLoading={isSaving}
                  loadingText="Enregistrement..."
                  type="button"
                >
                  Enregistrer les modifications
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileSection;