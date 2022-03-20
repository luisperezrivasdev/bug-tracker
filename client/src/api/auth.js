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
    return { user: res.data.user, err: null };
  } catch (err) {
    if (err.response) {
      const status = err.response.status;
      const message = err.response.data.error.message;

      if (status === 500) errorToast('Internal server error');

      return {
        user: null,
        err: {
          status,
          message,
        },
      };
    } else if (err.request) {
      errorToast('Error communicating with server');
      return {
        user: null,
        err: null,
      };
    } else {
      errorToast('An unexpected error has occured');
      return {
        user: null,
        err: null,
      };
    }
  }
};

const login = async user => {
  try {
    const res = await axios.post(`${baseUrl}/login`, user, {
      withCredentials: true,
    });
    return { user: res.data.user, err: null };
  } catch (err) {
    if (err.response) {
      const status = err.response.status;
      const message = err.response.data.error.message;

      if (status === 400) errorToast('Bad request');
      if (status === 500) errorToast('Internal server error');

      return {
        user: null,
        err: {
          status,
          message,
        },
      };
    } else if (err.request) {
      errorToast('Error communicating with server');
      return {
        user: null,
        err: null,
      };
    } else {
      errorToast('An unexpected error has occured');
      return {
        user: null,
        err: null,
      };
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
    return { err: null };
  } catch (err) {
    if (err.response) {
      const status = err.response.status;
      const message = err.response.data.error.message;

      if (status === 500) errorToast('Internal server error');

      return {
        err: {
          status,
          message,
        },
      };
    } else if (err.request) {
      errorToast('Error communicating with server');
      return {
        err: null,
      };
    } else {
      errorToast('An unexpected error has occured');
      return {
        err: null,
      };
    }
  }
};

const authApi = { me, login, logout };

export default authApi;
