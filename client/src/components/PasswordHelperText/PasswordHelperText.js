import FormHelperText from '@mui/material/FormHelperText';

const PasswordHelperText = ({ password }) => {
  return (
    <>
      {[
        /^(?=.*[A-Z]).*$/.test(password) ? (
          <FormHelperText key="uppercase" sx={{ color: 'success.main' }}>
            - At least 1 uppercase
          </FormHelperText>
        ) : (
          <FormHelperText key="uppercase" sx={{ color: 'error.main' }}>
            - At least 1 uppercase
          </FormHelperText>
        ),
        /^(?=.*[a-z]).*$/.test(password) ? (
          <FormHelperText key="lowercase" sx={{ color: 'success.main' }}>
            - At least 1 lowercase
          </FormHelperText>
        ) : (
          <FormHelperText key="lowercase" sx={{ color: 'error.main' }}>
            - At least 1 lowercase
          </FormHelperText>
        ),
        /^(?=.*[0-9]).*$/.test(password) ? (
          <FormHelperText key="digit" sx={{ color: 'success.main' }}>
            - At least 1 digit
          </FormHelperText>
        ) : (
          <FormHelperText key="digit" sx={{ color: 'error.main' }}>
            - At least 1 digit
          </FormHelperText>
        ),
        /^(?=.*\W).*$/.test(password) ? (
          <FormHelperText key="special" sx={{ color: 'success.main' }}>
            - At least 1 special character
          </FormHelperText>
        ) : (
          <FormHelperText key="special" sx={{ color: 'error.main' }}>
            - At least 1 special character
          </FormHelperText>
        ),
        password.length >= 8 ? (
          <FormHelperText key="min" sx={{ color: 'success.main' }}>
            - At least 8 characters long
          </FormHelperText>
        ) : (
          <FormHelperText key="min" sx={{ color: 'error.main' }}>
            - At least 8 characters long
          </FormHelperText>
        ),
        password.length > 64 ? (
          <FormHelperText key="max" sx={{ color: 'error.main' }}>
            - At most 64 characters long
          </FormHelperText>
        ) : null,
      ]}
    </>
  );
};

export default PasswordHelperText;
