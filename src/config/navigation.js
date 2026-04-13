import { faCubes, faSitemap, faReact, faJs } from './navIcons';

/**
 * Navigation configuration — single source of truth.
 * Each section supports nested items for expand/collapse.
 * Extend by adding objects to this array.
 */
const navigation = [
  {
    id: 'dsa',
    label: 'DSA',
    icon: faCubes,
    basePath: '/dsa',
    children: [
      { id: 'dsa-arrays', label: 'Arrays', path: '/dsa/arrays' },
      { id: 'dsa-linked-lists', label: 'Linked Lists', path: '/dsa/linked-lists' },
      { id: 'dsa-trees', label: 'Trees', path: '/dsa/trees' },
      { id: 'dsa-graphs', label: 'Graphs', path: '/dsa/graphs' },
      { id: 'dsa-dp', label: 'Dynamic Programming', path: '/dsa/dynamic-programming' },
    ],
  },
  {
    id: 'system-design',
    label: 'System Design',
    icon: faSitemap,
    basePath: '/system-design',
    children: [
      { id: 'sd-fundamentals', label: 'Fundamentals', path: '/system-design/fundamentals' },
      { id: 'sd-hld', label: 'High Level Design', path: '/system-design/hld' },
      { id: 'sd-lld', label: 'Low Level Design', path: '/system-design/lld' },
      { id: 'sd-case-studies', label: 'Case Studies', path: '/system-design/case-studies' },
    ],
  },
  {
    id: 'react',
    label: 'React',
    icon: faReact,
    basePath: '/react',
    children: [
      { id: 'react-fundamentals', label: 'Fundamentals', path: '/react/fundamentals' },
      { id: 'react-hooks', label: 'Hooks', path: '/react/hooks' },
      { id: 'react-patterns', label: 'Patterns', path: '/react/patterns' },
      { id: 'react-performance', label: 'Performance', path: '/react/performance' },
    ],
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    icon: faJs,
    basePath: '/javascript',
    children: [
      { id: 'js-core', label: 'Core Concepts', path: '/javascript/core' },
      { id: 'js-async', label: 'Async Programming', path: '/javascript/async' },
      { id: 'js-closures', label: 'Closures & Scope', path: '/javascript/closures' },
      { id: 'js-es6', label: 'ES6+ Features', path: '/javascript/es6' },
    ],
  },
];

export default navigation;
