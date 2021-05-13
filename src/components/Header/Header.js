import React from 'react';
import { links } from '../../utils/navMenuLinks';

import './Header.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/LOGO-SOMOS-MAS.png';

const Header = () => {
  // useEffect(() => {  Comented due to Presentation
  //   getHttpRequest(`${process.env.REACT_APP_API_URL}/organizations/1/public`)
  //     .then(res => {
  //       setState(res.data);
  //     })
  //     .catch(err => console.error(err));
  // }, []);

  // const { image } = state; Committed due to Presentation

  return (
    <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar shadow header">
      <div className="container header-container">
        {/* {image ? (
        <img className="logo-image" src={image} alt="logo" />
      ) : (
        <Loader />
      )} */}
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
            {links.map(({ route, text }, index) => {
              return (
                <li className="nav-item" key={index}>
                  <Link to={route} className="nav-link links">
                    {text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
