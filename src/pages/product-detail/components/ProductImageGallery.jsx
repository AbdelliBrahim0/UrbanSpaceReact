import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductImageGallery = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [is360View, setIs360View] = useState(false);
  const [rotation, setRotation] = useState(0);
  const imageRef = useRef(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  const images = [
    product?.mainImage,
    ...product?.additionalImages
  ];

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsZoomed(false);
    setIs360View(false);
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
    setIs360View(false);
  };

  const handle360Toggle = () => {
    setIs360View(!is360View);
    setIsZoomed(false);
    setRotation(0);
  };

  const handleMouseMove = (e) => {
    if (isZoomed && imageRef?.current) {
      const rect = imageRef?.current?.getBoundingClientRect();
      const x = ((e?.clientX - rect?.left) / rect?.width) * 100;
      const y = ((e?.clientY - rect?.top) / rect?.height) * 100;
      setZoomPosition({ x, y });
    }
  };

  const handle360Drag = (e) => {
    if (is360View && isDragging?.current) {
      const deltaX = e?.clientX - lastX?.current;
      setRotation(prev => prev + deltaX * 0.5);
      lastX.current = e?.clientX;
    }
  };

  const start360Drag = (e) => {
    if (is360View) {
      isDragging.current = true;
      lastX.current = e?.clientX;
    }
  };

  const end360Drag = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    if (is360View) {
      document.addEventListener('mousemove', handle360Drag);
      document.addEventListener('mouseup', end360Drag);
      return () => {
        document.removeEventListener('mousemove', handle360Drag);
        document.removeEventListener('mouseup', end360Drag);
      };
    }
  }, [is360View]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images?.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images?.length) % images?.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-surface rounded-lg overflow-hidden group">
        <div 
          ref={imageRef}
          className={`relative h-96 lg:h-[600px] cursor-${isZoomed ? 'zoom-out' : is360View ? 'grab' : 'zoom-in'}`}
          onClick={!is360View ? handleZoomToggle : undefined}
          onMouseMove={handleMouseMove}
          onMouseDown={start360Drag}
          style={{
            transform: is360View ? `rotateY(${rotation}deg)` : 'none',
            transformStyle: 'preserve-3d'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Image
                src={images?.[currentImageIndex]}
                alt={`${product?.name} - View ${currentImageIndex + 1}`}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                style={{
                  transformOrigin: isZoomed ? `${zoomPosition?.x}% ${zoomPosition?.y}%` : 'center'
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10"
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10"
          >
            <Icon name="ChevronRight" size={20} />
          </Button>

          {/* View Controls */}
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant={isZoomed ? "default" : "ghost"}
              size="icon"
              onClick={handleZoomToggle}
              className="bg-background/80 hover:bg-background/90 w-10 h-10"
            >
              <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={18} />
            </Button>
            <Button
              variant={is360View ? "default" : "ghost"}
              size="icon"
              onClick={handle360Toggle}
              className="bg-background/80 hover:bg-background/90 w-10 h-10"
            >
              <Icon name="RotateCcw" size={18} />
            </Button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-background/80 px-3 py-1 rounded-full text-sm font-mono">
            {currentImageIndex + 1} / {images?.length}
          </div>
        </div>
      </div>
      {/* Thumbnail Gallery */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {images?.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => handleImageClick(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              currentImageIndex === index 
                ? 'border-accent shadow-lg scale-105' 
                : 'border-street hover:border-accent/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={image}
              alt={`${product?.name} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>
      {/* View Instructions */}
      {is360View && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-muted-foreground bg-surface/50 p-3 rounded-lg"
        >
          <Icon name="MousePointer2" size={16} className="inline mr-2" />
          Drag to rotate the product in 360°
        </motion.div>
      )}
    </div>
  );
};

export default ProductImageGallery;