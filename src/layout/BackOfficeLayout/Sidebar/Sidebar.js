import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import LogoDefault from '../../../logo-default.png';
import NavItem from './NavItem';

function NavSidebar({ titleNav, children }) {
  return (
    <ul className="nav flex-column text-left my-2">
      <li className={styles.headNav}>{titleNav}</li>
      {children}
    </ul>
  );
}

export default function Sidebar() {
  return (
    <div id="sidebar" className={styles.sidebar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={LogoDefault} alt="logo" className={styles.logoImg} />
        </Link>
      </div>

      <NavSidebar titleNav="General">
        <NavItem
          to="/back-office"
          exact={true}
          icon={<i className="fa fa-dashboard" aria-hidden="true"></i>}
          text="Dashboard"
        />
        {/*<NavItem
          to="/back-office/account"
          icon={<i className="fa fa-user" aria-hidden="true"></i>}
          text="Mi cuenta"
        /> */}
      </NavSidebar>

      <NavSidebar titleNav="Administración">
        <NavItem
          to="/back-office/news"
          icon={<i className="fa fa-newspaper-o" aria-hidden="true"></i>}
          text="Novedades"
        />

        <NavItem
          to="/back-office/testimonials"
          icon={<i className="fa fa-comments" aria-hidden="true"></i>}
          text="Testimonios"
        />

        <NavItem
          to="/back-office/activity"
          icon={<i className="fa fa-heart" aria-hidden="true"></i>}
          text="Actividades"
        />

        <NavItem
          to="/back-office/categories"
          icon={<i className="fa fa-tags" aria-hidden="true"></i>}
          text="Categorías"
        />

        <NavItem
          to="/back-office/users"
          icon={<i className="fa fa-users" aria-hidden="true"></i>}
          text="Usuarios"
        />

        <NavItem
          to="/back-office/organization"
          icon={<i className="fa fa-building" aria-hidden="true"></i>}
          text="Organización"
        />
      </NavSidebar>
    </div>
  );
}
