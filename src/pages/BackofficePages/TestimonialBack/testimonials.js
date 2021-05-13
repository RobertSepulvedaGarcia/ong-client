import React, { useState, useEffect } from 'react';
import { deleteHttpRequest, getHttpRequest } from '../../../helper/axios';
import { Link } from 'react-router-dom';
import './testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const getTestimonials = () => {
    getHttpRequest('/testimonials')
      .then(res => setTestimonials(res.data))
      .catch(err => console.log(err));
  };

  const deleteTestimonial = id => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      deleteHttpRequest('/testimonials/' + id)
        .then(res => getTestimonials())
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    getTestimonials();
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      />
      <div
        className="table-responsive table mt-2"
        id="dataTable"
        role="grid"
        aria-describedby="dataTable_info"
      >
        <table className="table my-0" id="dataTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map(testimonial => {
              return (
                <tr>
                  <td>{testimonial.id}</td>
                  <td>{testimonial.name}</td>
                  <td>
                    <Link to={'/back-office/testimonials/' + testimonial.id}>
                      <button className="btn btn-primary text-white w-auto">
                        EDITAR
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger text-white ml-1 w-auto"
                      onClick={() => deleteTestimonial(testimonial.id)}
                    >
                      BORRAR
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Testimonials;
