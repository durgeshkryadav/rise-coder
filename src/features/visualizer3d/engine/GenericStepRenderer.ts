/**
 * GenericStepRenderer.ts — Renders one GenericStep onto the 3D scene.
 *
 * Handles cube colors, pointer, data-structure cubes, computation text,
 * store arrow, extra array rows, and particles.
 */

import * as THREE from 'three';
import { ThreeEngine, FrameCallback } from './ThreeEngine';
import { GenericSceneBuilder } from './GenericSceneBuilder';
import { ParticleSystem } from './Particles';
import * as P from './Primitives';
import { COLORS, LAYOUT, ANIMATION } from './config';
import type { GenericStep, GenericCubeState } from '../algorithms/generic-types';

const COLOR_MAP: Record<GenericCubeState | string, number> = {
  default: COLORS.DEFAULT,
  checking: COLORS.CHECKING,
  in_map: COLORS.IN_MAP,
  found: COLORS.FOUND,
  in_set: COLORS.IN_MAP,
  duplicate: 0xff4444,
  matched: COLORS.FOUND,
  mismatched: 0xff4444,
  computing: COLORS.CHECKING,
  result: COLORS.FOUND,
  highlight: 0x00d4ff,
  sequence: 0x00d4ff,
  sequence_start: COLORS.CHECKING,
  longest: COLORS.FOUND,
  grouped: COLORS.HASHMAP,
  selected: COLORS.FOUND,
  processing: COLORS.CHECKING,
  left_pass: 0x00d4ff,
  right_pass: COLORS.CHECKING,
  encoded: COLORS.HASHMAP,
  decoded: COLORS.FOUND,
};

export class GenericStepRenderer {
  private hashMapMeshes: THREE.Object3D[] = [];
  private dynamicMeshes: THREE.Object3D[] = [];
  private extraRowMeshes: THREE.Object3D[] = [];
  private searchProbeCb: FrameCallback | null = null;
  private engine: ThreeEngine;
  private sceneBuilder: GenericSceneBuilder;
  private particles: ParticleSystem;
  private readonly secondaryBoxHeight = 4.8;
  private readonly secondaryBoxDepth = 2.8;

  constructor(engine: ThreeEngine, sceneBuilder: GenericSceneBuilder, particles: ParticleSystem) {
    this.engine = engine;
    this.sceneBuilder = sceneBuilder;
    this.particles = particles;
  }

  render(step: GenericStep, values: (number | string)[]) {
    const { scene } = this.engine;
    const cubes = this.sceneBuilder.cubes;
    const pointer = this.sceneBuilder.pointer;

    // ── Cube colors ──
    step.cubeStates.forEach((st, i) => {
      if (i >= cubes.length) return;
      const c = cubes[i];
      const col = COLOR_MAP[st] ?? COLORS.DEFAULT;
      const mat = c.material as THREE.MeshStandardMaterial;
      mat.color.setHex(col);
      mat.emissive.setHex(col);
      mat.emissiveIntensity = st === 'found' || st === 'result' || st === 'longest' ? 0.5
        : st === 'checking' || st === 'processing' || st === 'duplicate' ? 0.35
        : 0.15;
      this.animateScale(c, st === 'checking' || st === 'found' || st === 'duplicate' || st === 'result' ? 1.25 : 1);
    });

    // ── Pointer ──
    if (pointer) {
      if (step.pointer >= 0 && step.pointer < cubes.length) {
        pointer.visible = true;
        pointer.position.x = cubes[step.pointer].position.x;
        pointer.position.z = LAYOUT.ARRAY_Z;
      } else {
        pointer.visible = false;
      }
    }

    // ── Clear per-step objects ──
    this.cancelSearchProbe();
    P.clearGroup(scene, this.hashMapMeshes);
    P.clearGroup(scene, this.dynamicMeshes);
    P.clearGroup(scene, this.extraRowMeshes);
    this.particles.clearAll();

    // ── Data structure cubes ──
    this.renderDataStructure(step);

    // ── Computation text ──
    this.renderComputation(step, values);

    // ── Extra arrays ──
    this.renderExtraArrays(step);

    // ── Store arrow ──
    this.renderStoreArrow(step);
  }

