import { addAction, parsedAction, errorAction } from './actions';
import { isPending, isParsed } from './selectors';

export default (getName, action) => async (dispatch, getState) => {
  const name = typeof getName === 'function' ? getName(getState) : getName;
  if (isPending(name)(getState()) || isParsed(name)(getState())) return;

  dispatch(addAction(name));

  try {
    await dispatch(action);
    dispatch(parsedAction(name));
  } catch (e) {
    dispatch(errorAction(name, e));
  }
};
