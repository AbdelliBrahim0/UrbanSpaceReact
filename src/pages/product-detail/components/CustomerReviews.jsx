import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerReviews = ({ product }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showPhotoReviews, setShowPhotoReviews] = useState(false);

  const filters = [
    { id: 'all', label: 'All Reviews', count: product?.reviews?.length },
    { id: '5', label: '5 Stars', count: product?.reviews?.filter(r => r?.rating === 5)?.length },
    { id: '4', label: '4 Stars', count: product?.reviews?.filter(r => r?.rating === 4)?.length },
    { id: '3', label: '3 Stars', count: product?.reviews?.filter(r => r?.rating === 3)?.length },
    { id: 'photos', label: 'With Photos', count: product?.reviews?.filter(r => r?.photos?.length > 0)?.length }
  ];

  const sortOptions = [
    { id: 'newest', label: 'Newest First' },
    { id: 'oldest', label: 'Oldest First' },
    { id: 'highest', label: 'Highest Rating' },
    { id: 'lowest', label: 'Lowest Rating' },
    { id: 'helpful', label: 'Most Helpful' }
  ];

  const getFilteredReviews = () => {
    let filtered = [...product?.reviews];

    // Apply filters
    if (selectedFilter === 'photos') {
      filtered = filtered?.filter(review => review?.photos?.length > 0);
    } else if (selectedFilter !== 'all') {
      filtered = filtered?.filter(review => review?.rating === parseInt(selectedFilter));
    }

    // Apply sorting
    switch (sortBy) {
      case 'oldest':
        filtered?.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'highest':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'lowest':
        filtered?.sort((a, b) => a?.rating - b?.rating);
        break;
      case 'helpful':
        filtered?.sort((a, b) => b?.helpful - a?.helpful);
        break;
      default: // newest
        filtered?.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return filtered;
  };

  const filteredReviews = getFilteredReviews();

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
            Customer Reviews
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {renderStars(Math.floor(product?.rating))}
              </div>
              <span className="font-medium text-foreground">{product?.rating}</span>
              <span className="text-muted-foreground">({product?.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        <Button variant="outline" className="lg:w-auto">
          <Icon name="Edit3" size={16} className="mr-2" />
          Write a Review
        </Button>
      </div>
      {/* Rating Breakdown */}
      <div className="bg-surface/30 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[5, 4, 3, 2, 1]?.map((stars) => {
            const count = product?.reviews?.filter(r => r?.rating === stars)?.length;
            const percentage = (count / product?.reviews?.length) * 100;
            
            return (
              <div key={stars} className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground w-8">{stars}★</span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className="bg-warning h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Filters and Sort */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-wrap gap-2">
          {filters?.map((filter) => (
            <Button
              key={filter?.id}
              variant={selectedFilter === filter?.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter?.id)}
              className="text-sm"
            >
              {filter?.label} ({filter?.count})
            </Button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="bg-surface border border-street rounded px-3 py-1 text-sm text-foreground focus:border-accent focus:outline-none"
          >
            {sortOptions?.map((option) => (
              <option key={option?.id} value={option?.id}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {filteredReviews?.length > 0 ? (
            <motion.div
              key={`${selectedFilter}-${sortBy}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {filteredReviews?.map((review, index) => (
                <motion.div
                  key={review?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-surface/30 p-6 rounded-lg border border-street"
                >
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={review?.avatar}
                        alt={review?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-foreground">{review?.name}</h4>
                          {review?.verified && (
                            <span className="bg-success/10 text-success text-xs px-2 py-1 rounded-full flex items-center">
                              <Icon name="ShieldCheck" size={12} className="mr-1" />
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            {renderStars(review?.rating)}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(review?.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="space-y-4">
                    <p className="text-foreground leading-relaxed">{review?.comment}</p>

                    {/* Purchase Details */}
                    {review?.purchaseDetails && (
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Size: {review?.purchaseDetails?.size}</span>
                        <span>Color: {review?.purchaseDetails?.color}</span>
                      </div>
                    )}

                    {/* Review Photos */}
                    {review?.photos && review?.photos?.length > 0 && (
                      <div className="flex space-x-2 overflow-x-auto">
                        {review?.photos?.map((photo, photoIndex) => (
                          <Image
                            key={photoIndex}
                            src={photo}
                            alt={`Review photo ${photoIndex + 1}`}
                            className="w-20 h-20 rounded-lg object-cover flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                          />
                        ))}
                      </div>
                    )}

                    {/* Review Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-street">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-sm">
                          <Icon name="ThumbsUp" size={14} className="mr-1" />
                          Helpful ({review?.helpful})
                        </Button>
                        <Button variant="ghost" size="sm" className="text-sm">
                          <Icon name="MessageCircle" size={14} className="mr-1" />
                          Reply
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-sm">
                        <Icon name="Flag" size={14} className="mr-1" />
                        Report
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No reviews found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or be the first to review this product.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Load More Button */}
      {filteredReviews?.length > 5 && (
        <div className="text-center">
          <Button variant="outline">
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;