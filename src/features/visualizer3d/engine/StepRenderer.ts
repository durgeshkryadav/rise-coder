/**
 * StepRenderer.ts — Renders one AlgorithmStep onto the 3D scene.
 *
 * Handles cube colors, pointer, hashmap 3D cubes, computation 3D text,
 * search-probe animation, store arrow + particles.
 *
 * Does NOT touch the DOM — React components read step data directly.
 */

import * as THREE from 'three';
import { ThreeEngine, FrameCallback } from './ThreeEngine';
import { SceneBuilder } from './SceneBuilder';
import { ParticleSystem } from './Particles';
import * as P from './Primitives';
import { COLORS, LAYOUT, ANIMATION } from './config';
import type { AlgorithmStep, CubeState } from '../algorithms/types';

const COLOR_MAP: Record<CubeState, number> = {
  default: COLORS.DEFAULT,
  checking: COLORS.CHECKING,
  in_map: COLORS.IN_MAP,
  found: COLORS.FOUND,
};

export class StepRenderer {
  private hashMapMeshes: THREE.Object3D[] = [];
  private dynamicMeshes: THREE.Object3D[] = [];
  private searchProbeCb: FrameCallback | null = null;
  private engine: ThreeEngine;
  private sceneBuilder: SceneBuilder;
  private particles: ParticleSystem;
  private readonly secondaryBoxHeight = 4.8;
  private readonly secondaryBoxDepth = 2.8;

  constructor(engine: ThreeEngine, sceneBuilder: SceneBuilder, particles: ParticleSystem) {
    this.engine = engine;
    this.sceneBuilder = sceneBuilder;
    this.particles = particles;
  }

  render(step: AlgorithmStep, nums: number[]) {
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
      mat.emissiveIntensity = st === 'found' ? 0.5 : st === 'checking' ? 0.35 : 0.15;
      this.animateScale(c, st === 'checking' || st === 'found' ? 1.25 : 1);
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

    // ── Clear per-step 3D objects ──
    this.cancelSearchProbe();
    P.clearGroup(scene, this.hashMapMeshes);
    P.clearGroup(scene, this.dynamicMeshes);
    this.particles.clearAll();

    // ── 3D HashMap cubes + bounding box ──
    this.renderHashMap3D(step);

    // ── 3D computation text ──
    this.renderComp3D(step, nums);

    // ── Search probe animation ──
    this.renderSearchProbe(step);

    // ── 3D store arrow ──
    this.renderStoreArrow(step, nums);
  }

