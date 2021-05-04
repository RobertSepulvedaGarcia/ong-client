import { ErrorMessage, Field } from 'formik';
import React from 'react';

function CustomTextInput({ type, label, name, placeholder }) {
  return (
    <div className="form-group d-flex flex-column">
      <label htmlFor={name} className="text-left">
        {label}:
      </label>
      <Field
        type={type}
        name={name}
        id={name}
        className="form-control"
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        component="span"
        className="text-danger text-left"
      />
    </div>
  );
}

export default CustomTextInput;
