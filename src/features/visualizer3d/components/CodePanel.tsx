/**
 * CodePanel.tsx — Fixed panel showing the algorithm's Python pseudocode
 * with per-step line highlighting.
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import type { StepType } from '../algorithms/types';

const CODE_LINES = [
  { num: 1, text: 'def twoSum(nums, target):' },
  { num: 2, text: '    seen = {}' },
  { num: 3, text: '    for i, val in enumerate(nums):' },
  { num: 4, text: '        complement = target - val' },
  { num: 5, text: '        if complement in seen:' },
  { num: 6, text: '            return [seen[complement], i]' },
  { num: 7, text: '        seen[val] = i' },
  { num: 8, text: '    return []' },
];

const LINE_MAP: Record<string, { lines: number[]; cls: string }> = {
  intro: { lines: [1, 2], cls: 'active' },
  explain: { lines: [3], cls: 'active' },
  check: { lines: [3, 4, 5], cls: 'active' },
  store: { lines: [7], cls: 'store' },
  found: { lines: [5, 6], cls: 'found' },
  no_answer: { lines: [8], cls: 'active' },
};

interface Props {
  stepType: StepType | null;
  codeLines?: number[];
  isStoring?: boolean;
}

export const CodePanel: React.FC<Props> = ({ stepType, codeLines, isStoring }) => {
  const entry = stepType ? LINE_MAP[stepType] : null;
  let activeLines = entry?.lines ?? [];
  const cls = entry?.cls ?? 'active';

  // When storing on a check step, also highlight line 7
  if (stepType === 'check' && isStoring) {
    activeLines = [...activeLines, 7];
  }

  // If step supplies explicit codeLines, prefer those
  if (codeLines && codeLines.length > 0) {
    activeLines = codeLines;
  }

  return (
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
        {CODE_LINES.map((line) => {
          const isActive = activeLines.includes(line.num);
          const variant = isActive ? cls : '';
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
        <span>Time: <strong style={{ color: '#00d4ff' }}>O(n)</strong></span>
        <span>Space: <strong style={{ color: '#00d4ff' }}>O(n)</strong></span>
      </Box>
    </Box>
  );
};
