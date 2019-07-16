import './style.scss';
import React from 'react';
import { Link } from '@reach/router';

const CircularButton = props => {
  const { children, className, onClick, to } = props,
    url = to || '#';
  return (
    <Link className="circle-btn" to={url} onClick={onClick}>
      <span className={className ? ` ${className}` : ''} />
      {children}
    </Link>
  );
};

export default CircularButton;
