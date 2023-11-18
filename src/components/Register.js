import React from 'react';
import { Link } from 'react-router-dom';

import { authInputClass } from '../utils/constants';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

import { AuthForm } from './AuthForm';

export const Register = ({ onRegister }) => {
  const { values, handleChange, errors, isValid } = useFormAndValidation({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    onRegister({
      password: values.password,
      email: values.email,
    });
  };

  return (
    <main className="authentication">
      <h1 className="authentication__title">Регистрация</h1>
      <AuthForm
        name="register"
        textButton="Регистрация"
        onSubmit={handleSubmit}
        disabled={isValid}
      >
        <input
          value={values.email || ''}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          name="email"
          required
          autoComplete="off"
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
          minLength={5}
          maxLength={50}
          required
          autoComplete="off"
          className={
            authInputClass + ` ${errors.password && 'form__input_type_error'}`
          }
        />
        <span className="form__input-error">{errors.password}</span>
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
