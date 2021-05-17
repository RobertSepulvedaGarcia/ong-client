import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from '@ckeditor/ckeditor5-build-classic';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validation } from './utils';
import { useHistory, useParams } from 'react-router';
import {
  postHttpRequest,
  putHttpRequest,
  getHttpRequest,
} from '../../../helper/axios';
import Swal from 'sweetalert2';

function NewsForm(props) {
  const { id } = useParams();
  const [news, setNews] = useState('');
  const [forEdit, setForEdit] = useState(false);
  const history = useHistory();
  const inicialValues = {
    name: news.name || '',
    image: news.image || '',
    categoryId: news.categoryId || '',
    content: news.content || '',
  };
  useEffect(() => {
    if (id !== '0') {
      getHttpRequest(`/news/${id}`).then(response => {
        setNews(response.data.entry);
        setForEdit(true);
      });
    } else {
      setForEdit(false);
      setNews(inicialValues);
    }
  }, [id]);

  const handlePost = async values => {
    const { name, content, image, categoryId } = values;
    const contentHTML = content.replace(/<[^>]+>/g, '');

    const data = {
      name: name,
      content: contentHTML,
      image: image.name,
      categoryId: categoryId,
    };

    await postHttpRequest('/news', data);
    Swal.fire('Bien!', 'Noticia creada exitosamente.', 'success');
    history.push('/back-office/news');
  };

  const handleEdit = async values => {
    const { name, content, image, categoryId } = values;
    const contentHTML = content.replace(/<[^>]+>/g, '');

    const data = {
      name: name,
      content: contentHTML,
      image: image.name,
      categoryId: categoryId,
    };

    await putHttpRequest(`/news/${news.id}`, data);
    Swal.fire('Bien!', 'Noticia editada exitosamente.', 'success');
    history.push('/back-office/news');
  };

  return (
    <>
      <h2 className="mt-4">{forEdit ? 'Editar noticia' : 'Crear noticia'}</h2>
      <Formik
        initialValues={inicialValues}
        validationSchema={validation}
        onSubmit={values => (forEdit ? handleEdit(values) : handlePost(values))}
      >
        <Form className="container mt-3">
          <div className="form-group d-flex flex-column">
            <label htmlFor="name" className="text-left">
              Titulo:
            </label>
            <Field type="text" name="name" id="name" className="form-control" />
            <ErrorMessage
              name="name"
              component="span"
              className="text-danger text-left"
            />
          </div>
          <div className="form-group d-flex flex-column">
            <label htmlFor="categoryId" className="text-left">
              Categoria:
            </label>
            <Field
              type="text"
              name="categoryId"
              render={({ field, form }) => (
                <>
                  <select
                    id="categoryId"
                    className="form-control"
                    defaultValue="Choose-origin"
                    onChange={e =>
                      form.setFieldValue(field.name, e.target.value)
                    }
                  >
                    <option value="Choose-origin" disabled>
                      Elige una categoria
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                  </select>
                </>
              )}
            />
            <ErrorMessage
              name="categoryId"
              component="span"
              className="text-danger text-left"
            />
          </div>
          <div className="form-group d-flex flex-column">
            <label htmlFor="content" className="text-left">
              Contenido:
            </label>
            <Field
              type="text"
              name="content"
              id="content"
              className="form-control"
              render={({ field, form }) => (
                <>
                  <CKEditor
                    editor={Editor}
                    data={field.value}
                    onChange={(e, editor) =>
                      form.setFieldValue(field.name, editor.getData())
                    }
                  />
                </>
              )}
            />
            <ErrorMessage
              name="content"
              component="span"
              className="text-danger text-left"
            />
          </div>
          <div className="form-group d-flex flex-column">
            <label htmlFor="image" className="text-left">
              Imagen:
            </label>
            <Field
              class="form-control form-control-lg"
              type="file"
              name="image"
              id="image"
              render={({ field, form }) => (
                <>
                  <input
                    className="form-control-file "
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
              name="image"
              component="span"
              className="text-danger text-left"
            />
          </div>
          <div className="row my-sm-5">
            <div className="col-lg-6">
              <button
                onClick={e => history.goBack()}
                className={'btn btn-secondary btn-block'}
              >
                Cancelar
              </button>
            </div>
            <div className=" col-lg-6 mt-2 mt-md-0">
              <button type="submit" className={'btn btn-primary btn-block'}>
                {forEdit ? 'Editar' : 'Crear'}
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default NewsForm;
