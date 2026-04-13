/**
 * Dynamically injects a reducer
 * Adapted from react-boilerplate for modern React hooks
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 */

import { useEffect } from 'react';
import { useStore } from 'react-redux';
import getInjectors from './reducerInjectors';

const useInjectReducer = ({ key, reducer }) => {
  const store = useStore();
  useEffect(() => {
    getInjectors(store).injectReducer(key, reducer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export { useInjectReducer };
