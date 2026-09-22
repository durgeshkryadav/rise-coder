/**
 * containsDuplicate.ts — Step generator for Contains Duplicate (HashSet approach).
 */

import type { GenericStep, GenericCubeState } from './generic-types';

export function generateContainsDuplicateSteps(nums: number[]): GenericStep[] {
  const steps: GenericStep[] = [];

  steps.push({
    type: 'intro',
    text: `Array [${nums.join(', ')}]. Strategy: scan left→right, use a HashSet to track seen values.`,
    cubeStates: nums.map(() => 'default' as GenericCubeState),
    pointer: -1,
    hashMap: {},
    hashMapLabel: 'seen  (set)',
    codeLines: [1, 2],
    codeClass: 'active',
  });

  steps.push({
    type: 'explain',
    text: 'For each element → check if it exists in the HashSet. If yes → duplicate found! Otherwise → add to the set.',
    cubeStates: nums.map(() => 'default' as GenericCubeState),
    pointer: -1,
    hashMap: {},
    hashMapLabel: 'seen  (set)',
    codeLines: [3],
    codeClass: 'active',
  });

  const seen: Set<number> = new Set();

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];

    const cs: GenericCubeState[] = nums.map((v) =>
      seen.has(v) ? 'in_set' : 'default',
    );
    cs[i] = 'checking';

    const hmObj: Record<string, string | number> = {};
    seen.forEach((v) => { hmObj[String(v)] = '✓'; });

    steps.push({
      type: 'check',
      text: `Index [${i}] → value ${val}. Is ${val} in the HashSet?`,
      cubeStates: [...cs],
      pointer: i,
      hashMap: { ...hmObj },
      hashMapLabel: 'seen  (set)',
      computation: {
        lines: [`Check: ${val} in set?`],
      },
      codeLines: [3, 4],
      codeClass: 'active',
    });

    if (seen.has(val)) {
      const fs: GenericCubeState[] = nums.map((v, idx) => {
        if (idx === i) return 'duplicate';
        if (v === val) return 'duplicate';
        if (seen.has(v)) return 'in_set';
        return 'default';
      });

      steps.push({
        type: 'found',
        text: `YES! ${val} is already in the HashSet → Duplicate found! Return true ✓`,
        cubeStates: fs,
        pointer: i,
        hashMap: { ...hmObj },
        hashMapLabel: 'seen  (set)',
        computation: {
          lines: [`${val} already seen!`],
          resultLine: 'DUPLICATE FOUND!',
          resultColor: '#ff4444',
        },
        answer: true,
        codeLines: [4, 5],
        codeClass: 'found',
      });
      return steps;
    } else {
      seen.add(val);
      const updatedHm: Record<string, string | number> = {};
      seen.forEach((v) => { updatedHm[String(v)] = '✓'; });

      const as: GenericCubeState[] = nums.map((v) =>
        seen.has(v) ? 'in_set' : 'default',
      );

      steps.push({
        type: 'store',
        text: `Not found. Add ${val} to HashSet ↓`,
        cubeStates: as,
        pointer: i,
        hashMap: { ...updatedHm },
        hashMapLabel: 'seen  (set)',
        storeArrow: { fromIndex: i, value: val },
        codeLines: [6],
        codeClass: 'store',
      });
    }
  }

  steps.push({
    type: 'no_duplicate',
    text: 'All elements scanned. No duplicate found → Return false.',
    cubeStates: nums.map(() => 'default' as GenericCubeState),
    pointer: -1,
    hashMap: {},
    hashMapLabel: 'seen  (set)',
    computation: {
      lines: ['No duplicates'],
      resultLine: 'Return false',
      resultColor: '#ff6ec7',
    },
    answer: false,
    codeLines: [7],
    codeClass: 'active',
  });

  return steps;
}

export const CONTAINS_DUPLICATE_CODE = [
  { num: 1, text: 'def containsDuplicate(nums):' },
  { num: 2, text: '    seen = set()' },
  { num: 3, text: '    for num in nums:' },
  { num: 4, text: '        if num in seen:' },
  { num: 5, text: '            return True' },
  { num: 6, text: '        seen.add(num)' },
  { num: 7, text: '    return False' },
];

export const CONTAINS_DUPLICATE_LEGEND = [
  { color: '#4466ff', label: 'Default' },
  { color: '#ff9f1c', label: 'Checking' },
  { color: '#ff6ec7', label: 'In HashSet' },
  { color: '#ff4444', label: 'Duplicate!' },
  { color: '#ffcc00', label: 'Pointer' },
  { color: '#9944cc', label: 'HashSet slot' },
];
