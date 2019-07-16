import './style.scss';
import React from 'react';

const LargeCheckBox = props => {
  const { group, id, name, onChange } = props,
    formattedName = name.replace(/\s/g, '');

  return (
    <div className={`large-checkbox${group ? ' checked' : ''}`}>
      <label>
        {name}
        <input
          checked={group}
          id={id}
          name={`checkbox${formattedName}`}
          onChange={onChange}
          type="checkbox"
        />
        <i />
      </label>
    </div>
  );
};

export default LargeCheckBox;
