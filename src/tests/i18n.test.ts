/**
 * i18n test
 * Adapted from react-boilerplate
 */

import { formatTranslationMessages, translationMessages } from '../i18n';

describe('i18n', () => {
  it('should have English translations', () => {
    expect(translationMessages.en).toBeDefined();
  });

  it('should have German translations', () => {
    expect(translationMessages.de).toBeDefined();
  });

  it('formatTranslationMessages should return formatted messages', () => {
    const messages = { test: 'hello' };
    const result = formatTranslationMessages('en', messages);
    expect(result.test).toBe('hello');
  });
});
