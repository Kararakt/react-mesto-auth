import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import { api } from '../utils/api';
import * as auth from '../utils/auth';

import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { ImagePopup } from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { PopupWithConfirm } from './PopupWithConfirm';
import { AddPlacePopup } from './AddPlacePopup';
import { InfoTooltip } from './InfoTooltip';
import { ProtectedRoute } from './ProtectedRoute';
import { Login } from './Login';
import { Register } from './Register';

export const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isTollTipPopupOpen, setIsTollTipPopupOpen] = useState(null);

  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardDelete, setSelectedCardDelete] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardDeleteClick = (card) => {
    setIsConfirmPopupOpen(true);
    setSelectedCardDelete(card);
  };

  const handleSelectedCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsTollTipPopupOpen(false);
    setSelectedCard(null);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error('Ошибка постановки лайка', err);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.error('Ошибка удаление карточки', err);
      });
  };

  const handleUpdateUser = (user) => {
    api
      .editUserProfile(user.name, user.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error('Ошибка изменения данных пользователя', err);
      });
  };

  const handleUpdateAvatar = (user) => {
    api
      .editUserAvatar(user.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error('Ошибка обновления аватара', err);
      });
  };

  const handleAddPlace = (card) => {
    api
      .addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error('Ошибка добавления новой карточки', err);
      });
  };

  const authCheck = async (jwt) => {
    return auth
      .getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
        }
      })
      .catch((err) => console.error('Ошибка проверки токена', err));
  };

  const onLogin = ({ password, email }) => {
    return auth
      .authorize(password, email)
      .then((res) => {
        if (!res) throw new Error('Неправильные имя пользователя или пароль');

        if (res) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          setEmail(email);
          navigate('/');
        }
      })
      .catch((err) => {
        setIsTollTipPopupOpen(true);
        setMessage(false);
        console.error('Ошибка входа', err);
      });
  };

  const onRegister = ({ password, email }) => {
    return auth
      .register(password, email)
      .then((res) => {
        if (!res || res.statusCode === 400)
          throw new Error('Что-то пошло не так');

        if (res) {
          setIsTollTipPopupOpen(true);
          setMessage(true);
          navigate('/sign-in');
        }
      })
      .catch((err) => {
        setIsTollTipPopupOpen(true);
        setMessage(false);
        console.error('Ошибка регистрации', err);
      });
  };

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in');
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      authCheck(jwt);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) navigate('/');
  }, [loggedIn, navigate]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.error('Ошибка получения данных пользователя или карточек', err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} email={email} onSignOut={onSignOut} />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleSelectedCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDeleteClick}
              cards={cards}
            />
          }
        />
        <Route path="/sign-in" element={<Login onLogin={onLogin} />} />

        <Route path="/sign-up" element={<Register onRegister={onRegister} />} />

        <Route
          path="*"
          element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
        />
      </Routes>

      {loggedIn && <Footer />}

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onPlaceAdd={handleAddPlace}
      />

      <PopupWithConfirm
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onCardDelete={handleCardDelete}
        card={selectedCardDelete}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <InfoTooltip
        name="tool-tip"
        isOpen={isTollTipPopupOpen}
        onClose={closeAllPopups}
        message={message}
      />
    </CurrentUserContext.Provider>
  );
};
