/**
 * ControlPanel.tsx — Bottom panel: step explanation + Prev/Next/Auto/Reset
 */

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
/** Minimal shape used by ControlPanel (Two Sum + generic algorithm pages). */
export interface ControlPanelState {
  currentStep: number;
  totalSteps: number;
  step: { text?: string } | null;
  isPlaying: boolean;
}

export interface ControlPanelActions {
  next: () => void;
  prev: () => void;
  reset: () => void;
  togglePlay: () => void;
}

interface Props {
  state: ControlPanelState;
  actions: ControlPanelActions;
}

export const ControlPanel: React.FC<Props> = ({ state, actions }) => {
  const { currentStep, totalSteps, step, isPlaying } = state;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        background: 'linear-gradient(0deg, rgba(10,10,30,0.97), rgba(10,10,30,0.7))',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(100,100,255,0.15)',
        py: 2,
        px: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      <Typography
        sx={{
          fontSize: 18,
          textAlign: 'center',
          minHeight: 28,
          lineHeight: 1.5,
          maxWidth: 900,
          color: '#e0e0e0',
          '& .hl-blue': { color: '#00d4ff', fontWeight: 700 },
          '& .hl-green': { color: '#00ff88', fontWeight: 700 },
          '& .hl-pink': { color: '#ff6ec7', fontWeight: 700 },
          '& .hl-yellow': { color: '#ffcc00', fontWeight: 700 },
        }}
        dangerouslySetInnerHTML={{
          __html: step?.text ?? 'Press <strong>Next Step</strong> to begin the algorithm walkthrough.',
        }}
      />

      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Button
          variant="outlined"
          size="small"
          disabled={currentStep <= 0}
          onClick={actions.prev}
          startIcon={<SkipPreviousIcon />}
          sx={btnSx}
        >
          Prev
        </Button>
        <Button
          variant="contained"
          size="small"
          disabled={currentStep >= totalSteps - 1}
          onClick={actions.next}
          startIcon={<SkipNextIcon />}
          sx={{ ...btnSx, background: 'linear-gradient(135deg, #7b61ff, #5a3fd6)', borderColor: '#7b61ff' }}
        >
          Next Step
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={actions.togglePlay}
          startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          sx={btnSx}
        >
          {isPlaying ? 'Pause' : 'Auto'}
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={actions.reset}
          startIcon={<RestartAltIcon />}
          sx={btnSx}
        >
          Reset
        </Button>
      </Box>

      <Typography sx={{ fontSize: 13, color: '#888' }}>
        Step {currentStep + 1} / {totalSteps}
      </Typography>
    </Box>
  );
};

const btnSx = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: '10px',
  px: 2.5,
  py: 1,
  color: '#fff',
  fontSize: 14,
  fontWeight: 500,
  textTransform: 'none' as const,
  '&:hover': { background: 'rgba(123,97,255,0.3)', borderColor: '#7b61ff' },
  '&.Mui-disabled': { opacity: 0.3 },
};
