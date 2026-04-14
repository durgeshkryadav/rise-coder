/**
 * GenericDataPanel.tsx — Shows the current data structure entries as a list.
 * Accepts a generic Record<string, string|number> and label.
 */

import React from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  data: Record<string, string | number>;
  label?: string;
}

export const GenericDataPanel: React.FC<Props> = ({ data, label = 'HashMap' }) => {
  const keys = Object.keys(data);

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
        maxHeight: '40vh',
        overflowY: 'auto',
      }}
    >
      <Typography sx={{ mb: 1, fontSize: 14, color: '#aaa' }}>{label}</Typography>

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
            <span style={{ color: '#00d4ff' }}>{String(data[k])}</span>
          </Box>
        ))
      )}
    </Box>
  );
};
