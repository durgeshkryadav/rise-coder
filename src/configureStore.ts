/**
 * Create the store with dynamic reducers
 * Adapted from react-boilerplate for modern Redux Toolkit
 */

import { configureStore } from '@reduxjs/toolkit';
import createReducer from './reducers';
import type { AppStore, InjectedReducersMap } from './types';

export default function configureAppStore(initialState: Record<string, unknown> = {}) {
  const store = configureStore({
    reducer: createReducer(),
    preloadedState: initialState,
    devTools: import.meta.env.DEV,
  }) as unknown as AppStore;

  // Extensions
  store.injectedReducers = {} as InjectedReducersMap; // Reducer registry

  // Make reducers hot reloadable
  if (import.meta.hot) {
    import.meta.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
