/**
 * Reducer injectors factory
 * Adapted from react-boilerplate
 */

import type { Reducer } from '@reduxjs/toolkit';
import checkStore from './checkStore';
import createReducer from '../reducers';
import type { AppStore } from '../types';

export function injectReducerFactory(store: AppStore, isValid: boolean) {
  return function injectReducer(key: string, reducer: Reducer) {
    if (!isValid) checkStore(store);

    if (typeof key !== 'string' || !key) {
      throw new Error('(app/utils...) injectReducer: Expected `key` to be a non empty string');
    }
    if (typeof reducer !== 'function') {
      throw new Error('(app/utils...) injectReducer: Expected `reducer` to be a reducer function');
    }

    // Check `store.injectedReducers[key] === reducer` for hot reloading
    // when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    ) {
      return;
    }

    store.injectedReducers[key] = reducer;
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store: AppStore) {
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
