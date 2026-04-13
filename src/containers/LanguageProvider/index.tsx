/**
 * LanguageProvider
 *
 * This component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `src/translations`)
 *
 * Adapted from react-boilerplate for modern React hooks + Redux Toolkit
 */

import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import type { TranslationMessages } from '@/types';
import { makeSelectLocale } from './selectors';

interface LanguageProviderProps {
  messages: TranslationMessages;
  children: ReactNode;
}

export default function LanguageProvider({ messages, children }: LanguageProviderProps) {
  const locale = useSelector(makeSelectLocale());

  return (
    <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
}
