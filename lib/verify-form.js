'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerifyForm = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VerifyForm = exports.VerifyForm = function (_React$Component) {
  _inherits(VerifyForm, _React$Component);

  function VerifyForm(props) {
    _classCallCheck(this, VerifyForm);

    var _this = _possibleConstructorReturn(this, (VerifyForm.__proto__ || Object.getPrototypeOf(VerifyForm)).call(this, props));

    _this.state = {
      isDirty: false,
      allValidateResults: {}
    };

    _this.collectValidateResults = _this.collectValidateResults.bind(_this);
    return _this;
  }

  _createClass(VerifyForm, [{
    key: 'collectValidateResults',
    value: function collectValidateResults(fieldValidateResults) {
      this.setState(function (prevState) {
        var allValidateResults = _extends({}, prevState.allValidateResults, fieldValidateResults);
        var allResults = Object.values(allValidateResults);
        var isDirty = prevState.isDirty || fieldValidateResults.isDirty || allResults.some(function (_ref) {
          var isDirty = _ref.isDirty;
          return isDirty;
        });
        var isInvalid = fieldValidateResults.isInvalid || allResults.some(function (_ref2) {
          var isInvalid = _ref2.isInvalid;
          return isInvalid;
        });
        var isValid = !isInvalid;

        return {
          isDirty: isDirty,
          isValid: isValid,
          isInvalid: isInvalid,
          allValidateResults: allValidateResults
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          isDirty = _state.isDirty,
          isValid = _state.isValid,
          isInvalid = _state.isInvalid,
          allValidateResults = _state.allValidateResults;


      return this.props.children({
        isDirty: isDirty,
        isValid: isValid,
        isInvalid: isInvalid,
        form: allValidateResults,
        collect: this.collectValidateResults
      });
    }
  }]);

  return VerifyForm;
}(_react2.default.Component);

VerifyForm.propTypes = {
  children: _propTypes2.default.func.isRequired
};