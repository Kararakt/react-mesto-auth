import React, { useState } from 'react';

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
    <div className="authentication">
      <h1 className="authentication__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="authentication__form">
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
        <button type="submit" className="authentication__button">
          Регистрация
        </button>
      </form>
    </div>
  );
};
