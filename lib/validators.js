"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var REQUIRED = exports.REQUIRED = function REQUIRED(string) {
  return string.trim().length > 0;
};

var MIN_LENGTH = exports.MIN_LENGTH = function MIN_LENGTH(string, length) {
  return [].concat(_toConsumableArray(string)).length >= length;
};

var MAX_LENGTH = exports.MAX_LENGTH = function MAX_LENGTH(string, length) {
  return [].concat(_toConsumableArray(string)).length <= length;
};