export const ASYNC_INIT = 'ASYNC_INIT';
export const ASYNC_END = 'ASYNC_END';
export const ASYNC_ADD_ACTION = 'ASYNC_ADD_ACTION';
export const ASYNC_PARSED_ACTION = 'ASYNC_PARSED_ACTION';

export const asyncInitActionCreator = () => ({ type: ASYNC_INIT });
export const asyncEndActionCreator = () => ({ type: ASYNC_END });
export const asyncAddActionActionCreator = (name) => ({ type: ASYNC_ADD_ACTION, name });
export const asyncPasrsedActionActionCreator = (name) => ({ type: ASYNC_PARSED_ACTION, name });
