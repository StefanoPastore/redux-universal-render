import { createAsyncActions, createSyncActions } from '../../';

const asyncName = 'test';

export const ASYNC_ACTION = 'ASYNC_ACTION';
export const syncActionCreator = () => (createSyncActions(asyncName)({ type: ASYNC_ACTION }));

const asyncAction = dispatch => {
  setTimeout(() => {
    dispatch(syncActionCreator());
  }, 200);
};

export const asyncActionCreator = () => (createAsyncActions(asyncName)(asyncAction));
