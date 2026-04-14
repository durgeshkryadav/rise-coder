/**
 * GenericCodePanel.tsx — Configurable code panel for any algorithm.
 * Receives code lines and line-map as props.
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import type { CodeLine } from '../algorithms/generic-types';

interface Props {
  codeLines: CodeLine[];
  activeLines?: number[];
  codeClass?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
}

export const GenericCodePanel: React.FC<Props> = ({
  codeLines,
  activeLines = [],
  codeClass = 'active',
  timeComplexity = 'O(n)',
  spaceComplexity = 'O(n)',
}) => (
  <Box
    sx={{
      position: 'fixed',
      top: 75,
      left: 20,
      zIndex: 10,
      background: 'rgba(8,8,24,0.92)',
      borderRadius: '12px',
      p: '14px 18px',
      border: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(8px)',
      minWidth: 270,
      maxWidth: 360,
      maxHeight: '55vh',
      overflowY: 'auto',
    }}
  >
    <Typography sx={{ mb: 1, fontSize: 13, color: '#888', letterSpacing: 1, textTransform: 'uppercase' }}>
      Algorithm
    </Typography>

    <Box
      component="pre"
      sx={{
        fontFamily: "'Cascadia Code','Fira Code','Consolas',monospace",
        fontSize: 13,
        lineHeight: 1.85,
        color: '#c9d1d9',
        whiteSpace: 'pre',
        m: 0,
      }}
    >
      {codeLines.map((line) => {
        const isActive = activeLines.includes(line.num);
        const variant = isActive ? codeClass : '';
        return (
          <Box
            component="span"
            key={line.num}
            sx={{
              display: 'block',
              px: 1,
              borderRadius: '5px',
              borderLeft: '3px solid transparent',
              transition: 'background 0.3s, border-color 0.3s',
              ...(variant === 'active' && {
                background: 'rgba(255,200,0,0.13)',
                borderLeftColor: '#ffcc00',
                color: '#fff',
              }),
              ...(variant === 'found' && {
                background: 'rgba(0,255,136,0.13)',
                borderLeftColor: '#00ff88',
                color: '#fff',
              }),
              ...(variant === 'store' && {
                background: 'rgba(255,110,199,0.12)',
                borderLeftColor: '#ff6ec7',
              }),
            }}
          >
            {line.text}
          </Box>
        );
      })}
    </Box>

    <Box sx={{ display: 'flex', gap: 2, mt: 1, pt: 1, borderTop: '1px solid rgba(255,255,255,0.07)', fontSize: 12, color: '#888' }}>
      <span>Time: <strong style={{ color: '#00d4ff' }}>{timeComplexity}</strong></span>
      <span>Space: <strong style={{ color: '#00d4ff' }}>{spaceComplexity}</strong></span>
    </Box>
  </Box>
);
