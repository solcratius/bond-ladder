import './style.scss';
import React from 'react';
import { Link } from '@reach/router';

const RectangularButton = props => {
  const { children, className, onClick, to } = props,
    url = to || '#';
  return (
    <Link
      className={`rect-btn${className ? ` ${className}` : ''}`}
      to={url}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default RectangularButton;
