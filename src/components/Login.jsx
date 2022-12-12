import React, { useRef } from 'react';
import Form from './Form';
import { login } from '../api-wrapper/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = (props) => {
  const { setLoggedIn } = props;
  const nav = useNavigate();
  const errorMessage = useRef(null);
  const fields = [
    {
      name: 'Email',
      type: 'email',
      placeholder: 'user@email.com',
      required: true,
    },
    {
      name: 'Password',
      type: 'password',
      placeholder: 'password',
      required: true,
    },
  ];

  const onSubmit = async (fieldArgs) => {
    const res = await login(fieldArgs);
    if (res.err) {
      errorMessage.current.innerHTML = res.message;
      return;
    }
    errorMessage.current.innerHTML = '';
    const { user, token } = res;
    localStorage.setItem('token', token);
    localStorage.setItem('user', user.name);
    setLoggedIn(true);
    nav('/jobs');
  };

  return (
    <div className='login-page'>
      <Form title='Login' fields={fields} onSubmit={onSubmit}></Form>
      <div className='login-error-message' ref={errorMessage}></div>
    </div>
  );
};

export default Login;