  renderEmpty(label?: string) {
    const { scene } = this.engine;
    const cubes = this.sceneBuilder.cubes;
    const pointer = this.sceneBuilder.pointer;

    cubes.forEach((cube) => {
      const mat = cube.material as THREE.MeshStandardMaterial;
      mat.color.setHex(COLORS.DEFAULT);
      mat.emissive.setHex(COLORS.DEFAULT);
      mat.emissiveIntensity = 0.15;
      cube.scale.set(1, 1, 1);
    });
    if (pointer) pointer.visible = false;

    this.cancelSearchProbe();
    P.clearGroup(scene, this.hashMapMeshes);
    P.clearGroup(scene, this.dynamicMeshes);
    P.clearGroup(scene, this.extraRowMeshes);
    this.particles.clearAll();

    this.hashMapMeshes.push(
      ...P.createBoundingBox(
        scene,
        5,
        this.secondaryBoxHeight,
        this.secondaryBoxDepth,
        new THREE.Vector3(0, 1, LAYOUT.HASHMAP_Z),
        COLORS.HM_BOX,
        label ?? 'Data Structure',
        'eight',
      ),
    );
    const el = P.makeTextSprite('empty', { fontSize: 30, color: '#444', scale: 2 });
    el.position.set(0, 1, LAYOUT.HASHMAP_Z);
    P.addToScene(scene, this.hashMapMeshes, el);
  }

  dispose() {
    const { scene } = this.engine;
    this.cancelSearchProbe();
    P.clearGroup(scene, this.hashMapMeshes);
    P.clearGroup(scene, this.dynamicMeshes);
    P.clearGroup(scene, this.extraRowMeshes);
    this.particles.clearAll();
  }

  /* ── private ── */

  private renderDataStructure(step: GenericStep) {
    const { scene } = this.engine;
    const keys = Object.keys(step.hashMap);
    const boxLabel = step.hashMapLabel ?? 'HashMap  { key → value }';

    if (keys.length > 0) {
      const startX = -((keys.length - 1) * LAYOUT.HM_SPACING) / 2;
      keys.forEach((k, ki) => {
        const x = startX + ki * LAYOUT.HM_SPACING;

        const cube = P.createCube(LAYOUT.HM_CUBE_SIZE, COLORS.HASHMAP, new THREE.Vector3(x, 1, LAYOUT.HASHMAP_Z), {
          transparent: true,
          opacity: 0.9,
        });
        P.addToScene(scene, this.hashMapMeshes, cube);

        const keyLabel = String(k);
        const fontSize = keyLabel.length > 4 ? 32 : 48;
        const vl = P.makeTextSprite(keyLabel, { fontSize, color: '#fff', scale: 1.4 });
        vl.position.set(x, 1, LAYOUT.HASHMAP_Z);
        P.addToScene(scene, this.hashMapMeshes, vl);

        const valText = String(step.hashMap[k]);
        const il = P.makeTextSprite(valText, { fontSize: 26, color: '#aaddff', scale: 1.3 });
        il.position.set(x, -0.5, LAYOUT.HASHMAP_Z);
        P.addToScene(scene, this.hashMapMeshes, il);
      });

      const hmW = Math.max((keys.length - 1) * LAYOUT.HM_SPACING + 3.5, 5);
      this.hashMapMeshes.push(
        ...P.createBoundingBox(
          scene,
          hmW,
          this.secondaryBoxHeight,
          this.secondaryBoxDepth,
          new THREE.Vector3(0, 1, LAYOUT.HASHMAP_Z),
          COLORS.HM_BOX,
          boxLabel,
          'eight',
        ),
      );
    } else {
      this.hashMapMeshes.push(
        ...P.createBoundingBox(
          scene,
          5,
          this.secondaryBoxHeight,
          this.secondaryBoxDepth,
          new THREE.Vector3(0, 1, LAYOUT.HASHMAP_Z),
          COLORS.HM_BOX,
          boxLabel,
          'eight',
        ),
      );
      const el = P.makeTextSprite('empty', { fontSize: 30, color: '#444', scale: 2 });
      el.position.set(0, 1, LAYOUT.HASHMAP_Z);
      P.addToScene(scene, this.hashMapMeshes, el);
    }
  }

