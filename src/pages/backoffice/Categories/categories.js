import React, { useState, useEffect } from 'react';
import { getHttpRequest, deleteHttpRequest } from '../../../helper/axios/index';
import Loader from '../../../components/Loader/index';
import Swal from 'sweetalert2';
import './categories.css';
const Categories = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    getHttpRequest('/categories')
      .then(res => {
        setState(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const deleteCategory = id => {
    Swal.fire(
      'Are you sure?',
      "You won't be able to revert this!",
      'warning',
      true,
      '#3085d6',
      '#d33',
      'Yes, delete it!'
    ).then(result => {
      if (result.value === true) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
          .then(() => deleteHttpRequest(`/categories/${id}`))
          .then(() => window.location.reload());
      }
    });
  };

  return (
    <div className="container-fluid list-container ">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      />

      {state !== [] ? (
        <div className="container text-left">
          <p style={{ marginBottom: '130px' }} className="display-4">
            Categories List
          </p>
          <div className="table-responsive-sm">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"> Id </th>
                  <th scope="col"> Category </th>
                  <th scope="col"> Description </th>
                  <th scope="col"> Actions </th>
                </tr>
              </thead>
              <tbody>
                {state.map(({ id, name, description }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td> {name}</td>
                    <td className="description d-block text-truncate text-justify">
                      {description}
                    </td>
                    <td>
                      <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                          <button className="btn btn-primary btn-block">
                            Edit
                          </button>
                        </div>
                        <div className="delete col-sm-12 col-md-6 col-lg-6">
                          <button
                            className="btn btn-danger btn-block"
                            onClick={() => deleteCategory(id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="container text-left">
          <p style={{ marginBottom: '130px' }} className="display-4">
            Categories List
          </p>
          <div>
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
