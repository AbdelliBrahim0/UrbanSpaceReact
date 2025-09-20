import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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
        // Optionally validate token with backend
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid auth data
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = (userData, token) => {
    if (token) {
      localStorage.setItem('jwt_token', token);
    }
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    // Optionally call backend logout endpoint here
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('jwt_token');
    navigate('/user-authentication');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      isLoading,
      login, 
      logout 
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
