import createActions from '../createActions';

const fakeStore = ({
  actions = [],
  parsed = [],
  errors = {},
} = {}) => ({
  reduxUniversalRenderReducer: {
    actions,
    parsed,
    errors,
  },
});

describe('createActions', () => {
  it('should create action with function name and receive getState', () => {
    const getName = jest.fn().mockReturnValue('test');
    const getState = jest.fn().mockReturnValue(fakeStore());
    const fn = createActions(getName, () => {});
    fn(() => {}, getState);
    expect(getName).toHaveBeenCalledWith(getState);
  });

  it('should create action and call it', () => {
    const name = 'test';
    const action = jest.fn();
    const dispatch = jest.fn();
    const fn = createActions(name, action);
    fn(dispatch, () => fakeStore());
    expect(dispatch).toHaveBeenCalled();
  });

  it('should create throw action and call it', () => {
    const name = 'test';
    const action = () => { throw new Error('test'); };
    const fn = createActions(name, action);
    const dispatch = (a) => {
      if (typeof a === 'function') a();
    };
    expect(
      fn(dispatch, () => fakeStore())
    ).toThrowError();
  });

  it('should create action already parsed', () => {
    const name = 'test';
    const dispatch = jest.fn();
    const fn = createActions(name, () => {});
    fn(dispatch, () => fakeStore({ parsed: [name] }));
    expect(dispatch).not.toHaveBeenCalled();
  });
});
