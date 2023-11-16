import { useEffect } from 'react';

export const useClosePopupByEsc = (isOpen, onClose) => {
  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);

      return () => document.removeEventListener('keydown', handleEscClose);
    }
  }, [isOpen, onClose]);
};
