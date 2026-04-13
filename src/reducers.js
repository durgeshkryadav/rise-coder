/**
 * Combine all reducers in this file and export the combined reducers.
 * Adapted from react-boilerplate for modern Redux Toolkit.
 */

import { combineReducers } from '@reduxjs/toolkit';
import languageProviderReducer from './containers/LanguageProvider/reducer';

/**
 * Merges the main reducer with dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
