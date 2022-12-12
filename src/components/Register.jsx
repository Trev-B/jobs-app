import React from 'react';
import Form from './Form';
import { register } from '../api-wrapper/auth';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = (props) => {
  const { setLoggedIn } = props;
  const nav = useNavigate();
  const fields = [
    { name: 'Name', type: 'text', placeholder: 'John Doe', required: true },
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
    const res = await register(fieldArgs);
    if (!res) return;
    const { user, token } = res;
    localStorage.setItem('token', token);
    localStorage.setItem('user', user.name);
    setLoggedIn(true);
    nav('/jobs');
  };

  return (
    <div className='register-page'>
      <Form title='Register' fields={fields} onSubmit={onSubmit}></Form>
    </div>
  );
};

export default Register;
