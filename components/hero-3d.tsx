"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, Float, MeshDistortMaterial, Icosahedron, TorusKnot, Octahedron } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

// ── Scroll-driven camera ──────────────────────────────
function CameraRig({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame(() => {
    const p = scrollProgress.current;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5 - p * 3, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -p * 1.5, 0.05);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, p * 0.2, 0.05);
  });
  return null;
}

// ── Morphing icosahedron ──────────────────────────────
function CoreSphere({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const p = scrollProgress.current;
    meshRef.current.rotation.x = t * 0.12 + p * 0.8;
    meshRef.current.rotation.y = t * 0.18 + p * 0.5;
    meshRef.current.scale.setScalar(1 + p * 0.4);
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <Icosahedron ref={meshRef} args={[1.4, 4]}>
        <MeshDistortMaterial
          color="#8a6cff"
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.6}
          wireframe={false}
          emissive="#4d7cff"
          emissiveIntensity={0.15}
        />
      </Icosahedron>
    </Float>
  );
}

// ── Orbiting torus knot ───────────────────────────────
function OrbitRing({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const p = scrollProgress.current;
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.z = t * 0.1 + p * 1.2;
    meshRef.current.position.x = Math.sin(t * 0.3) * 0.3;
    meshRef.current.position.y = Math.cos(t * 0.25) * 0.2;
  });
  return (
    <TorusKnot ref={meshRef} args={[2.2, 0.04, 200, 12, 2, 3]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#27d7c4"
        roughness={0.05}
        metalness={0.9}
        emissive="#27d7c4"
        emissiveIntensity={0.2}
      />
    </TorusKnot>
  );
}

// ── Floating octahedra cluster ────────────────────────
function FloatingFragments() {
  const fragments = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3 - 1,
      ] as [number, number, number],
      scale: 0.08 + Math.random() * 0.18,
      speed: 0.3 + Math.random() * 0.5,
      offset: i * 0.8,
      color: ["#8a6cff", "#4d7cff", "#27d7c4"][i % 3],
    })), []);

  return (
    <>
      {fragments.map((f, i) => (
        <Fragment key={i} {...f} />
      ))}
    </>
  );
}

function Fragment({ pos, scale, speed, offset, color }: {
  pos: [number, number, number]; scale: number; speed: number; offset: number; color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.rotation.x = t * 0.8;
    ref.current.rotation.y = t * 0.6;
    ref.current.position.y = pos[1] + Math.sin(t * 0.7) * 0.3;
  });
  return (
    <Octahedron ref={ref} args={[scale]} position={pos}>
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} emissive={color} emissiveIntensity={0.1} />
    </Octahedron>
  );
}

// ── Scene ─────────────────────────────────────────────
function Scene({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#8a6cff" />
      <pointLight position={[-5, -3, 2]} intensity={0.8} color="#27d7c4" />
      <pointLight position={[0, 0, 8]} intensity={0.4} color="#4d7cff" />
      <CameraRig scrollProgress={scrollProgress} />
      <CoreSphere scrollProgress={scrollProgress} />
      <OrbitRing scrollProgress={scrollProgress} />
      <FloatingFragments />
    </>
  );
}

// ── Exported component ────────────────────────────────
export default function Hero3D({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Scene scrollProgress={scrollProgress} />
    </Canvas>
  );
}
