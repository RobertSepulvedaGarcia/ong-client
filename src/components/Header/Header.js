import React from 'react';
import { links, loggedLinks, adminLinks } from '../../utils/navMenuLinks';
import { useDispatch } from 'react-redux';
import { logout } from '../user/userSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../assets/LOGO-SOMOS-MAS.png';
import './Header.css';

const Header = () => {
  const userLogged = useSelector(store => store.user.user.user);
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };
  return (
    <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar shadow header">
      <div className="container header-container">
        <img className="logo-image" src={Logo} alt="logo" />
        <button
          data-toggle="collapse"
          className="navbar-toggler"
          data-target="#navcol-1"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon"> </span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="navbar-nav ml-auto">
            {userLogged && userLogged.roleId === 1
              ? adminLinks.map(({ route, text }, index) => {
                  return (
                    <li className="nav-item" key={index}>
                      <Link to={route} className="nav-link links">
                        {text}
                      </Link>
                    </li>
                  );
                })
              : userLogged && userLogged.roleId === 2
              ? loggedLinks.map(({ route, text }, index) => {
                  return (
                    <li className="nav-item" key={index}>
                      <Link to={route} className="nav-link links">
                        {text}
                      </Link>
                    </li>
                  );
                })
              : links.map(({ route, text }, index) => {
                  return (
                    <li className="nav-item" key={index}>
                      <Link to={route} className="nav-link links">
                        {text}
                      </Link>
                    </li>
                  );
                })}

            {userLogged ? (
              <li className="nav-item">
                <Link to={'/'} onClick={logoutUser} className="nav-link links">
                  Logout
                </Link>
              </li>
            ) : (
              ''
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
