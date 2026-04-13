/**
 * SceneBuilder.ts — Builds the persistent 3D scene skeleton.
 *
 * Array cubes, labels, bounding box, pointer, float animation.
 * Separated from per-step rendering so the scene structure is stable.
 */

import * as THREE from 'three';
import { ThreeEngine, FrameCallback } from './ThreeEngine';
import * as P from './Primitives';
import { LAYOUT, COLORS, ANIMATION } from './config';

export class SceneBuilder {
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

  build(nums: number[], target: number) {
    this.clear();
    const { scene } = this.engine;
    const { CUBE_SPACING, ARRAY_Z, CUBE_SIZE } = LAYOUT;

    const startX = -((nums.length - 1) * CUBE_SPACING) / 2;

    for (let i = 0; i < nums.length; i++) {
      const x = startX + i * CUBE_SPACING;

      // Cube
      const cube = P.createCube(CUBE_SIZE, COLORS.DEFAULT, new THREE.Vector3(x, 1.5, ARRAY_Z));
      cube.userData = { baseY: 1.5, float: true, index: i };
      P.addToScene(scene, this.cubes as unknown as THREE.Object3D[], cube);

      // Value label
      const vs = P.makeTextSprite(String(nums[i]), { fontSize: 56, color: '#fff' });
      vs.position.set(x, 1.5, ARRAY_Z);
      P.addToScene(scene, this.labelSprites, vs);

      // Index label
      const is_ = P.makeTextSprite(`[${i}]`, { fontSize: 34, color: '#888899', scale: 1.5 });
      is_.position.set(x, -0.4, ARRAY_Z);
      P.addToScene(scene, this.indexSprites, is_);
    }

    // Target label
    const ts = P.makeTextSprite(`Target = ${target}`, {
      fontSize: 40,
      color: '#ffcc00',
      scale: 3,
    });
    ts.position.set(0, 8, ARRAY_Z);
    P.addToScene(scene, this.labelSprites, ts);

    // Array bounding box
    const boxW = (nums.length - 1) * CUBE_SPACING + 4;
    const bb = P.createBoundingBox(
      scene,
      boxW,
      4,
      3.2,
      new THREE.Vector3(0, 1.5, ARRAY_Z),
      COLORS.ARRAY_BOX,
      'nums[]  —  Input Array',
    );
    this.extraMeshes.push(...bb);

    // Camera
    this.engine.positionCamera(nums.length);

    // Pointer
    this.pointer = P.createPointer(COLORS.POINTER);
    this.pointer.position.set(this.cubes[0].position.x, 5, ARRAY_Z);
    scene.add(this.pointer);

    // Float animation
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
