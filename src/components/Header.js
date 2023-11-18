import logo from '../images/logo.svg';

import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';

export const Header = ({ loggedIn, email, onSignOut }) => {
  const [active, setActive] = useState(false);

  const menu = useRef();
  const btnMenu = useRef();

  const handleCloseMenu = () => {
    setActive(!active);
  };

  const history = useLocation();

  const handleCloseByOverlay = useCallback(
    (event) => {
      if (
        event.target !== menu.current &&
        event.target !== btnMenu.current &&
        active === true
      ) {
        setActive(false);
      }
    },
    [active]
  );

  useEffect(() => {
    document.addEventListener('click', handleCloseByOverlay);

    return () => {
      document.removeEventListener('click', handleCloseByOverlay);
    };
  }, [handleCloseByOverlay]);

  useEffect(() => {
    if (active) {
      document.body.classList.add('page__scroll');
    } else {
      document.body.classList.remove('page__scroll');
    }
  }, [active]);
  return (
    <header className="header">
      <img src={logo} alt="Лого Место Россия" className="header__logo" />
      {history.pathname === '/sign-up' && (
        <NavLink to="/sign-in" className="header__link">
          Войти
        </NavLink>
      )}
      {history.pathname === '/sign-in' && (
        <NavLink to="/sign-up" className="header__link">
          Регистрация
        </NavLink>
      )}
      {loggedIn && (
        <>
          <div
            className={`header__menu ${active && 'header__menu_active'}`}
            ref={menu}
          >
            <p className="header__email">{email}</p>
            <button
              type="button"
              className="header__sign-out"
              onClick={onSignOut}
            >
              Выйти
            </button>
          </div>
          <div
            onClick={handleCloseMenu}
            ref={btnMenu}
            className={`header__icon ${active && 'header__icon_active'}`}
          ></div>
        </>
      )}
    </header>
  );
};
