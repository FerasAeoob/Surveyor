import { useMemo } from 'react';
import * as THREE from 'three';
import PointCloud from './PointCloud';
import WireframeTerrain from './WireframeTerrain';
import ArchitecturalModel from './ArchitecturalModel';
import CameraRig from './CameraRig';

// ─── Props ─────────────────────────────────────────────────────────────────────
interface ScrollSceneProps {
  progress: number; // 0 → 1 scroll progress
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function ScrollScene({ progress }: ScrollSceneProps) {
  // Lighting color shifts subtly from cool blue to warm white as scroll progresses
  const ambientColor = useMemo(() => new THREE.Color(), []);
  const directionalColor = useMemo(() => new THREE.Color(), []);
  
  // Interpolate light colors based on progress
  ambientColor.lerpColors(
    new THREE.Color('#0a1830'),
    new THREE.Color('#1a2a40'),
    progress
  );
  directionalColor.lerpColors(
    new THREE.Color('#0066cc'),
    new THREE.Color('#88aadd'),
    progress
  );

  return (
    <>
      {/* ── Camera Controller ── */}
      <CameraRig progress={progress} />

      {/* ── Ambient Lighting ── */}
      <ambientLight color={ambientColor} intensity={0.4 + progress * 0.3} />

      {/* ── Directional Light (sun-like, shifts with scroll) ── */}
      <directionalLight
        color={directionalColor}
        intensity={0.6 + progress * 0.8}
        position={[5, 10, 5]}
        castShadow={false}
      />

      {/* ── Point Lights for accent ── */}
      {/* Cyan glow light (strong at start, fades) */}
      <pointLight
        color="#00d4ff"
        intensity={3 * (1 - progress)}
        position={[0, 5, 0]}
        distance={20}
        decay={2}
      />

      {/* Warm accent light (appears with architectural model) */}
      <pointLight
        color="#ffaa44"
        intensity={2 * Math.max(0, progress - 0.5) * 2}
        position={[4, 6, 4]}
        distance={15}
        decay={2}
      />

      {/* ── Fog (depth atmosphere) ── */}
      <fog attach="fog" args={['#080c14', 12, 35]} />

      {/* ── Scene Objects ── */}
      <PointCloud progress={progress} />
      <WireframeTerrain progress={progress} />
      <ArchitecturalModel progress={progress} />
    </>
  );
}
