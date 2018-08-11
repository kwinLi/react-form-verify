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

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VerifyField = exports.VerifyField = function (_React$Component) {
  _inherits(VerifyField, _React$Component);

  function VerifyField(props) {
    _classCallCheck(this, VerifyField);

    var _this = _possibleConstructorReturn(this, (VerifyField.__proto__ || Object.getPrototypeOf(VerifyField)).call(this, props));

    var name = props.name,
        delegate = props.delegate,
        onFocus = props.onFocus,
        onBlur = props.onBlur,
        debounceTime = props.debounce;


    _this.state = name && delegate ? {} : _extends({
      isDirty: false
    }, (0, _helpers.validate)(props.value, props));

    _this.validateAfterUpdate = (0, _lodash2.default)(_this.validateAfterUpdate.bind(_this), debounceTime);
    _this.onFocus = (0, _helpers.enhanceHandler)(_this.handleFocus.bind(_this), onFocus);
    _this.onBlur = (0, _helpers.enhanceHandler)(_this.handleBlur.bind(_this), onBlur);
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
    key: 'validateAfterUpdate',
    value: function validateAfterUpdate() {
      var _props = this.props,
          value = _props.value,
          name = _props.name,
          formCollectValidateResults = _props.delegate;

      var validateResults = _extends({}, (0, _helpers.validate)(value, this.props), {
        isDirty: true
      });

      if (name && formCollectValidateResults) {
        formCollectValidateResults(_defineProperty({}, name, validateResults));
      } else {
        this.setState(validateResults);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props2 = this.props,
          value = _props2.value,
          name = _props2.name,
          formCollectValidateResults = _props2.delegate;

      name && formCollectValidateResults && formCollectValidateResults(_defineProperty({}, name, _extends({}, (0, _helpers.validate)(value, this.props), {
        isDirty: false
      })));
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
      var _props3 = this.props,
          required = _props3.required,
          number = _props3.number,
          email = _props3.email,
          url = _props3.url,
          minLength = _props3.minLength,
          maxLength = _props3.maxLength,
          pattern = _props3.pattern,
          validator = _props3.validator,
          focus = _props3.focus,
          blur = _props3.blur,
          debounce = _props3.debounce,
          children = _props3.children,
          delegate = _props3.delegate,
          tail = _objectWithoutProperties(_props3, ['required', 'number', 'email', 'url', 'minLength', 'maxLength', 'pattern', 'validator', 'focus', 'blur', 'debounce', 'children', 'delegate']);

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
  debounce: _propTypes2.default.number,
  children: _propTypes2.default.func.isRequired,
  delegate: _propTypes2.default.func
};
VerifyField.defaultProps = {
  debounce: 200
};