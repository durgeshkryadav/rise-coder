/**
 * Dynamically injects a reducer
 * Adapted from react-boilerplate for modern React hooks
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 */

import { useEffect } from 'react';
import { useStore } from 'react-redux';
import type { Reducer } from '@reduxjs/toolkit';
import getInjectors from './reducerInjectors';
import type { AppStore } from '../types';

const useInjectReducer = ({ key, reducer }: { key: string; reducer: Reducer }) => {
  const store = useStore() as AppStore;
  useEffect(() => {
    getInjectors(store).injectReducer(key, reducer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export { useInjectReducer };
