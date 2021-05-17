import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '../../../components/Avatar';

const ADMIN_ROLE_ID = 1;
export default function Navbar() {
  const userLogged = useSelector(store => store.user.user.user);

  return (
    <nav className="navbar navbar-light bg-white border-bottom shadow-sm">
      <div className="d-flex align-items-center p-0 m-0">
        <Link className="text-muted p-0" to="/" title="Home">
          <i className="fa fa-home" aria-hidden="true"></i>
        </Link>
      </div>
      <div
        id="userNavbar"
        className="d-flex align-items-center p-0 m-0"
        style={{ fontSize: '1em' }}
      >
        {userLogged && userLogged.roleId === ADMIN_ROLE_ID && (
          <span className="badge badge-danger m-1 d-none d-sm-block">
            Admin
          </span>
        )}
        <span className="d-none d-sm-block">
          {userLogged && userLogged.firstName}
        </span>
        <Avatar imageUrl={userLogged && userLogged.image} />
      </div>
    </nav>
  );
}
