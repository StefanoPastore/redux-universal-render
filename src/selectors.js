import { createSelector } from 'reselect';

export const getData = (state) => state.reduxUniversalRenderReducer;

export const inExecution = createSelector(getData, data => data.run);

export const isEnded = createSelector(getData, data => data.end);

export const actions = createSelector(getData, data => data.actions);

export const parsed = createSelector(getData, data => data.parsed);
