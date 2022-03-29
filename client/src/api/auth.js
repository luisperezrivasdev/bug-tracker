import axios from 'axios';

import { errorToast } from '../config/Toast';

const baseUrl = 'http://localhost:5000/api/auth';

const me = async () => {
  try {
    const res = await axios.post(
      `${baseUrl}/me`,
      {},
      { withCredentials: true }
    );
    return res.data.user;
  } catch (err) {
    if (err.response) {
      const status = err.response.status;
      if (status === 500) errorToast('Internal server error');

      throw err.response;
    } else if (err.request) {
      errorToast('Error communicating with server');
      throw err.request;
    } else {
      errorToast('An unexpected error has occured');
      throw err;
    }
  }
};

const login = async user => {
  try {
    const res = await axios.post(`${baseUrl}/login`, user, {
      withCredentials: true,
    });
    return res.data.user;
  } catch (err) {
    if (err.response) {
      const status = err.response.status;
      if (status === 400) errorToast('Bad request');
      if (status === 500) errorToast('Internal server error');

      throw err.response;
    } else if (err.request) {
      errorToast('Error communicating with server');
      throw err.request;
    } else {
      errorToast('An unexpected error has occured');
      throw err;
    }
  }
};

const logout = async () => {
  try {
    await axios.post(
      `${baseUrl}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    if (err.response) {
      const status = err.response.status;
      if (status === 500) errorToast('Internal server error');

      throw err.response;
    } else if (err.request) {
      errorToast('Error communicating with server');
      throw err.request;
    } else {
      errorToast('An unexpected error has occured');
      throw err;
    }
  }
};

const authApi = { me, login, logout };

export default authApi;
