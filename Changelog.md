# Changelog

## RBP v4: "The One With Hooks (And Much More)" Edition (April 2019)

### News

React Boilerplate v4.0.0 is out and it's a doozy! Here are the highlights:

- React has added many new features and it's time for React Boilerplate to embrace them.
  - We now use `React.lazy` and `Suspense` for component lazy-loading instead of an external library.
  - We've added `useInjectSaga` and `useInjectReducer` hooks to manage saga and reducer injection. They're integrated into the generators and thus become the new defaults. (Should you need them, the HOCs are still there.)
  - The generators don't support classes anymore. The `PureComponent` vs `Component` choice was replaced with an option to wrap your component inside `React.memo`.
- After much deliberation, `Immutable.js` is finally gone. We've added `Immer` instead. With it, we can write very concise and readable reducers while sticking to native JavaScript data structures.
- Following the release of React Hooks, it's become even clearer that `react-testing-library` is now the industry-standard for React DOM testing. Workarounds for the incompatibilities between `enzyme` and `styled-components` are gone and we can now write leaner and more meaningful tests.

There are many more changes to our documentation, internals and general project setup. You can find a full changelog below.
