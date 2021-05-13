import React from 'react';
import SweetAlert from 'sweetalert2-react';

function ConfirmAlert(props) {
  return (
    <>
      <SweetAlert
        show={true}
        text="Are you sure you want to continue?"
        showCancelButton={true}
        onConfirm={() => props.onConfirm}
      />
    </>
  );
}

export default ConfirmAlert;
