/**
 * twoSum.ts — Pure algorithm step generator for Two Sum (HashMap approach).
 * Framework-agnostic: no DOM, no Three.js — just data.
 */

import type { AlgorithmStep, CubeState } from './types';

export function generateTwoSumSteps(nums: number[], target: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];

  // Step 1: Introduction
  steps.push({
    type: 'intro',
    text: `Array [${nums.join(', ')}] | Target = ${target}. Strategy: scan left→right, use a HashMap to remember each value's index.`,
    cubeStates: nums.map(() => 'default' as CubeState),
    pointer: -1,
    hashMap: {},
    computation: null,
    storeArrow: null,
    codeLines: [1, 2],
    codeClass: 'active',
  });

  // Step 2: Explanation
  steps.push({
    type: 'explain',
    text: `For each element → compute complement = target − value. If complement exists in HashMap → answer found! Otherwise → store value→index.`,
    cubeStates: nums.map(() => 'default' as CubeState),
    pointer: -1,
    hashMap: {},
    computation: null,
    storeArrow: null,
    codeLines: [3],
    codeClass: 'active',
  });

  const hashMap: Record<string, number> = {};

  for (let pointer = 0; pointer < nums.length; pointer++) {
    const cubeValue = nums[pointer];
    const complement = target - cubeValue;

    const cs: CubeState[] = nums.map((_, idx) =>
      hashMap[String(nums[idx])] !== undefined ? 'in_map' : 'default',
    );
    cs[pointer] = 'checking';

    // Check step
    steps.push({
      type: 'check',
      text: `Index [${pointer}] → value ${cubeValue}. ${target} − ${cubeValue} = ${complement}. Is ${complement} in HashMap?`,
      cubeStates: [...cs],
      pointer,
      hashMap: { ...hashMap },
      computation: { target, value: cubeValue, complement, index: pointer },
      storeArrow: null,
      codeLines: [3, 4, 5],
      codeClass: 'active',
    });

    if (hashMap[String(complement)] !== undefined) {
      // Found!
      const foundIndex = hashMap[String(complement)];
      const fs: CubeState[] = nums.map((_, idx) =>
        idx === pointer || idx === foundIndex
          ? 'found'
          : hashMap[String(nums[idx])] !== undefined
            ? 'in_map'
            : 'default',
      );

      steps.push({
        type: 'found',
        text: `YES! HashMap[${complement}] = ${foundIndex}. Answer: [${foundIndex}, ${pointer}] → ${nums[foundIndex]} + ${cubeValue} = ${target} ✓ SOLVED!`,
        cubeStates: fs,
        pointer,
        hashMap: { ...hashMap },
        computation: {
          target,
          value: cubeValue,
          complement,
          index: pointer,
          found: true,
          foundIndex,
        },
        storeArrow: null,
        answer: [foundIndex, pointer],
        codeLines: [5, 6],
        codeClass: 'found',
      });
      return steps;
    } else {
      // Store
      hashMap[String(cubeValue)] = pointer;
      const as: CubeState[] = nums.map((_, idx) =>
        hashMap[String(nums[idx])] !== undefined ? 'in_map' : 'default',
      );

      steps.push({
        type: 'store',
        text: `Not found. Store HashMap[${cubeValue}] = ${pointer} ↓`,
        cubeStates: as,
        pointer,
        hashMap: { ...hashMap },
        computation: {
          target,
          value: cubeValue,
          complement,
          index: pointer,
          storing: true,
        },
        storeArrow: { fromIndex: pointer, value: cubeValue },
        codeLines: [7],
        codeClass: 'store',
      });
    }
  }

  // Edge case: no answer
  steps.push({
    type: 'no_answer',
    text: 'No pair found.',
    cubeStates: nums.map(() => 'default' as CubeState),
    pointer: -1,
    hashMap: {},
    computation: null,
    storeArrow: null,
    codeLines: [8],
    codeClass: 'active',
  });

  return steps;
}
