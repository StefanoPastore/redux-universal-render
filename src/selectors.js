import { createSelector } from 'reselect';

export const getData = (state) => state.reduxUniversalRenderReducer;

export const inExecution = createSelector(getData, data => data.run);

export const isEnded = createSelector(getData, data => data.end);

export const actions = createSelector(getData, data => data.actions);

export const parsed = createSelector(getData, data => data.parsed);

export const errors = createSelector(getData, data => data.errors);

export const isPending = name => createSelector(getData,
  data => data.actions.indexOf(name) !== -1
);
export const isParsed = name => createSelector(getData,
  data => data.parsed.indexOf(name) !== -1 || !!data.errors[name]
);
export const isError = name => createSelector(getData,
  data => !!data.errors[name]
);
