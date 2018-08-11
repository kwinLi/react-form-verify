'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enhanceHandler = exports.validate = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _patterns = require('./patterns');

var _validators = require('./validators');

var validate = exports.validate = function validate(value, rules) {
  var required = rules.required,
      number = rules.number,
      email = rules.email,
      url = rules.url,
      minLength = rules.minLength,
      maxLength = rules.maxLength,
      pattern = rules.pattern,
      validator = rules.validator;


  var string = value.toString();
  var customPattern = pattern && new RegExp(pattern);
  var validateResults = {
    isEmail: email && _patterns.EMAIL.test(string),
    isNumber: number && _patterns.NUMBER.test(string),
    isUrl: url && _patterns.URL.test(string),
    isRequired: required && (0, _validators.REQUIRED)(string, 0),
    isValidMinLength: minLength && minLength > 0 && (0, _validators.MIN_LENGTH)(string, minLength),
    isValidMaxLength: maxLength && maxLength > 0 && (0, _validators.MAX_LENGTH)(string, maxLength),
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
};

var enhanceHandler = exports.enhanceHandler = function enhanceHandler(handler, originalHandler) {
  if (originalHandler) {
    return function () {
      originalHandler.apply(undefined, arguments);
      handler();
    };
  }

  return handler;
};