import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

const getAllUserJobs = async (token) => {
  try {
    const res = await axios.get(`${URL}/jobs`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createJob = async (body, token) => {
  const parsedBody = {};

  for (let key in body) {
    if (!!body[key]) {
      parsedBody[key.toLowerCase()] = body[key];
    }
  }
  console.log(parsedBody);
  try {
    const res = await axios.post(`${URL}/jobs`, parsedBody, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateJob = async (id, body, token) => {
  try {
    const res = await axios.patch(`${URL}/jobs/${id}`, body, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteJob = async (id, token) => {
  try {
    await axios.delete(`${URL}/jobs/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { getAllUserJobs, createJob, updateJob, deleteJob };
