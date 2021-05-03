import React from 'react';

function TextInput({ label, placeholder, onChange, value, id }) {
  return (
    <div className="form-group d-flex flex-column">
      <label className="text-left" htmlFor={`exampleFormControlInput${id}`}>
        {label}
      </label>
      <input
        type="text"
        onChange={onChange}
        value={value}
        className="form-control"
        id={`exampleFormControlInput${id}`}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextInput;
