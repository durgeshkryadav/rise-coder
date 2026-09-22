/**
 * TopKFrequent3DPage.tsx — Full-page Top K Frequent Elements 3D visualizer.
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useGenericVisualizer } from '../hooks/useGenericVisualizer';
import {
  generateTopKFrequentSteps,
  TOP_K_FREQUENT_CODE,
  TOP_K_FREQUENT_LEGEND,
} from '../algorithms/topKFrequent';
import { Visualizer3DCanvas, ControlPanel } from '../components';
import { GenericCodePanel } from '../components/GenericCodePanel';
import { GenericDataPanel } from '../components/GenericDataPanel';
import { GenericLegendPanel } from '../components/GenericLegendPanel';

const DEFAULT_NUMS = [1, 1, 1, 2, 2, 3];
const DEFAULT_K = 2;

const TopKFrequent3DPage: React.FC = () => {
  const navigate = useNavigate();
  const { containerRef, state, actions } = useGenericVisualizer();
  const [numsInput, setNumsInput] = useState(DEFAULT_NUMS.join(', '));
  const [kInput, setKInput] = useState(String(DEFAULT_K));

  const load = useCallback(() => {
    const nums = numsInput
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));
    const k = parseInt(kInput, 10) || 1;
    if (nums.length < 1) return;
    const steps = generateTopKFrequentSteps(nums, k);
    actions.loadProblem(
      { values: nums, title: `k = ${k}`, arrayLabel: 'nums[]  —  Input Array' },
      steps,
      'count / buckets',
    );
  }, [numsInput, kInput, actions]);

  useEffect(() => {
    const t = setTimeout(load, 100);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = state.step;

  return (
    <Box sx={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', bgcolor: '#0a0a1a' }}>
      <Visualizer3DCanvas containerRef={containerRef} />

      <Box sx={topBarSx}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button size="small" onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />} sx={{ color: '#aaa', textTransform: 'none' }}>
            Back
          </Button>
          <Typography sx={titleSx}>Top K Frequent — 3D Walkthrough</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Typography sx={{ fontSize: 13, color: '#aaa' }}>Array:</Typography>
          <TextField size="small" value={numsInput} onChange={(e) => setNumsInput(e.target.value)} placeholder="e.g. 1,1,1,2,2,3" sx={inputSx} />
          <Typography sx={{ fontSize: 13, color: '#aaa' }}>k:</Typography>
          <TextField size="small" value={kInput} onChange={(e) => setKInput(e.target.value)} placeholder="2" sx={{ ...inputSx, width: 60 }} />
          <Button size="small" onClick={load} sx={loadBtnSx}>Load</Button>
        </Box>
      </Box>

      <GenericCodePanel codeLines={TOP_K_FREQUENT_CODE} activeLines={step?.codeLines} codeClass={step?.codeClass} />
      <GenericLegendPanel items={TOP_K_FREQUENT_LEGEND} />
      <GenericDataPanel data={step?.hashMap ?? {}} label="Frequency / Buckets" />

      <ControlPanel state={state} actions={actions} />
    </Box>
  );
};

export default TopKFrequent3DPage;

const topBarSx = {
  position: 'fixed' as const, top: 0, left: 0, right: 0, zIndex: 10,
  background: 'linear-gradient(180deg, rgba(10,10,30,0.95), rgba(10,10,30,0.7))',
  backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(100,100,255,0.15)',
  py: 1.5, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
};

const titleSx = {
  fontSize: 22, fontWeight: 700,
  background: 'linear-gradient(90deg, #00d4ff, #7b61ff, #ff6ec7)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
};

const inputSx = {
  width: 200,
  '& .MuiInputBase-root': { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', fontSize: 14 },
  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
};

const loadBtnSx = {
  background: 'linear-gradient(135deg, #7b61ff, #00d4ff)', color: '#fff', fontWeight: 600,
  borderRadius: '8px', px: 2, textTransform: 'none' as const, '&:hover': { transform: 'scale(1.06)' },
};
