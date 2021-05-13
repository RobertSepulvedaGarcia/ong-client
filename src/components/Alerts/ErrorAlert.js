import React from 'react';
import SweetAlert from 'sweetalert2-react';

function ErrorAlert(props) {
  return (
    <>
      <SweetAlert
        show={true}
        title={props.title}
        text={props.text}
        type="error"
      />
    </>
  );
}

export default ErrorAlert;
