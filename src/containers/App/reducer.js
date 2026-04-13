/**
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state.
 * Adapted from react-boilerplate.
 */

import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REPOS:
      return {
        ...state,
        loading: true,
        error: false,
        userData: { ...state.userData, repositories: false },
      };

    case LOAD_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.username,
        userData: { ...state.userData, repositories: action.repos },
      };

    case LOAD_REPOS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default appReducer;
