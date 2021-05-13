import React from 'react';
import SweetAlert from 'sweetalert2-react';

function SuccessAlert(props) {
  return (
    <>
      <SweetAlert
        show={true}
        title={props.title}
        text={props.text}
        type="success"
      />
    </>
  );
}

export default SuccessAlert;
