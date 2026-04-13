/**
 * ComputationPanel.tsx — Right-side overlay showing the target − value = complement formula.
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import type { Computation } from '../algorithms/types';

interface Props {
  computation: Computation | null;
}

export const ComputationPanel: React.FC<Props> = ({ computation }) => {
  if (!computation) return null;
  const c = computation;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        right: 30,
        transform: 'translateY(-50%)',
        zIndex: 10,
        background: 'rgba(10,10,35,0.92)',
        borderRadius: '16px',
        p: '22px 28px',
        border: '1px solid rgba(255,200,0,0.3)',
        backdropFilter: 'blur(10px)',
        minWidth: 220,
        textAlign: 'center',
        boxShadow: '0 0 30px rgba(255,200,0,0.08)',
      }}
    >
      <Typography sx={{ mb: 1.5, fontSize: 12, color: '#777', letterSpacing: 2, textTransform: 'uppercase' }}>
        Computation
      </Typography>

      {/* Formula */}
      <Box sx={{ fontSize: 34, fontWeight: 700, my: 1, lineHeight: 1.4 }}>
        <span style={{ color: '#ffcc00' }}>{c.target}</span>
        <span style={{ color: '#666' }}> − </span>
        <span style={{ color: '#00d4ff' }}>{c.value}</span>
        <span style={{ color: '#666' }}> = </span>
        <span style={{ color: '#ff6ec7' }}>{c.complement}</span>
      </Box>

      {/* Complement result */}
      <Typography sx={{ fontSize: 12, color: '#777', mt: 1, letterSpacing: 1 }}>Complement</Typography>
      <Typography sx={{ fontSize: 28, fontWeight: 700, color: '#ff6ec7', my: 0.5 }}>{c.complement}</Typography>

      {/* Action */}
      <Box sx={{ fontSize: 13, mt: 1, color: '#ccc', lineHeight: 1.5 }}>
        {c.found ? (
          <>
            <span style={{ color: '#00ff88', fontSize: 15, fontWeight: 700 }}>✓ FOUND in HashMap!</span>
            <br />
            <span style={{ color: '#aaa' }}>at index </span>
            <span style={{ color: '#00d4ff', fontWeight: 700 }}>{c.foundIndex}</span>
          </>
        ) : c.storing ? (
          <>
            <span style={{ color: '#ff6ec7' }}>✗ Not in HashMap</span>
            <br />
            <span style={{ color: '#aaa' }}>Storing </span>
            <span style={{ color: '#ff6ec7', fontWeight: 700 }}>{c.value}</span>
            <span> → </span>
            <span style={{ color: '#00d4ff' }}>idx {c.index}</span>
          </>
        ) : (
          <span style={{ color: '#aaa' }}>Looking up in HashMap…</span>
        )}
      </Box>
    </Box>
  );
};
