import React from 'react';

import { useHistory, useLocation } from 'react-router';
import { removeActivity } from '../../../components/edit/activities';
import { deleteHttpRequest } from '../../../helper/axios';
import {
  failFetch,
  setLoading,
  successFetch,
} from '../../../components/fetch/fetchSlice';
import { useDispatch } from 'react-redux';

function Activity({ activity }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const handleEdit = () => {
    history.push(location.pathname + `/${activity.id}`);
  };

  const handleDelete = async () => {
    dispatch(setLoading());
    try {
      await deleteHttpRequest(`/activities/${activity.id}`);
      dispatch(successFetch('Borrado con exito'));
      dispatch(removeActivity(activity.id));
    } catch (e) {
      dispatch(failFetch(e));
    }
  };
  return (
    <React.Fragment key={activity.id}>
      <td style={{ verticalAlign: 'inherit' }}> {activity.id} </td>
      <td style={{ verticalAlign: 'inherit' }}> {activity.name} </td>

      <td className="text-center" /*  style={{ textAlign: 'center' }} */>
        {/*  <div className="row">
        <div className=" col-sm-2 col-md-6 col-lg-6">
          <button className="btn btn-primary text-white ml-1" onClick={handleEdit}>
            Editar
                </button>
        </div>
        <div className=" col-sm-2 col-md-6 col-lg-6 ">
          <button className="btn btn-danger text-white ml-1 " onClick={handleDelete} >
            Borrar
              </button>

              
        </div>
      </div> */}

        <button
          className="btn btn-primary text-white ml-1 w-auto"
          onClick={handleEdit}
        >
          Editar
        </button>
        <button
          className="btn btn-danger text-white ml-1 w-auto "
          onClick={handleDelete}
        >
          Borrar
        </button>
      </td>
    </React.Fragment>
  );
}

export default Activity;
