import type { NavSectionConfig } from '@/types';
import { faCubes } from './navIcons';

const navigation: NavSectionConfig[] = [
  {
    id: 'dsa',
    label: 'DSA',
    icon: faCubes,
    basePath: '/dsa',
    color: '#c8714a',
    children: [
      { id: 'dsa-blind75', label: 'Blind 75', desc: 'Top 75 most asked interview problems', path: '/dsa/blind-75' },
      { id: 'dsa-top100', label: 'Top 100', desc: 'Most frequently asked coding questions', path: '/dsa/top-100' },
      { id: 'dsa-arrays', label: 'Arrays', desc: 'Sorting, sliding window, two pointers', path: '/dsa/arrays' },
      { id: 'dsa-linked-lists', label: 'Linked Lists', desc: 'Reversal, cycle detection, merge', path: '/dsa/linked-lists' },
      { id: 'dsa-trees', label: 'Trees', desc: 'BST, traversals, height problems', path: '/dsa/trees' },
      { id: 'dsa-graphs', label: 'Graphs', desc: 'BFS, DFS, shortest path algorithms', path: '/dsa/graphs' },
      { id: 'dsa-dp', label: 'Dynamic Programming', desc: 'Memoization, tabulation, patterns', path: '/dsa/dynamic-programming' },
    ],
  },
  // Temporarily disabled sidebar sections. Uncomment when ready to enable again.
  /*
  {
    id: 'system-design',
    label: 'System Design',
    icon: faSitemap,
    basePath: '/system-design',
    color: '#6ab4d4',
    children: [
      { id: 'sd-basics', label: 'Basic System Design', desc: 'Core concepts every engineer must know', path: '/system-design/basics' },
      { id: 'sd-fundamentals', label: 'Fundamentals', desc: 'Scalability, availability, consistency', path: '/system-design/fundamentals' },
      { id: 'sd-hld', label: 'High Level Design', desc: 'Architecture, components and data flow', path: '/system-design/hld' },
      { id: 'sd-lld', label: 'Low Level Design', desc: 'Classes, schemas, OOP design patterns', path: '/system-design/lld' },
      { id: 'sd-case-studies', label: 'Case Studies', desc: 'Design Twitter, Uber, WhatsApp and more', path: '/system-design/case-studies' },
    ],
  },
  {
    id: 'react',
    label: 'React',
    icon: faReact,
    basePath: '/react',
    color: '#61dafb',
    children: [
      { id: 'react-fundamentals', label: 'Fundamentals', desc: 'JSX, components, props, lifecycle', path: '/react/fundamentals' },
      { id: 'react-hooks', label: 'Hooks', desc: 'useState, useEffect, custom hooks', path: '/react/hooks' },
      { id: 'react-patterns', label: 'Patterns', desc: 'HOC, render props, compound components', path: '/react/patterns' },
      { id: 'react-performance', label: 'Performance', desc: 'Memoization, lazy loading, profiling', path: '/react/performance' },
    ],
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    icon: faJs,
    basePath: '/javascript',
    color: '#D4A853',
    children: [
      { id: 'js-core', label: 'Core Concepts', desc: 'Scope, hoisting, prototypes, this', path: '/javascript/core' },
      { id: 'js-async', label: 'Async Programming', desc: 'Promises, async/await, event loop', path: '/javascript/async' },
      { id: 'js-closures', label: 'Closures & Scope', desc: 'Lexical scope, closure patterns', path: '/javascript/closures' },
      { id: 'js-es6', label: 'ES6+ Features', desc: 'Destructuring, spread, modules, classes', path: '/javascript/es6' },
    ],
  },
  */
];

export default navigation;
