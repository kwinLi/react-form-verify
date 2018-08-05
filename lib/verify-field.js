'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerifyField = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _patterns = require('./patterns');

var _validators = require('./validators');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VerifyField = exports.VerifyField = function (_React$Component) {
  _inherits(VerifyField, _React$Component);

  function VerifyField(props) {
    _classCallCheck(this, VerifyField);

    var _this = _possibleConstructorReturn(this, (VerifyField.__proto__ || Object.getPrototypeOf(VerifyField)).call(this, props));

    var onFocus = props.onFocus,
        onBlur = props.onBlur,
        debounceTime = props.debounce;

    var validateResults = _this.validate();

    _this.state = _extends({
      isDirty: false
    }, validateResults);

    _this.validateAfterUpdate = (0, _lodash2.default)(_this.validateAfterUpdate.bind(_this), debounceTime);
    _this.onFocus = (0, _helpers.processHandler)(_this.handleFocus.bind(_this), onFocus);
    _this.onBlur = (0, _helpers.processHandler)(_this.handleBlur.bind(_this), onBlur);
    return _this;
  }

  _createClass(VerifyField, [{
    key: 'handleFocus',
    value: function handleFocus() {
      this.setState({
        isFocus: true,
        isBlur: false
      });
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      this.setState({
        isFocus: false,
        isBlur: true
      });
    }
  }, {
    key: 'validate',
    value: function validate() {
      var _props = this.props,
          value = _props.value,
          required = _props.required,
          number = _props.number,
          email = _props.email,
          url = _props.url,
          minLength = _props.minLength,
          maxLength = _props.maxLength,
          pattern = _props.pattern,
          validator = _props.validator;


      var string = value.toString();
      var customPattern = pattern && new RegExp(pattern);
      var validateResults = {
        isEmail: email && _patterns.EMAIL.test(string),
        isNumber: number && _patterns.NUMBER.test(string),
        isUrl: url && _patterns.URL.test(string),
        isRequired: required && (0, _validators.REQUIRED)(string, 0),
        isValidMinLength: minLength >= 0 && (0, _validators.MIN_LENGTH)(string, minLength),
        isValidMaxLength: maxLength >= 0 && (0, _validators.MAX_LENGTH)(string, maxLength),
        isValidByPattern: customPattern && customPattern.test(string),
        isValidByValidator: validator && validator(value)
      };
      var isInvalid = Object.values(validateResults).some(function (result) {
        return result === false;
      });
      var isValid = !isInvalid;

      return _extends({}, validateResults, {
        isInvalid: isInvalid,
        isValid: isValid
      });
    }
  }, {
    key: 'validateAfterUpdate',
    value: function validateAfterUpdate() {
      var validateResults = this.validate();

      this.setState(_extends({
        isDirty: true
      }, validateResults));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.value !== this.props.value) {
        this.validateAfterUpdate();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          required = _props2.required,
          number = _props2.number,
          email = _props2.email,
          url = _props2.url,
          minLength = _props2.minLength,
          maxLength = _props2.maxLength,
          pattern = _props2.pattern,
          validator = _props2.validator,
          focus = _props2.focus,
          blur = _props2.blur,
          debounce = _props2.debounce,
          children = _props2.children,
          tail = _objectWithoutProperties(_props2, ['required', 'number', 'email', 'url', 'minLength', 'maxLength', 'pattern', 'validator', 'focus', 'blur', 'debounce', 'children']);

      if (focus || blur) {
        tail.onFocus = this.onFocus;
        tail.onBlur = this.onBlur;
      }

      return this.props.children(_extends({ tail: tail }, this.state));
    }
  }]);

  return VerifyField;
}(_react2.default.Component);

VerifyField.propTypes = {
  value: _propTypes2.default.string.isRequired,
  required: _propTypes2.default.bool,
  number: _propTypes2.default.bool,
  email: _propTypes2.default.bool,
  url: _propTypes2.default.bool,
  minLength: _propTypes2.default.number,
  maxLength: _propTypes2.default.number,
  pattern: _propTypes2.default.string,
  validator: _propTypes2.default.func,
  focus: _propTypes2.default.bool,
  blur: _propTypes2.default.bool,
  debounce: _propTypes2.default.number
};
VerifyField.defaultProps = {
  debounce: 200
};