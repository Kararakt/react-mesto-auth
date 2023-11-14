import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleCardLike = () => {
    onCardLike(card);
  };

  const handleCardDelete = () => {
    onCardDelete(card);
  };

  return (
    <>
      {isOwn && (
        <button
          type="button"
          aria-label="Удалить"
          className="element__delete"
          onClick={handleCardDelete}
        ></button>
      )}
      <img
        src={card.link}
        alt={`Фото ${card.name}`}
        onClick={handleCardClick}
        className="element__image"
      />
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-info">
          <button
            type="button"
            aria-label="Сердце"
            className={`element__heart ${
              isLiked ? 'element__heart_active' : ''
            }`}
            onClick={handleCardLike}
          ></button>
          <span className="element__count">{card.likes.length}</span>
        </div>
      </div>
    </>
  );
};
