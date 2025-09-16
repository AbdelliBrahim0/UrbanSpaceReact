import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/uiiii/Button';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';
import Background3D from './components/Background3D';
import TrustSignals from './components/TrustSignals';
import Header from '../../components/ui/Header';


const UserAuthentication = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.title = 'Sign In | UrbanSpace - Premium Streetwear';
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-20">
      {/* 3D Background */}
      <Background3D />
      
      {/* Header */}
      <Header />
      

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Welcome Section */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-2xl font-bold text-primary mb-2">
              {activeTab === 'login' ? 'UrbanSpace' : 'UrbanSpace'}
            </h1>
            <p className="text-muted-foreground">
              {activeTab === 'login' ?'Sign in to access exclusive streetwear drops' :'Create your account for premium streetwear access'
              }
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-elevation-3 p-8 animate-fade-in">
            {/* Auth Tabs */}
            <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />

            {/* Auth Forms */}
            <div className="relative">
              {activeTab === 'login' ? (
                <LoginForm onSuccess={handleAuthSuccess} />
              ) : (
                <RegisterForm onSuccess={handleAuthSuccess} />
              )}
            </div>

            {/* Social Authentication */}
            <SocialAuth onSuccess={handleAuthSuccess} />
          </div>

          {/* Additional Links */}
          <div className="text-center mt-6 animate-fade-in">
            <p className="text-sm text-muted-foreground">
              {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                className="text-accent hover:text-accent/80 font-medium transition-colors"
              >
                {activeTab === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Trust Signals Footer */}
      <footer className="relative z-10 px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <TrustSignals />
        </div>
      </footer>

      {/* Mobile Navigation Hint */}
      <div className="fixed bottom-6 right-6 md:hidden z-20 animate-fade-in">
        <Link to="/3d-homepage">
          <Button
            variant="default"
            size="icon"
            iconName="Home"
            className="w-12 h-12 rounded-full shadow-elevation-3"
          />
        </Link>
      </div>
    </div>
  );
};

export default UserAuthentication;