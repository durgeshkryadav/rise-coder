/**
 * config.ts — Centralized configuration & color palette for 3D visualizer.
 * All magic numbers, colors, spacing, and layout constants.
 */

export const COLORS = {
  DEFAULT: 0x4466ff,
  CHECKING: 0xff9f1c,
  IN_MAP: 0xff6ec7,
  FOUND: 0x00ff88,
  GROUND: 0x111127,
  POINTER: 0xffcc00,
  HASHMAP: 0x9944cc,
  ARRAY_BOX: 0x4466ff,
  HM_BOX: 0x9944cc,
  ARROW: 0xff6ec7,
  COMP: 0xffcc00,
} as const;

export const LAYOUT = {
  ARRAY_Z: 2,
  HASHMAP_Z: -4,
  CUBE_SPACING: 3.2,
  HM_SPACING: 2.5,
  CUBE_SIZE: 2,
  HM_CUBE_SIZE: 1.7,
} as const;

export const CAMERA = {
  FOV: 62,
  NEAR: 0.1,
  FAR: 200,
  DEFAULT_Y: 9,
  DEFAULT_Z: 16,
  LOOK_AT: { x: 0, y: 1.6, z: -0.6 },
} as const;

export const ANIMATION = {
  FLOAT_SPEED: 1.5,
  FLOAT_AMPLITUDE: 0.12,
  POINTER_SPIN: 0.03,
  SCALE_DURATION: 300,
  AUTOPLAY_INTERVAL: 2200,
  PARTICLE_COUNT: 10,
  PARTICLE_SPEED: 0.005,
  PARTICLE_JITTER: 0.0015,
} as const;

export const SCENE_CFG = {
  FOG_DENSITY: 0.007,
  GROUND_SIZE: 120,
  GRID_DIVISIONS: 60,
} as const;
