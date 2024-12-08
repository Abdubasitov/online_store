import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { loginUser } from '../../Store/redusers/user/user';

const Login = () => {
  const { register, handleSubmit } = useForm({ mode: 'onBlur' });
  const { status } = useSelector((s) => s.user);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false); // Состояние для управления видимостью пароля

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Меняем состояние
  };

  const submitForm = (data) => {
    dispatch(loginUser(data));
  };

  if (status === 'success') {
    return <Navigate to="/" />;
  }

  return (
    <section className="register">
      <div className="container">
        <form className="register__form" onSubmit={handleSubmit(submitForm)}>
          <h1 className="register__title">Вход в аккаунт</h1>

          <input
            {...register('email')}
            placeholder="Эл.почта"
            type="email"
          />

          <div className="register__block">
            <input
              {...register('password')}
              placeholder="Пароль"
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

          <button type="submit">Войти</button>
        </form>
        <NavLink to="/register">
          <h5 className="register__signup-link">Зарегистрироваться</h5>
        </NavLink>
      </div>
      <Outlet />
    </section>
  );
};

export default Login;
