## Redux Universal render

[![Build Status](https://travis-ci.org/StefanoPastore/redux-universal-render.svg?branch=master)](https://travis-ci.org/StefanoPastore/redux-universal-render) [![Coverage Status](https://coveralls.io/repos/github/StefanoPastore/redux-universal-render/badge.svg?branch=develop)](https://coveralls.io/github/StefanoPastore/redux-universal-render?branch=develop)

### Dependencies
[redux-thunk](https://github.com/gaearon/redux-thunk)

### Why you need?
It is necessary because you must wait data is loaded before render page on server side.

### Usage
This module supply for you middleware, reducer and render function to apply on server and client.

Example store config:

```js
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import {
  reduxUniversalRenderReducer,
  reduxUniversalRenderMiddleware,
} from 'redux-universal-render';
import thunk from 'redux-thunk';
import reducers from './reducers';

const initialState = {};

const store = createStore(
  combineReducers({
    ...reducers,
    reduxUniversalRenderReducer,
  }),
  initialState,
  compose(
    applyMiddleware(
      reduxUniversalRenderMiddleware,
      thunk
    ),
  )
);
```

Example server side rendering:

```js
import { reduxUniversalRender } from 'redux-universal-render';

match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    const render = <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>;
    reduxUniversalRender(
      store,
      render,
      () => {
        const content = renderToString(render);
        const page = renderToStaticMarkup(
          <HTML content={content} />
        );

        res.send(`<!doctype html>\n${page}`);
      }
    );
  });
});
```

Example actions creators:

```js
import { createAsyncActions, createSyncActions } from 'redux-universal-render';

const asyncName = 'asyncName';

export const ASYNC_ACTION = 'ASYNC_ACTION';
export const syncActionCreator = (createSyncActions(asyncName)({ type: ASYNC_ACTION }));

const asyncAction = dispatch => {
  setTimeout(() => {
    dispatch(syncActionCreator());
  }, 200);
};

export const asyncActionCreator = (createAsyncActions(asyncName)(asyncAction));
```

### Remember
Remember apply middleware before redux-thunk.

### API
 - createAsyncActions: It is a function that receive univocal name for async function it return another function that receive async function to call to append `asyncName` and return last function and it is your action creator, it receive `dispatch` and `getState` as first arguments and your own arguments will Appends,

 - createSyncActions: It is a function that receive univocal name to recognize which async action is ended, return another function that receive actionCreator or action object, if receive an actionCreator when you call last function you can pass your own arguments to your actionCreator,

 - reduxUniversalRender: it is a function that receive `store`, component to render and callback called when all async actions are ended and you can render components with data fetching, you can also customize render function if pass as last arument default `renderToStaticMarkup`.
