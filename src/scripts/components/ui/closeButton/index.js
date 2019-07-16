import './style.scss';
import React from 'react';

const CloseButton = props => {
  const { children, onClick } = props,
    onClickHandler = event => {
      event.preventDefault();
      onClick('close');
    };
  return (
    <button
      href="#"
      className={`close-btn${children ? ' padded' : ''}`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default CloseButton;
