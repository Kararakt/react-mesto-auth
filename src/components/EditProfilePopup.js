import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { PopupWithForm } from './PopupWithForm';

export const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton="Сохранить"
    >
      <input
        type="text"
        name="title"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        required
        id="title"
        autoComplete="off"
        value={name || ''}
        onChange={handleNameChange}
        className="popup__input popup__input_type_title"
      />
      <span id="title-error" className="popup__input-error"></span>
      <input
        type="text"
        name="job"
        placeholder="Введите работу"
        minLength="2"
        maxLength="200"
        required
        id="job"
        autoComplete="off"
        value={description || ''}
        onChange={handleDescriptionChange}
        className="popup__input popup__input_type_job"
      />
      <span id="job-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
};
