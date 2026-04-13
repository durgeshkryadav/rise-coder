import { lazy, Suspense, type ComponentType, type ReactNode } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator';

/**
 * loadable — Lazy-load wrapper with fallback.
 * Pattern from react-boilerplate's app/utils/loadable.js.
 *
 * Usage: const MyPage = loadable(() => import('./MyPage'));
 */

interface LoadableOptions {
  fallback?: ReactNode;
}

function loadable<P extends Record<string, unknown>>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  { fallback = <LoadingIndicator /> }: LoadableOptions = {},
): ComponentType<P> {
  const LazyComponent = lazy(importFunc);

  return function LoadableWrapper(props: P) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export default loadable;
