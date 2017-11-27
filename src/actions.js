export const ADD_ACTION = 'REDUX_UNIVERSAL_RENDER/ADD_ACTION';
export const PARSED_ACTION = 'REDUX_UNIVERSAL_RENDER/PARSED_ACTION';
export const ERROR_ACTION = 'REDUX_UNIVERSAL_RENDER/ERROR_ACTION';

export const parsedActionActionCreator = (name) => ({ type: PARSED_ACTION, name });
export const errorActionActionCreator = (name, error) => ({ type: ERROR_ACTION, name, error });

export const addAction = (name) => {
  if (!name) {
    throw new Error('ReduxUniversalRender: Missing name param to addAction.');
  }

  return { type: ADD_ACTION, name };
};
export const parsedAction = (name) => (dispatch) => {
  if (!name) {
    throw new Error('ReduxUniversalRender: Missing name param to parsedAction.');
  }
  setTimeout(() => dispatch(parsedActionActionCreator(name)), 0);
};
export const errorAction = (name, error) => (dispatch) => {
  if (!name) {
    throw new Error('ReduxUniversalRender: Missing name param to errorAction.');
  }

  setTimeout(() => dispatch(errorActionActionCreator(name, error)), 0);
};
