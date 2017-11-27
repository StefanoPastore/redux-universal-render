import reducer from '../reducer';
import * as actions from '../actions';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      run: false,
      end: true,
      actions: [],
      parsed: [],
      errors: {},
    });
  });

  it('should return async action add', () => {
    const name = 'test';
    expect(
      reducer({
        run: false,
        end: true,
        actions: [],
      }, actions.addAction(name))
    ).toEqual({
      run: true,
      end: false,
      actions: [name],
    });
  });

  it('should return async action removed from actions and added in parsed', () => {
    const name = 'test';
    expect(
      reducer({
        run: true,
        end: false,
        actions: [name],
        parsed: [],
        errors: {},
      }, actions.parsedActionActionCreator(name))
    ).toEqual({
      run: false,
      end: true,
      actions: [],
      parsed: [name],
      errors: {},
    });
  });

  it('should return async action removed from actions and added in error', () => {
    const name = 'test';
    const error = new Error('test');
    expect(
      reducer({
        run: true,
        end: false,
        actions: [name],
        parsed: [],
        errors: {},
      }, actions.errorActionActionCreator(name, error))
    ).toEqual({
      run: false,
      end: true,
      actions: [],
      parsed: [],
      errors: { [name]: error },
    });
  });
});
