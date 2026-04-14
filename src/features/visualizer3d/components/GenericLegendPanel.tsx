/**
 * GenericLegendPanel.tsx — Configurable color legend for any algorithm.
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import type { LegendItem } from '../algorithms/generic-types';

interface Props {
  items: LegendItem[];
}

export const GenericLegendPanel: React.FC<Props> = ({ items }) => (
  <Box
    sx={{
      position: 'fixed',
      top: 75,
      right: 20,
      zIndex: 10,
      background: 'rgba(10,10,30,0.85)',
      borderRadius: '12px',
      p: '14px 18px',
      border: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(8px)',
      fontSize: 13,
    }}
  >
    <Typography sx={{ mb: 1, fontSize: 14, color: '#aaa' }}>Legend</Typography>
    {items.map((it) => (
      <Box key={it.label} sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 0.5 }}>
        <Box sx={{ width: 16, height: 16, borderRadius: '4px', bgcolor: it.color }} />
        <span style={{ color: '#ccc' }}>{it.label}</span>
      </Box>
    ))}
  </Box>
);
