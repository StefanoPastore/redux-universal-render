import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { awaitRender } from '../';
import configurestore from './renderUtils/store';
import Test from './renderUtils/Test';

jest.useRealTimers();

describe('render', () => {
  it('should throw error without required parameters', () => {
    expect(() => awaitRender({})).toThrow();
  });

  it('should not call render without complete action', (done) => {
    const store = configurestore();

    const render = (<Provider store={store}>
      <Test async />
    </Provider>);
    awaitRender({
      store,
      render,
      cb: () => {
        renderToString(render);
        expect(store.getState().reducer).toEqual({ count: 1, run: true });
        done();
      },
    });
  });

  it('should call render without async action', () => {
    const store = configurestore();

    const render = (<Provider store={store}>
      <Test async={false} />
    </Provider>);
    awaitRender({
      store,
      render,
      cb: () => {
        renderToString(render);
        expect(store.getState().reducer).toEqual({ count: 0, run: false });
      },
    });
  });
});
