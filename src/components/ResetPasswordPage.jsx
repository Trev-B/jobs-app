import React, { useState } from 'react';
import './ResetPasswordPage.css';
import Form from './Form';
import { sendPasswordReset } from '../api-wrapper/auth';

const ResetPasswordPage = () => {
  const [sentEmail, setSentEmail] = useState(false);
  const fields = [
    {
      name: 'Email',
      type: 'email',
      placeholder: 'user@email.com',
      required: true,
    },
  ];

  const onSubmit = async (fieldArgs) => {
    const res = await sendPasswordReset(fieldArgs);
    if (res.sent) {
      setSentEmail(true);
    }
  };

  return (
    <div className='reset-password-ctn'>
      <Form title='Send Email' fields={fields} onSubmit={onSubmit}></Form>
      {!sentEmail ? (
        <></>
      ) : (
        <div className='email-confirmation'>
          If that email is in use, an email was sent to reset your password.
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
