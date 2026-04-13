/**
 * Primitives.ts — Reusable 3D building blocks.
 *
 * Text sprites, bounding boxes, arrows, cubes, pointer cone.
 * Every function receives a THREE.Scene so there is no global state.
 */

import * as THREE from 'three';

/* ── helpers ────────────────────────────────────────── */

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ── sprite options ─────────────────────────────────── */

export interface TextSpriteOpts {
  fontSize?: number;
  color?: string;
  bgColor?: string;
  canvasWidth?: number;
  canvasHeight?: number;
  scale?: number;
}

/* ── public API ─────────────────────────────────────── */

export function makeTextSprite(text: string, opts: TextSpriteOpts = {}): THREE.Sprite {
  const fontSize = opts.fontSize ?? 48;
  const color = opts.color ?? '#ffffff';
  const bgColor = opts.bgColor ?? 'transparent';
  const cw = opts.canvasWidth ?? 256;
  const ch = opts.canvasHeight ?? 128;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = cw;
  canvas.height = ch;

  if (bgColor !== 'transparent') {
    ctx.fillStyle = bgColor;
    roundRect(ctx, 4, 4, cw - 8, ch - 8, 12);
    ctx.fill();
  }

  ctx.font = `bold ${fontSize}px Segoe UI, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(text, cw / 2, ch / 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }),
  );
  const sc = opts.scale ?? 2;
  sprite.scale.set(sc, sc * (ch / cw), 1);
  return sprite;
}

export function createBoundingBox(
  scene: THREE.Scene,
  w: number,
  h: number,
  d: number,
  pos: THREE.Vector3,
  color: number,
  labelText: string,
): THREE.Object3D[] {
  const meshes: THREE.Object3D[] = [];
  const geo = new THREE.BoxGeometry(w, h, d);

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 }),
  );
  edges.position.copy(pos);
  scene.add(edges);
  meshes.push(edges);

  const fill = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({
      color,
      transparent: true,
      opacity: 0.09,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  fill.position.copy(pos);
  scene.add(fill);
  meshes.push(fill);

  const hexStr = '#' + color.toString(16).padStart(6, '0');
  const label = makeTextSprite(labelText, {
    fontSize: 32,
    color: hexStr,
    scale: 5,
    canvasWidth: 512,
    canvasHeight: 80,
  });
  label.position.set(pos.x, pos.y + h / 2 + 0.9, pos.z);
  scene.add(label);
  meshes.push(label);

  return meshes;
}

export function create3DArrow(
  scene: THREE.Scene,
  from: THREE.Vector3,
  to: THREE.Vector3,
  color: number,
): THREE.Object3D[] {
  const meshes: THREE.Object3D[] = [];
  const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
  mid.y += 3;
  const curve = new THREE.QuadraticBezierCurve3(from.clone(), mid, to.clone());

  const tube = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 24, 0.07, 8, false),
    new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.85,
    }),
  );
  scene.add(tube);
  meshes.push(tube);

  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(0.28, 0.8, 8),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.6 }),
  );
  cone.position.copy(to);
  cone.rotation.x = Math.PI;
  scene.add(cone);
  meshes.push(cone);

  return meshes;
}

export interface CubeOpts {
  roughness?: number;
  metalness?: number;
  emissiveIntensity?: number;
  transparent?: boolean;
  opacity?: number;
}

export function createCube(
  size: number,
  color: number,
  position: THREE.Vector3,
  opts: CubeOpts = {},
): THREE.Mesh {
  const geo = new THREE.BoxGeometry(size, size, size);
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: opts.roughness ?? 0.35,
    metalness: opts.metalness ?? 0.5,
    emissive: color,
    emissiveIntensity: opts.emissiveIntensity ?? 0.15,
    transparent: opts.transparent ?? false,
    opacity: opts.opacity ?? 1,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function createPointer(color: number): THREE.Mesh {
  const mat = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.5,
  });
  const mesh = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1.2, 8), mat);
  mesh.rotation.x = Math.PI;
  mesh.visible = false;
  return mesh;
}

/* ── scene helpers ──────────────────────────────────── */

export function addToScene(
  scene: THREE.Scene,
  arr: THREE.Object3D[],
  mesh: THREE.Object3D,
): THREE.Object3D {
  scene.add(mesh);
  arr.push(mesh);
  return mesh;
}

export function clearGroup(scene: THREE.Scene, arr: THREE.Object3D[]): void {
  for (const m of arr) scene.remove(m);
  arr.length = 0;
}
