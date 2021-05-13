import React from 'react';

/* Componentes */

import EditActivityPage from '../../pages/Forms/ActivityForm';
import ActivityBackOffice from '../../pages/BackofficePages/BackofficeActivities/BackofficeActivities';
import EditOrganizationPage from '../../pages/Forms/EditOrganization/EditOrganization';
import NewsBackOfficePage from '../../pages/BackofficePages/NewsBack/NewsBack';
import NewsBackOfficeEditPage from '../../pages/Forms/NewsForm/NewsForm';
import TestimonialPage from '../../pages/BackofficePages/TestimonialBack/testimonials';
import CategoriesAbm from '../../pages/backoffice/Categories/ABMCategories';
/* Modulos */

import { Route } from 'react-router-dom';
import ProtectedAdmin from '../ProtectedRoutes/ProtectedAdmin';
import BackOfficeLayout from '../../layout/BackOfficeLayout/BackOfficeLayout';
import FormTestimonial from '../FormTestimonial';
import Users from '../../pages/BackofficePages/Users/Users';

function BackOfficeRoutes() {
  return (
    <>
      <Route path="/back-office/testimonials" exact>
        <BackOfficeLayout>
          <ProtectedAdmin component={TestimonialPage} />
        </BackOfficeLayout>
      </Route>

      <Route path="/back-office/testimonials/:id" exact>
        <BackOfficeLayout>
          <ProtectedAdmin component={FormTestimonial} />
        </BackOfficeLayout>
      </Route>

      <Route path="/back-office/news/:id">
        <BackOfficeLayout>
          <ProtectedAdmin component={NewsBackOfficeEditPage} />
        </BackOfficeLayout>
      </Route>

      <Route path="/back-office/news" exact>
        <BackOfficeLayout>
          <ProtectedAdmin component={NewsBackOfficePage} />
        </BackOfficeLayout>
      </Route>

      <Route path="/back-office/organization/:id">
        <BackOfficeLayout>
          <ProtectedAdmin component={EditOrganizationPage} />
        </BackOfficeLayout>
      </Route>

      {/* PAGE TO LIST ALL THE ORGANIZATIONS IS MISSING */}
      <Route path="/back-office/organization" exact>
        <BackOfficeLayout>
          <ProtectedAdmin component={EditOrganizationPage} />
        </BackOfficeLayout>
      </Route>

      <Route path="/back-office/activity/:id">
        <BackOfficeLayout>
          <ProtectedAdmin component={EditActivityPage} />
        </BackOfficeLayout>
      </Route>

      <Route path="/back-office/activity" exact>
        <BackOfficeLayout>
          <ProtectedAdmin component={ActivityBackOffice} />
        </BackOfficeLayout>
      </Route>

      <Route path="/back-office/categories" exact>
        <BackOfficeLayout>
          <ProtectedAdmin component={CategoriesAbm} />
        </BackOfficeLayout>
      </Route>
      <Route path="/back-office/users" exact>
        <BackOfficeLayout>
          <ProtectedAdmin component={Users} />
        </BackOfficeLayout>
      </Route>
      {/* IMPLEMENT BACK-OFFICE COMPONENT */}
      <Route path="/back-office" exact>
        <BackOfficeLayout>
          <ProtectedAdmin component={TestimonialPage} />
        </BackOfficeLayout>
      </Route>
    </>
  );
}

export default BackOfficeRoutes;
