import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
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

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<BlackFridayPage />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/black-friday" element={<BlackFridayPage />} />
        <Route path="/black-hour" element={<BlackHourPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/user-account" element={<UserAccount />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
