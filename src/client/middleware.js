import { parsed } from './selectors';

export default ({ getState }) => next => action => {
  if (
    typeof action === 'function' &&
    typeof action.asyncName !== 'undefined' &&
    parsed(getState()).indexOf(action.asyncName) !== -1
  ) {
    return null;
  }

  return next(action);
};
