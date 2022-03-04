import * as Yup from 'yup';

export const SIGN_UP_FORM_SCHEMA = Yup.object().shape({
  firstName: Yup.string()
    .required('Please enter your first name')
    .trim()
    .matches(
      /^(?!.*['-,.]{2})[\W'-]*[^0-9_!¡÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]*$/,
      'Invalid name characters'
    )
    .max(256),
  lastName: Yup.string()
    .required('Please enter your last name')
    .trim()
    .matches(
      /^(?!.*['-]{2})[\W'-]*[^0-9_!¡÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]*$/,
      'Invalid name characters'
    )
    .max(256),
  email: Yup.string()
    .required('Please enter your email')
    .email('Invalid email'),
  username: Yup.string()
    .required('Please enter your username')
    .max(16, 'At most 16 characters long')
    .matches(
      /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Invalid username'
    ),
  password: Yup.string()
    .required('Please enter your password')
    .min(8)
    .max(64)
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).*$/),
});
