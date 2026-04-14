/**
 * topKFrequent.ts — Step generator for Top K Frequent Elements (bucket sort approach).
 */

import type { GenericStep, GenericCubeState } from './generic-types';

export function generateTopKFrequentSteps(nums: number[], k: number): GenericStep[] {
  const steps: GenericStep[] = [];

  steps.push({
    type: 'intro',
    text: `Array [${nums.join(', ')}], k = ${k}. Strategy: count frequencies → bucket sort → pick top ${k}.`,
    cubeStates: nums.map(() => 'default' as GenericCubeState),
    pointer: -1,
    hashMap: {},
    hashMapLabel: 'count  (dict)',
    codeLines: [1, 2],
    codeClass: 'active',
  });

  steps.push({
    type: 'explain',
    text: 'Phase 1: Count each element. Phase 2: Place into frequency buckets. Phase 3: Collect top k from highest bucket.',
    cubeStates: nums.map(() => 'default' as GenericCubeState),
    pointer: -1,
    hashMap: {},
    hashMapLabel: 'count  (dict)',
    codeLines: [3],
    codeClass: 'active',
  });

  // Phase 1: Count
  const count: Record<number, number> = {};
  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    count[val] = (count[val] || 0) + 1;

    const cs: GenericCubeState[] = nums.map((_, idx) =>
      idx <= i ? 'in_map' : 'default',
    );
    cs[i] = 'checking';

    const hmObj: Record<string, string | number> = {};
    for (const kk of Object.keys(count)) hmObj[kk] = count[Number(kk)];

    steps.push({
      type: 'count',
      text: `Count nums[${i}] = ${val} → freq[${val}] = ${count[val]}`,
      cubeStates: [...cs],
      pointer: i,
      hashMap: { ...hmObj },
      hashMapLabel: 'count  (dict)',
      computation: {
        lines: [`Phase 1: Counting`, `freq[${val}] = ${count[val]}`],
      },
      storeArrow: { fromIndex: i, value: val },
      codeLines: [3, 4],
      codeClass: 'store',
    });
  }

  // Phase 2: Bucket sort
  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [numStr, freq] of Object.entries(count)) {
    buckets[freq].push(Number(numStr));
  }

  const bucketHm: Record<string, string | number> = {};
  for (let f = buckets.length - 1; f >= 1; f--) {
    if (buckets[f].length > 0) {
      bucketHm[`freq=${f}`] = buckets[f].join(', ');
    }
  }

  steps.push({
    type: 'bucket',
    text: `Bucket sort by frequency: ${Object.entries(bucketHm).map(([k, v]) => `${k}: [${v}]`).join(' | ')}`,
    cubeStates: nums.map(() => 'processing' as GenericCubeState),
    pointer: -1,
    hashMap: { ...bucketHm },
    hashMapLabel: 'buckets  (list of lists)',
    computation: {
      lines: ['Phase 2: Bucket Sort'],
    },
    codeLines: [5, 6],
    codeClass: 'active',
  });

  // Phase 3: Collect top k
  const result: number[] = [];
  for (let f = buckets.length - 1; f >= 1 && result.length < k; f--) {
    for (const num of buckets[f]) {
      if (result.length < k) result.push(num);
    }
  }

  const resultSet = new Set(result);
  const finalCs: GenericCubeState[] = nums.map((v) =>
    resultSet.has(v) ? 'selected' : 'default',
  );

  steps.push({
    type: 'result',
    text: `Top ${k} frequent: [${result.join(', ')}] ✓`,
    cubeStates: finalCs,
    pointer: -1,
    hashMap: { ...bucketHm },
    hashMapLabel: 'buckets  (list of lists)',
    computation: {
      lines: [`Phase 3: Pick top ${k}`],
      resultLine: `Answer: [${result.join(', ')}]`,
      resultColor: '#00ff88',
    },
    answer: result,
    codeLines: [7, 8, 9, 10],
    codeClass: 'found',
  });

  return steps;
}

export const TOP_K_FREQUENT_CODE = [
  { num: 1, text: 'def topKFrequent(nums, k):' },
  { num: 2, text: '    count = {}' },
  { num: 3, text: '    for num in nums:' },
  { num: 4, text: '        count[num] = count.get(num,0)+1' },
  { num: 5, text: '    buckets = [[] for _ in range(len(nums)+1)]' },
  { num: 6, text: '    for num, freq in count.items():' },
  { num: 7, text: '        buckets[freq].append(num)' },
  { num: 8, text: '    result = []' },
  { num: 9, text: '    for i in range(len(buckets)-1, 0, -1):' },
  { num: 10, text: '        result.extend(buckets[i])' },
  { num: 11, text: '    return result[:k]' },
];

export const TOP_K_FREQUENT_LEGEND = [
  { color: '#4466ff', label: 'Default' },
  { color: '#ff9f1c', label: 'Checking/Counting' },
  { color: '#ff6ec7', label: 'Counted' },
  { color: '#00ff88', label: 'Top K Selected' },
  { color: '#ffcc00', label: 'Pointer' },
  { color: '#9944cc', label: 'Bucket slot' },
];
