/**
 * Particles.ts — Particle system for animated arrow trails.
 *
 * Manages glowing spheres that fly along an arc from A → B.
 * Must be registered on the ThreeEngine update loop.
 */

import * as THREE from 'three';
import { ANIMATION } from './config';

interface Particle {
  mesh: THREE.Mesh;
  from: THREE.Vector3;
  to: THREE.Vector3;
  progress: number;
  speed: number;
}

export class ParticleSystem {
  private particles: Particle[] = [];
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  /** Registered as an engine frame callback. */
 /** Registered as an engine frame callback. */
  tick = (_t: number) => {
    void _t;

    this.particles = this.particles.filter((p) => {
      p.progress += p.speed;

      if (p.progress >= 1) {
        this.scene.remove(p.mesh);
        return false;
      }

      const pr = Math.max(0, p.progress);
      const px = p.from.x + (p.to.x - p.from.x) * pr;
      const pz = p.from.z + (p.to.z - p.from.z) * pr;
      const arc = Math.sin(pr * Math.PI) * 3.5;
      const py = p.from.y + (p.to.y - p.from.y) * pr + arc;

      p.mesh.position.set(px, py, pz);

      (p.mesh.material as THREE.MeshStandardMaterial).opacity = Math.min(
        1,
        (1 - pr) * 2,
      );

      p.mesh.scale.setScalar(
        0.25 + Math.sin(pr * Math.PI) * 0.35,
      );

      return true;
    });
  };

  fire(from: THREE.Vector3, to: THREE.Vector3, color: number, count: number) {
    const { PARTICLE_SPEED, PARTICLE_JITTER } = ANIMATION;
    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 6, 6),
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.9,
          transparent: true,
          opacity: 1,
        }),
      );
      mesh.position.copy(from);
      this.scene.add(mesh);
      this.particles.push({
        mesh,
        from: from.clone(),
        to: to.clone(),
        progress: -i * 0.11,
        speed: PARTICLE_SPEED + Math.random() * PARTICLE_JITTER,
      });
    }
  }

  clearAll() {
    for (const p of this.particles) this.scene.remove(p.mesh);
    this.particles.length = 0;
  }
}
