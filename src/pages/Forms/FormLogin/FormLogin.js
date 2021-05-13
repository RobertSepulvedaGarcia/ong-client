import React, { useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ErrorAlert from '../../../components/Alerts/ErrorAlert';
import { Redirect } from 'react-router-dom';
import { getHttpRequest, postHttpRequest } from '../../../helper/axios';
import { useDispatch } from 'react-redux';
import { login } from '../../../components/user/userSlice';
import photoBg from '../../../assets/images/Foto-5.jpg';
import './FormLogin.css';

//Schema of validation of the values
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .max(255, 'Debe tener menos de 255 caracteres.')
    .email('Debe ser un email valido.')
    .required('Debe ingresar un email.'),
  password: Yup.string()
    .min(6, 'Debe tener minimo 6 caracteres.')
    .max(255, 'Debe tener menos de 255 caracteres.')
    .required('Debe ingresar una contraseña.'),
});

function FormLogin() {
  //Form to enter the data to make a request and login
  //The height is explicit in style because there is no configure any parents element with this height
  //and this fix the problem with Bootstrap

  //State to the messages to show
  const [setMessage] = useState();
  const [redirect, setRedirect] = useState();

  const dispatch = useDispatch();

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  //handle the petition to requestLogin, and set message to what is return
  const handleLogin = (user, setSubmitting) => {
    const { email, password } = user;
    postHttpRequest('/auth/login', { email, password })
      .then(res => {
        const { token } = res.data;
        window.localStorage.setItem('token', token);
        // save user Info in Redux
        getHttpRequest('/auth/me').then(res => {
          console.log(res.data);
          dispatch(login(res.data));
          setRedirect('/');
        });
      })
      .catch(error => {
        let errorMessage = 'Ha ocurrido un error al iniciar sesión.';
        if (error.response) {
          errorMessage = error.response.data.error || errorMessage;
        }
        setMessage(
          ErrorAlert({
            text: errorMessage,
          })
        );
        setSubmitting(false);
      });
  };

  return (
    <main class="page contact-us-page">
      <div className="row">
        <div className="col-sm-12 col-lg-6">
          <section
            className="clean-block clean-hero bg"
            style={{
              backgroundImage: `url(${photoBg})`,
              color: 'rgba(154,201,251, 0.85)',
              height: '100vh',
            }}
          ></section>
        </div>
        <div className="col-sm-12 col-lg-6">
          <section
            style={{
              paddingTop: '100px',
            }}
            class="clean-block clean-form"
          >
            <div class="container">
              <div class="block-heading">
                <h2 class="text-info"> Iniciar Sesión </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  quam urna
                </p>
              </div>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  // Disabled the submit button, and create a User object with the values.
                  setSubmitting(true);
                  handleLogin({ ...values }, setSubmitting);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit} className="text-left">
                    <div className="form-group">
                      <label for="email">Email:</label>
                      <input
                        type="text"
                        name="email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Ingrese Email"
                        className={
                          touched.email && errors.email
                            ? 'border border-danger form-control'
                            : touched.email
                            ? 'border border-success form-control'
                            : 'border form-control'
                        }
                      />
                      <ErrorMessage
                        component="div"
                        className="text-danger"
                        name="email"
                      />
                    </div>
                    <div className="form-group">
                      <label for="password">Contraseña:</label>
                      <input
                        type="password"
                        name="password"
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Ingrese Contraseña"
                        className={
                          touched.password && errors.password
                            ? 'border border-danger form-control'
                            : touched.password
                            ? 'border border-success form-control'
                            : 'border form-control'
                        }
                      />
                      <ErrorMessage
                        component="div"
                        className="text-danger"
                        name="password"
                      />
                    </div>

                    <div className="form-group text-center">
                      <button
                        type="submit"
                        className="btn custom__btn-forms"
                        style={{ background: '#9ac9fb' }}
                        disabled={isSubmitting}
                      >
                        Entrar
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default FormLogin;
