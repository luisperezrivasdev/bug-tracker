import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

// Components
import InputField from '../../components/InputField';
import PasswordHelperText from '../../components/PasswordHelperText';

// Constants
import { SIGN_UP_FORM_SCHEMA } from '../../constants/schemas';
import { SIGN_UP_FORM_INITIAL_VALUES } from '../../constants/initialValues';

// Services
import { createUser } from '../../services/usersService';

// Config
import { successToast } from '../../config/Toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [fieldError, setFieldError] = useState({
    message: '',
    field: '',
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Container maxWidth="xs" component="main">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ mt: 10 }}
        >
          <Box display="flex" alignItems="center">
            <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>
              <BugReportOutlinedIcon />
            </Avatar>
            <Typography
              component="span"
              variant="h6"
              sx={{
                fontWeight: 'fontWeightRegular',
                color: 'text.secondary',
              }}
            >
              Bug Tracker
            </Typography>
          </Box>

          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: 'fontWeightMedium', mt: 6 }}
          >
            Sign Up
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Formik
              initialValues={{ ...SIGN_UP_FORM_INITIAL_VALUES }}
              validationSchema={SIGN_UP_FORM_SCHEMA}
              onSubmit={async (values, { resetForm, setSubmitting }) => {
                const { user, err } = await createUser(values);

                if (user) {
                  successToast(`User ${user.username} created successfully`);
                  setSubmitting(false);
                  resetForm();
                  navigate('/login');
                }

                if (err && err.status === 409) {
                  setFieldError({
                    message: err.message,
                    field: err.message.split(' ')[0],
                  });
                }
              }}
            >
              {({ values, errors, isSubmitting, handleSubmit }) => (
                <Form>
                  <Grid container columnSpacing={2}>
                    <Grid item xs={6}>
                      <InputField
                        type="text"
                        name="firstName"
                        label="First Name"
                        autoComplete="off"
                        disabled={isSubmitting}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <InputField
                        type="text"
                        name="lastName"
                        label="Last Name"
                        autoComplete="off"
                        disabled={isSubmitting}
                      />
                    </Grid>
                  </Grid>

                  <InputField
                    type="text"
                    name="email"
                    label="Email"
                    autoComplete="off"
                    fullWidth
                    disabled={isSubmitting}
                    error={fieldError.field === 'Email' ? true : false}
                    sx={{ mt: 2 }}
                  />

                  {fieldError && fieldError.field === 'Email' && (
                    <Alert
                      onClose={() => setFieldError({ message: '', field: '' })}
                      severity="error"
                    >
                      {fieldError.message}
                    </Alert>
                  )}

                  <InputField
                    type="text"
                    name="username"
                    label="Username"
                    autoComplete="off"
                    fullWidth
                    disabled={isSubmitting}
                    error={fieldError.field === 'Username' ? true : false}
                    sx={{ mt: 2 }}
                  />

                  {fieldError && fieldError.field === 'Username' && (
                    <Alert
                      onClose={() => setFieldError({ message: '', field: '' })}
                      severity="error"
                    >
                      {fieldError.message}
                    </Alert>
                  )}

                  <InputField
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    label="Password"
                    autoComplete="off"
                    signInPasswordHelper={true}
                    fullWidth
                    disabled={isSubmitting}
                    sx={{ mt: 2 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          onClick={handleShowPassword}
                        >
                          <Tooltip
                            title={`${showPassword ? 'Hide' : 'Show'} password`}
                            placement="top"
                            arrow
                          >
                            <IconButton
                              edge="end"
                              size="small"
                              disabled={isSubmitting}
                              onClick={() =>
                                values.password
                                  ? document.getElementById('password').focus()
                                  : null
                              }
                            >
                              {showPassword ? (
                                <VisibilityOutlinedIcon fontSize="small" />
                              ) : (
                                <VisibilityOffOutlinedIcon fontSize="small" />
                              )}
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Box sx={{ ml: 1.75 }}>
                    {values.password && errors.password && (
                      <PasswordHelperText password={values.password} />
                    )}
                  </Box>

                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loadingPosition="end"
                    disableRipple
                    fullWidth
                    loading={isSubmitting}
                    endIcon={<ChevronRightIcon />}
                    sx={{ textTransform: 'none', mt: 4 }}
                    onClick={() => {
                      setFieldError({ message: '', field: '' });
                      handleSubmit();
                    }}
                  >
                    Sign Up
                  </LoadingButton>
                </Form>
              )}
            </Formik>

            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Log In
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
