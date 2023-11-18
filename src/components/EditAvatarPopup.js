import React, { useEffect } from 'react';

import { useFormAndValidation } from '../hooks/useFormAndValidation';

import { PopupWithForm } from './PopupWithForm';

export const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateAvatar({
      avatar: values.avatar,
    });
  };

  useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton="Сохранить"
      disabled={!isValid}
    >
      <input
        type="url"
        name="avatar"
        placeholder="Введите ссылку на картинку"
        required
        autoComplete="off"
        value={values.avatar || ''}
        onChange={handleChange}
        className={`form__input ${errors.avatar && 'form__input_type_error'}`}
      />
      <span className="form__input-error">{errors.avatar}</span>
    </PopupWithForm>
  );
};
