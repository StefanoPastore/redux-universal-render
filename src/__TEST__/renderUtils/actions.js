import { addAction, parsedAction } from '../../actions';
import { isParsed } from '../../selectors';
const asyncName = 'test';

export const ASYNC_ACTION = 'ASYNC_ACTION';
export const syncActionCreator = () => ({ type: ASYNC_ACTION });

export const asyncAction = () => async (dispatch, getState) => {
  if (isParsed(asyncName)(getState())) return;

  dispatch(addAction(asyncName));

  await new Promise((resolve) => {
    setTimeout(() => {
      dispatch(syncActionCreator());
      dispatch(parsedAction(asyncName));
      resolve();
    }, 200);
  });
};
