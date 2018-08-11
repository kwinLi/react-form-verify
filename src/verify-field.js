import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { enhanceHandler, validate } from './helpers';

export class VerifyField extends React.Component {
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
    debounce: PropTypes.number,
    children: PropTypes.func.isRequired,
    delegate: PropTypes.func
  }

  static defaultProps = {
    debounce: 200
  }

  constructor(props) {
    super(props);

    const { name, delegate, onFocus, onBlur, debounce: debounceTime } = props;

    this.state = name && delegate ? {} : {
      isDirty: false,
      ...validate(props.value, props)
    };

    this.validateAfterUpdate = debounce(this.validateAfterUpdate.bind(this), debounceTime);
    this.onFocus = enhanceHandler(this.handleFocus.bind(this), onFocus);
    this.onBlur = enhanceHandler(this.handleBlur.bind(this), onBlur);
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

  validateAfterUpdate() {
    const { value, name, delegate: formCollectValidateResults } = this.props;
    const validateResults = {
      ...validate(value, this.props),
      isDirty: true
    };

    if (name && formCollectValidateResults) {
      formCollectValidateResults({ [name]: validateResults });
    } else {
      this.setState(validateResults);
    }
  }

  componentDidMount() {
    const { value, name, delegate: formCollectValidateResults } = this.props;
    name && formCollectValidateResults && formCollectValidateResults({ [name]: {
      ...validate(value, this.props),
      isDirty: false
    }});
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
      delegate,
      ...tail
    } = this.props;

    if (focus || blur) {
      tail.onFocus = this.onFocus;
      tail.onBlur = this.onBlur;
    }

    return this.props.children({ tail, ...this.state });
  }
}
