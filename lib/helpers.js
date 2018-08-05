"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var processHandler = exports.processHandler = function processHandler(handler, originalHandler) {
  if (originalHandler) {
    return function () {
      originalHandler.apply(undefined, arguments);
      handler();
    };
  }

  return handler;
};