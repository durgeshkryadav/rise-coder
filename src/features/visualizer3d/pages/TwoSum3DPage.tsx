/**
 * TwoSum3DPage.tsx — Full-page Two Sum 3D visualizer.
 *
 * Composes the Three.js canvas, control panel, code panel,
 * hashmap panel, computation panel, legend panel, and top input bar.
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useVisualizer } from '../hooks/useVisualizer';
import { generateTwoSumSteps } from '../algorithms/twoSum';
import {
  Visualizer3DCanvas,
  ControlPanel,
  CodePanel,
  HashMapPanel,
  ComputationPanel,
  LegendPanel,
} from '../components';

const DEFAULT_NUMS = [2, 7, 11, 15];
const DEFAULT_TARGET = 9;

const TwoSum3DPage: React.FC = () => {
  const navigate = useNavigate();
  const { containerRef, state, actions } = useVisualizer();

  const [numsInput, setNumsInput] = useState(DEFAULT_NUMS.join(', '));
  const [targetInput, setTargetInput] = useState(String(DEFAULT_TARGET));

  const load = useCallback(() => {
    const nums = numsInput
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));
    const target = parseInt(targetInput, 10) || 0;
    if (nums.length < 2) return;
    actions.loadProblem(nums, target, generateTwoSumSteps);
  }, [numsInput, targetInput, actions]);

  // Auto-load on mount
  useEffect(() => {
    // Small delay to let the engine mount
    const t = setTimeout(load, 100);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = state.step;

  return (
    <Box sx={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', bgcolor: '#0a0a1a' }}>
      {/* ── Three.js Canvas ── */}
      <Visualizer3DCanvas containerRef={containerRef} />

      {/* ── Top Panel ── */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          background: 'linear-gradient(180deg, rgba(10,10,30,0.95), rgba(10,10,30,0.7))',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(100,100,255,0.15)',
          py: 1.5,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            size="small"
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIcon />}
            sx={{ color: '#aaa', textTransform: 'none' }}
          >
            Back
          </Button>
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 700,
              background: 'linear-gradient(90deg, #00d4ff, #7b61ff, #ff6ec7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Two Sum — 3D Walkthrough
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Typography sx={{ fontSize: 13, color: '#aaa' }}>Array:</Typography>
          <TextField
            size="small"
            value={numsInput}
            onChange={(e) => setNumsInput(e.target.value)}
            placeholder="e.g. 2,7,11,15"
            sx={inputSx}
          />
          <Typography sx={{ fontSize: 13, color: '#aaa' }}>Target:</Typography>
          <TextField
            size="small"
            value={targetInput}
            onChange={(e) => setTargetInput(e.target.value)}
            placeholder="9"
            sx={{ ...inputSx, width: 70 }}
          />
          <Button
            size="small"
            onClick={load}
            sx={{
              background: 'linear-gradient(135deg, #7b61ff, #00d4ff)',
              color: '#fff',
              fontWeight: 600,
              borderRadius: '8px',
              px: 2,
              textTransform: 'none',
              '&:hover': { transform: 'scale(1.06)' },
            }}
          >
            Load
          </Button>
        </Box>
      </Box>

      {/* ── Side Panels ── */}
      <CodePanel
        stepType={step?.type ?? null}
        codeLines={step?.codeLines}
        isStoring={step?.computation?.storing}
      />
      <LegendPanel />
      <HashMapPanel hashMap={step?.hashMap ?? {}} />
      <ComputationPanel computation={step?.computation ?? null} />

      {/* ── Bottom Controls ── */}
      <ControlPanel state={state} actions={actions} />
    </Box>
  );
};

export default TwoSum3DPage;

const inputSx = {
  width: 180,
  '& .MuiInputBase-root': {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: 14,
  },
  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
  '& .MuiInputBase-root:focus-within': { borderColor: '#7b61ff' },
};
