/**
 * LanguageProvider actions
 * Adapted from react-boilerplate
 */

import { CHANGE_LOCALE } from './constants';
import type { ChangeLocaleAction } from '../../types';

export function changeLocale(languageLocale: string): ChangeLocaleAction {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}
