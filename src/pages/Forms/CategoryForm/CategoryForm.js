import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { patchHttpRequest, postHttpRequest } from '../../../helper/axios';
import { getForEdit } from '../../../components/edit/category/categorySlice';
import { validations } from './validations';

function CategoryForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [forEdit, setForEdit] = useState(false);
  // const category = useSelector(getForEdit);
  const category = useSelector(getForEdit);
  const history = useHistory();

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setForEdit(true);
    }
  }, []);

  const handleSubmit = async values => {
    await postHttpRequest('/categories', values);
    history.push('/categories');
  };

  const handleEdit = async values => {
    await patchHttpRequest(`/categories/${category.id}`, values);
    history.push('/categories');
  };

  return (
    <Formik
      initialValues={{ name, description }}
      validationSchema={validations}
      onSubmit={values => (forEdit ? handleEdit(values) : handleSubmit(values))}
    >
      <Form className="container my-3">
        <div className="form-group d-flex flex-column">
          <label htmlFor="name" className="text-left">
            Name:
          </label>
          <Field type="text" name="name" id="name" className="form-control" />
          <ErrorMessage
            name="name"
            component="span"
            className="text-danger text-left"
          />
        </div>
        <div className="form-group d-flex flex-column">
          <label htmlFor="description" className="text-left">
            Description:
          </label>
          <Field
            type="text"
            name="description"
            id="description"
            className="form-control"
          />
          <ErrorMessage
            name="description"
            component="span"
            className="text-danger text-left"
          />
        </div>
        <div className="row my-sm-5">
          <div className="col-md-4 col-lg-3">
            <button
              onClick={e => history.push('/categories')}
              className={'btn btn-secondary btn-block'}
            >
              Cancel
            </button>
          </div>
          <div className="col-md-4 col-lg-3 mt-2 mt-md-0">
            <button type="submit" className={'btn btn-primary btn-block'}>
              {forEdit ? 'Edit' : 'Submit'}
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default CategoryForm;