  private renderComputation(step: GenericStep, values: (number | string)[]) {
    const { scene } = this.engine;
    if (!step.computation) return;
    const c = step.computation;
    const cx = ((values.length - 1) * LAYOUT.CUBE_SPACING) / 2 + 6;
    let cy = 6;
    const cz = (LAYOUT.ARRAY_Z + LAYOUT.HASHMAP_Z) / 2;

    for (const line of c.lines) {
      const sp = P.makeTextSprite(line, {
        fontSize: 32,
        color: '#ffcc00',
        scale: 4,
        canvasWidth: 512,
        canvasHeight: 72,
        bgColor: 'rgba(0,0,0,0.55)',
      });
      sp.position.set(cx, cy, cz);
      P.addToScene(scene, this.dynamicMeshes, sp);
      cy -= 1.5;
    }

    if (c.resultLine) {
      const rl = P.makeTextSprite(c.resultLine, {
        fontSize: 32,
        color: c.resultColor ?? '#00ff88',
        scale: 3.5,
        canvasWidth: 480,
        canvasHeight: 72,
        bgColor: 'rgba(0,60,20,0.6)',
      });
      rl.position.set(cx, cy, cz);
      P.addToScene(scene, this.dynamicMeshes, rl);
    }
  }

  private renderExtraArrays(step: GenericStep) {
    if (!step.extraArrays || step.extraArrays.length === 0) return;
    const { scene } = this.engine;

    step.extraArrays.forEach((arr, rowIdx) => {
      const rowZ = LAYOUT.HASHMAP_Z - 5 - rowIdx * 5;
      const startX = -((arr.values.length - 1) * LAYOUT.HM_SPACING) / 2;

      arr.values.forEach((val, vi) => {
        const x = startX + vi * LAYOUT.HM_SPACING;
        const st = arr.states?.[vi] ?? 'default';
        const col = COLOR_MAP[st] ?? COLORS.DEFAULT;

        const cube = P.createCube(LAYOUT.HM_CUBE_SIZE, col, new THREE.Vector3(x, 1, rowZ), {
          transparent: true,
          opacity: 0.9,
        });
        P.addToScene(scene, this.extraRowMeshes, cube);

        const vl = P.makeTextSprite(String(val), { fontSize: 40, color: '#fff', scale: 1.4 });
        vl.position.set(x, 1, rowZ);
        P.addToScene(scene, this.extraRowMeshes, vl);
      });

      const boxW = Math.max((arr.values.length - 1) * LAYOUT.HM_SPACING + 3.5, 5);
      this.extraRowMeshes.push(
        ...P.createBoundingBox(scene, boxW, 3.5, 2.8, new THREE.Vector3(0, 1, rowZ), 0x3366aa, arr.label),
      );
    });
  }

  private renderStoreArrow(step: GenericStep) {
    if (!step.storeArrow) return;
    const { scene } = this.engine;
    const sa = step.storeArrow;
    const cubes = this.sceneBuilder.cubes;
    const fromCube = cubes[sa.fromIndex];
    if (!fromCube) return;

    const from = new THREE.Vector3(fromCube.position.x, fromCube.position.y - 1.5, LAYOUT.ARRAY_Z - 0.5);

    const hmKeys = Object.keys(step.hashMap);
    const hmIdx = hmKeys.indexOf(String(sa.value));
    if (hmIdx < 0) return;
    const hmStartX = -((hmKeys.length - 1) * LAYOUT.HM_SPACING) / 2;
    const toX = hmStartX + hmIdx * LAYOUT.HM_SPACING;
    const to = new THREE.Vector3(toX, 2.5, LAYOUT.HASHMAP_Z);

    this.dynamicMeshes.push(...P.create3DArrow(scene, from, to, COLORS.ARROW));

    const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
    const arrowLabel = P.makeTextSprite(`${sa.value}`, {
      fontSize: 28,
      color: '#ffaadd',
      scale: 2.5,
      canvasWidth: 300,
      canvasHeight: 64,
      bgColor: 'rgba(40,0,50,0.7)',
    });
    arrowLabel.position.set(mid.x - 2, mid.y + 3, mid.z);
    P.addToScene(scene, this.dynamicMeshes, arrowLabel);

    this.particles.fire(from, to, COLORS.ARROW, ANIMATION.PARTICLE_COUNT);
  }

  private cancelSearchProbe() {
    if (this.searchProbeCb) {
      this.engine.offUpdate(this.searchProbeCb);
      this.searchProbeCb = null;
    }
  }

  private animateScale(mesh: THREE.Mesh, tgt: number) {
    const from = mesh.scale.x;
    const start = performance.now();
    const dur = ANIMATION.SCALE_DURATION;
    (function tick() {
      const t = Math.min((performance.now() - start) / dur, 1);
      const e = 1 - Math.pow(1 - t, 3);
      const s = from + (tgt - from) * e;
      mesh.scale.set(s, s, s);
      if (t < 1) requestAnimationFrame(tick);
    })();
  }

}
