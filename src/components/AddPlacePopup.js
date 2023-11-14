import React, { useEffect, useState } from 'react';
import { PopupWithForm } from './PopupWithForm';

export const AddPlacePopup = ({ isOpen, onClose, onPlaceAdd }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    onPlaceAdd({
      name,
      link,
    });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-element"
      isOpen={isOpen}
      onClose={onClose}
      textButton="Создать"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Введите название картинки"
        minLength="2"
        maxLength="30"
        autoComplete="off"
        required
        id="name"
        value={name}
        onChange={handleNameChange}
        className="popup__input popup__input_type_name"
      />
      <span id="name-error" className="popup__input-error"></span>
      <input
        type="url"
        name="link"
        placeholder="Введите ссылку на картинку"
        id="link"
        required
        autoComplete="off"
        value={link}
        onChange={handleLinkChange}
        className="popup__input popup__input_type_link"
      />
      <span id="link-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
};
