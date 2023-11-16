import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthForm } from './AuthForm';

export const Register = ({ onRegister }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeName = (event) => {
    setUserName(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    onRegister({
      password,
      email: userName,
    });
  };

  return (
    <main className="authentication">
      <h1 className="authentication__title">Регистрация</h1>
      <AuthForm
        name="register"
        textButton="Регистрация"
        onSubmit={handleSubmit}
      >
        <input
          value={userName}
          onChange={handleChangeName}
          placeholder="Email"
          type="email"
          required
          className="authentication__input"
        />
        <input
          value={password}
          onChange={handleChangePassword}
          placeholder="Пароль"
          type="password"
          required
          className="authentication__input"
        />
      </AuthForm>
      <p className="authentication__caption">
        Уже зарегистрированы?{' '}
        <Link to="/sign-in" className="authentication__link">
          Войти
        </Link>
      </p>
    </main>
  );
};
