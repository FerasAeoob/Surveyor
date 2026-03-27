import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Props ─────────────────────────────────────────────────────────────────────
interface ArchitecturalModelProps {
  progress: number; // 0 → 1 scroll progress
}

// ─── Glass-style material props ────────────────────────────────────────────────
const glassMaterialProps = {
  color: '#88ccff',
  metalness: 0.1,
  roughness: 0.05,
  transparent: true,
  opacity: 0.35,
  envMapIntensity: 1.5,
};

const frameMaterialProps = {
  color: '#334455',
  metalness: 0.8,
  roughness: 0.2,
};

const accentMaterialProps = {
  color: '#00d4ff',
  metalness: 0.3,
  roughness: 0.4,
  emissive: '#00d4ff',
  emissiveIntensity: 0.4,
};

// ─── Component ─────────────────────────────────────────────────────────────────
export default function ArchitecturalModel({ progress }: ArchitecturalModelProps) {
  const groupRef = useRef<THREE.Group>(null!);

  // Visibility: fade in 0.5–0.65, fully visible 0.65–1.0
  const opacity =
    progress < 0.5 ? 0
    : progress < 0.65 ? (progress - 0.5) / 0.15
    : 1;

  // Scale: grows in from 0.6 to 1.0
  const scale = progress < 0.5 ? 0.6 : progress < 0.65 ? 0.6 + 0.4 * ((progress - 0.5) / 0.15) : 1;

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle continuous rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08 + Math.PI * 0.25;
      // Apply scale
      const s = THREE.MathUtils.lerp(groupRef.current.scale.x, scale, 0.1);
      groupRef.current.scale.setScalar(s);
    }
  });

  if (opacity <= 0) return null;

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* ── Main Tower ── */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[2.2, 5, 2.2]} />
        <meshPhysicalMaterial {...glassMaterialProps} opacity={opacity * 0.35} />
      </mesh>

      {/* ── Tower Frame Edges ── */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[2.25, 5.05, 2.25]} />
        <meshStandardMaterial {...frameMaterialProps} wireframe transparent opacity={opacity * 0.6} />
      </mesh>

      {/* ── Floor Plates ── */}
      {[0.5, 1.5, 2.5, 3.5, 4.5].map((y) => (
        <mesh key={`floor-${y}`} position={[0, y, 0]}>
          <boxGeometry args={[2.3, 0.04, 2.3]} />
          <meshStandardMaterial color="#556677" metalness={0.5} roughness={0.3} transparent opacity={opacity * 0.8} />
        </mesh>
      ))}

      {/* ── Base Platform ── */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[4, 0.2, 4]} />
        <meshStandardMaterial color="#1a2a3a" metalness={0.6} roughness={0.3} transparent opacity={opacity * 0.9} />
      </mesh>

      {/* ── Accent Strips (cyan glow edges) ── */}
      {[-1.12, 1.12].map((x) =>
        [-1.12, 1.12].map((z) => (
          <mesh key={`edge-${x}-${z}`} position={[x, 2.5, z]}>
            <boxGeometry args={[0.04, 5.2, 0.04]} />
            <meshStandardMaterial {...accentMaterialProps} transparent opacity={opacity * 0.7} />
          </mesh>
        ))
      )}

      {/* ── Side Wing (left) ── */}
      <mesh position={[-2.6, 1.25, 0]}>
        <boxGeometry args={[1.8, 2.5, 2]} />
        <meshPhysicalMaterial {...glassMaterialProps} opacity={opacity * 0.3} />
      </mesh>
      <mesh position={[-2.6, 1.25, 0]}>
        <boxGeometry args={[1.85, 2.55, 2.05]} />
        <meshStandardMaterial {...frameMaterialProps} wireframe transparent opacity={opacity * 0.5} />
      </mesh>

      {/* ── Side Wing (right) ── */}
      <mesh position={[2.6, 1.75, 0]}>
        <boxGeometry args={[1.8, 3.5, 1.6]} />
        <meshPhysicalMaterial {...glassMaterialProps} opacity={opacity * 0.3} />
      </mesh>
      <mesh position={[2.6, 1.75, 0]}>
        <boxGeometry args={[1.85, 3.55, 1.65]} />
        <meshStandardMaterial {...frameMaterialProps} wireframe transparent opacity={opacity * 0.5} />
      </mesh>

      {/* ── Rooftop Accent ── */}
      <mesh position={[0, 5.15, 0]}>
        <boxGeometry args={[1.6, 0.08, 1.6]} />
        <meshStandardMaterial {...accentMaterialProps} transparent opacity={opacity * 0.9} />
      </mesh>

      {/* ── Ground Plane (reflective) ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial
          color="#0a1420"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={opacity * 0.5}
        />
      </mesh>
    </group>
  );
}
