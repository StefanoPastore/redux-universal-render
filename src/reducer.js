import {
  ASYNC_INIT,
  ASYNC_END,
  ASYNC_ADD_ACTION,
  ASYNC_PARSED_ACTION,
} from './actions';

export default (state = {
  run: false,
  end: false,
  actions: [],
  parsed: [],
}, action) => {
  switch (action.type) {
    case ASYNC_INIT:
      return {
        ...state,
        run: true,
      };
    case ASYNC_END:
      return {
        ...state,
        end: true,
        run: false,
      };
    case ASYNC_ADD_ACTION:
      return {
        ...state,
        actions: [
          ...state.actions,
          action.name,
        ],
      };
    case ASYNC_PARSED_ACTION:
      return (() => {
        const actions = state.actions;
        actions.splice(actions.indexOf(action.name), 1);

        const parsed = [
          ...state.parsed,
          action.name,
        ];

        return {
          ...state,
          actions,
          parsed,
        };
      })();
    default:
      return state;
  }
};
