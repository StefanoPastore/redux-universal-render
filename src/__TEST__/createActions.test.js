import {
  createAsyncActions,
  createSyncActions,
} from '../createActions';

describe('createActions', () => {
  it('should create a sync action with object', () => {
    const type = 'TYPE';
    const asyncName = 'ASYNC_NAME';
    const expectedAction = {
      type,
      asyncName,
    };
    expect(createSyncActions(asyncName)({ type })()).toEqual(expectedAction);
  });

  it('should create a sync action with funcion', () => {
    const type = 'TYPE';
    const asyncName = 'ASYNC_NAME';
    const expectedAction = {
      type,
      asyncName,
    };
    const actionCreator = () => ({ type });
    expect(createSyncActions(asyncName)(actionCreator)()).toEqual(expectedAction);
  });

  it('should create an async action', () => {
    const asyncName = 'ASYNC_NAME';
    let count = 0;
    const asyncAction = () => count++;
    const created = createAsyncActions(asyncName)(asyncAction)();
    created();
    expect(count).toEqual(1);
    expect(created.asyncName).toEqual(asyncName);
  });
});
