import {
  asyncInitActionCreator,
  asyncEndActionCreator,
  asyncAddActionActionCreator,
  asyncPasrsedActionActionCreator,
} from './actions';
import { inExecution, actions } from './selectors';

export default ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function' && typeof action.asyncName !== 'undefined') {
    dispatch(asyncAddActionActionCreator(action.asyncName));

    if (!inExecution(getState())) dispatch(asyncInitActionCreator());
  } else if (typeof action.asyncName !== 'undefined') {
    dispatch(asyncPasrsedActionActionCreator(action.asyncName));

    if (actions(getState()).length === 0) {
      dispatch(asyncEndActionCreator());
    }
  }

  return next(action);
};
