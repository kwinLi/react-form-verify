import { NUMBER, EMAIL, URL } from './patterns';
import { REQUIRED, MIN_LENGTH, MAX_LENGTH } from './validators';

export const validate = (value, rules) => {
  const {
    required,
    number,
    email,
    url,
    minLength,
    maxLength,
    pattern,
    validator
  } = rules;

  const string = value.toString();
  const customPattern = pattern && new RegExp(pattern);
  const validateResults = {
    isEmail: email && EMAIL.test(string),
    isNumber: number && NUMBER.test(string),
    isUrl: url && URL.test(string),
    isRequired: required && REQUIRED(string, 0),
    isValidMinLength: minLength && minLength > 0 && MIN_LENGTH(string, minLength),
    isValidMaxLength: maxLength && maxLength > 0 && MAX_LENGTH(string, maxLength),
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

export const enhanceHandler = (handler, originalHandler) => {
  if (originalHandler) {
    return function(...params) {
      originalHandler(...params);
      handler();
    }
  }

  return handler;
}
