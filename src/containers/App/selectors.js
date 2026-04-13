/**
 * The global state selectors
 * Adapted from react-boilerplate
 */

import { initialState } from './reducer';

const selectGlobal = (state) => state.global || initialState;

const makeSelectCurrentUser = () => (state) => selectGlobal(state).currentUser;

const makeSelectLoading = () => (state) => selectGlobal(state).loading;

const makeSelectError = () => (state) => selectGlobal(state).error;

const makeSelectRepos = () => (state) => selectGlobal(state).userData.repositories;

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
};
