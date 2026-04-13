/**
 * Test utilities and helpers
 * Adapted from react-boilerplate
 */

import { render, type RenderOptions } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import type { ReactNode, ReactElement } from 'react';
import type { AppStore } from '@/types';
import configureAppStore from '../configureStore';
import { translationMessages, DEFAULT_LOCALE } from '../i18n';

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: string;
  store?: AppStore;
  route?: string;
}

/**
 * Render a component with all required providers for testing
 */
export function renderWithProviders(
  ui: ReactElement,
  {
    locale = DEFAULT_LOCALE,
    store = configureAppStore(),
    route = '/',
    ...renderOptions
  }: RenderWithProvidersOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
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
