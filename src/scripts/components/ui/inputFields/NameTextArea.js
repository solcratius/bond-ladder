import './style.scss';
import React, { Component } from 'react';

export default class NameTextArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeHolder: props.placeHolder,
      value: props.value
    };

    this.myTextField = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value
      });
    }

    if (this.props.forceFocus) {
      const textField = this.myTextField.current;
      textField.focus();
    }
  }

  onUpdate = event => {
    const { value } = event.target,
      textField = this.myTextField.current;

    if (this.props.resize) {
      textField.style.height = 'auto';
      textField.style.height = `${textField.scrollHeight}px`;
    }

    this.setState(
      {
        value,
        placeHolder: value
      },
      () => {
        this.props.onUpdateDone(value);
      }
    );
  };

  shouldBlur = event => {
    const code = event.keyCode || event.which;
    if (code === 13) event.target.blur();
  };

  render() {
    const { className, name, onBlur } = this.props,
      { placeHolder, value } = this.state;

    return (
      <textarea
        className={className || ''}
        name={name || ''}
        onBlur={onBlur || null}
        onChange={this.onUpdate}
        onKeyDown={this.shouldBlur}
        onKeyUp={this.onUpdate}
        placeholder={placeHolder}
        ref={this.myTextField}
        rows="1"
        value={value}
      />
    );
  }
}
