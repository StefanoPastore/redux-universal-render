export const createAsyncActions = name => method => {
  const externalMethod = method;
  externalMethod.asyncName = typeof name === 'function' ? name() : name;
  return externalMethod;
};

export const createSyncActions = name => action => {
  const getName = typeof name === 'function' ? name : () => name;

  if (typeof action === 'function') {
    return { ...action(), asyncName: getName() };
  }

  return { ...action, asyncName: getName() };
};
