import React from 'react';
import { Card } from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div
            className="profile__image"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          >
            <button
              type="button"
              aria-label="Изменение аватара"
              className="profile__avatar-edit"
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__editor">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                aria-label="Изменение профиля"
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <h2 className="profile__job">{currentUser.about}</h2>
          </div>
        </div>
        <button
          type="button"
          aria-label="Добавление карточки"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__container">
          {cards.map((card) => {
            return (
              <li key={card._id} className="element">
                <Card
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};
