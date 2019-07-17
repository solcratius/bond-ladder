import './style.scss';
import React from 'react';
import { Link } from '@reach/router';

const CircularButton = props => {
  const { children, className, inActive, onClick, to } = props,
    url = to || '#';
  return (
    <Link
      className={`circle-btn${inActive ? ' inactive' : ''}`}
      to={url}
      onClick={onClick}
    >
      <span className={className ? ` ${className}` : ''} />
      {children}
    </Link>
  );
};

export default CircularButton;
