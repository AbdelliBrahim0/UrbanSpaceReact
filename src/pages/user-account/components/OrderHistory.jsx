import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from "../../../contexts/AuthContext";
import { fetchApi } from '../../../../src/api';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [pagination, setPagination] = useState({
    current_page: 1,
    items_per_page: 10,
    total_items: 0,
    total_pages: 1
  });

  // Fonction pour récupérer les commandes de l'utilisateur
  const fetchUserOrders = async (page = 1, status = 'all') => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 10,
        ...(status !== 'all' && { status })
      });

      const response = await fetchApi(`/orders/user/${user.id}?${params}`);
      
      if (response && response.orders) {
        setOrders(response.orders);
        setPagination({
          current_page: response.pagination?.current_page || 1,
          items_per_page: response.pagination?.items_per_page || 10,
          total_items: response.pagination?.total_items || 0,
          total_pages: response.pagination?.total_pages || 1
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
      toast.error('Une erreur est survenue lors du chargement de vos commandes');
    } finally {
      setLoading(false);
    }
  };

  // Charger les commandes au montage du composant et quand le filtre change
  useEffect(() => {
    fetchUserOrders(1, filterStatus === 'all' ? undefined : filterStatus);
  }, [user, filterStatus]);

  // Fonction pour changer de page
  const handlePageChange = (page) => {
    fetchUserOrders(page, filterStatus === 'all' ? undefined : filterStatus);
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Configuration des statuts
  const statusConfig = {
    processing: { 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-100', 
      icon: 'Clock',
      label: 'En traitement' 
    },
    shipped: { 
      color: 'text-blue-600', 
      bg: 'bg-blue-100', 
      icon: 'Truck',
      label: 'Expédiée' 
    },
    delivered: { 
      color: 'text-green-600', 
      bg: 'bg-green-100', 
      icon: 'CheckCircle',
      label: 'Livrée' 
    },
    cancelled: { 
      color: 'text-red-600', 
      bg: 'bg-red-100', 
      icon: 'XCircle',
      label: 'Annulée' 
    },
    pending: {
      color: 'text-gray-600',
      bg: 'bg-gray-100',
      icon: 'Clock',
      label: 'En attente'
    }
  };

  // Si chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  // Si pas de commandes
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Package" size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande trouvée</h3>
        <p className="text-gray-500 mb-6">Vous n'avez pas encore passé de commande.</p>
        <Button onClick={() => window.location.href = '/'}>
          Faire du shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={filterStatus === 'all' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('all')}
          className="capitalize"
        >
          Toutes les commandes
        </Button>
        {Object.keys(statusConfig).map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? 'default' : 'outline'}
            onClick={() => setFilterStatus(status)}
            className="capitalize"
          >
            {statusConfig[status].label}
          </Button>
        ))}
      </div>

      {/* Liste des commandes */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg overflow-hidden">
            <div 
              className="p-4 bg-gray-50 border-b cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Commande #{order.id}</h3>
                  <p className="text-sm text-gray-500">
                    Passée le {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[order.status]?.bg} ${statusConfig[order.status]?.color}`}>
                    {statusConfig[order.status]?.label}
                  </span>
                  <span className="font-medium">{order.total.toFixed(2)} €</span>
                  <Icon 
                    name={expandedOrder === order.id ? 'ChevronUp' : 'ChevronDown'} 
                    className="text-gray-500" 
                  />
                </div>
              </div>
            </div>

            <AnimatePresence>
              {expandedOrder === order.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-4 space-y-4">
                    {/* Articles de la commande */}
                    <div className="space-y-2">
                      <h4 className="font-medium">Articles commandés</h4>
                      {order.items?.map((item) => (
                        <div key={item.id} className="flex items-center p-2 bg-gray-50 rounded">
                          <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                            {item.image && (
                              <Image
                                src={item.image}
                                alt={item.productName}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="ml-4 flex-1">
                            <h5 className="font-medium">{item.productName}</h5>
                            <p className="text-sm text-gray-500">
                              Quantité: {item.quantity} × {item.price.toFixed(2)} €
                            </p>
                          </div>
                          <div className="font-medium">
                            {(item.quantity * item.price).toFixed(2)} €
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Adresse de livraison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                            <h4 className="font-medium mb-2">Adresse de livraison</h4>
                            <p className="text-sm text-gray-600">
                              {order.shippingAddress || 'Non spécifiée'}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Statut de la commande</h4>
                            <div className="flex items-center">
                              <Icon 
                                name={statusConfig[order.status]?.icon} 
                                className={`mr-2 ${statusConfig[order.status]?.color}`} 
                              />
                              <span className="text-sm">
                                {statusConfig[order.status]?.label}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex justify-end pt-4 border-t">
                          <Button
                            variant="outline"
                            onClick={() => {
                              // Implémenter le suivi de commande
                              console.log('Suivre la commande', order.id);
                            }}
                            className="mr-2"
                          >
                            <Icon name="Truck" className="mr-2" />
                            Suivre ma commande
                          </Button>
                          <Button
                            onClick={() => {
                              // Implémenter la réorganisation
                              console.log('Commander à nouveau', order.id);
                            }}
                          >
                            <Icon name="RotateCcw" className="mr-2" />
                            Commander à nouveau
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.total_pages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2">
                {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={pagination.current_page === page ? 'default' : 'outline'}
                    onClick={() => handlePageChange(page)}
                    className="w-10 h-10 p-0 flex items-center justify-center"
                  >
                    {page}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    };

export default OrderHistory;
