import {
  asyncInitActionCreator,
  asyncEndActionCreator,
  asyncAddActionActionCreator,
  asyncPasrsedActionActionCreator,
} from './actions';
import { inExecution, actions, parsed } from './selectors';

export default ({ dispatch, getState }) => next => action => {
  if (
    typeof action === 'function' &&
    typeof action.asyncName !== 'undefined' &&
    parsed(getState()).indexOf(action.asyncName) !== -1
  ) {
    return null;
  }

  if (typeof action === 'function' && typeof action.asyncName !== 'undefined') {
    dispatch(asyncAddActionActionCreator(action.asyncName));

    if (!inExecution(getState())) dispatch(asyncInitActionCreator());
  } else if (typeof action.asyncName !== 'undefined') {
    dispatch(asyncPasrsedActionActionCreator(action.asyncName));

    setTimeout(() => {
      if (actions(getState()).length === 0) {
        dispatch(asyncEndActionCreator());
      }
    }, 0);
  }

  return next(action);
};
