const originalError = console.error;
const originalWarn = console.warn;

const KNOWN_EXTENSION_SPAM = [
  'A listener indicated an asynchronous response by returning true',
  'Could not establish connection. Receiving end does not exist',
  'express-utils.js',
  'AdobeClean',
  'chrome-extension://',
];

const shouldSuppress = (args: any[]) => {
  return args.some(arg => {
    if (typeof arg === 'string') {
      return KNOWN_EXTENSION_SPAM.some(spam => arg.includes(spam));
    }
    if (arg instanceof Error) {
      return KNOWN_EXTENSION_SPAM.some(spam => arg.message.includes(spam));
    }
    return false;
  });
};

export const initConsoleHelper = () => {
  console.error = (...args: any[]) => {
    if (shouldSuppress(args)) return;
    originalError(...args);
  };

  console.warn = (...args: any[]) => {
    if (shouldSuppress(args)) return;
    originalWarn(...args);
  };
};
