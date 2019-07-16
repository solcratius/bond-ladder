import './style.scss';
import React, { Component } from 'react';
import { Link } from '@reach/router';

export default class ValueInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocus: false,
      placeHolder: props.value,
      previousVal: '',
      value: props.value
    };

    this.myTextField = React.createRef();
    if (props.flexibleInput) this.myHelperField = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { appState, flexibleInput, value } = this.props;

    if (prevProps.value !== this.props.value) {
      this.setState(
        {
          placeHolder: value,
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

  onChange = event => {
    this.setState(
      {
        value: event.target.value
      },
      () => {
        if (this.props.flexibleInput) {
          this.updateFlexibleInput();
        }
      }
    );

    // console.log('onChange');
  };

  onFocus = () => {
    this.setState({
      isFocus: true,
      previousVal: this.props.value,
      value: null
    });
  };

  onUpdateDone = event => {
    const { value, previousVal } = this.state,
      code = event.keyCode || event.which;
    if (code && code !== 13) return;

    this.setState(
      {
        isFocus: false
      },
      () => {
        if (value) {
          this.props.onUpdateDone(value);
        } else {
          this.setState({
            value: previousVal
          });
        }
      }
    );
    // console.log(`onUpdateDone: ${code}`);
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
          name={name || ''}
          onBlur={this.onUpdateDone}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onKeyDown={this.shouldBlur}
          onKeyUp={this.onUpdateDone}
          placeholder={placeHolder}
          ref={this.myTextField}
          type={isFocus ? 'number' : 'text'}
          value={value || ''}
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
        name={name || ''}
        onBlur={this.onUpdateDone}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onKeyDown={this.shouldBlur}
        onKeyUp={this.onUpdateDone}
        placeholder={placeHolder}
        type={isFocus ? 'number' : 'text'}
        value={value || ''}
      />
    );
  }
}
