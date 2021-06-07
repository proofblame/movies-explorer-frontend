import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

import logo from '../../images/logo.svg';
import Form from '../Form/Form';
import CallbackValidation from '../../helpers/CallbackValidation';

function Login({ handleLogin, loginError }) {
  const formCallbackValidation = CallbackValidation();
  const { email, password } = formCallbackValidation.values;

  const submitHandle = (event) => {
    event.preventDefault();
    handleLogin(email, password);
    formCallbackValidation.resetForm();
  };

  return (
    <section className='login'>
      <div className='login__container'>
        <Link to='/'>
          <img className='login__logo' src={logo} alt='Логотип' />
        </Link>
        <h1 className='login__title'>Рады видеть!</h1>
        <Form
          submitText={{
            buttonText: 'Войти',
            promt: 'Ещё не зарегистрированы?',
            route: '/signup',
            linkText: 'Регистрация',
          }}
          submitHandle={submitHandle}
          validation={formCallbackValidation}
          formName='login'
          loginError={loginError}
        />
      </div>
    </section>
  );
}

export default Login;
