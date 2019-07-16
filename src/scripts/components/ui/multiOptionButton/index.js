import './style.scss';
import React, { Component } from 'react';

class MultiOptionButton extends Component {
  constructor() {
    super();

    this.state = {
      show: false
    };

    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  showContentToggle = () => {
    this.setState({
      show: !this.state.show
    });
  };

  handleClickOutside = event => {
    const ref = this.wrapperRef.current;
    if (
      ref &&
      !ref.contains(event.target) &&
      !event.target.classList.contains('trigger-btn')
    ) {
      this.setState({
        show: false
      });
    }
  };

  render() {
    const {
        anchorDirection,
        buttonLabel,
        children,
        className,
        url
      } = this.props,
      { show } = this.state,
      childContent = children.map((child, i) => {
        return <li key={i}>{child}</li>;
      });

    return (
      <div className="multi-option-button">
        {url ? (
          <a
            href={url}
            className={`trigger-btn ${className}`}
            onClick={this.showContentToggle}
          >
            {buttonLabel}
          </a>
        ) : (
          <span
            className={`trigger-btn ${className}`}
            onClick={this.showContentToggle}
            onKeyUp={this.showContentToggle}
            role="button"
            tabIndex="0"
          >
            {buttonLabel}
          </span>
        )}
        <div
          ref={this.wrapperRef}
          className={`contents${anchorDirection ? ` ${anchorDirection}` : ''}${
            show ? ' show' : ''
          }`}
        >
          <ul>{childContent}</ul>
        </div>
      </div>
    );
  }
}

export default MultiOptionButton;
