/**
 * productExceptSelf.ts — Step generator for Product of Array Except Self (two-pass approach).
 */

import type { GenericStep, GenericCubeState } from './generic-types';

export function generateProductExceptSelfSteps(nums: number[]): GenericStep[] {
  const steps: GenericStep[] = [];
  const n = nums.length;

  steps.push({
    type: 'intro',
    text: `Array [${nums.join(', ')}]. Strategy: two passes — left products, then right products. No division allowed.`,
    cubeStates: nums.map(() => 'default' as GenericCubeState),
    pointer: -1,
    hashMap: {},
    hashMapLabel: 'Result Array',
    codeLines: [1, 2],
    codeClass: 'active',
  });

  steps.push({
    type: 'explain',
    text: 'Pass 1 (left→right): result[i] = product of all elements to the LEFT. Pass 2 (right→left): multiply by product of all to the RIGHT.',
    cubeStates: nums.map(() => 'default' as GenericCubeState),
    pointer: -1,
    hashMap: {},
    hashMapLabel: 'Result Array',
    codeLines: [3],
    codeClass: 'active',
  });

  // Phase 1: Left pass
  const result = new Array(n).fill(1);
  let leftProduct = 1;

  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];

    const cs: GenericCubeState[] = nums.map((_, idx) =>
      idx < i ? 'left_pass' : idx === i ? 'checking' : 'default',
    );

    const hmObj: Record<string, string | number> = {};
    result.forEach((v, idx) => { hmObj[`[${idx}]`] = v; });

    steps.push({
      type: 'left_pass',
      text: `Left pass: i=${i}, result[${i}] = leftProduct = ${result[i]}. Then leftProduct *= ${nums[i]} → ${leftProduct}`,
      cubeStates: [...cs],
      pointer: i,
      hashMap: { ...hmObj },
      hashMapLabel: 'Result Array  (left pass)',
      computation: {
        lines: [
          `Pass 1: Left→Right`,
          `result[${i}] = ${result[i]}`,
          `leftProduct = ${leftProduct}`,
        ],
      },
      extraArrays: [{
        label: 'result[]',
        values: [...result],
        states: result.map((_, idx) => (idx <= i ? 'left_pass' : 'default') as GenericCubeState),
      }],
      codeLines: [4, 5],
      codeClass: 'active',
    });
  }

  // Phase 2: Right pass
  let rightProduct = 1;

  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];

    const cs: GenericCubeState[] = nums.map((_, idx) =>
      idx > i ? 'right_pass' : idx === i ? 'checking' : 'left_pass',
    );

    const hmObj: Record<string, string | number> = {};
    result.forEach((v, idx) => { hmObj[`[${idx}]`] = v; });

    steps.push({
      type: 'right_pass',
      text: `Right pass: i=${i}, result[${i}] *= rightProduct → ${result[i]}. Then rightProduct *= ${nums[i]} → ${rightProduct}`,
      cubeStates: [...cs],
      pointer: i,
      hashMap: { ...hmObj },
      hashMapLabel: 'Result Array  (right pass)',
      computation: {
        lines: [
          `Pass 2: Right←Left`,
          `result[${i}] = ${result[i]}`,
          `rightProduct = ${rightProduct}`,
        ],
      },
      extraArrays: [{
        label: 'result[]',
        values: [...result],
        states: result.map((_, idx) =>
          (idx === i ? 'result' : idx < i ? 'left_pass' : 'right_pass') as GenericCubeState,
        ),
      }],
      codeLines: [7, 8],
      codeClass: 'store',
    });
  }

  // Final result
  const finalHm: Record<string, string | number> = {};
  result.forEach((v, idx) => { finalHm[`[${idx}]`] = v; });

  steps.push({
    type: 'result',
    text: `Done! Product except self: [${result.join(', ')}] ✓`,
    cubeStates: nums.map(() => 'result' as GenericCubeState),
    pointer: -1,
    hashMap: { ...finalHm },
    hashMapLabel: 'Result Array',
    computation: {
      lines: ['Both passes complete!'],
      resultLine: `[${result.join(', ')}]`,
      resultColor: '#00ff88',
    },
    extraArrays: [{
      label: 'result[]  — FINAL',
      values: [...result],
      states: result.map(() => 'result' as GenericCubeState),
    }],
    answer: result,
    codeLines: [9],
    codeClass: 'found',
  });

  return steps;
}

export const PRODUCT_EXCEPT_SELF_CODE = [
  { num: 1, text: 'def productExceptSelf(nums):' },
  { num: 2, text: '    n = len(nums)' },
  { num: 3, text: '    result = [1] * n' },
  { num: 4, text: '    left = 1' },
  { num: 5, text: '    for i in range(n):' },
  { num: 6, text: '        result[i] = left; left *= nums[i]' },
  { num: 7, text: '    right = 1' },
  { num: 8, text: '    for i in range(n-1, -1, -1):' },
  { num: 9, text: '        result[i] *= right; right *= nums[i]' },
  { num: 10, text: '    return result' },
];

export const PRODUCT_EXCEPT_SELF_LEGEND = [
  { color: '#4466ff', label: 'Default' },
  { color: '#ff9f1c', label: 'Checking' },
  { color: '#00d4ff', label: 'Left Pass Done' },
  { color: '#ff9f1c', label: 'Right Pass Done' },
  { color: '#00ff88', label: 'Final Result' },
  { color: '#ffcc00', label: 'Pointer' },
];
