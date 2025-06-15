export const DEFAULT_ERRORS = {
  unknownError: { code: 'danger', message: 'Unknown error. Please use offline analysis.' } as ValidationError,
  noConnection: { code: 'danger', message: 'Currently can not connect to Rest API. Please use offline analysis.' } as ValidationError
};
