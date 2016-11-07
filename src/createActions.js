export const createAsyncActions = name => method => (...args) => {
  const asyncMethod = (...thunkArgs) => method(...thunkArgs, ...args);
  asyncMethod.asyncName = name;
  return asyncMethod;
};

export const createSyncActions = name => action => (...args) => {
  if (typeof action === 'function') {
    return { ...action(...args), asyncName: name };
  }

  return { ...action, asyncName: name };
};
