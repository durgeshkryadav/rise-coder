/**
 * LanguageProvider selectors
 * Adapted from react-boilerplate
 */

import { initialState } from './reducer';

const selectLanguage = (state) => state.language || initialState;

const makeSelectLocale = () => (state) => selectLanguage(state).locale;

export { selectLanguage, makeSelectLocale };
