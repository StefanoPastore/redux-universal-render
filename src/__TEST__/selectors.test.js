import * as selectors from '../selectors';

describe('selectors', () => {
  it('should return in execution state', () => {
    expect(
      selectors.inExecution({ reduxUniversalRenderReducer: { run: true } })
    ).toEqual(
      true
    );
  });

  it('should return async actions is ended', () => {
    expect(
      selectors.isEnded({ reduxUniversalRenderReducer: { end: true } })
    ).toEqual(
      true
    );
  });

  it('should return async actions to parse', () => {
    const actions = ['test'];
    expect(
      selectors.actions({ reduxUniversalRenderReducer: { actions } })
    ).toEqual(
      actions
    );
  });

  it('should return async actions parsed', () => {
    const parsed = ['test'];
    expect(
      selectors.parsed({ reduxUniversalRenderReducer: { parsed } })
    ).toEqual(
      parsed
    );
  });

  it('should return async actions error', () => {
    const errors = { test: {} };
    expect(
      selectors.errors({ reduxUniversalRenderReducer: { errors } })
    ).toEqual(
      errors
    );
  });

  it('should return async action pending', () => {
    const name = 'test';
    const actions = [name];
    expect(
      selectors.isPending(name)({ reduxUniversalRenderReducer: { actions } })
    ).toBe(
      true
    );
  });

  it('should return async action parsed', () => {
    const name = 'test';
    const parsed = [name];
    const errors = { [name]: new Error('test') };
    expect(
      selectors.isParsed(name)({ reduxUniversalRenderReducer: { parsed, errors: {} } })
    ).toBe(
      true
    );
    expect(
      selectors.isParsed(name)({ reduxUniversalRenderReducer: { parsed: [], errors } })
    ).toBe(
      true
    );
  });

  it('should return async action error', () => {
    const name = 'test';
    const errors = { [name]: {} };
    expect(
      selectors.isError(name)({ reduxUniversalRenderReducer: { errors } })
    ).toBe(
      true
    );
  });
});
