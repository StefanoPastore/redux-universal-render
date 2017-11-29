import {
  ADD_ACTION,
  PARSED_ACTION,
  ERROR_ACTION,
} from './actions';

export default (state = {
  run: false,
  end: true,
  actions: [],
  parsed: [],
  errors: {},
}, action) => {
  switch (action.type) {
    case ADD_ACTION:
      return {
        ...state,
        run: true,
        end: false,
        actions: [
          ...state.actions,
          action.name,
        ],
      };
    case PARSED_ACTION: {
      const actions = [...state.actions];
      actions.splice(actions.indexOf(action.name), 1);
      const parsed = [...state.parsed, action.name];
      const actionsCount = actions.length;
      const run = actionsCount > 0;

      return {
        ...state,
        run,
        end: !run,
        actions,
        parsed,
      };
    }
    case ERROR_ACTION: {
      const actions = [...state.actions];
      actions.splice(actions.indexOf(action.name), 1);
      const errors = { ...state.errors, [action.name]: action.error };
      const actionsCount = Object.keys(actions).length;
      const run = actionsCount > 0;

      return {
        ...state,
        run,
        end: !run,
        actions,
        errors,
      };
    }
    default:
      return state;
  }
};
