import React, { useEffect } from 'react';
import { getHttpRequest } from '../../../helper/axios/index';
import Activity from './Activity';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../components/Loader';
import { selectFetch } from '../../../components/fetch/fetchSlice';
import SucessAlert from '../../../components/Alerts/SucessAlert';
import {
  selectActivity,
  setActivity,
} from '../../../components/edit/activities';
import './BackofficeActivities.css';

function BackofficeActivities() {
  const fetchState = useSelector(selectFetch);
  const activities = useSelector(selectActivity);
  const dispatch = useDispatch();

  useEffect(() => {
    const getActs = async () => {
      const { data } = await getHttpRequest(`/activities`);
      console.log(data);
      dispatch(setActivity(data));
    };
    getActs();
  });

  return (
    <>
      <>
        {fetchState.loading ? (
          <Loader />
        ) : (
          <>
            {' '}
            {/* < div className="container-fluid " > */}
            {/*   <p style={{ marginBottom: '130px' }} className="display-4"></p> */}
            {/*  <div className="card shadow card-responsive" >
    <div className="card-header py-3">
      <p className="text-primary m-0 font-weight-bold  text-left">Informacion de Actividades</p>
    </div>
    <div className="card-body"> */}
            <div
              className=" table-backoffice "
              id="dataTable"
              role="grid"
              aria-describedby="dataTable_info"
              style={{ overflow: 'hidden' }}
            >
              <table className="table my-0" id="dataTable">
                <thead>
                  <tr>
                    <th> ID </th>
                    <th> Nombre </th>
                    <th style={{ textAlign: 'center' }}> Acciones </th>
                  </tr>
                </thead>
                <tbody>
                  {activities?.map(activity => (
                    <tr key={activity.id}>
                      <Activity activity={activity} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* </div> */}
            {/* </div> */}
            {fetchState.success && fetchState.message && (
              <SucessAlert
                text={fetchState.message}
                title="Operacion realizada"
              />
            )}
            {/*  </div > */}{' '}
          </>
        )}
      </>
    </>
  );
}

export default BackofficeActivities;
