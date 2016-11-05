import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import {
  reduxUniversalRender,
} from '../';
import configurestore from './renderUtils/store';
import Test from './renderUtils/Test';

jest.useRealTimers();

describe('render', () => {
  it('should not call render without complete action', (done) => {
    const store = configurestore();

    const render = (<Provider store={store}>
      <Test async />
    </Provider>);
    reduxUniversalRender(
      store,
      render,
      () => {
        renderToString(render);
        done();
        expect(
          store.getState().reducer
        ).toEqual({
          count: 1,
          run: true,
        });
      }
    );
  });

  it('should call render without async action', () => {
    const store = configurestore();

    const render = (<Provider store={store}>
      <Test async={false} />
    </Provider>);
    reduxUniversalRender(
      store,
      render,
      () => {
        renderToString(render);
        expect(
          store.getState().reducer
        ).toEqual({
          count: 0,
          run: false,
        });
      }
    );
  });
});
