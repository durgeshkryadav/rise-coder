/**
 * ProductExceptSelf3DPage.tsx — Full-page Product of Array Except Self 3D visualizer.
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useGenericVisualizer } from '../hooks/useGenericVisualizer';
import {
  generateProductExceptSelfSteps,
  PRODUCT_EXCEPT_SELF_CODE,
  PRODUCT_EXCEPT_SELF_LEGEND,
} from '../algorithms/productExceptSelf';
import { Visualizer3DCanvas, ControlPanel } from '../components';
import { GenericCodePanel } from '../components/GenericCodePanel';
import { GenericDataPanel } from '../components/GenericDataPanel';
import { GenericLegendPanel } from '../components/GenericLegendPanel';

const DEFAULT_NUMS = [1, 2, 3, 4];

const ProductExceptSelf3DPage: React.FC = () => {
  const navigate = useNavigate();
  const { containerRef, state, actions } = useGenericVisualizer();
  const [numsInput, setNumsInput] = useState(DEFAULT_NUMS.join(', '));

  const load = useCallback(() => {
    const nums = numsInput
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));
    if (nums.length < 2) return;
    const steps = generateProductExceptSelfSteps(nums);
    actions.loadProblem(
      { values: nums, arrayLabel: 'nums[]  —  Input Array' },
      steps,
      'Result Array',
    );
  }, [numsInput, actions]);

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
          <Typography sx={titleSx}>Product Except Self — 3D Walkthrough</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Typography sx={{ fontSize: 13, color: '#aaa' }}>Array:</Typography>
          <TextField size="small" value={numsInput} onChange={(e) => setNumsInput(e.target.value)} placeholder="e.g. 1,2,3,4" sx={inputSx} />
          <Button size="small" onClick={load} sx={loadBtnSx}>Load</Button>
        </Box>
      </Box>

      <GenericCodePanel codeLines={PRODUCT_EXCEPT_SELF_CODE} activeLines={step?.codeLines} codeClass={step?.codeClass} timeComplexity="O(n)" spaceComplexity="O(1)" />
      <GenericLegendPanel items={PRODUCT_EXCEPT_SELF_LEGEND} />
      <GenericDataPanel data={step?.hashMap ?? {}} label="Result Array" />

      <ControlPanel state={state as any} actions={actions as any} />
    </Box>
  );
};

export default ProductExceptSelf3DPage;

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
