/**
 * longestConsecutive.ts — Step generator for Longest Consecutive Sequence (HashSet approach).
 */

import type { GenericStep, GenericCubeState } from './generic-types';

export function generateLongestConsecutiveSteps(nums: number[]): GenericStep[] {
  const steps: GenericStep[] = [];

  steps.push({
    type: 'intro',
    text: `Array [${nums.join(', ')}]. Strategy: build a HashSet, then for each sequence start (num−1 not in set), extend right.`,
    cubeStates: nums.map(() => 'default' as GenericCubeState),
    pointer: -1,
    hashMap: {},
    hashMapLabel: 'HashSet  { values }',
    codeLines: [1, 2],
    codeClass: 'active',
  });

  // Build set
  const numSet = new Set(nums);
  const setHm: Record<string, string | number> = {};
  numSet.forEach((v) => { setHm[String(v)] = '✓'; });

  steps.push({
    type: 'build_set',
    text: `Built HashSet with ${numSet.size} unique values: {${[...numSet].join(', ')}}`,
    cubeStates: nums.map(() => 'in_set' as GenericCubeState),
    pointer: -1,
    hashMap: { ...setHm },
    hashMapLabel: 'HashSet  { values }',
    computation: {
      lines: [`Build HashSet`, `${numSet.size} unique values`],
    },
    codeLines: [2],
    codeClass: 'store',
  });

  steps.push({
    type: 'explain',
    text: 'For each number: if (num−1) is NOT in the set → this is a sequence start. Extend right while (num+length) is in the set.',
    cubeStates: nums.map(() => 'in_set' as GenericCubeState),
    pointer: -1,
    hashMap: { ...setHm },
    hashMapLabel: 'HashSet  { values }',
    codeLines: [3, 4],
    codeClass: 'active',
  });

  let longest = 0;
  let longestSeq: number[] = [];

  const uniqueNums = [...numSet];
  for (let ui = 0; ui < uniqueNums.length; ui++) {
    const num = uniqueNums[ui];

    // Find this value's index in the original array
    const origIdx = nums.indexOf(num);

    // Check if sequence start
    const isStart = !numSet.has(num - 1);

    const csCheck: GenericCubeState[] = nums.map((v) => {
      if (v === num) return 'checking';
      if (numSet.has(v)) return 'in_set';
      return 'default';
    });

    steps.push({
      type: 'check_start',
      text: `num = ${num}. Is ${num - 1} in set? ${isStart ? 'NO → This is a sequence start!' : 'YES → skip (not a start).'}`,
      cubeStates: [...csCheck],
      pointer: origIdx,
      hashMap: { ...setHm },
      hashMapLabel: 'HashSet  { values }',
      computation: {
        lines: [
          `Check: ${num}`,
          `${num - 1} in set? ${isStart ? 'No' : 'Yes'}`,
          isStart ? '→ Sequence start!' : '→ Skip',
        ],
      },
      codeLines: isStart ? [4, 5] : [4],
      codeClass: isStart ? 'active' : 'store',
    });

    if (!isStart) continue;

    // Extend sequence
    let length = 1;
    const currentSeq = [num];
    while (numSet.has(num + length)) {
      currentSeq.push(num + length);
      length++;
    }

    const seqSet = new Set(currentSeq);
    const csSeq: GenericCubeState[] = nums.map((v) => {
      if (seqSet.has(v)) return 'sequence';
      if (numSet.has(v)) return 'in_set';
      return 'default';
    });

    steps.push({
      type: 'extend_sequence',
      text: `Sequence from ${num}: [${currentSeq.join(' → ')}], length = ${length}. ${length > longest ? 'New longest!' : `Current longest = ${longest}`}`,
      cubeStates: [...csSeq],
      pointer: origIdx,
      hashMap: { ...setHm },
      hashMapLabel: 'HashSet  { values }',
      computation: {
        lines: [
          `Sequence: ${currentSeq.join('→')}`,
          `Length: ${length}`,
          length > longest ? 'NEW LONGEST!' : `Best: ${longest}`,
        ],
        resultLine: length > longest ? `New best: ${length}` : undefined,
        resultColor: '#00ff88',
      },
      codeLines: [5, 6, 7],
      codeClass: length > longest ? 'found' : 'active',
    });

    if (length > longest) {
      longest = length;
      longestSeq = [...currentSeq];
    }
  }

  // Final result
  const longestSet = new Set(longestSeq);
  const finalCs: GenericCubeState[] = nums.map((v) =>
    longestSet.has(v) ? 'longest' : 'default',
  );

  steps.push({
    type: 'result',
    text: `Done! Longest consecutive sequence: [${longestSeq.join(' → ')}], length = ${longest} ✓`,
    cubeStates: finalCs,
    pointer: -1,
    hashMap: { ...setHm },
    hashMapLabel: 'HashSet  { values }',
    computation: {
      lines: [`Longest: ${longest}`],
      resultLine: `[${longestSeq.join(' → ')}]`,
      resultColor: '#00ff88',
    },
    answer: longest,
    codeLines: [8],
    codeClass: 'found',
  });

  return steps;
}

export const LONGEST_CONSECUTIVE_CODE = [
  { num: 1, text: 'def longestConsecutive(nums):' },
  { num: 2, text: '    num_set = set(nums)' },
  { num: 3, text: '    longest = 0' },
  { num: 4, text: '    for num in num_set:' },
  { num: 5, text: '        if num - 1 not in num_set:' },
  { num: 6, text: '            length = 1' },
  { num: 7, text: '            while num+length in num_set:' },
  { num: 8, text: '                length += 1' },
  { num: 9, text: '            longest = max(longest, length)' },
  { num: 10, text: '    return longest' },
];

export const LONGEST_CONSECUTIVE_LEGEND = [
  { color: '#4466ff', label: 'Default' },
  { color: '#ff9f1c', label: 'Checking' },
  { color: '#ff6ec7', label: 'In HashSet' },
  { color: '#00d4ff', label: 'In Sequence' },
  { color: '#00ff88', label: 'Longest Seq' },
  { color: '#ffcc00', label: 'Pointer' },
];
