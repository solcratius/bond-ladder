import './style.scss';
import React from 'react';

const ChevronButton = props => {
  const { children, color, direction, onClick, toggle } = props,
    toggleState =
      toggle !== undefined && toggle !== false ? ' opened' : undefined,
    textLabel =
      children && typeof children === 'string'
        ? children
        : children[toggleState !== undefined ? 1 : 0],
    onClickHandler = event => {
      event.preventDefault();
      onClick();
    };
  return (
    <button
      href="#"
      className={`chevron-btn${children ? ' padded' : ''}${
        color ? ` ${color}` : ''
      }${direction ? ` ${direction}` : ''}${
        toggleState !== undefined ? toggleState : ''
      }`}
      onClick={onClickHandler}
    >
      {textLabel}
      <span />
    </button>
  );
};

export default ChevronButton;
