/**
 * App actions
 *
 * Actions change things in your application.
 * Adapted from react-boilerplate.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { LOAD_REPOS, LOAD_REPOS_SUCCESS, LOAD_REPOS_ERROR } from './constants';
import type { LoadReposAction, LoadReposSuccessAction, LoadReposErrorAction, Repo } from '../../types';

export function loadRepos(): LoadReposAction {
  return {
    type: LOAD_REPOS,
  };
}

export function reposLoaded(repos: Repo[], username: string): LoadReposSuccessAction {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

export function repoLoadingError(error: Error): LoadReposErrorAction {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}
