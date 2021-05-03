import * as Yup from 'yup';

const validations = Yup.object().shape({
  name: Yup.string().required('No name was provided'),
  description: Yup.string().required('No description was provided'),
});

export { validations };
