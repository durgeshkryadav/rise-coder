/**
 * HashMapPanel.tsx — Shows the current HashMap entries as a list.
 */

import React from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  hashMap: Record<string, number>;
}

export const HashMapPanel: React.FC<Props> = ({ hashMap }) => {
  const keys = Object.keys(hashMap);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 120,
        left: 20,
        zIndex: 10,
        background: 'rgba(10,10,30,0.85)',
        borderRadius: '12px',
        p: '14px 18px',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)',
        minWidth: 180,
        maxHeight: '60vh',
        overflowY: 'auto',
      }}
    >
      <Typography sx={{ mb: 1, fontSize: 14, color: '#aaa' }}>HashMap</Typography>

      {keys.length === 0 ? (
        <Typography sx={{ color: '#555', fontStyle: 'italic', fontSize: 13 }}>Empty</Typography>
      ) : (
        keys.map((k) => (
          <Box
            key={k}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 1.5,
              py: 0.5,
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              fontSize: 13,
              animation: 'fadeInEntry 0.3s ease',
              '@keyframes fadeInEntry': {
                from: { opacity: 0, transform: 'translateY(-5px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <span style={{ color: '#ff6ec7' }}>{k}</span>
            <span style={{ color: '#666' }}>→</span>
            <span style={{ color: '#00d4ff' }}>index {hashMap[k]}</span>
          </Box>
        ))
      )}
    </Box>
  );
};
