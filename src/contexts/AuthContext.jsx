import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api'; // Import userApi

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        // On component mount, try to refresh user data from server
        const profileResponse = await userApi.getProfile();
        if (profileResponse.success) {
          setUser(profileResponse.user);
          localStorage.setItem('user', JSON.stringify(profileResponse.user));
        } else {
          // Fallback to stored user if API fails
          setUser(JSON.parse(storedUser));
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid auth data
      logout(); // Use logout to clear all data
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (userData, token) => {
    if (token) {
      localStorage.setItem('jwt_token', token);
    }
    // We trust the initial userData for a moment to make the UI responsive
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));

    // Then, fetch the full profile to get all details
    try {
      const profileResponse = await userApi.getProfile();
      if (profileResponse.success && profileResponse.user) {
        setUser(profileResponse.user);
        localStorage.setItem('user', JSON.stringify(profileResponse.user));
      } else {
        // If fetching fails, we stick with the initial data
        console.warn('Could not refresh user profile after login.');
      }
    } catch (error) {
      console.error('Error fetching profile after login:', error);
    }
  };

  const logout = () => {
    // Optionally call backend logout endpoint here
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('jwt_token');
    navigate('/user-authentication');
  };

  const updateUser = (updatedData) => {
    setUser(prevUser => {
      const newUser = { ...prevUser, ...updatedData };
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      isLoading,
      login, 
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
