import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import {
  reduxUniversalRenderMiddleware,
  reduxUniversalRenderReducer,
} from '../../';
import thunk from 'redux-thunk';
import reducer from './reducer';

const configureStore = (initialState = {}) => createStore(
  combineReducers({
    reducer,
    reduxUniversalRenderReducer,
  }),
  initialState,
  compose(
    applyMiddleware(
      reduxUniversalRenderMiddleware,
      thunk
    )
  )
);

export default configureStore;
