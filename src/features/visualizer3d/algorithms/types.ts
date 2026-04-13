/**
 * types.ts — Shared types for the 3D algorithm visualizer.
 */

export type CubeState = 'default' | 'checking' | 'in_map' | 'found';

export type StepType = 'intro' | 'explain' | 'check' | 'store' | 'found' | 'no_answer';

export interface Computation {
  target: number;
  value: number;
  complement: number;
  index: number;
  found?: boolean;
  foundIndex?: number;
  storing?: boolean;
}

export interface StoreArrow {
  fromIndex: number;
  value: number;
}

export interface AlgorithmStep {
  type: StepType;
  text: string;
  cubeStates: CubeState[];
  pointer: number;
  hashMap: Record<string, number>;
  computation: Computation | null;
  storeArrow: StoreArrow | null;
  answer?: [number, number];
  /** Code lines to highlight (1-based) */
  codeLines?: number[];
  /** Highlight style */
  codeClass?: string;
}
