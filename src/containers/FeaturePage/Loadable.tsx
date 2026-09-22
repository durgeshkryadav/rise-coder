/**
 * Asynchronously loads the component for FeaturePage
 */

import loadable from '@/utils/loadable';
import LoadingIndicator from '@/components/LoadingIndicator';

const FeaturePageLoadable = loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});

export default FeaturePageLoadable;
