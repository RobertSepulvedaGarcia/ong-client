import React, { useEffect, useState } from 'react';
import { getHttpRequest } from '../../helper/axios/index';
import './we.css';
const We = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    getHttpRequest(`/members/`)
      .then(res => {
        console.log(res.data);
        setState(res.data);
      })
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="container-fluid wrapper">
      <p className="display-3">Our Members</p>
      <div className="row member-content">
        {state.map(member => (
          <div
            key={member.id}
            style={{ marginTop: '20px' }}
            className="col-sm-12 col-lg-4 d-flex justify-content-center"
          >
            <div className="card" style={{ width: '50%' }}>
              <img
                className="card-img-top"
                style={{ width: '100%' }}
                src={member.image}
                alt="Card cap"
              />
              <div className="card-body">
                <p className="card-text">{member.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default We;
