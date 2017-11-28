import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { reducer as reduxUniversalRenderReducer } from '../../';
import thunk from 'redux-thunk';
import reducer from './reducer';

const configureStore = (initialState = {}) => createStore(
  combineReducers({ reducer, reduxUniversalRenderReducer }),
  initialState,
  compose(applyMiddleware(thunk))
);

export default configureStore;
