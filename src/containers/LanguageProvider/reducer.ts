/**
 * LanguageProvider reducer
 * Adapted from react-boilerplate for modern Redux (Immer built into RTK)
 */

import { CHANGE_LOCALE } from './constants';
import { DEFAULT_LOCALE } from '../../i18n';
import type { LanguageState, ChangeLocaleAction } from '../../types';
import type { UnknownAction } from '@reduxjs/toolkit';

export const initialState: LanguageState = {
  locale: DEFAULT_LOCALE,
};

const languageProviderReducer = (state: LanguageState = initialState, action: UnknownAction): LanguageState => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return { ...state, locale: (action as ChangeLocaleAction).locale };
    default:
      return state;
  }
};

export default languageProviderReducer;
