import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';

const Dialog = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  onConfirm, 
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  showCancel = true,
  showConfirm = true,
  isLoading = false
}) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const variants = {
    initial: { opacity: 0, y: -50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 50, scale: 0.9 },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto pt-10 pb-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Main container */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="relative w-full max-w-3xl bg-surface rounded-lg shadow-xl border border-[#00ffc3]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex-shrink-0 px-4 sm:px-6 pt-4 pb-2 flex justify-between items-center border-b border-street">
                <h3 className="text-xl font-bold text-foreground" id="modal-title">
                  {title}
                </h3>
                <button
                  type="button"
                  className="p-2 -mr-2 text-muted-foreground hover:text-foreground focus:outline-none rounded-full hover:bg-surface transition-colors"
                  onClick={onClose}
                >
                  <Icon name="X" size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-grow px-4 sm:px-6 py-4">
                {children}
              </div>

              {/* Footer with buttons */}
              {(showConfirm || showCancel) && (
                <div className="flex-shrink-0 bg-surface/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-street">
                  {showConfirm && (
                    <button
                      type="button"
                      className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-accent text-base font-medium text-accent-foreground hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:ml-3 sm:w-auto sm:text-sm transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      onClick={onConfirm}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {confirmText}
                        </>
                      ) : (
                        confirmText
                      )}
                    </button>
                  )}
                  {showCancel && (
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-muted-foreground/20 shadow-sm px-4 py-2 bg-card text-base font-medium text-foreground hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                      onClick={onClose}
                      disabled={isLoading}
                    >
                      {cancelText}
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dialog;