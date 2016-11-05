## Redux Universal render

[![Coverage Status](https://coveralls.io/repos/github/StefanoPastore/redux-universal-render/badge.svg?branch=develop)](https://coveralls.io/github/StefanoPastore/redux-universal-render?branch=develop)

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
