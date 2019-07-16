import './style.scss';
import React from 'react';

const CheckBox = props => {
  const { id, isChecked, name, onChange } = props;

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        checked={isChecked}
        id={id}
        name={name}
        onChange={onChange}
      />
      <i />
    </div>
  );
};

export default CheckBox;
