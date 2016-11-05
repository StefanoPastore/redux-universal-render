## Redux Universal render

### Dependencies
[redux-thunk](https://github.com/gaearon/redux-thunk)

### Why you need?
It is necessary because you must wait data is loaded before render page on server side for crawler and speed page for user that view it.

### Usage
This module supply for you two middleware, one reducer and render function to apply on server and client.

Example store config:

```js
import { createStore, compose, applyMiddleware } from 'redux';
import {
  reduxUniversalRenderReducer,
  reduxUniversalRenderServer,
  reduxUniversalRenderClient
} from 'redux-universal-render';
import thunk from 'redux-thunk';
import reducers from './reducers';

const initialState = {};

const store = createStore(
  {
    ...reducers,
    reduxUniversalRenderReducer,
  },
  initialState,
  compose(
    applyMiddleware(
      typeof window === 'undefined' ? reduxUniversalRenderServer : reduxUniversalRenderClient, // check in server or in client
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
### Remember
Remember apply middleware before redux-thunk.
