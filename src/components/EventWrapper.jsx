import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { eventsApi } from '../api';

const EventWrapper = ({ children, eventType, successRoute, fallbackRoute }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkEventStatus = async () => {
      try {
        const response = await eventsApi.checkStatus();
        
        if (response.success) {
          // Si l'événement est actif, on reste sur la page actuelle
          // Sinon, on redirige vers la page de secours
          if (!response.events[eventType]) {
            navigate(fallbackRoute, { replace: true });
          }
        } else {
          // En cas d'erreur, on redirige vers la page de secours
          console.error('Error checking event status:', response.error);
          navigate(fallbackRoute, { replace: true });
        }
      } catch (err) {
        console.error('Failed to check event status:', err);
        setError('Impossible de vérifier le statut de l\'événement');
      } finally {
        setIsLoading(false);
      }
    };

    checkEventStatus();
  }, [eventType, fallbackRoute, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 max-w-md mx-auto">
          <div className="text-red-500 text-2xl mb-4">Erreur</div>
          <p className="text-gray-700 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default EventWrapper;
