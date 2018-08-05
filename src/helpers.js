export const processHandler = (handler, originalHandler) => {
  if (originalHandler) {
    return function(...params) {
      originalHandler(...params);
      handler();
    }
  }

  return handler;
}
