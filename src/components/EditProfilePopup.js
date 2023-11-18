import React, { useEffect } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

import { PopupWithForm } from './PopupWithForm';

export const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  };

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [currentUser, resetForm, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton="Сохранить"
      disabled={!isValid}
    >
      <input
        type="text"
        name="name"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        required
        autoComplete="off"
        value={values.name || ''}
        onChange={handleChange}
        className={`form__input ${errors.name && 'form__input_type_error'}`}
      />
      <span className="form__input-error">{errors.name}</span>
      <input
        type="text"
        name="about"
        placeholder="Введите работу"
        minLength="2"
        maxLength="200"
        required
        autoComplete="off"
        value={values.about || ''}
        onChange={handleChange}
        className={`form__input ${errors.about && 'form__input_type_error'}`}
      />
      <span className="form__input-error">{errors.about}</span>
    </PopupWithForm>
  );
};
