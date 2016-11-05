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
    ).toEqual(true);
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
});
