import React from 'react';
import SweetAlert from 'sweetalert2-react';

function WarningAlert(props) {
  return (
    <>
      <SweetAlert
        show={true}
        title={props.title}
        text={props.text}
        type="warning"
      />
    </>
  );
}

export default WarningAlert;
