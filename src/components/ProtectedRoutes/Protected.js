import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Protected({ component: Component }) {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/');
    }
  });

  return (
    <>
      <Component />
    </>
  );
}
