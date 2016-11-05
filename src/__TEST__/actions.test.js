import * as actions from '../actions';

describe('actions', () => {
  it('should create an action to init async fetching', () => {
    const expectedAction = {
      type: actions.ASYNC_INIT,
    };
    expect(actions.asyncInitActionCreator()).toEqual(expectedAction);
  });

  it('should create an action to init async fetching', () => {
    const expectedAction = {
      type: actions.ASYNC_END,
    };
    expect(actions.asyncEndActionCreator()).toEqual(expectedAction);
  });

  it('should create an action to init async fetching', () => {
    const name = 'test';
    const expectedAction = {
      type: actions.ASYNC_ADD_ACTION,
      name,
    };
    expect(actions.asyncAddActionActionCreator(name)).toEqual(expectedAction);
  });

  it('should create an action to init async fetching', () => {
    const name = 'test';
    const expectedAction = {
      type: actions.ASYNC_PARSED_ACTION,
      name,
    };
    expect(actions.asyncPasrsedActionActionCreator(name)).toEqual(expectedAction);
  });
});
