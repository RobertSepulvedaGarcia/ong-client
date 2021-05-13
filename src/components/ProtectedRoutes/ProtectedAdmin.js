import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getHttpRequest } from '../../helper/axios';

export default function ProtectedAdmin({ component: Component }) {
  const history = useHistory();

  const authenticateUser = async () => {
    try {
      const user = await getHttpRequest('/auth/me');
      const adminId = 1;

      if (!(user.data.roleId === adminId)) {
        history.push('/');
      }
    } catch (e) {
      history.push('/');
    }
  };

  useEffect(() => {
    authenticateUser();
  });

  return (
    <>
      <Component />
    </>
  );
}
