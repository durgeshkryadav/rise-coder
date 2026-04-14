/**
 * generic-types.ts — Flexible types for all 3D algorithm visualizers.
 * Each algorithm maps its cube states to colors via the GenericStepRenderer.
 */

export type GenericCubeState =
  | 'default'
  | 'checking'
  | 'in_map'
  | 'found'
  | 'in_set'
  | 'duplicate'
  | 'matched'
  | 'mismatched'
  | 'computing'
  | 'result'
  | 'highlight'
  | 'sequence'
  | 'sequence_start'
  | 'longest'
  | 'grouped'
  | 'selected'
  | 'processing'
  | 'left_pass'
  | 'right_pass'
  | 'encoded'
  | 'decoded';

export interface GenericComputation {
  lines: string[];
  resultLine?: string;
  resultColor?: string;
}

export interface GenericStoreArrow {
  fromIndex: number;
  value: number | string;
}

export interface GenericStep {
  type: string;
  text: string;
  cubeStates: GenericCubeState[];
  cubeLabels?: string[];
  pointer: number;
  pointer2?: number;

  /** Primary data structure displayed as 3D cubes below the array. */
  hashMap: Record<string, string | number>;
  hashMapLabel?: string;

  /** Extra arrays rendered as additional cube rows. */
  extraArrays?: Array<{
    label: string;
    values: (string | number)[];
    states?: GenericCubeState[];
  }>;

  computation?: GenericComputation | null;
  storeArrow?: GenericStoreArrow | null;
  codeLines?: number[];
  codeClass?: string;
  answer?: unknown;
}

/** Code lines for the GenericCodePanel. */
export interface CodeLine {
  num: number;
  text: string;
}

/** Legend item for the GenericLegendPanel. */
export interface LegendItem {
  color: string;
  label: string;
}
