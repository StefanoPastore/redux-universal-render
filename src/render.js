import { inExecution, isEnded } from './selectors';
import walkComponentTree from './walkComponentTree';

const awaitRender = ({
  store,
  render,
  cb,
}) => {
  if (!store || !cb) throw new Error('ReduxUniversalRender: Store is required in render!');

  const { getState, subscribe } = store;

  walkComponentTree(render);

  if (inExecution(getState())) {
    const unsubscribe = subscribe(() => {
      if (isEnded(getState())) {
        unsubscribe();
        awaitRender({ store, render, cb });
      }
    });
  } else {
    cb();
  }
};

export default awaitRender;
