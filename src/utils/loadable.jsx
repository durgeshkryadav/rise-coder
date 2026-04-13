import { lazy, Suspense } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator';

/**
 * loadable — Lazy-load wrapper with fallback.
 * Pattern from react-boilerplate's app/utils/loadable.js.
 *
 * Usage: const MyPage = loadable(() => import('./MyPage'));
 */
const loadable = (importFunc, { fallback = <LoadingIndicator /> } = {}) => {
  const LazyComponent = lazy(importFunc);

  return function LoadableWrapper(props) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

export default loadable;
