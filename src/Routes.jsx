import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProductDetail from './pages/product-detail';
import Sale from './pages/sale';
import Collections from './pages/collections';
import BlackFridayPage from './pages/black-friday';
import BlackHourPage from './pages/black-hour';
import Homepage from './pages/homepage';
import UserAccount from './pages/user-account';
import UserAuthentication from './pages/user-authentication';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/user-authentication" />;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/user-account" /> : children;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <RouterRoutes>
            <Route path="/" element={<BlackFridayPage />} />
            <Route path="/product-detail" element={<ProductDetail />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/black-friday" element={<BlackFridayPage />} />
            <Route path="/black-hour" element={<BlackHourPage />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route 
              path="/user-account" 
              element={
                <PrivateRoute>
                  <UserAccount />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/user-authentication" 
              element={
                <PublicRoute>
                  <UserAuthentication />
                </PublicRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;
