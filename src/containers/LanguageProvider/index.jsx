/**
 * LanguageProvider
 *
 * This component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `src/translations`)
 *
 * Adapted from react-boilerplate for modern React hooks + Redux Toolkit
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { makeSelectLocale } from './selectors';

export default function LanguageProvider({ messages, children }) {
  const locale = useSelector(makeSelectLocale());

  return (
    <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};
