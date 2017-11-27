import * as actions from '../actions';

jest.useFakeTimers();

describe('actions', () => {
  it('should create an action to init async fetching', () => {
    const name = 'test';
    const expectedAction = {
      type: actions.ADD_ACTION,
      name,
    };
    expect(actions.addAction(name)).toEqual(expectedAction);
    expect(actions.addAction).toThrowError();
  });

  it('should create an action to set action fetched', () => {
    const name = 'test';
    const fn = actions.parsedAction(name);
    expect(typeof fn).toBe('function');
    const dispatch = jest.fn();
    fn(dispatch);
    jest.runAllTimers();
    expect(dispatch).toHaveBeenCalledWith({
      type: actions.PARSED_ACTION,
      name,
    });
    expect(actions.parsedAction()).toThrowError();
  });

  it('should create an action to set error for action', () => {
    const name = 'test';
    const error = new Error('test');
    const fn = actions.errorAction(name, error);
    expect(typeof fn).toBe('function');
    const dispatch = jest.fn();
    fn(dispatch);
    jest.runAllTimers();
    expect(dispatch).toHaveBeenCalledWith({
      type: actions.ERROR_ACTION,
      name,
      error,
    });
    expect(actions.errorAction()).toThrow();
  });
});
