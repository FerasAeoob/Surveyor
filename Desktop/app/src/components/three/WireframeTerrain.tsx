import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Props ─────────────────────────────────────────────────────────────────────
interface WireframeTerrainProps {
  progress: number; // 0 → 1 scroll progress
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function WireframeTerrain({ progress }: WireframeTerrainProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  // Visibility: fade in 0.2–0.35, fully visible 0.35–0.55, fade out 0.55–0.7
  const opacity =
    progress < 0.2 ? 0
    : progress < 0.35 ? (progress - 0.2) / 0.15
    : progress < 0.55 ? 1
    : progress < 0.7 ? 1 - (progress - 0.55) / 0.15
    : 0;

  // Procedural terrain geometry with noise-based displacement
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(18, 18, 80, 80);
    const posAttr = geo.attributes.position;

    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);

      // Multi-octave noise approximation for natural terrain
      const height =
        Math.sin(x * 0.3 + y * 0.3) * 1.2 +
        Math.sin(x * 0.7 - y * 0.5) * 0.6 +
        Math.cos(x * 1.5 + y * 1.2) * 0.3 +
        Math.sin(x * 2.5) * Math.cos(y * 2.0) * 0.15;

      posAttr.setZ(i, height);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  // Custom wireframe shader for glowing edges
  const vertexShader = `
    varying vec3 vPosition;
    varying float vElevation;
    
    void main() {
      vPosition = position;
      vElevation = position.z;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uOpacity;
    uniform float uTime;
    uniform vec3 uColorLow;
    uniform vec3 uColorHigh;
    varying vec3 vPosition;
    varying float vElevation;

    void main() {
      // Color gradient based on elevation
      float t = smoothstep(-1.5, 2.0, vElevation);
      vec3 color = mix(uColorLow, uColorHigh, t);
      
      // Subtle scan-line pulse effect
      float scanLine = sin(vPosition.y * 2.0 - uTime * 1.5) * 0.5 + 0.5;
      float pulse = 0.7 + 0.3 * scanLine;
      
      gl_FragColor = vec4(color * pulse, uOpacity * 0.85);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uOpacity.value = opacity;
    }
    // Slow rotation for dynamism
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  if (opacity <= 0) return null;

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.5, 0]}
    >
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        wireframe
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        uniforms={{
          uOpacity: { value: opacity },
          uTime: { value: 0 },
          uColorLow: { value: new THREE.Color('#003366') },
          uColorHigh: { value: new THREE.Color('#00d4ff') },
        }}
      />
    </mesh>
  );
}
