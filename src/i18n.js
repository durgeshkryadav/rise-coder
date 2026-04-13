/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for the app.
 *
 * Adapted from react-boilerplate for modern React with react-intl v6+
 */

import enTranslationMessages from './translations/en.json';
import deTranslationMessages from './translations/de.json';

const DEFAULT_LOCALE = 'en';

const appLocales = ['en', 'de'];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  de: formatTranslationMessages('de', deTranslationMessages),
};

export { appLocales, formatTranslationMessages, translationMessages, DEFAULT_LOCALE };
