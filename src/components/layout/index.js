import React from 'react';

/* Componentes */
import HomePage from '../../pages/homeScreen/homeScreen';
import RegisterPage from '../../pages/Forms/RegisterForm';
import LoginPage from '../../pages/login';
import LogoutPage from '../../pages/logout/Logout';
import ContactPage from '../../pages/Forms/Contact/Contact';
import NewsPage from '../../pages/News/News';
import NewsDetailedPage from '../../pages/DetailNew';

/* Modulos */

import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Protected from '../ProtectedRoutes/Protected';
import MainLayoutRoute from '../MainLayoutRoute';
import BackOfficeRoutes from './backOfficeRoutes';
import MainLayout from '../../layout/MainLayout/MainLayout';

const layout = () => {
  return (
    <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
    >
      {/* <Route path="/activity/:id" component={DetailActivity} />  commented only for presentation */}
      {/* PAGE TO LIST ALL THE ACTIVITIES IS MISSING */}
      {/* <Route path="/activity" exact component={HomePage} /> commented only for presentation  */}
      <MainLayoutRoute path="/news/:id" component={NewsDetailedPage} />
      <MainLayoutRoute path="/news" exact component={NewsPage} />
      <MainLayoutRoute path="/contact-us" component={ContactPage} />
      <MainLayoutRoute path="/register" component={RegisterPage} />
      <MainLayoutRoute path="/login" component={LoginPage} />
      <Route path="/logout">
        <MainLayout>
          <Protected component={LogoutPage} />
        </MainLayout>
      </Route>
      <MainLayoutRoute path="/" exact component={HomePage} />
      <BackOfficeRoutes />
    </AnimatedSwitch>
  );
};

export default layout;
