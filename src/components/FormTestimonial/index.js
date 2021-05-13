import React, { useState } from 'react';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from '@ckeditor/ckeditor5-build-classic';
import editorConfiguration from './editConfiguration';
import { useHistory } from 'react-router';
import { validationSchema, handleRequest } from './utils';

const FormTestimonial = () => {
  //const testimonial = useSelector(selectTestimonials);
  // const isEdit = useParams('id');
  // const [test, setTest] = useState({ nam: '', image: null, content: '' });
  const [msg, setMsg] = useState();
  const history = useHistory();
  // const [edit, setEdit] = useState(false);

  const handleSubmit = (vals, setSubmitting) => {
    handleRequest(setMsg, vals, setSubmitting, history);
  };

  // useEffect(() => {
  //   if (isEdit/*testimonial*/) {
  //     //const { nam, image, content } = testimonial;
  //     //setTest({ nam, image, content });
  //     setEdit(true);
  //   }
  //   console.log(edit)
  // }, []);

  return (
    <div className="container-fluid">
      <p>{msg}</p>
      <Formik
        enableReinitialize
        // initialValues={{ ...test }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          //Disabled the submit button, and create a User object with the values.
          setSubmitting(true);
          console.log(values);
          handleSubmit({ ...values }, setSubmitting);
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
          <Form
            onSubmit={handleSubmit}
            className="p-5 d-flex flex-column align-start text-left "
          >
            <p>{console.log({ values })}</p>
            <div className="d-flex flex-column m-2 p-2 form-group">
              <label>Nombre</label>
              <Field
                type="text"
                name="nam"
                className="form-control"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Ingrese su nombre"
              />
              <ErrorMessage
                component="div"
                className="text-danger"
                name="nam"
              />
            </div>

            <div className="form-group m-2 p-2">
              <label>Contenido</label>

              <CKEditor
                data={values.content}
                config={editorConfiguration}
                editor={Editor}
                name="content"
                onChange={(e, editor) => {
                  values.content = editor.getData();
                }}
              />
              <ErrorMessage
                component="div"
                className="text-danger"
                name="content"
              />
            </div>

            <div className="form-group m-2 p-2">
              <label>Imagen</label>
              <Field
                type="file"
                name="image"
                id="image"
                render={({ field, form }) => (
                  <>
                    <input
                      className="form-control-file"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onChange={e =>
                        form.setFieldValue(field.name, e.currentTarget.files[0])
                      }
                    />
                  </>
                )}
              />
              <ErrorMessage
                component="div"
                className="text-danger"
                name="image"
              />
            </div>

            <div className="m-2 p-2 d-flex flex-column align-items-center">
              <button
                onClick={e => history.push('/')}
                className="btn m-2 btn-secondary"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn m-2 btn-primary"
                disabled={isSubmitting}
              >
                Enviar testimonio
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormTestimonial;
