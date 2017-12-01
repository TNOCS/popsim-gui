export const clone = (model: Object) => { return JSON.parse(JSON.stringify(model)); };

/**
 * Timeout decorator for methods
 * @see https://medium.com/front-end-hacking/javascript-make-your-code-cleaner-with-decorators-d34fc72af947
 * @param milliseconds
 */
export const timeout = (milliseconds = 0) => {
  return function (target: any, key: any, descriptor: any) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      setTimeout(() => {
        originalMethod.apply(this, args);
      }, milliseconds);
    };
    return descriptor;
  };
};

export const pad = (n: number, width = 2, z = '0') => {
  const str = `${n}`;
  return str.length >= width ? str : new Array(width - str.length + 1).join(z) + n;
};

/**
 * Clean the object and remove empty properties.
 *
 * @see https://stackoverflow.com/a/286162/319711
 * @param { {[key: string]: any} } obj
 */
export const clean = (obj: { [key: string]: any }) => {
  const propNames = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
};

/**
 * Create a GUID
 * @see https://stackoverflow.com/a/2117523/319711
 *
 * @returns RFC4122 version 4 compliant GUID
 */
export const uuid4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // tslint:disable-next-line:no-bitwise
    const r = Math.random() * 16 | 0;
    // tslint:disable-next-line:no-bitwise
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};