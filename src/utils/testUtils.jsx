/**
 * Test utilities and helpers
 * Adapted from react-boilerplate
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureAppStore from '../configureStore';
import { translationMessages, DEFAULT_LOCALE } from '../i18n';

/**
 * Render a component with all required providers for testing
 */
export function renderWithProviders(
  ui,
  {
    locale = DEFAULT_LOCALE,
    store = configureAppStore(),
    route = '/',
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <IntlProvider locale={locale} messages={translationMessages[locale]}>
          <MemoryRouter initialEntries={[route]}>
            {children}
          </MemoryRouter>
        </IntlProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
