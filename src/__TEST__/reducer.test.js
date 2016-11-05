import reducer from '../reducer';
import * as actions from '../actions';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      run: false,
      end: false,
      actions: [],
      parsed: [],
    });
  });

  it('should return async fetching init', () => {
    expect(
      reducer({ run: false }, actions.asyncInitActionCreator())
    ).toEqual({
      run: true,
    });
  });

  it('should return async fetching end', () => {
    expect(
      reducer({ run: true, end: false }, actions.asyncEndActionCreator())
    ).toEqual({
      run: false,
      end: true,
    });
  });

  it('should return async action add', () => {
    const asyncName = 'test';
    expect(
      reducer({ actions: [] }, actions.asyncAddActionActionCreator(asyncName))
    ).toEqual({
      actions: [asyncName],
    });
  });

  it('should return async action removed from actions and added in parsed', () => {
    const asyncName = 'test';
    expect(
      reducer({ actions: [asyncName], parsed: [] }, actions.asyncPasrsedActionActionCreator(asyncName))
    ).toEqual({
      actions: [],
      parsed: [asyncName],
    });
  });
});
