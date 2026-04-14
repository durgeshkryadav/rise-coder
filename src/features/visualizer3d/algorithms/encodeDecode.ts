/**
 * encodeDecode.ts — Step generator for Encode and Decode Strings (length-prefix approach).
 */

import type { GenericStep, GenericCubeState } from './generic-types';

export function generateEncodeDecodeSteps(strs: string[]): GenericStep[] {
  const steps: GenericStep[] = [];

  steps.push({
    type: 'intro',
    text: `Strings: [${strs.map((s) => `"${s}"`).join(', ')}]. Strategy: encode with length#string prefix, then decode by parsing.`,
    cubeStates: strs.map(() => 'default' as GenericCubeState),
    cubeLabels: strs,
    pointer: -1,
    hashMap: {},
    hashMapLabel: 'Encoded String',
    codeLines: [1],
    codeClass: 'active',
  });

  steps.push({
    type: 'explain',
    text: 'Encode: for each string, prepend its length + "#". Decode: read length, skip "#", extract that many characters.',
    cubeStates: strs.map(() => 'default' as GenericCubeState),
    cubeLabels: strs,
    pointer: -1,
    hashMap: {},
    hashMapLabel: 'Encoded String',
    codeLines: [2, 3],
    codeClass: 'active',
  });

  // Phase 1: Encode
  let encoded = '';
  for (let i = 0; i < strs.length; i++) {
    const s = strs[i];
    const chunk = `${s.length}#${s}`;
    encoded += chunk;

    const cs: GenericCubeState[] = strs.map((_, idx) =>
      idx < i ? 'encoded' : idx === i ? 'checking' : 'default',
    );

    steps.push({
      type: 'encode_step',
      text: `Encode "${s}" → "${chunk}" (length=${s.length}). Result so far: "${encoded}"`,
      cubeStates: [...cs],
      cubeLabels: strs,
      pointer: i,
      hashMap: { encoded: `"${encoded}"` },
      hashMapLabel: 'Encoded String',
      computation: {
        lines: [`Phase 1: Encode`, `"${s}" → ${s.length}#${s}`],
      },
      codeLines: [3, 4],
      codeClass: 'store',
    });
  }

  const allEncoded: GenericCubeState[] = strs.map(() => 'encoded');

  steps.push({
    type: 'encode_done',
    text: `Encoding complete! Full encoded string: "${encoded}"`,
    cubeStates: allEncoded,
    cubeLabels: strs,
    pointer: -1,
    hashMap: { encoded: `"${encoded}"` },
    hashMapLabel: 'Encoded String',
    computation: {
      lines: ['Encoding complete!'],
      resultLine: `"${encoded}"`,
      resultColor: '#9944cc',
    },
    codeLines: [4],
    codeClass: 'found',
  });

  // Phase 2: Decode
  const decoded: string[] = [];
  let pos = 0;
  let decodeIdx = 0;

  while (pos < encoded.length) {
    const hashIdx = encoded.indexOf('#', pos);
    const len = parseInt(encoded.substring(pos, hashIdx), 10);
    const str = encoded.substring(hashIdx + 1, hashIdx + 1 + len);
    decoded.push(str);

    const dcs: GenericCubeState[] = strs.map((_, idx) =>
      idx < decodeIdx ? 'decoded' : idx === decodeIdx ? 'checking' : 'default',
    );

    const decHm: Record<string, string | number> = {};
    decoded.forEach((d, di) => { decHm[`[${di}]`] = `"${d}"`; });

    steps.push({
      type: 'decode_step',
      text: `Decode: pos=${pos}, length=${len} → extract "${str}". Decoded so far: [${decoded.map((d) => `"${d}"`).join(', ')}]`,
      cubeStates: [...dcs],
      cubeLabels: strs,
      pointer: decodeIdx,
      hashMap: { ...decHm },
      hashMapLabel: 'Decoded  { index → string }',
      computation: {
        lines: [`Phase 2: Decode`, `len=${len}, str="${str}"`],
      },
      codeLines: [7, 8, 9, 10],
      codeClass: 'active',
    });

    pos = hashIdx + 1 + len;
    decodeIdx++;
  }

  const allDecoded: GenericCubeState[] = strs.map(() => 'decoded');
  const finalHm: Record<string, string | number> = {};
  decoded.forEach((d, di) => { finalHm[`[${di}]`] = `"${d}"`; });

  steps.push({
    type: 'decode_done',
    text: `Decode complete! [${decoded.map((d) => `"${d}"`).join(', ')}] matches original ✓`,
    cubeStates: allDecoded,
    cubeLabels: strs,
    pointer: -1,
    hashMap: { ...finalHm },
    hashMapLabel: 'Decoded  { index → string }',
    computation: {
      lines: ['Decode complete!'],
      resultLine: 'VERIFIED ✓',
      resultColor: '#00ff88',
    },
    answer: decoded,
    codeLines: [11],
    codeClass: 'found',
  });

  return steps;
}

export const ENCODE_DECODE_CODE = [
  { num: 1, text: 'def encode(strs):' },
  { num: 2, text: '    result = ""' },
  { num: 3, text: '    for s in strs:' },
  { num: 4, text: '        result += str(len(s)) + "#" + s' },
  { num: 5, text: '    return result' },
  { num: 6, text: 'def decode(s):' },
  { num: 7, text: '    result, i = [], 0' },
  { num: 8, text: '    while i < len(s):' },
  { num: 9, text: '        j = s.index("#", i)' },
  { num: 10, text: '        length = int(s[i:j])' },
  { num: 11, text: '        result.append(s[j+1:j+1+length])' },
  { num: 12, text: '    return result' },
];

export const ENCODE_DECODE_LEGEND = [
  { color: '#4466ff', label: 'Default' },
  { color: '#ff9f1c', label: 'Processing' },
  { color: '#9944cc', label: 'Encoded' },
  { color: '#00ff88', label: 'Decoded' },
  { color: '#ffcc00', label: 'Pointer' },
];
