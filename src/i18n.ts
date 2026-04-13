/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for the app.
 *
 * Adapted from react-boilerplate for modern React with react-intl v6+
 */

import enTranslationMessages from './translations/en.json';
import deTranslationMessages from './translations/de.json';
import type { TranslationMessages } from './types';

const DEFAULT_LOCALE = 'en';

const appLocales: string[] = ['en', 'de'];

const formatTranslationMessages = (locale: string, messages: Record<string, string>): Record<string, string> => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages: Record<string, string>, key: string): Record<string, string> => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {} as Record<string, string>);
};

const translationMessages: TranslationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  de: formatTranslationMessages('de', deTranslationMessages),
};

export { appLocales, formatTranslationMessages, translationMessages, DEFAULT_LOCALE };
