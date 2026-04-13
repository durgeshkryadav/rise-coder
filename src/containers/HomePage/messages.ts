/**
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 * Adapted from react-boilerplate for RiseCoders.
 */
import { defineMessages } from 'react-intl';

export const scope = 'risecoder.containers.HomePage';

export default defineMessages({
  welcomeHeader: {
    id: `${scope}.welcome.header`,
    defaultMessage: 'Welcome to RiseCoders',
  },
  welcomeMessage: {
    id: `${scope}.welcome.message`,
    defaultMessage:
      'Your comprehensive platform for mastering DSA, System Design, React, and JavaScript.',
  },
  startHeader: {
    id: `${scope}.start.header`,
    defaultMessage: 'Start Learning',
  },
  startMessage: {
    id: `${scope}.start.message`,
    defaultMessage: 'Choose a topic from the sidebar to begin your journey.',
  },
});
