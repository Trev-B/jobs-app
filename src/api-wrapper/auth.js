import axios from 'axios';

const URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

const register = async (body) => {
  const parsedBody = {};

  for (let key in body) {
    if (!!body[key]) {
      parsedBody[key.toLowerCase()] = body[key];
    }
  }

  try {
    const res = await axios.post(`${URL}/auth/register`, parsedBody);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const login = async (body) => {
  const parsedBody = {};

  for (let key in body) {
    if (!!body[key]) {
      parsedBody[key.toLowerCase()] = body[key];
    }
  }

  try {
    const res = await axios.post(`${URL}/auth/login`, parsedBody);
    return res.data;
  } catch (error) {
    console.log(error);
    return { err: true, message: error.response.data.msg };
  }
};

const sendPasswordReset = async (body) => {
  const parsedBody = {};

  for (let key in body) {
    if (!!body[key]) {
      parsedBody[key.toLowerCase()] = body[key];
    }
  }

  try {
    const res = await axios.post(
      `${URL}/auth/requestPasswordReset`,
      parsedBody
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return { err: true, message: error.response.data.msg };
  }
};

const resetPassword = async (body) => {
  const parsedBody = {};

  for (let key in body) {
    if (!!body[key]) {
      parsedBody[key.toLowerCase()] = body[key];
    }
  }

  try {
    const res = await axios.post(`${URL}/auth/resetPassword`, parsedBody);
    return res.data;
  } catch (error) {
    console.log(error);
    return { err: true, message: error.response.data.msg };
  }
};

export { register, login, sendPasswordReset, resetPassword };
