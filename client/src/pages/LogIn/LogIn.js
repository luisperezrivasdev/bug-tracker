import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

// Components
import InputField from '../../components/InputField';

// Constants
import { LOG_IN_FORM_SCHEMA } from '../../constants/schemas';
import { LOG_IN_FORM_INITIAL_VALUES } from '../../constants/initialValues';

// Services
import { login } from '../../services/auth';

// Config
import { successToast } from '../../config/Toast';

const LogIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState({
    isError: false,
    message: '',
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
            Log In
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Formik
              initialValues={{ ...LOG_IN_FORM_INITIAL_VALUES }}
              validationSchema={LOG_IN_FORM_SCHEMA}
              onSubmit={async (values, { resetForm, setSubmitting }) => {
                const { user, err } = await login(values);

                if (user) {
                  setSubmitting(false);
                  resetForm();
                  navigate('/');
                }

                if (err && err.status === 401) {
                  setAuthError({
                    isError: true,
                    message: 'Invalid credentials',
                  });
                }
              }}
            >
              {({ values, isSubmitting }) => (
                <Form>
                  <InputField
                    type="text"
                    name="username"
                    label="Username"
                    autoComplete="off"
                    fullWidth
                    disabled={isSubmitting}
                    error={authError.isError}
                  />

                  <InputField
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    label="Password"
                    autoComplete="off"
                    fullWidth
                    disabled={isSubmitting}
                    error={authError.isError}
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

                  {authError.isError && (
                    <Alert
                      onClose={() =>
                        setAuthError({ isError: false, message: '' })
                      }
                      severity="error"
                      sx={{ mt: 2 }}
                    >
                      {authError.message}
                    </Alert>
                  )}

                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loadingPosition="end"
                    disableRipple
                    fullWidth
                    loading={isSubmitting}
                    endIcon={<ChevronRightIcon />}
                    sx={{
                      textTransform: 'none',
                      mt: authError.isError ? 2 : 4,
                    }}
                  >
                    Log In
                  </LoadingButton>
                </Form>
              )}
            </Formik>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2,
              }}
            >
              <Link component={RouterLink} to="/" variant="body2">
                Forgot password?
              </Link>
              <Link component={RouterLink} to="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LogIn;
