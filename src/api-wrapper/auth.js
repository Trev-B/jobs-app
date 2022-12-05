import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

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
    return null;
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
    return null;
  }
};

export { register, login };
