import './style.scss';
import React from 'react';
import { Link } from '@reach/router';

const ResetButton = props => {
  const { children, className, icon, onClick, to } = props,
    url = to || '#',
    onClickHandler = () => {
      onClick();
    };
  return (
    <Link
      className={`reset-btn${className ? ` ${className}` : ''}${
        icon ? ` ${icon}` : ''
      }`}
      to={url}
      onClick={onClickHandler}
    >
      {children}
    </Link>
  );
};

export default ResetButton;
