/**
 * global-styles.js
 *
 * Global CSS-in-JS styles using Emotion (compatible with MUI)
 * Adapted from react-boilerplate
 */

import { css } from '@emotion/react';

const GlobalStyles = css`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
  }
`;

export default GlobalStyles;
