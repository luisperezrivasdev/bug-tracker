import axios from 'axios';

import { errorToast } from '../config/Toast';

const baseUrl = 'http://localhost:5000/api/users';

export const createUser = async user => {
  try {
    const res = await axios.post(baseUrl, user);
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
