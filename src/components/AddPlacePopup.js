import React, { useEffect } from 'react';

import { useFormAndValidation } from '../hooks/useFormAndValidation';

import { PopupWithForm } from './PopupWithForm';

export const AddPlacePopup = ({ isOpen, onClose, onPlaceAdd }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (event) => {
    event.preventDefault();

    onPlaceAdd({
      name: values.name,
      link: values.link,
    });
  };

  useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-element"
      isOpen={isOpen}
      onClose={onClose}
      textButton="Создать"
      onSubmit={handleSubmit}
      disabled={!isValid}
    >
      <input
        type="text"
        name="name"
        placeholder="Введите название картинки"
        minLength="2"
        maxLength="30"
        autoComplete="off"
        required
        value={values.name || ''}
        onChange={handleChange}
        className="form__input"
      />
      <span className="form__input-error">{errors.name}</span>
      <input
        type="url"
        name="link"
        placeholder="Введите ссылку на картинку"
        required
        autoComplete="off"
        value={values.link || ''}
        onChange={handleChange}
        className="form__input"
      />
      <span className="form__input-error">{errors.link}</span>
    </PopupWithForm>
  );
};
