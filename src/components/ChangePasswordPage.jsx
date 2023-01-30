import React, { useEffect, useState } from 'react';
import './ChangePasswordPage.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../api-wrapper/auth';
import Form from './Form';

const ChangePasswordPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expiredLink, setExpiredLink] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const id = searchParams.get('id');
    const token = searchParams.get('token');
    if (!id || !token) {
      setExpiredLink(true);
    }
  }, []);

  const fields = [
    {
      name: 'New Password',
      type: 'password',
      placeholder: 'password',
      required: true,
    },
  ];

  const onSubmit = async (fieldArgs) => {
    const id = searchParams.get('id');
    const token = searchParams.get('token');
    const password = fieldArgs['New Password'];
    const res = await resetPassword({ password, id, token });
    if (res.sent) {
      nav('/login');
    } else {
      setExpiredLink(true);
    }
  };

  return (
    <div className='change-password-ctn'>
      {!expiredLink ? (
        <Form
          title='Update Password'
          fields={fields}
          onSubmit={onSubmit}
        ></Form>
      ) : (
        <div>This link is no longer valid.</div>
      )}
    </div>
  );
};

export default ChangePasswordPage;
