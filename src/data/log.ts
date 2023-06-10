export const log = (message?: any, ...optionalParams: any[]) =>
  // eslint-disable-next-line no-console
  __DEV__ && console.log(message, ...optionalParams);
