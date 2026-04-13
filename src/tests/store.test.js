/**
 * Test store configuration
 * Adapted from react-boilerplate
 */

import configureAppStore from '../configureStore';

describe('configureStore', () => {
  it('should return a store with injectedReducers object', () => {
    const store = configureAppStore();
    expect(store.injectedReducers).toBeDefined();
    expect(typeof store.injectedReducers).toBe('object');
  });

  it('should return a store with dispatch function', () => {
    const store = configureAppStore();
    expect(typeof store.dispatch).toBe('function');
  });

  it('should return a store with getState function', () => {
    const store = configureAppStore();
    expect(typeof store.getState).toBe('function');
  });
});
