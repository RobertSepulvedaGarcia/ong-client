import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from '@ckeditor/ckeditor5-build-classic';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFetch,
  unSetLoading,
  setLoading,
  successFetch,
  resetFetch,
} from '../../../components/fetch/fetchSlice';
import { getHttpRequest, putHttpRequest } from '../../../helper/axios';
import ErrorAlert from '../../../components/Alerts/ErrorAlert';
import Loader from '../../../components/Loader';
import validationSchema from './validationSchema';
import editorConfiguration from './editConfiguration';
import { useParams, useHistory } from 'react-router';
import { editActivity } from '../../../components/edit/activities';
import he from 'he';

import './activity.css';

function ActivityForm(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  // const activities = useSelector(selectActivity)
  useEffect(() => {
    if (id) {
      dispatch(setLoading());
      getHttpRequest(`/activities/${id}`).then(({ data }) => {
        data.content = he.decode(data.content);
        setActivityData(data);
        dispatch(unSetLoading());
      });
    }
  });
  const [isModeEdit] = useState(id ? true : false);
  const [activityData, setActivityData] = useState('');
  const fetchState = useSelector(selectFetch);
  const handleOnCancel = e => {
    e.preventDefault();
    dispatch(resetFetch());
    history.goBack();
  };

  const handleSubmit = async activity => {
    dispatch(setLoading());
    let url;
    if (isModeEdit) {
      url = `/activities/${id}`;
      //#TODO :  Test endpoint when implemented
      await putHttpRequest(url, { id, ...activity });
      dispatch(editActivity({ id, ...activity }));
      dispatch(successFetch('Editado con exito'));
      history.goBack();
    } else {
      //#TODO :   Test endpoint when implemented
      //await postHttpRequest(url, activity)
      history.goBack();
    }
  };
  const intialValue = {
    name: activityData.name || '',
    content: activityData.content || '',
  };

  return (
    <>
      {fetchState.loading ? (
        <Loader />
      ) : (
        <div class="row">
          <div className="col">
            <div className="card shadow mb-3  ">
              <div className="card-header py-3">
                <p className="text-primary m-0 font-weight-bold">
                  Edicion de actividad
                </p>
              </div>
              <div className="card-body">
                <Formik
                  onSubmit={values => {
                    console.log('@2');
                    handleSubmit(values);
                  }}
                  initialValues={intialValue}
                  validationSchema={validationSchema}
                >
                  <Form>
                    <div className="form-row">
                      <div className="col">
                        <div className="form-group">
                          {' '}
                          <label>
                            <strong>Nombre</strong>
                          </label>{' '}
                          <Field
                            className="form-control"
                            name="name"
                            type="text"
                          />
                          <ErrorMessage
                            className="alert alert-danger"
                            component="label"
                            name="name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col">
                        <div className="form-group">
                          <label>
                            <strong>Contenido</strong>
                          </label>
                          <Field name="content">
                            {({ field, form }) => {
                              return (
                                <>
                                  <CKEditor
                                    editor={Editor}
                                    config={editorConfiguration}
                                    data={activityData?.content}
                                    onChange={(event, editor) => {
                                      form.setFieldValue(
                                        'content',
                                        editor.getData()
                                      );
                                    }}
                                  />
                                </>
                              );
                            }}
                          </Field>
                          <ErrorMessage
                            className="alert alert-danger"
                            component="label"
                            name="content"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        class="btn btn-primary btn-block btn-lg "
                        type="submit"
                      >
                        {isModeEdit ? 'Editar' : 'Crear'}
                      </button>
                    </div>
                    {isModeEdit && (
                      <div classname="form-group">
                        <button
                          class="btn btn-secondary btn-lg  btn-block"
                          onClick={handleOnCancel}
                        >
                          Volver
                        </button>
                      </div>
                    )}
                    {fetch.error && (
                      <ErrorAlert text={fetch.error}></ErrorAlert>
                    )}
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ActivityForm;
