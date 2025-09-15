import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const [filter, setFilter] = useState('all');
  const [activities] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered',
      description: 'Your order #ORD-2024-001 has been delivered successfully',
      timestamp: '2024-09-10T14:30:00Z',
      icon: 'Package',
      color: 'text-success',
      bgColor: 'bg-success/10',
      metadata: {
        orderId: 'ORD-2024-001',
        amount: '$289.99'
      }
    },
    {
      id: 2,
      type: 'wishlist',
      title: 'Item Added to Wishlist',
      description: 'Urban Rebel Hoodie was added to your wishlist',
      timestamp: '2024-09-08T10:15:00Z',
      icon: 'Heart',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      metadata: {
        productName: 'Urban Rebel Hoodie',
        productImage: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=50&h=50&fit=crop'
      }
    },
    {
      id: 3,
      type: 'profile',
      title: 'Profile Updated',
      description: 'Your profile information has been updated',
      timestamp: '2024-09-05T16:45:00Z',
      icon: 'User',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      metadata: {}
    },
    {
      id: 4,
      type: 'order',
      title: 'Order Shipped',
      description: 'Your order #ORD-2024-002 is on its way',
      timestamp: '2024-09-05T09:20:00Z',
      icon: 'Truck',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      metadata: {
        orderId: 'ORD-2024-002',
        trackingNumber: 'TRK987654321'
      }
    },
    {
      id: 5,
      type: 'browse',
      title: 'Product Viewed',
      description: 'You viewed Gang Leader Jacket',
      timestamp: '2024-09-03T11:30:00Z',
      icon: 'Eye',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/10',
      metadata: {
        productName: 'Gang Leader Jacket',
        productImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=50&h=50&fit=crop'
      }
    },
    {
      id: 6,
      type: 'order',
      title: 'Order Placed',
      description: 'Order #ORD-2024-003 has been placed successfully',
      timestamp: '2024-08-28T13:15:00Z',
      icon: 'ShoppingBag',
      color: 'text-success',
      bgColor: 'bg-success/10',
      metadata: {
        orderId: 'ORD-2024-003',
        amount: '$459.97'
      }
    },
    {
      id: 7,
      type: 'wishlist',
      title: 'Item Removed from Wishlist',
      description: 'Streetwear Sneakers was removed from your wishlist',
      timestamp: '2024-08-25T08:45:00Z',
      icon: 'HeartOff',
      color: 'text-error',
      bgColor: 'bg-error/10',
      metadata: {
        productName: 'Streetwear Sneakers'
      }
    },
    {
      id: 8,
      type: 'browse',
      title: 'Search Performed',
      description: 'You searched for "urban hoodies"',
      timestamp: '2024-08-20T15:20:00Z',
      icon: 'Search',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/10',
      metadata: {
        searchTerm: 'urban hoodies'
      }
    },
    {
      id: 9,
      type: 'profile',
      title: 'Password Changed',
      description: 'Your account password was successfully updated',
      timestamp: '2024-08-15T12:00:00Z',
      icon: 'Lock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      metadata: {}
    },
    {
      id: 10,
      type: 'browse',
      title: 'Category Browsed',
      description: 'You browsed the Hoodies & Sweatshirts category',
      timestamp: '2024-08-10T14:30:00Z',
      icon: 'Grid3X3',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/10',
      metadata: {
        category: 'Hoodies & Sweatshirts'
      }
    }
  ]);

  const filterOptions = [
    { value: 'all', label: 'All Activity', icon: 'Activity' },
    { value: 'order', label: 'Orders', icon: 'Package' },
    { value: 'wishlist', label: 'Wishlist', icon: 'Heart' },
    { value: 'profile', label: 'Profile', icon: 'User' },
    { value: 'browse', label: 'Browsing', icon: 'Eye' }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.type === filter);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date?.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date?.getFullYear() !== now?.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const clearActivity = () => {
    // Simulate clearing activity
    console.log('Clearing activity history');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl border border-border p-8"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
          <p className="text-muted-foreground font-mono">
            {filteredActivities?.length} activities
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Trash2"
            iconPosition="left"
            onClick={clearActivity}
            className="animate-scale-hover"
          >
            Clear History
          </Button>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 mb-8 overflow-x-auto pb-2">
        {filterOptions?.map((option) => (
          <Button
            key={option?.value}
            variant={filter === option?.value ? 'default' : 'outline'}
            size="sm"
            iconName={option?.icon}
            iconPosition="left"
            onClick={() => setFilter(option?.value)}
            className="whitespace-nowrap animate-scale-hover"
          >
            {option?.label}
          </Button>
        ))}
      </div>
      {/* Activity List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredActivities?.map((activity, index) => (
            <motion.div
              key={activity?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="bg-surface rounded-lg border border-border p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                {/* Activity Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity?.bgColor}`}>
                  <Icon name={activity?.icon} size={18} className={activity?.color} />
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {activity?.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {activity?.description}
                      </p>

                      {/* Activity Metadata */}
                      {Object.keys(activity?.metadata)?.length > 0 && (
                        <div className="flex items-center space-x-4 mt-3">
                          {activity?.metadata?.productImage && (
                            <div className="w-8 h-8 rounded overflow-hidden">
                              <Image
                                src={activity?.metadata?.productImage}
                                alt={activity?.metadata?.productName || 'Product'}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          
                          {activity?.metadata?.orderId && (
                            <span className="text-xs bg-muted px-2 py-1 rounded font-mono">
                              {activity?.metadata?.orderId}
                            </span>
                          )}
                          
                          {activity?.metadata?.amount && (
                            <span className="text-xs font-semibold text-success">
                              {activity?.metadata?.amount}
                            </span>
                          )}
                          
                          {activity?.metadata?.trackingNumber && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-mono">
                              {activity?.metadata?.trackingNumber}
                            </span>
                          )}
                          
                          {activity?.metadata?.searchTerm && (
                            <span className="text-xs bg-muted px-2 py-1 rounded">
                              "{activity?.metadata?.searchTerm}"
                            </span>
                          )}
                          
                          {activity?.metadata?.category && (
                            <span className="text-xs bg-muted px-2 py-1 rounded">
                              {activity?.metadata?.category}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Timestamp */}
                    <div className="text-xs text-muted-foreground font-mono ml-4">
                      {formatTimestamp(activity?.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredActivities?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Activity Found</h3>
            <p className="text-muted-foreground mb-6">
              {filter === 'all' 
                ? "No recent activity to display." 
                : `No ${filter} activity found.`}
            </p>
            <Button
              variant="outline"
              onClick={() => setFilter('all')}
              className="animate-scale-hover"
            >
              View All Activity
            </Button>
          </motion.div>
        )}
      </div>
      {/* Load More */}
      {filteredActivities?.length > 0 && (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            iconName="ChevronDown"
            iconPosition="right"
            className="animate-scale-hover"
          >
            Load More Activity
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default ActivityFeed;