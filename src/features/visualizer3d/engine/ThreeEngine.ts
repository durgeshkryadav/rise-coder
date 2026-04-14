/**
 * ThreeEngine.ts — Three.js scene, camera, renderer, lights, ground.
 * Owns the render loop. Does NOT know about any algorithm.
 */

import * as THREE from 'three';
import { CAMERA, SCENE_CFG, COLORS } from './config';

export type FrameCallback = (timeSeconds: number) => void;

export class ThreeEngine {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  private updateCallbacks: FrameCallback[] = [];
  private animId = 0;
  private orbitTarget = new THREE.Vector3(CAMERA.LOOK_AT.x, CAMERA.LOOK_AT.y, CAMERA.LOOK_AT.z);
  private isDragging = false;
  private lastMouse = new THREE.Vector2();
  private azimuth = 0;
  private polar = 0;
  private radius = 0;
  private readonly minPolar = 0.1;
  private readonly maxPolar = Math.PI - 0.1;
  private readonly rotateSpeed = 0.006;
  private readonly handleMouseDown = (event: MouseEvent) => {
    if (event.button !== 0) return;
    this.isDragging = true;
    this.lastMouse.set(event.clientX, event.clientY);
    this.renderer.domElement.style.cursor = 'grabbing';
  };
  private readonly handleMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) return;
    const dx = event.clientX - this.lastMouse.x;
    const dy = event.clientY - this.lastMouse.y;
    this.lastMouse.set(event.clientX, event.clientY);
    this.azimuth -= dx * this.rotateSpeed;
    this.polar = THREE.MathUtils.clamp(this.polar + dy * this.rotateSpeed, this.minPolar, this.maxPolar);
    this.updateCameraFromSpherical();
  };
  private readonly handleMouseUp = () => {
    this.isDragging = false;
    this.renderer.domElement.style.cursor = 'grab';
  };

  constructor(container: HTMLDivElement) {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a0a1a, SCENE_CFG.FOG_DENSITY);

    // Camera
    const { width, height } = container.getBoundingClientRect();
    this.camera = new THREE.PerspectiveCamera(CAMERA.FOV, width / height, CAMERA.NEAR, CAMERA.FAR);
    this.camera.position.set(0, CAMERA.DEFAULT_Y, CAMERA.DEFAULT_Z);
    this.camera.lookAt(this.orbitTarget);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.cursor = 'grab';
    this.initializeOrbitState();
    this.attachMouseControls();

    // Lights
    this.scene.add(new THREE.AmbientLight(0x334466, 0.8));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(8, 20, 10);
    dir.castShadow = true;
    dir.shadow.mapSize.set(1024, 1024);
    this.scene.add(dir);
    const pt = new THREE.PointLight(0x7b61ff, 1.2, 60);
    pt.position.set(-5, 10, 5);
    this.scene.add(pt);

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(SCENE_CFG.GROUND_SIZE, SCENE_CFG.GROUND_SIZE),
      new THREE.MeshStandardMaterial({ color: COLORS.GROUND, roughness: 0.9 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Grid
    const grid = new THREE.GridHelper(
      SCENE_CFG.GROUND_SIZE / 2,
      SCENE_CFG.GRID_DIVISIONS,
      0x222244,
      0x1a1a3a,
    );
    grid.position.y = -0.49;
    this.scene.add(grid);

    this.animate();
  }

  private animate = () => {
    this.animId = requestAnimationFrame(this.animate);
    const t = Date.now() * 0.001;
    for (const fn of this.updateCallbacks) fn(t);
    this.renderer.render(this.scene, this.camera);
  };

  onUpdate(fn: FrameCallback) {
    this.updateCallbacks.push(fn);
  }

  offUpdate(fn: FrameCallback) {
    const idx = this.updateCallbacks.indexOf(fn);
    if (idx !== -1) this.updateCallbacks.splice(idx, 1);
  }

  positionCamera(numElements: number) {
    const z = Math.max(16, numElements * 2.8);
    this.camera.position.set(0, CAMERA.DEFAULT_Y, z);
    this.initializeOrbitState();
    this.camera.lookAt(this.orbitTarget);
  }

  resize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  dispose() {
    cancelAnimationFrame(this.animId);
    this.updateCallbacks.length = 0;
    this.detachMouseControls();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private initializeOrbitState() {
    const offset = this.camera.position.clone().sub(this.orbitTarget);
    this.radius = offset.length();
    this.azimuth = Math.atan2(offset.x, offset.z);
    this.polar = Math.acos(THREE.MathUtils.clamp(offset.y / this.radius, -1, 1));
  }

  private updateCameraFromSpherical() {
    const sinPolar = Math.sin(this.polar);
    const x = this.radius * sinPolar * Math.sin(this.azimuth);
    const y = this.radius * Math.cos(this.polar);
    const z = this.radius * sinPolar * Math.cos(this.azimuth);
    this.camera.position.set(this.orbitTarget.x + x, this.orbitTarget.y + y, this.orbitTarget.z + z);
    this.camera.lookAt(this.orbitTarget);
  }

  private attachMouseControls() {
    this.renderer.domElement.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  private detachMouseControls() {
    this.renderer.domElement.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }
}
