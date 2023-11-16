import React, { useState } from 'react';

import { AuthForm } from './AuthForm';

export const Login = ({ onLogin }) => {
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

    onLogin({ password, email: userName });
  };

  return (
    <main className="authentication">
      <h1 className="authentication__title">Вход</h1>
      <AuthForm name="register" textButton="Войти" onSubmit={handleSubmit}>
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
    </main>
  );
};
