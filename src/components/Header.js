import logo from '../images/logo.svg';

import { NavLink, useLocation } from 'react-router-dom';

export const Header = ({ loggedIn, email, onSignOut }) => {
  const history = useLocation();

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
          <p className="header__email">{email}</p>
          <button
            type="button"
            className="header__sign-out"
            onClick={onSignOut}
          >
            Выйти
          </button>
        </>
      )}
    </header>
  );
};
