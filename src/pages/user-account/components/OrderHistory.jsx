import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderHistory = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-09-10",
      status: "delivered",
      total: 289.99,
      items: [
        {
          id: 1,
          name: "Urban Rebel Hoodie",
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop",
          size: "L",
          color: "Black",
          quantity: 1,
          price: 149.99
        },
        {
          id: 2,
          name: "Street King Joggers",
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop",
          size: "M",
          color: "Charcoal",
          quantity: 1,
          price: 89.99
        }
      ],
      tracking: "TRK123456789",
      shippingAddress: "123 Street Ave, Urban City, UC 12345"
    },
    {
      id: "ORD-2024-002",
      date: "2024-09-05",
      status: "shipped",
      total: 199.99,
      items: [
        {
          id: 3,
          name: "Gang Leader Jacket",
          image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop",
          size: "XL",
          color: "Navy",
          quantity: 1,
          price: 199.99
        }
      ],
      tracking: "TRK987654321",
      shippingAddress: "123 Street Ave, Urban City, UC 12345"
    },
    {
      id: "ORD-2024-003",
      date: "2024-08-28",
      status: "processing",
      total: 459.97,
      items: [
        {
          id: 4,
          name: "Streetwear Sneakers",
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop",
          size: "10",
          color: "White/Black",
          quantity: 1,
          price: 179.99
        },
        {
          id: 5,
          name: "Urban Cap Collection",
          image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=100&h=100&fit=crop",
          size: "OS",
          color: "Black",
          quantity: 2,
          price: 139.99
        }
      ],
      tracking: null,
      shippingAddress: "123 Street Ave, Urban City, UC 12345"
    }
  ];

  const statusConfig = {
    processing: { color: 'text-warning', bg: 'bg-warning/10', icon: 'Clock' },
    shipped: { color: 'text-primary', bg: 'bg-primary/10', icon: 'Truck' },
    delivered: { color: 'text-success', bg: 'bg-success/10', icon: 'CheckCircle' },
    cancelled: { color: 'text-error', bg: 'bg-error/10', icon: 'XCircle' }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders?.filter(order => order?.status === filterStatus);

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleReorder = (order) => {
    // Simulate reorder functionality
    console.log('Reordering:', order?.id);
  };

  const handleTrackOrder = (tracking) => {
    // Simulate tracking functionality
    console.log('Tracking:', tracking);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl border border-border p-8"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-foreground">Order History</h2>
        
        {/* Filter Buttons */}
        <div className="flex items-center space-x-2">
          {['all', 'processing', 'shipped', 'delivered']?.map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className="capitalize animate-scale-hover"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <AnimatePresence>
          {filteredOrders?.map((order) => (
            <motion.div
              key={order?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-surface rounded-lg border border-border overflow-hidden"
            >
              {/* Order Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-muted/5 transition-colors duration-150"
                onClick={() => toggleOrderExpansion(order?.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-bold text-foreground font-mono">{order?.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.date)?.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig?.[order?.status]?.bg} ${statusConfig?.[order?.status]?.color} flex items-center space-x-1`}>
                      <Icon name={statusConfig?.[order?.status]?.icon} size={12} />
                      <span className="capitalize">{order?.status}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-bold text-foreground">${order?.total}</div>
                      <div className="text-sm text-muted-foreground">
                        {order?.items?.length} item{order?.items?.length > 1 ? 's' : ''}
                      </div>
                    </div>
                    <Icon 
                      name={expandedOrder === order?.id ? "ChevronUp" : "ChevronDown"} 
                      size={20} 
                      className="text-muted-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Expanded Order Details */}
              <AnimatePresence>
                {expandedOrder === order?.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border"
                  >
                    <div className="p-6 space-y-6">
                      {/* Order Items */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Items Ordered</h4>
                        <div className="space-y-4">
                          {order?.items?.map((item) => (
                            <div key={item?.id} className="flex items-center space-x-4">
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                                <Image
                                  src={item?.image}
                                  alt={item?.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-foreground">{item?.name}</h5>
                                <p className="text-sm text-muted-foreground">
                                  Size: {item?.size} • Color: {item?.color} • Qty: {item?.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="font-medium text-foreground">${item?.price}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Shipping Address</h4>
                          <p className="text-sm text-muted-foreground">{order?.shippingAddress}</p>
                        </div>
                        {order?.tracking && (
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Tracking Number</h4>
                            <p className="text-sm text-muted-foreground font-mono">{order?.tracking}</p>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-4 pt-4 border-t border-border">
                        <Button
                          variant="outline"
                          iconName="RotateCcw"
                          iconPosition="left"
                          onClick={() => handleReorder(order)}
                          className="animate-scale-hover"
                        >
                          Reorder
                        </Button>
                        {order?.tracking && (
                          <Button
                            variant="outline"
                            iconName="Truck"
                            iconPosition="left"
                            onClick={() => handleTrackOrder(order?.tracking)}
                            className="animate-scale-hover"
                          >
                            Track Order
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          iconName="Download"
                          iconPosition="left"
                          className="animate-scale-hover"
                        >
                          Invoice
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredOrders?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Orders Found</h3>
            <p className="text-muted-foreground mb-6">
              {filterStatus === 'all' ? "You haven't placed any orders yet." 
                : `No ${filterStatus} orders found.`}
            </p>
            <Button
              variant="default"
              iconName="ShoppingBag"
              iconPosition="left"
              onClick={() => window.location.href = '/product-catalog'}
              className="animate-scale-hover"
            >
              Start Shopping
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default OrderHistory;