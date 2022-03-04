import * as Yup from 'yup';

export const LOG_IN_FORM_SCHEMA = Yup.object().shape({
  username: Yup.string().required('Please enter your username'),
  password: Yup.string().required('Please enter your password'),
});
