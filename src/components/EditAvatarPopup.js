import React, { useEffect, useRef } from 'react';
import { PopupWithForm } from './PopupWithForm';

export const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const avatar = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  };

  useEffect(() => {
    avatar.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton="Сохранить"
    >
      <input
        type="url"
        name="avatar"
        placeholder="Введите ссылку на картинку"
        id="avatar"
        required
        autoComplete="off"
        ref={avatar}
        className="popup__input popup__input_type_avatar"
      />
      <span id="avatar-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
};
