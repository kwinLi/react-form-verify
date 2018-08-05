import React, { Component } from "react";
import PropTypes from 'prop-types';
import { NUMBER, EMAIL, URL } from './patterns';
import { REQUIRED, MIN_LENGTH, MAX_LENGTH } from "./validators";
import { processHandler } from "./helpers";

export class VerifyField extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    required: PropTypes.bool,
    number: PropTypes.bool,
    email: PropTypes.bool,
    url: PropTypes.bool,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    pattern: PropTypes.string,
    validator: PropTypes.func,
    focus: PropTypes.bool,
    blur: PropTypes.bool,
    debounce: PropTypes.number
  }

  static defaultProps = {
    debounce: 200
  }

  constructor(props) {
    super(props);

    const { onFocus, onBlur, debounce: debounceTime } = props
    const validateResults = this.validate();

    this.state = {
      isDirty: false,
      ...validateResults
    };

    this.validateAfterUpdate = debounce(this.validateAfterUpdate.bind(this), debounceTime);
    this.onFocus = processHandler(this.handleFocus.bind(this), onFocus);
    this.onBlur = processHandler(this.handleBlur.bind(this), onBlur);
  }

  handleFocus() {
    this.setState({
      isFocus: true,
      isBlur: false
    });
  }

  handleBlur() {
    this.setState({
      isFocus: false,
      isBlur: true
    });
  }

  validate() {
    const {
      value,
      required,
      number,
      email,
      url,
      minLength,
      maxLength,
      pattern,
      validator
    } = this.props;

    const string = value.toString();
    const customPattern = pattern && new RegExp(pattern);
    const validateResults = {
      isEmail: email && EMAIL.test(string),
      isNumber: number && NUMBER.test(string),
      isUrl: url && URL.test(string),
      isRequired: required && REQUIRED(string, 0),
      isValidMinLength: minLength >= 0 && MIN_LENGTH(string, minLength),
      isValidMaxLength: maxLength >= 0 && MAX_LENGTH(string, maxLength),
      isValidByPattern: customPattern && customPattern.test(string),
      isValidByValidator: validator && validator(value)
    };
    const isInvalid = Object.values(validateResults).some(result => result === false);
    const isValid = !isInvalid;

    return {
      ...validateResults,
      isInvalid,
      isValid
    };
  }

  validateAfterUpdate() {
    const validateResults = this.validate();

    this.setState({
      isDirty: true,
      ...validateResults
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.validateAfterUpdate();
    }
  }

  render() {
    const {
      required,
      number,
      email,
      url,
      minLength,
      maxLength,
      pattern,
      validator,
      focus,
      blur,
      debounce,
      children,
      ...tail
    } = this.props;
    
    if (focus || blur) {
      tail.onFocus = this.onFocus;
      tail.onBlur = this.onBlur;
    }

    return this.props.children({tail, ...this.state});
  }
}
