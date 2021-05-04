import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { validation } from './validations';
import { useHistory } from 'react-router';
import CustomTextInput from './CustomTextInput';
import { Helmet } from 'react-helmet';
import photoBg from '../../../assets/images/Foto-7.jpg';
import './Contact.css';
import ErrorAlert from '../../../components/Alerts/ErrorAlert';
import { postHttpRequest } from '../../../helper/axios';

function Contact() {
  const history = useHistory();
  const [message, setMessage] = useState('');

  const createContact = async ({ name, email, phone, message }) => {
    try {
      const res = await postHttpRequest(`/contacts`, {
        name,
        email,
        phone,
        message,
      });
      console.log(res);
      history.push('/');
    } catch (error) {
      setMessage(
        ErrorAlert({
          title: 'Ocurrio un error',
          text: error.message,
        })
      );
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Somos Más - Contacto</title>
      </Helmet>
      <Formik
        initialValues={{ name: '', email: '', phone: '', message: '' }}
        validationSchema={validation}
        onSubmit={values => createContact(values)}
      >
        <div className="page">
          <span>{message}</span>
          <div className="row">
            <div
              className="col-sm-12 col-lg-6 clean-block clean-hero bg"
              style={{
                backgroundImage: `url(${photoBg})`,
                color: 'rgba(250, 250, 136, 0.85)',
              }}
            >
              <div className="text mx-sm-5">
                <h1 className="display-2 welcome-text">Contact Us</h1>
                <p className="text-justify welcome-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                  molestiae unde reprehenderit maiores natus alias, blanditiis
                  necessitatibus molestias maxime placeat neque, explicabo
                  assumenda at nulla distinctio itaque tempora modi. Vitae.
                </p>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6">
              <section
                style={{
                  paddingTop: '150px',
                }}
                className="clean-block clean-form"
              >
                <h2 className="text-info">Contact Us Here!</h2>
                <Form className="d-flex flex-column mt-5">
                  <CustomTextInput
                    type="text"
                    label="Name"
                    name="name"
                    placeholder="Place your name here"
                  />
                  <CustomTextInput
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="example@email.com"
                  />
                  <div className="form-group d-flex flex-column">
                    <label htmlFor="phone" className="text-left">
                      Phone:
                    </label>
                    <Field
                      type="number"
                      name="phone"
                      id="phone"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group d-flex flex-column">
                    <label htmlFor="message" className="text-left">
                      Message:
                    </label>
                    <Field
                      type="text"
                      name="message"
                      id="message"
                      className="form-control"
                      render={({ field, form }) => (
                        <textarea
                          className="form-control"
                          placeholder="Enter your message..."
                          onChange={e =>
                            form.setFieldValue(field.name, e.target.value)
                          }
                        ></textarea>
                      )}
                    />
                    <ErrorMessage
                      name="message"
                      component="span"
                      className="text-danger text-left"
                    />
                  </div>
                  <div className="row no-gutters">
                    <div className="col-md-12 col-lg-5">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              </section>
            </div>
          </div>
        </div>
      </Formik>
    </>
  );
}

export default Contact;
