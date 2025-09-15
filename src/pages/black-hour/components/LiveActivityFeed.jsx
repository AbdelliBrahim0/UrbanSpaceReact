import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState([]);

  const activityTypes = [
    {
      type: 'purchase',
      icon: 'ShoppingBag',
      color: 'text-success',
      templates: [
        'Someone in {location} just bought {item}',
        '{item} was purchased in {location}',
        'New order from {location}: {item}'
      ]
    },
    {
      type: 'viewing',
      icon: 'Eye',
      color: 'text-accent',
      templates: [
        '{count} people are viewing {item}',
        '{item} is trending in {location}',
        'Hot item: {item} - {count} viewers'
      ]
    },
    {
      type: 'stock',
      icon: 'AlertTriangle',
      color: 'text-warning',
      templates: [
        'Only {count} left: {item}',
        'Low stock alert: {item}',
        'Almost sold out: {item}'
      ]
    },
    {
      type: 'exclusive',
      icon: 'Star',
      color: 'text-accent',
      templates: [
        'VIP access granted for {item}',
        'Exclusive drop: {item}',
        'Limited release: {item}'
      ]
    }
  ];

  const locations = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Atlanta', 'Houston', 'Seattle', 'Boston'];
  const items = [
    'Supreme Box Logo Hoodie',
    'Off-White Jordan 1',
    'Travis Scott Cactus Jack Tee',
    'Fear of God Essentials',
    'Yeezy Boost 350',
    'Stone Island Jacket',
    'BAPE Shark Hoodie',
    'Chrome Hearts Ring'
  ];

  useEffect(() => {
    const generateActivity = () => {
      const activityType = activityTypes?.[Math.floor(Math.random() * activityTypes?.length)];
      const location = locations?.[Math.floor(Math.random() * locations?.length)];
      const item = items?.[Math.floor(Math.random() * items?.length)];
      const template = activityType?.templates?.[Math.floor(Math.random() * activityType?.templates?.length)];
      const count = Math.floor(Math.random() * 20) + 1;

      const message = template?.replace('{location}', location)?.replace('{item}', item)?.replace('{count}', count);

      const newActivity = {
        id: Date.now() + Math.random(),
        type: activityType?.type,
        icon: activityType?.icon,
        color: activityType?.color,
        message,
        timestamp: new Date()
      };

      setActivities(prev => [newActivity, ...prev?.slice(0, 4)]);
    };

    // Generate initial activities
    for (let i = 0; i < 3; i++) {
      setTimeout(() => generateActivity(), i * 1000);
    }

    // Continue generating activities
    const interval = setInterval(generateActivity, Math.random() * 5000 + 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border border-street rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <motion.div
          className="w-3 h-3 bg-success rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <h3 className="font-heading font-bold text-lg text-foreground">
          Live Activity
        </h3>
        <div className="text-xs text-muted-foreground bg-surface px-2 py-1 rounded-full">
          Real-time
        </div>
      </div>
      <div className="space-y-4 max-h-80 overflow-hidden">
        <AnimatePresence>
          {activities?.map((activity) => (
            <motion.div
              key={activity?.id}
              className="flex items-start space-x-3 p-3 bg-surface rounded-lg border border-street"
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={`flex-shrink-0 ${activity?.color}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <Icon name={activity?.icon} size={16} />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground font-medium">
                  {activity?.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity?.timestamp?.toLocaleTimeString()}
                </p>
              </div>

              {activity?.type === 'purchase' && (
                <motion.div
                  className="flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="w-2 h-2 bg-success rounded-full" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {activities?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Activity" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">
              Waiting for live activity...
            </p>
          </div>
        )}
      </div>
      {/* Activity Stats */}
      <div className="mt-6 pt-4 border-t border-street">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-black text-accent">247</div>
            <div className="text-xs text-muted-foreground">Active Users</div>
          </div>
          <div>
            <div className="text-2xl font-black text-success">89</div>
            <div className="text-xs text-muted-foreground">Sales Today</div>
          </div>
          <div>
            <div className="text-2xl font-black text-warning">12</div>
            <div className="text-xs text-muted-foreground">Items Left</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveActivityFeed;