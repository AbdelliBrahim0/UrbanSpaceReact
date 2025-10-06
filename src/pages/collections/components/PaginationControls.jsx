import React from 'react';
import Button from '../../../components/ui/Button';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Précédent
      </Button>
      
      <span className="text-sm font-medium text-foreground px-4">
        Page {currentPage} sur {totalPages}
      </span>

      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Suivant
      </Button>
    </div>
  );
};

export default PaginationControls;
