/**
 * validAnagram.ts — Step generator for Valid Anagram (frequency count approach).
 */

import type { GenericStep, GenericCubeState } from './generic-types';

export function generateValidAnagramSteps(s: string, t: string): GenericStep[] {
  const steps: GenericStep[] = [];
  const sArr = s.split('');
  const tArr = t.split('');
  const allChars = [...sArr, ...tArr];

  steps.push({
    type: 'intro',
    text: `s = "${s}", t = "${t}". Strategy: count character frequencies in s, then subtract frequencies from t. All counts should be zero.`,
    cubeStates: allChars.map(() => 'default' as GenericCubeState),
    cubeLabels: allChars,
    pointer: -1,
    hashMap: {},
    hashMapLabel: 'count  (dict)',
    codeLines: [1, 2, 3],
    codeClass: 'active',
  });

  if (s.length !== t.length) {
    steps.push({
      type: 'length_check',
      text: `Length mismatch! len("${s}") = ${s.length} ≠ len("${t}") = ${t.length} → Return false immediately.`,
      cubeStates: allChars.map(() => 'mismatched' as GenericCubeState),
      cubeLabels: allChars,
      pointer: -1,
      hashMap: {},
      hashMapLabel: 'count  (dict)',
      computation: {
        lines: [`len(s)=${s.length} ≠ len(t)=${t.length}`],
        resultLine: 'Return False',
        resultColor: '#ff4444',
      },
      answer: false,
      codeLines: [2, 3],
      codeClass: 'found',
    });
    return steps;
  }

  steps.push({
    type: 'explain',
    text: `Lengths match (${s.length}). Phase 1: Count each char in s (+1). Phase 2: Subtract each char in t (−1). Phase 3: Check all zeros.`,
    cubeStates: allChars.map(() => 'default' as GenericCubeState),
    cubeLabels: allChars,
    pointer: -1,
    hashMap: {},
    hashMapLabel: 'count  (dict)',
    codeLines: [4],
    codeClass: 'active',
  });

  const count: Record<string, number> = {};

  // Phase 1: count chars in s
  for (let i = 0; i < sArr.length; i++) {
    const ch = sArr[i];
    count[ch] = (count[ch] || 0) + 1;

    const cs: GenericCubeState[] = allChars.map((_, idx) => {
      if (idx === i) return 'checking';
      if (idx < i) return 'in_map';
      return 'default';
    });

    const hmObj: Record<string, string | number> = {};
    for (const k of Object.keys(count)) hmObj[k] = count[k];

    steps.push({
      type: 'count_s',
      text: `s[${i}] = '${ch}' → count['${ch}'] = ${count[ch]} (+1)`,
      cubeStates: cs,
      cubeLabels: allChars,
      pointer: i,
      hashMap: { ...hmObj },
      hashMapLabel: 'count  (dict)',
      computation: {
        lines: [`Phase 1: Count s`, `'${ch}' → ${count[ch]}`],
      },
      storeArrow: { fromIndex: i, value: ch },
      codeLines: [5, 6],
      codeClass: 'store',
    });
  }

  // Phase 2: subtract chars in t
  for (let i = 0; i < tArr.length; i++) {
    const ch = tArr[i];
    count[ch] = (count[ch] || 0) - 1;

    const globalIdx = sArr.length + i;
    const cs: GenericCubeState[] = allChars.map((_, idx) => {
      if (idx === globalIdx) return 'checking';
      if (idx < sArr.length) return 'in_map';
      if (idx < globalIdx) return 'processing';
      return 'default';
    });

    const hmObj: Record<string, string | number> = {};
    for (const k of Object.keys(count)) hmObj[k] = count[k];

    steps.push({
      type: 'count_t',
      text: `t[${i}] = '${ch}' → count['${ch}'] = ${count[ch]} (−1)`,
      cubeStates: cs,
      cubeLabels: allChars,
      pointer: globalIdx,
      hashMap: { ...hmObj },
      hashMapLabel: 'count  (dict)',
      computation: {
        lines: [`Phase 2: Subtract t`, `'${ch}' → ${count[ch]}`],
      },
      codeLines: [7, 8],
      codeClass: 'active',
    });
  }

  // Phase 3: check all zeros
  const allZero = Object.values(count).every((v) => v === 0);

  const finalCs: GenericCubeState[] = allChars.map(() =>
    allZero ? 'matched' : 'mismatched',
  );

  const hmObj: Record<string, string | number> = {};
  for (const k of Object.keys(count)) hmObj[k] = count[k];

  steps.push({
    type: allZero ? 'match' : 'no_match',
    text: allZero
      ? `All counts are zero → "${s}" IS an anagram of "${t}" ✓ Return true!`
      : `Not all counts are zero → "${s}" is NOT an anagram of "${t}" ✗ Return false.`,
    cubeStates: finalCs,
    cubeLabels: allChars,
    pointer: -1,
    hashMap: { ...hmObj },
    hashMapLabel: 'count  (dict)',
    computation: {
      lines: ['Check all counts == 0'],
      resultLine: allZero ? 'VALID ANAGRAM!' : 'NOT AN ANAGRAM',
      resultColor: allZero ? '#00ff88' : '#ff4444',
    },
    answer: allZero,
    codeLines: [9],
    codeClass: 'found',
  });

  return steps;
}

export const VALID_ANAGRAM_CODE = [
  { num: 1, text: 'def isAnagram(s, t):' },
  { num: 2, text: '    if len(s) != len(t):' },
  { num: 3, text: '        return False' },
  { num: 4, text: '    count = {}' },
  { num: 5, text: '    for c in s:' },
  { num: 6, text: '        count[c] = count.get(c,0)+1' },
  { num: 7, text: '    for c in t:' },
  { num: 8, text: '        count[c] = count.get(c,0)-1' },
  { num: 9, text: '    return all(v==0 for v in count.values())' },
];

export const VALID_ANAGRAM_LEGEND = [
  { color: '#4466ff', label: 'Default' },
  { color: '#ff9f1c', label: 'Checking' },
  { color: '#ff6ec7', label: 'Counted (s)' },
  { color: '#00ff88', label: 'Matched!' },
  { color: '#ff4444', label: 'Mismatched' },
  { color: '#ffcc00', label: 'Pointer' },
];
