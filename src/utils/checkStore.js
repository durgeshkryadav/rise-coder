/**
 * Validate the shape of redux store
 * Adapted from react-boilerplate
 */

export default function checkStore(store) {
  const shape = {
    dispatch: val => typeof val === 'function',
    subscribe: val => typeof val === 'function',
    getState: val => typeof val === 'function',
    replaceReducer: val => typeof val === 'function',
    injectedReducers: val => typeof val === 'object',
  };

  const isValid = Object.keys(shape).every(key =>
    shape[key](store[key]),
  );

  if (!isValid) {
    throw new Error('(app/utils...) injectors: Expected a valid redux store');
  }
}
