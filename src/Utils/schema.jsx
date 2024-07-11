import * as Yup from 'yup';
export const LoginSchema = Yup.object().shape({
  username: Yup.string().username('Invalid username').required('Required'),
  password: Yup.string().min(4, 'Too Short!').required('Required')
});