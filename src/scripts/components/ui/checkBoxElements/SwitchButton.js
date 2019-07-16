import './style.scss';
import React from 'react';

const SwitchButton = props => {
  const { isChecked, onChange, textLabel } = props;

  return (
    <label className="switch-btn">
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      <span className="sliding-checkbox" />
      <span className="text">{!isChecked ? textLabel[1] : textLabel[0]}</span>
    </label>
  );
};

export default SwitchButton;
