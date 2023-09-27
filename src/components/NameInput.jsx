import React from 'react';

function NameInput({ value, onChange }) {
  return (
    <div>
      <p>Name</p>
      <input
        type='text'
        value={value}
        onChange={onChange}
        data-testid='firstname'
      />
    </div>
  );
}

export default NameInput;
