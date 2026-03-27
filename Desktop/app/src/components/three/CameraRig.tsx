import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Camera keyframes along scroll progress ────────────────────────────────────
// Each keyframe defines a scroll position (t), camera position, and lookAt target.
const KEYFRAMES = [
  { t: 0.0, pos: [0, 14, 0.5], lookAt: [0, 0, 0] },    // Top-down "drone" view
  { t: 0.15, pos: [2, 12, 3], lookAt: [0, 0, 0] },      // Slight tilt
  { t: 0.35, pos: [5, 9, 5], lookAt: [0, 0.5, 0] },     // Survey angle
  { t: 0.55, pos: [7, 7, 6], lookAt: [0, 1, 0] },       // Transitioning
  { t: 0.75, pos: [6, 5, 8], lookAt: [0, 1.5, 0] },     // Dramatic isometric
  { t: 1.0, pos: [5, 4, 9], lookAt: [0, 2, 0] },        // Final hero angle
] as const;

// ─── Props ─────────────────────────────────────────────────────────────────────
interface CameraRigProps {
  progress: number; // 0 → 1 scroll progress
}

// Temp vectors to avoid allocations in the render loop
const _pos = new THREE.Vector3();
const _target = new THREE.Vector3();
const _posA = new THREE.Vector3();
const _posB = new THREE.Vector3();
const _lookA = new THREE.Vector3();
const _lookB = new THREE.Vector3();

// ─── Component ─────────────────────────────────────────────────────────────────
export default function CameraRig({ progress }: CameraRigProps) {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // Find the two keyframes to interpolate between
    let a: (typeof KEYFRAMES)[number] = KEYFRAMES[0];
    let b: (typeof KEYFRAMES)[number] = KEYFRAMES[KEYFRAMES.length - 1];
    for (let i = 0; i < KEYFRAMES.length - 1; i++) {
      if (progress >= KEYFRAMES[i].t && progress <= KEYFRAMES[i + 1].t) {
        a = KEYFRAMES[i];
        b = KEYFRAMES[i + 1];
        break;
      }
    }

    // Normalize t between the two keyframes
    const range = b.t - a.t;
    const localT = range > 0 ? (progress - a.t) / range : 0;

    // Smooth easing (ease-in-out cubic)
    const eased = localT < 0.5
      ? 4 * localT * localT * localT
      : 1 - Math.pow(-2 * localT + 2, 3) / 2;

    // Interpolate position
    _posA.set(a.pos[0], a.pos[1], a.pos[2]);
    _posB.set(b.pos[0], b.pos[1], b.pos[2]);
    _pos.lerpVectors(_posA, _posB, eased);

    // Interpolate lookAt target
    _lookA.set(a.lookAt[0], a.lookAt[1], a.lookAt[2]);
    _lookB.set(b.lookAt[0], b.lookAt[1], b.lookAt[2]);
    _target.lerpVectors(_lookA, _lookB, eased);

    // Smooth camera movement (lerp toward target position for buttery feel)
    camera.position.lerp(_pos, 0.08);
    currentTarget.current.lerp(_target, 0.08);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
