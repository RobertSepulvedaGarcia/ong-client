import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FormLogin from '../Forms/FormLogin/FormLogin';
import { Helmet } from 'react-helmet';
export default function Login() {
  // const history = useHistory();
  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     history.push('/');
  //   }
  // });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Somos Más - Iniciar Sesión</title>
      </Helmet>
      <FormLogin />
    </>
  );
}
