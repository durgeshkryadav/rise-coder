/**
 * EncodeDecode3DPage.tsx — Full-page Encode and Decode Strings 3D visualizer.
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useGenericVisualizer } from '../hooks/useGenericVisualizer';
import {
  generateEncodeDecodeSteps,
  ENCODE_DECODE_CODE,
  ENCODE_DECODE_LEGEND,
} from '../algorithms/encodeDecode';
import { Visualizer3DCanvas, ControlPanel } from '../components';
import { GenericCodePanel } from '../components/GenericCodePanel';
import { GenericDataPanel } from '../components/GenericDataPanel';
import { GenericLegendPanel } from '../components/GenericLegendPanel';

const DEFAULT_STRS = ['hello', 'world'];

const EncodeDecode3DPage: React.FC = () => {
  const navigate = useNavigate();
  const { containerRef, state, actions } = useGenericVisualizer();
  const [strsInput, setStrsInput] = useState(DEFAULT_STRS.join(', '));

  const load = useCallback(() => {
    const strs = strsInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    if (strs.length < 1) return;
    const steps = generateEncodeDecodeSteps(strs);
    actions.loadProblem(
      { values: strs, arrayLabel: 'strs[]  —  Input Strings' },
      steps,
      'result  (string/list)',
    );
  }, [strsInput, actions]);

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
          <Typography sx={titleSx}>Encode & Decode — 3D Walkthrough</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Typography sx={{ fontSize: 13, color: '#aaa' }}>Strings:</Typography>
          <TextField size="small" value={strsInput} onChange={(e) => setStrsInput(e.target.value)} placeholder="hello, world" sx={{ ...inputSx, width: 280 }} />
          <Button size="small" onClick={load} sx={loadBtnSx}>Load</Button>
        </Box>
      </Box>

      <GenericCodePanel codeLines={ENCODE_DECODE_CODE} activeLines={step?.codeLines} codeClass={step?.codeClass} />
      <GenericLegendPanel items={ENCODE_DECODE_LEGEND} />
      <GenericDataPanel data={step?.hashMap ?? {}} label="result (string/list)" />

      <ControlPanel state={state} actions={actions} />
    </Box>
  );
};

export default EncodeDecode3DPage;

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
