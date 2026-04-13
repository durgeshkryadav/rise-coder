/**
 * Visualizer3DCanvas.tsx — Mounts the Three.js renderer via ref.
 * Literally just a full-size <div> for the engine to attach to.
 */

import React from 'react';
import { Box } from '@mui/material';

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const Visualizer3DCanvas: React.FC<Props> = ({ containerRef }) => (
  <Box
    ref={containerRef}
    sx={{
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      '& canvas': { display: 'block' },
    }}
  />
);
