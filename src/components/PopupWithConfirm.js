import React from 'react';
import { PopupWithForm } from './PopupWithForm';

export const PopupWithConfirm = ({ isOpen, onClose, onCardDelete, card }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    onCardDelete(card);
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      textButton="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};  
