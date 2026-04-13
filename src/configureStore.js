/**
 * Create the store with dynamic reducers
 * Adapted from react-boilerplate for modern Redux Toolkit
 */

import { configureStore } from '@reduxjs/toolkit';
import createReducer from './reducers';

export default function configureAppStore(initialState = {}) {
  const store = configureStore({
    reducer: createReducer(),
    preloadedState: initialState,
    devTools: import.meta.env.DEV,
  });

  // Extensions
  store.injectedReducers = {}; // Reducer registry

  // Make reducers hot reloadable
  if (import.meta.hot) {
    import.meta.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
