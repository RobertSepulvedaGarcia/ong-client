import React from 'react';
import SweetAlert from 'sweetalert2-react';

function InfoAlert(props) {
  return (
    <>
      <SweetAlert
        show={true}
        title={props.title}
        text={props.text}
        type="info"
      />
    </>
  );
}

export default InfoAlert;
