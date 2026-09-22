/**
 * Asynchronously loads the component for LocaleToggle
 */

import loadable from '@/utils/loadable';

const LocaleToggleLoadable = loadable(() => import('./index'));

export default LocaleToggleLoadable;
