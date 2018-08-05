export const REQUIRED = (string) => string.trim().length > 0;

export const MIN_LENGTH = (string, length) => [...string].length >= length;

export const MAX_LENGTH = (string, length) => [...string].length <= length;