  renderEmpty() {
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
    this.particles.clearAll();

    this.hashMapMeshes.push(
      ...P.createBoundingBox(
        scene,
        5,
        this.secondaryBoxHeight,
        this.secondaryBoxDepth,
        new THREE.Vector3(0, 1, LAYOUT.HASHMAP_Z),
        COLORS.HM_BOX,
        'hashMap  { value -> index }',
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
    this.particles.clearAll();
  }

  /* ── private ── */

  private renderHashMap3D(step: AlgorithmStep) {
    const { scene } = this.engine;
    const keys = Object.keys(step.hashMap);

    if (keys.length > 0) {
      const startX = -((keys.length - 1) * LAYOUT.HM_SPACING) / 2;
      keys.forEach((k, ki) => {
        const x = startX + ki * LAYOUT.HM_SPACING;

        const cube = P.createCube(LAYOUT.HM_CUBE_SIZE, COLORS.HASHMAP, new THREE.Vector3(x, 1, LAYOUT.HASHMAP_Z), {
          transparent: true,
          opacity: 0.9,
        });
        P.addToScene(scene, this.hashMapMeshes, cube);

        const vl = P.makeTextSprite(String(k), { fontSize: 48, color: '#fff', scale: 1.4 });
        vl.position.set(x, 1, LAYOUT.HASHMAP_Z);
        P.addToScene(scene, this.hashMapMeshes, vl);

        const il = P.makeTextSprite(`idx: ${step.hashMap[k]}`, {
          fontSize: 26,
          color: '#aaddff',
          scale: 1.3,
        });
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
          'hashMap  { value -> index }',
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
          'hashMap  { value -> index }',
          'eight',
        ),
      );
      const el = P.makeTextSprite('empty', { fontSize: 30, color: '#444', scale: 2 });
      el.position.set(0, 1, LAYOUT.HASHMAP_Z);
      P.addToScene(scene, this.hashMapMeshes, el);
    }
  }

  private renderComp3D(step: AlgorithmStep, nums: number[]) {
    const { scene } = this.engine;
    if (!step.computation) return;
    const c = step.computation;
    const cx = ((nums.length - 1) * LAYOUT.CUBE_SPACING) / 2 + 6;
    const cy = 5.5;
    const cz = (LAYOUT.ARRAY_Z + LAYOUT.HASHMAP_Z) / 2;

    const f1 = P.makeTextSprite(`${c.target} - ${c.value} = ${c.complement}`, {
      fontSize: 36,
      color: '#ffcc00',
      scale: 4.5,
      canvasWidth: 512,
      canvasHeight: 80,
      bgColor: 'rgba(0,0,0,0.55)',
    });
    f1.position.set(cx, cy, cz);
    P.addToScene(scene, this.dynamicMeshes, f1);

    const f2 = P.makeTextSprite(`complement = ${c.complement}`, {
      fontSize: 28,
      color: '#ff6ec7',
      scale: 3.2,
      canvasWidth: 400,
      canvasHeight: 64,
    });
    f2.position.set(cx, cy - 1.6, cz);
    P.addToScene(scene, this.dynamicMeshes, f2);

    if (c.found) {
      const f3 = P.makeTextSprite(`FOUND at idx ${c.foundIndex}!`, {
        fontSize: 32,
        color: '#00ff88',
        scale: 3,
        canvasWidth: 400,
        canvasHeight: 64,
        bgColor: 'rgba(0,60,20,0.6)',
      });
      f3.position.set(cx, cy - 3.2, cz);
      P.addToScene(scene, this.dynamicMeshes, f3);
    } else if (c.storing) {
      const f3 = P.makeTextSprite('Not found -> Store', {
        fontSize: 28,
        color: '#ff6ec7',
        scale: 3,
        canvasWidth: 400,
        canvasHeight: 64,
      });
      f3.position.set(cx, cy - 3.2, cz);
      P.addToScene(scene, this.dynamicMeshes, f3);
    }
  }

  private renderSearchProbe(step: AlgorithmStep) {
    if (step.type !== 'check' || !step.computation) return;
    const { scene } = this.engine;
    const c = step.computation;
    const cubes = this.sceneBuilder.cubes;
    const fromCube = cubes[step.pointer];
    if (!fromCube) return;

    const startPos = new THREE.Vector3(fromCube.position.x, fromCube.position.y + 2.2, LAYOUT.ARRAY_Z);

    const hmKeys = Object.keys(step.hashMap);
    const hmFoundIdx = hmKeys.indexOf(String(c.complement));
    const isFound = hmFoundIdx !== -1;
    let endPos: THREE.Vector3;
    if (isFound) {
      const sx = -((hmKeys.length - 1) * LAYOUT.HM_SPACING) / 2;
      endPos = new THREE.Vector3(sx + hmFoundIdx * LAYOUT.HM_SPACING, 2.5, LAYOUT.HASHMAP_Z);
    } else {
      endPos = new THREE.Vector3(0, 1, LAYOUT.HASHMAP_Z);
    }

    const probeHex = isFound ? '#00ff88' : '#ff6ec7';
    const probeColor = isFound ? COLORS.FOUND : COLORS.ARROW;

    const label = P.makeTextSprite(`Searching: ${c.complement}`, {
      fontSize: 34,
      color: probeHex,
      scale: 3,
      canvasWidth: 320,
      canvasHeight: 72,
      bgColor: 'rgba(0,0,0,0.72)',
    });
    label.position.copy(startPos);
    scene.add(label);
    this.dynamicMeshes.push(label);

    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 12, 12),
      new THREE.MeshStandardMaterial({
        color: probeColor,
        emissive: probeColor,
        emissiveIntensity: 1.4,
        transparent: true,
        opacity: 0.95,
      }),
    );
    ball.position.copy(startPos);
    scene.add(ball);
    this.dynamicMeshes.push(ball);

    this.particles.fire(startPos, endPos, probeColor, 8);

    const DURATION = 3.0;
    let startTime: number | null = null;

    this.searchProbeCb = (t: number) => {
      if (startTime === null) startTime = t;
      const raw = Math.min((t - startTime) / DURATION, 1);
      const eased = 1 - Math.pow(1 - raw, 3);

      const px = startPos.x + (endPos.x - startPos.x) * eased;
      const pz = startPos.z + (endPos.z - startPos.z) * eased;
      const arc = Math.sin(raw * Math.PI) * 2.8;
      const py = startPos.y + (endPos.y - startPos.y) * eased + arc;

      label.position.set(px, py + 0.55, pz);
      ball.position.set(px, py, pz);
      (ball.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.2 + Math.sin(t * 8) * 0.4;

      if (raw >= 1) {
        scene.remove(label);
        const li = this.dynamicMeshes.indexOf(label);
        if (li !== -1) this.dynamicMeshes.splice(li, 1);

        const resultText = isFound ? `Found: ${c.complement}!` : 'Not found';
        const resultHex = isFound ? '#00ff88' : '#ff4466';
        const result = P.makeTextSprite(resultText, {
          fontSize: 34,
          color: resultHex,
          scale: 3,
          canvasWidth: 280,
          canvasHeight: 72,
          bgColor: 'rgba(0,0,0,0.8)',
        });
        result.position.set(endPos.x, endPos.y + 1.8, endPos.z);
        scene.add(result);
        this.dynamicMeshes.push(result);
        this.cancelSearchProbe();
      }
    };

    this.engine.onUpdate(this.searchProbeCb);
  }

  private renderStoreArrow(step: AlgorithmStep, nums: number[]) {
    if (!step.storeArrow) return;
    const { scene } = this.engine;
    const sa = step.storeArrow;
    const cubes = this.sceneBuilder.cubes;
    const fromCube = cubes[sa.fromIndex];
    if (!fromCube) return;

    const from = new THREE.Vector3(fromCube.position.x, fromCube.position.y - 1.5, LAYOUT.ARRAY_Z - 0.5);

    const hmKeys = Object.keys(step.hashMap);
    const hmIdx = hmKeys.indexOf(String(sa.value));
    const hmStartX = -((hmKeys.length - 1) * LAYOUT.HM_SPACING) / 2;
    const toX = hmStartX + hmIdx * LAYOUT.HM_SPACING;
    const to = new THREE.Vector3(toX, 2.5, LAYOUT.HASHMAP_Z);

    this.dynamicMeshes.push(...P.create3DArrow(scene, from, to, COLORS.ARROW));

    const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
    const arrowLabel = P.makeTextSprite(`${sa.value} → idx ${sa.fromIndex}`, {
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
