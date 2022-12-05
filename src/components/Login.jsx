import React from 'react';
import Form from './Form';
import { login } from '../api-wrapper/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = (props) => {
  const { setLoggedIn } = props;
  const nav = useNavigate();
  const fields = [
    { name: 'Email', type: 'email', placeholder: 'user@email.com' },
    { name: 'Password', type: 'password', placeholder: 'password' },
  ];

  const onSubmit = async (fieldArgs) => {
    const res = await login(fieldArgs);
    if (!res) return;
    const { user, token } = res;
    localStorage.setItem('token', token);
    localStorage.setItem('user', user.name);
    setLoggedIn(true);
    nav('/jobs');
  };

  return (
    <div className='login-page'>
      <Form title='Login' fields={fields} onSubmit={onSubmit}></Form>
    </div>
  );
};

export default Login;
