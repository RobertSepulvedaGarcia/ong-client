import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import './BackOfficeLayout.css';
import Navbar from './Navbar/Navbar';
const BackOfficeLayout = ({ children }) => (
  <div id="wrapper">
    <Sidebar />
    <div id="content-wrapper" className="d-flex flex-column">
      <Navbar />
      <div id="content" className="container-fluid p-1">
        {children}
      </div>
    </div>
  </div>
);

export default BackOfficeLayout;
