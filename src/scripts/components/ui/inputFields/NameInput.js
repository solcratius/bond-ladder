import './style.scss';
import React, { Component } from 'react';
import { Link } from '@reach/router';

class NameInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocus: false,
      placeHolder: props.placeHolder,
      value: props.value
    };

    this.myTextField = React.createRef();
    if (props.flexibleInput) this.myHelperField = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { appState, flexibleInput, value } = this.props;

    if (prevProps.value !== value) {
      this.setState(
        {
          value
        },
        () => {
          if (flexibleInput) {
            this.updateFlexibleInput();
          }
        }
      );
    }

    if (
      flexibleInput &&
      prevProps.appState === 'Intro' &&
      appState === 'Tools'
    ) {
      this.updateFlexibleInput();
    }
  }

  onBlur = () => {
    this.setState({
      isFocus: false
    });
  };

  onFocus = () => {
    this.setState({
      isFocus: true
    });
  };

  onUpdate = event => {
    const { value } = event.target;

    this.setState(
      {
        value
        // placeHolder: value
      },
      () => {
        this.props.onUpdateDone(value);

        if (this.props.flexibleInput) {
          this.updateFlexibleInput();
        }
      }
    );
  };

  shouldBlur = event => {
    const code = event.keyCode || event.which;
    if (code === 13) event.target.blur();
  };

  updateFlexibleInput = () => {
    const textField = this.myTextField.current,
      helperField = this.myHelperField.current;

    // textField.style.width = `${helperField.scrollWidth + 58}px`;
    textField.style.width = `${helperField.scrollWidth + 52}px`;
  };

  forceFocus = event => {
    event.preventDefault();

    const textField = this.myTextField.current;
    textField.focus();
  };

  render() {
    const { className, flexibleInput, name } = this.props,
      { isFocus, placeHolder, value } = this.state;

    return flexibleInput ? (
      <div className={`flexible-box${isFocus ? ' is-focus' : ''}`}>
        <input
          autoComplete="off"
          className={className || ''}
          maxLength="40"
          name={name || ''}
          onBlur={this.onBlur}
          onChange={this.onUpdate}
          onFocus={this.onFocus}
          onKeyDown={this.shouldBlur}
          onKeyUp={this.onUpdate}
          placeholder={placeHolder}
          ref={this.myTextField}
          type={'text'}
          value={value}
        />
        <span className="inputHelper" ref={this.myHelperField}>
          {value}
        </span>
        <Link
          className="modify-btn icon-pencil"
          to="./"
          onClick={this.forceFocus}
        />
      </div>
    ) : (
      <input
        autoComplete="off"
        className={className || ''}
        maxLength="40"
        name={name || ''}
        onChange={this.onUpdate}
        onKeyDown={this.shouldBlur}
        onKeyUp={this.onUpdate}
        placeholder={placeHolder}
        ref={this.myTextField}
        type={'text'}
        value={value}
      />
    );
  }
}

export default NameInput;
