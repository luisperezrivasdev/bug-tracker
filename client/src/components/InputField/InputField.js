import TextField from '@mui/material/TextField';
import { useField } from 'formik';

const InputField = ({ name, signInPasswordHelper = false, ...otherProps }) => {
  const [field, meta] = useField(name);

  const textFieldConfig = {
    ...field,
    ...otherProps,
  };

  if (meta.error && meta.touched) {
    textFieldConfig.error = true;
    textFieldConfig.helperText = meta.error;
  }

  if (meta.error && meta.touched && signInPasswordHelper) {
    textFieldConfig.helperText =
      meta.error === 'Please enter your password' ? meta.error : null;
  }

  return (
    <>
      <TextField {...textFieldConfig} />
    </>
  );
};

export default InputField;
