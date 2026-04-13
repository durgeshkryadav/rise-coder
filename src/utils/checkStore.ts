/**
 * Validate the shape of redux store
 * Adapted from react-boilerplate
 */

import type { AppStore } from '../types';

export default function checkStore(store: AppStore) {
  const shape: Record<string, (val: unknown) => boolean> = {
    dispatch: val => typeof val === 'function',
    subscribe: val => typeof val === 'function',
    getState: val => typeof val === 'function',
    replaceReducer: val => typeof val === 'function',
    injectedReducers: val => typeof val === 'object',
  };

  const isValid = Object.keys(shape).every(key =>
    shape[key]((store as unknown as Record<string, unknown>)[key]),
  );

  if (!isValid) {
    throw new Error('(app/utils...) injectors: Expected a valid redux store');
  }
}
