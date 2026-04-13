/**
 * LanguageProvider selectors
 * Adapted from react-boilerplate
 */

import { initialState } from './reducer';
import type { RootState, LanguageState } from '../../types';

const selectLanguage = (state: RootState): LanguageState => state.language || initialState;

const makeSelectLocale = () => (state: RootState) => selectLanguage(state).locale;

export { selectLanguage, makeSelectLocale };
