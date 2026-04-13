/**
 * The global state selectors
 * Adapted from react-boilerplate
 */

import { initialState } from './reducer';
import type { RootState, AppState } from '../../types';

const selectGlobal = (state: RootState): AppState => (state.global as AppState) || initialState;

const makeSelectCurrentUser = () => (state: RootState) => selectGlobal(state).currentUser;

const makeSelectLoading = () => (state: RootState) => selectGlobal(state).loading;

const makeSelectError = () => (state: RootState) => selectGlobal(state).error;

const makeSelectRepos = () => (state: RootState) => selectGlobal(state).userData.repositories;

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
};
