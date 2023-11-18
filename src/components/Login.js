import React from 'react';

import { authInputClass } from '../utils/constants';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

import { AuthForm } from './AuthForm';

export const Login = ({ onLogin }) => {
  const { values, handleChange, errors, isValid } = useFormAndValidation({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    onLogin({ password: values.password, email: values.email });
  };

  return (
    <main className="authentication">
      <h1 className="authentication__title">Вход</h1>
      <AuthForm
        name="register"
        textButton="Войти"
        disabled={isValid}
        onSubmit={handleSubmit}
      >
        <input
          value={values.email || ''}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          name="email"
          minLength={10}
          maxLength={50}
          autoComplete="off"
          required
          className={
            authInputClass + ` ${errors.email && 'form__input_type_error'}`
          }
        />
        <span className="form__input-error">{errors.email}</span>
        <input
          value={values.password || ''}
          onChange={handleChange}
          placeholder="Пароль"
          type="password"
          name="password"
          minLength={6}
          maxLength={40}
          autoComplete="off"
          required
          className={
            authInputClass + ` ${errors.password && 'form__input_type_error'}`
          }
        />
        <span className="form__input-error">{errors.password}</span>
      </AuthForm>
    </main>
  );
};
