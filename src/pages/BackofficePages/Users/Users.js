import React, { useEffect, useState } from 'react';
import { getHttpRequest } from '../../../helper/axios';
import Loader from '../../../components/Loader';

function RowUser({ user }) {
  const { firstName, lastName, email } = user;
  return (
    <tr>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td className="text-right">
        <div className="actionsUser">
          <button
            id="btnGroupDrop1"
            type="button"
            className="btn btn-light"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </button>
          <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <a className="dropdown-item btn-primary" href="#edit">
              <i className="fa fa-pencil" aria-hidden="true"></i> Editar
            </a>
            <a className="dropdown-item btn-danger" href="#delete">
              <i className="fa fa-trash" aria-hidden="true"></i> Eliminar
            </a>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getHttpRequest('/users')
      .then(res => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        console.log(e);
      });
  }, []);
  return (
    <div className="container-fluid text-left">
      <h2 className="h4 py-3">Usuarios</h2>
      <div className="card shadow mb-2">
        <div className="card-header">
          <h3 className="h6 m-0">Información de usuarios</h3>
        </div>
        <div className="card-body pt-1">
          {isLoading ? (
            <div className="text-center p-5">
              <Loader size={60} />
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-borderless">
                <thead className="border-bottom">
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Email</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.map(user => <RowUser user={user} />)}
                </tbody>
                <tfoot className="border-top">
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Email</th>
                    <th scope="col"></th>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
