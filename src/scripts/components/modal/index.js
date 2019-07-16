import './style.scss';
// taken from React docs
import React from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.className = `modal${props.className ? ` ${props.className}` : ''}`;
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
    setTimeout(this.show, 50);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  show = () => {
    this.el.classList.add('on');
  };

  render() {
    return createPortal(this.props.children, this.el);
  }
}

export default Modal;
