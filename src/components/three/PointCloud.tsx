import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Vertex Shader ─────────────────────────────────────────────────────────────
const vertexShader = `
  uniform float uTime;
  uniform float uOpacity;
  attribute float aSize;
  attribute float aPhase;
  varying float vAlpha;

  void main() {
    // Gentle floating animation per-point
    vec3 pos = position;
    pos.y += sin(uTime * 0.8 + aPhase) * 0.08;
    pos.x += cos(uTime * 0.5 + aPhase * 1.3) * 0.04;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (180.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    // Fade points based on distance from camera and overall opacity
    float dist = length(mvPosition.xyz);
    vAlpha = uOpacity * smoothstep(25.0, 5.0, dist) * (0.4 + 0.6 * aSize / 4.0);
  }
`;

// ─── Fragment Shader ───────────────────────────────────────────────────────────
const fragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uGlowColor;
  varying float vAlpha;

  void main() {
    // Soft circle with glow falloff
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    float core = smoothstep(0.5, 0.1, d);
    float glow = smoothstep(0.5, 0.0, d) * 0.6;
    
    vec3 color = mix(uGlowColor, uColor, core);
    float alpha = (core + glow) * vAlpha;

    gl_FragColor = vec4(color, alpha);
  }
`;

// ─── Props ─────────────────────────────────────────────────────────────────────
interface PointCloudProps {
  progress: number; // 0 → 1 scroll progress
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function PointCloud({ progress }: PointCloudProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  // Opacity: fully visible 0–0.25, fade out 0.25–0.45
  const opacity = progress < 0.25 ? 1 : progress > 0.45 ? 0 : 1 - (progress - 0.25) / 0.2;

  // Generate point positions in a terrain-like distribution
  const { positions, sizes, phases } = useMemo(() => {
    const count = 5000;
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread points in XZ plane
      const x = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 16;

      // Terrain-like height: layered noise simulation
      const freq1 = 0.3, freq2 = 0.7, freq3 = 1.5;
      const y =
        Math.sin(x * freq1 + z * freq1) * 1.2 +
        Math.sin(x * freq2 - z * freq2 * 0.8) * 0.6 +
        Math.cos(x * freq3 + z * freq3 * 1.2) * 0.3 +
        (Math.random() - 0.5) * 0.4;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;
      sz[i] = 1.0 + Math.random() * 3.0;
      ph[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, sizes: sz, phases: ph };
  }, []);

  // Update shader uniforms every frame
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uOpacity.value = opacity;
    }
  });

  if (opacity <= 0) return null;

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          args={[phases, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uOpacity: { value: opacity },
          uColor: { value: new THREE.Color('#00d4ff') },
          uGlowColor: { value: new THREE.Color('#0066ff') },
        }}
      />
    </points>
  );
}
