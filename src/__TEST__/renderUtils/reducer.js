import {
  ASYNC_ACTION,
} from './actions';

const reducer = (state = {
  count: 0,
  run: false,
}, action) => {
  switch (action.type) {
    case ASYNC_ACTION:
      return {
        ...state,
        count: state.count + 1,
        run: true,
      };
    default:
      return state;
  }
};

export default reducer;
