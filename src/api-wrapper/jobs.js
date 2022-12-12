import axios from 'axios';
import FileSaver from 'js-file-download';

const URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

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
    return { err: true, message: error.response.data.msg };
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

const downloadUserJobs = async (token) => {
  try {
    const res = await axios.get(`${URL}/jobs/download`, {
      responseType: 'blob',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const fileName = `${localStorage.getItem('user')}-Jobs.xlsx`;
    FileSaver(res.data, fileName);
  } catch (error) {
    console.log(error);
  }
};

export { getAllUserJobs, createJob, updateJob, deleteJob, downloadUserJobs };
