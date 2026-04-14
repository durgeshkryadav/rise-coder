/**
 * groupAnagrams.ts — Step generator for Group Anagrams (sorted-key approach).
 */

import type { GenericStep, GenericCubeState } from './generic-types';

export function generateGroupAnagramsSteps(strs: string[]): GenericStep[] {
  const steps: GenericStep[] = [];

  steps.push({
    type: 'intro',
    text: `Strings: [${strs.map((s) => `"${s}"`).join(', ')}]. Strategy: sort each string as key, group by sorted key in a HashMap.`,
    cubeStates: strs.map(() => 'default' as GenericCubeState),
    cubeLabels: strs,
    pointer: -1,
    hashMap: {},
    hashMapLabel: 'groups  (dict)',
    codeLines: [1, 2],
    codeClass: 'active',
  });

  steps.push({
    type: 'explain',
    text: 'For each string → sort its characters to create a key. Strings with the same sorted key are anagrams of each other.',
    cubeStates: strs.map(() => 'default' as GenericCubeState),
    cubeLabels: strs,
    pointer: -1,
    hashMap: {},
    hashMapLabel: 'groups  (dict)',
    codeLines: [3],
    codeClass: 'active',
  });

  const groups: Record<string, string[]> = {};

  for (let i = 0; i < strs.length; i++) {
    const s = strs[i];
    const key = s.split('').sort().join('');

    const cs: GenericCubeState[] = strs.map((_, idx) => {
      if (idx === i) return 'checking';
      const prevKey = strs[idx].split('').sort().join('');
      if (groups[prevKey]) return 'grouped';
      return 'default';
    });

    const hmObj: Record<string, string | number> = {};
    for (const k of Object.keys(groups)) hmObj[k] = groups[k].join(', ');

    steps.push({
      type: 'sort_key',
      text: `"${s}" → sorted key = "${key}"`,
      cubeStates: [...cs],
      cubeLabels: strs,
      pointer: i,
      hashMap: { ...hmObj },
      hashMapLabel: 'groups  (dict)',
      computation: {
        lines: [`sort("${s}") = "${key}"`],
      },
      codeLines: [3, 4],
      codeClass: 'active',
    });

    if (!groups[key]) groups[key] = [];
    groups[key].push(s);

    const afterCs: GenericCubeState[] = strs.map((str, idx) => {
      if (idx <= i) return 'grouped';
      return 'default';
    });

    const afterHm: Record<string, string | number> = {};
    for (const k of Object.keys(groups)) afterHm[k] = groups[k].join(', ');

    steps.push({
      type: 'assign_group',
      text: `Add "${s}" to group["${key}"] → [${groups[key].map((x) => `"${x}"`).join(', ')}]`,
      cubeStates: afterCs,
      cubeLabels: strs,
      pointer: i,
      hashMap: { ...afterHm },
      hashMapLabel: 'groups  (dict)',
      storeArrow: { fromIndex: i, value: key },
      codeLines: [5],
      codeClass: 'store',
    });
  }

  const result = Object.values(groups);
  const hmObj: Record<string, string | number> = {};
  for (const k of Object.keys(groups)) hmObj[k] = groups[k].join(', ');

  steps.push({
    type: 'result',
    text: `Done! ${result.length} group(s) found: ${result.map((g) => `[${g.map((x) => `"${x}"`).join(', ')}]`).join(', ')}`,
    cubeStates: strs.map(() => 'result' as GenericCubeState),
    cubeLabels: strs,
    pointer: -1,
    hashMap: { ...hmObj },
    hashMapLabel: 'groups  (dict)',
    computation: {
      lines: [`${result.length} groups found`],
      resultLine: 'COMPLETE!',
      resultColor: '#00ff88',
    },
    answer: result,
    codeLines: [6],
    codeClass: 'found',
  });

  return steps;
}

export const GROUP_ANAGRAMS_CODE = [
  { num: 1, text: 'def groupAnagrams(strs):' },
  { num: 2, text: '    groups = {}' },
  { num: 3, text: '    for s in strs:' },
  { num: 4, text: '        key = "".join(sorted(s))' },
  { num: 5, text: '        groups.setdefault(key,[]).append(s)' },
  { num: 6, text: '    return list(groups.values())' },
];

export const GROUP_ANAGRAMS_LEGEND = [
  { color: '#4466ff', label: 'Default' },
  { color: '#ff9f1c', label: 'Processing' },
  { color: '#9944cc', label: 'Grouped' },
  { color: '#00ff88', label: 'Complete' },
  { color: '#ffcc00', label: 'Pointer' },
];
