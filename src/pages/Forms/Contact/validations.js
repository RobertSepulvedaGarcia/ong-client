import * as Yup from 'yup';

export const validation = Yup.object().shape({
  name: Yup.string().required('Name required'),
  email: Yup.string().email('Invalid email').required('Email required'),
  message: Yup.string().required('Message required'),
});
