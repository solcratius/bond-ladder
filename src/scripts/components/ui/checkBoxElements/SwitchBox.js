import './style.scss';
import React from 'react';

const SwitchBox = props => {
  const { isChecked, onChange, textLabel } = props;

  return (
    <label className="switch-box">
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      <span className="sliding-checkbox">
        <span className="text left">{textLabel[0]}</span>
        <span className="text right">{textLabel[1]}</span>
      </span>
    </label>
  );
};

export default SwitchBox;
