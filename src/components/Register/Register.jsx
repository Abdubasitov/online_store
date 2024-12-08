import React, { useState } from 'react';
import './Register.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Store/redusers/user/user';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const { user, status, error } = useSelector((s) => s.user);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false); // Состояние для управления видимостью основного пароля
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Состояние для управления видимостью подтверждения пароля

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Меняем состояние основного пароля
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev); // Меняем состояние подтверждения пароля
  };

  const submitForm = (data) => {
    const { confirmPassword, ...other } = data;
    dispatch(registerUser(other));
  };

  if (status === 'success') {
    return <Navigate to="/" />;
  }

  return (
    <section className="register">
      <div className="container">
        <form className="register__form" onSubmit={handleSubmit(submitForm)}>
          <h1 className="register__title">Регистрация</h1>

          <input {...register('email')} placeholder="Эл.почта" type="email" />
          <input {...register('name')} placeholder="Имя" type="text" />
          <input {...register('age')} placeholder="Ваш возраст" type="number" />

          <div className="register__block">
            <input
              {...register('password')}
              placeholder="Придумайте пароль"
              type={showPassword ? 'text' : 'password'} // Меняем тип в зависимости от состояния
            />
            <span
              className="register__eye"
              onClick={togglePasswordVisibility} // Клик для смены состояния
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'} {/* Отображаем нужный символ */}
            </span>
          </div>

          <div className="register__block">
            <input
              {...register('confirmPassword')}
              placeholder="Повторите пароль"
              type={showConfirmPassword ? 'text' : 'password'} // Меняем тип в зависимости от состояния
            />
            <span
              className="register__eye"
              onClick={toggleConfirmPasswordVisibility} // Клик для смены состояния
              style={{ cursor: 'pointer' }}
            >
              {showConfirmPassword ? '👁️' : '👁️‍🗨️'} {/* Отображаем нужный символ */}
            </span>
          </div>

          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
