import { renderToStaticMarkup } from 'react-dom/server';
import { inExecution, isEnded } from './selectors';

export default (
  store,
  render,
  cb = () => {},
  renderMethod = renderToStaticMarkup
) => {
  if (!store) throw new Error('ReduxUniversalRender: Store is required in render!');

  renderMethod(render);

  if (inExecution(store.getState())) {
    const unsubscribe = store.subscribe(() => {
      if (isEnded(store.getState())) {
        unsubscribe();

        cb();
      }
    });
  } else {
    cb();
  }
};
