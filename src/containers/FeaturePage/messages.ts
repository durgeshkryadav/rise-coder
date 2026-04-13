/**
 * FeaturePage Messages
 *
 * This contains all the text for the FeaturePage component.
 * Adapted from react-boilerplate for RiseCoders.
 */
import { defineMessages } from 'react-intl';

export const scope = 'risecoder.containers.FeaturePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Features',
  },
  dsaHeader: {
    id: `${scope}.dsa.header`,
    defaultMessage: 'Data Structures & Algorithms',
  },
  dsaMessage: {
    id: `${scope}.dsa.message`,
    defaultMessage:
      'Master arrays, linked lists, trees, graphs, and dynamic programming with interactive examples and visualizations.',
  },
  systemDesignHeader: {
    id: `${scope}.systemDesign.header`,
    defaultMessage: 'System Design',
  },
  systemDesignMessage: {
    id: `${scope}.systemDesign.message`,
    defaultMessage:
      'Learn fundamentals, high-level design, low-level design, and real-world case studies for scalable systems.',
  },
  reactHeader: {
    id: `${scope}.react.header`,
    defaultMessage: 'React Mastery',
  },
  reactMessage: {
    id: `${scope}.react.message`,
    defaultMessage:
      'Deep dive into React fundamentals, hooks, patterns, and performance optimization techniques.',
  },
  javascriptHeader: {
    id: `${scope}.javascript.header`,
    defaultMessage: 'JavaScript Deep Dive',
  },
  javascriptMessage: {
    id: `${scope}.javascript.message`,
    defaultMessage:
      'Understand core concepts, async programming, closures & scope, and modern ES6+ features.',
  },
  intlHeader: {
    id: `${scope}.i18n.header`,
    defaultMessage: 'Internationalization (i18n)',
  },
  intlMessage: {
    id: `${scope}.i18n.message`,
    defaultMessage:
      'Scalable apps need to support multiple languages, easily add and support multiple languages with react-intl.',
  },
});
