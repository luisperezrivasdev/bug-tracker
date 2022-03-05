import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/users';

export const createUser = async user => {
  try {
    const res = await axios.post(baseUrl, user);
    return { user: res.data.user };
  } catch (err) {
    return {
      err: {
        message: err.response.data.error.message,
        field: err.response.data.error.field,
      },
    };
  }
};
