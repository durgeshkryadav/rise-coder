/**
 * Header Messages
 *
 * This contains all the text for the Header component.
 * Adapted from react-boilerplate for RiseCoders.
 */
import { defineMessages } from 'react-intl';

export const scope = 'risecoder.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  features: {
    id: `${scope}.features`,
    defaultMessage: 'Features',
  },
  tagline: {
    id: `${scope}.tagline`,
    defaultMessage: 'Learn. Build. Rise.',
  },
});
