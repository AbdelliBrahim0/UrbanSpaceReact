import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  const routeMap = {
    '/homepage': 'Home',
    '/product-catalog': 'Catalog',
    '/product-details': 'Product Details',
    '/shopping-cart': 'Cart',
    '/checkout': 'Checkout',
    '/user-account': 'Account'
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/homepage' }];

    if (pathSegments?.length > 0) {
      const currentPath = `/${pathSegments?.[0]}`;
      if (routeMap?.[currentPath] && currentPath !== '/homepage') {
        breadcrumbs?.push({
          label: routeMap?.[currentPath],
          path: currentPath
        });
      }
    }

    // Handle special cases for product details with dynamic IDs
    if (location?.pathname?.includes('/product-details')) {
      const productId = location?.search?.includes('id=') 
        ? new URLSearchParams(location.search)?.get('id')
        : 'Product';
      
      if (breadcrumbs?.length === 1) {
        breadcrumbs?.push({ label: 'Catalog', path: '/product-catalog' });
      }
      breadcrumbs?.push({ 
        label: `Product ${productId}`, 
        path: location?.pathname,
        isActive: true 
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6 animate-fade-in">
      {breadcrumbs?.map((crumb, index) => (
        <React.Fragment key={crumb?.path || index}>
          {index > 0 && (
            <Icon 
              name="ChevronRight" 
              size={14} 
              className="text-muted-foreground/60"
            />
          )}
          {crumb?.isActive || index === breadcrumbs?.length - 1 ? (
            <span className="text-foreground font-medium font-mono">
              {crumb?.label}
            </span>
          ) : (
            <Link
              to={crumb?.path}
              className="hover:text-foreground transition-colors duration-150 font-mono animate-scale-hover"
            >
              {crumb?.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;