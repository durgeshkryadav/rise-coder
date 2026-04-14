/**
 * GenericSceneBuilder.ts — Builds the persistent 3D scene for any array-based algorithm.
 *
 * Accepts number[] or string[] values for cubes. Optionally shows a title label.
 */

import * as THREE from 'three';
import { ThreeEngine, FrameCallback } from './ThreeEngine';
import * as P from './Primitives';
import { LAYOUT, COLORS, ANIMATION } from './config';

export interface SceneConfig {
  values: (number | string)[];
  title?: string;
  arrayLabel?: string;
}

export class GenericSceneBuilder {
  cubes: THREE.Mesh[] = [];
  private labelSprites: THREE.Object3D[] = [];
  private indexSprites: THREE.Object3D[] = [];
  private extraMeshes: THREE.Object3D[] = [];
  pointer: THREE.Mesh | null = null;
  private floatCb: FrameCallback | null = null;
  private engine: ThreeEngine;

  constructor(engine: ThreeEngine) {
    this.engine = engine;
  }

  build(config: SceneConfig) {
    this.clear();
    const { scene } = this.engine;
    const { CUBE_SPACING, ARRAY_Z, CUBE_SIZE } = LAYOUT;
    const { values, title, arrayLabel } = config;

    const startX = -((values.length - 1) * CUBE_SPACING) / 2;

    for (let i = 0; i < values.length; i++) {
      const x = startX + i * CUBE_SPACING;

      const cube = P.createCube(CUBE_SIZE, COLORS.DEFAULT, new THREE.Vector3(x, 1.5, ARRAY_Z));
      cube.userData = { baseY: 1.5, float: true, index: i };
      P.addToScene(scene, this.cubes as unknown as THREE.Object3D[], cube);

      const label = String(values[i]);
      const fontSize = label.length > 3 ? 36 : 56;
      const vs = P.makeTextSprite(label, { fontSize, color: '#fff' });
      vs.position.set(x, 1.5, ARRAY_Z);
      P.addToScene(scene, this.labelSprites, vs);

      const is_ = P.makeTextSprite(`[${i}]`, { fontSize: 34, color: '#888899', scale: 1.5 });
      is_.position.set(x, -0.4, ARRAY_Z);
      P.addToScene(scene, this.indexSprites, is_);
    }

    if (title) {
      const ts = P.makeTextSprite(title, { fontSize: 40, color: '#ffcc00', scale: 3 });
      ts.position.set(0, 8, ARRAY_Z);
      P.addToScene(scene, this.labelSprites, ts);
    }

    const boxW = (values.length - 1) * CUBE_SPACING + 4;
    const bb = P.createBoundingBox(
      scene,
      boxW,
      4,
      3.2,
      new THREE.Vector3(0, 1.5, ARRAY_Z),
      COLORS.ARRAY_BOX,
      arrayLabel ?? 'Input Array',
    );
    this.extraMeshes.push(...bb);

    this.engine.positionCamera(values.length);

    this.pointer = P.createPointer(COLORS.POINTER);
    this.pointer.position.set(this.cubes[0]?.position.x ?? 0, 5, ARRAY_Z);
    scene.add(this.pointer);

    const { FLOAT_SPEED, FLOAT_AMPLITUDE, POINTER_SPIN } = ANIMATION;
    this.floatCb = (t: number) => {
      this.cubes.forEach((c, i) => {
        if (c.userData.float) {
          c.position.y = (c.userData.baseY as number) + Math.sin(t * FLOAT_SPEED + i * 0.7) * FLOAT_AMPLITUDE;
        }
      });
      if (this.pointer) this.pointer.rotation.y += POINTER_SPIN;
    };
    this.engine.onUpdate(this.floatCb);
  }

  clear() {
    const { scene } = this.engine;
    if (this.floatCb) {
      this.engine.offUpdate(this.floatCb);
      this.floatCb = null;
    }
    P.clearGroup(scene, this.cubes as unknown as THREE.Object3D[]);
    this.cubes = [];
    P.clearGroup(scene, this.labelSprites);
    P.clearGroup(scene, this.indexSprites);
    P.clearGroup(scene, this.extraMeshes);
    if (this.pointer) {
      scene.remove(this.pointer);
      this.pointer = null;
    }
  }
}
