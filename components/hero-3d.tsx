"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron, TorusKnot, Octahedron, Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

// ── Scroll + mouse driven camera ──────────────────────
function CameraRig({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const mouse = useRef([0, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    const p = scrollProgress.current;
    const [mx, my] = mouse.current;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5 - p * 3, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -p * 1.5 + my * 0.4, 0.04);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mx * 0.5, 0.04);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, p * 0.2 - my * 0.05, 0.04);
  });

  return null;
}

// ── Star particle field ───────────────────────────────
function StarField() {
  const positions = useMemo(() => {
    const pos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.012;
    ref.current.rotation.x = clock.getElapsedTime() * 0.006;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8a6cff"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  );
}

// ── Morphing icosahedron ──────────────────────────────
function CoreSphere({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const p = scrollProgress.current;
    meshRef.current.rotation.x = t * 0.1 + p * 0.8;
    meshRef.current.rotation.y = t * 0.15 + p * 0.5;
    meshRef.current.scale.setScalar(1 + p * 0.4);
  });
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Icosahedron ref={meshRef} args={[1.4, 4]}>
        <MeshDistortMaterial
          color="#8a6cff"
          distort={0.3}
          speed={2.5}
          roughness={0.05}
          metalness={0.7}
          emissive="#5040cc"
          emissiveIntensity={0.6}
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
    meshRef.current.rotation.x = t * 0.18;
    meshRef.current.rotation.z = t * 0.09 + p * 1.2;
    meshRef.current.position.x = Math.sin(t * 0.25) * 0.25;
    meshRef.current.position.y = Math.cos(t * 0.2) * 0.15;
  });
  return (
    <TorusKnot ref={meshRef} args={[2.1, 0.045, 220, 14, 2, 3]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#27d7c4"
        roughness={0.02}
        metalness={0.95}
        emissive="#27d7c4"
        emissiveIntensity={0.8}
      />
    </TorusKnot>
  );
}

// ── Second torus ring (blue) ──────────────────────────
function BlueRing() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * -0.12;
    meshRef.current.rotation.y = t * 0.08;
  });
  return (
    <TorusKnot ref={meshRef} args={[3.2, 0.025, 180, 10, 3, 5]} position={[0, 0, -1]}>
      <meshStandardMaterial
        color="#4d7cff"
        roughness={0.05}
        metalness={0.9}
        emissive="#4d7cff"
        emissiveIntensity={0.5}
        transparent
        opacity={0.65}
      />
    </TorusKnot>
  );
}

// ── Floating octahedra cluster ────────────────────────
function FloatingFragments() {
  const fragments = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 1,
      ] as [number, number, number],
      scale: 0.06 + Math.random() * 0.22,
      speed: 0.25 + Math.random() * 0.45,
      offset: i * 0.65,
      color: ["#8a6cff", "#4d7cff", "#27d7c4"][i % 3],
      emissive: ["#6040cc", "#2040aa", "#00aa99"][i % 3],
    })), []);

  return (
    <>
      {fragments.map((f, i) => (
        <Fragment key={i} {...f} />
      ))}
    </>
  );
}

function Fragment({ pos, scale, speed, offset, color, emissive }: {
  pos: [number, number, number]; scale: number; speed: number; offset: number; color: string; emissive: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.rotation.x = t * 0.7;
    ref.current.rotation.y = t * 0.5;
    ref.current.position.y = pos[1] + Math.sin(t * 0.6) * 0.35;
    ref.current.position.x = pos[0] + Math.cos(t * 0.4) * 0.15;
  });
  return (
    <Octahedron ref={ref} args={[scale]} position={pos}>
      <meshStandardMaterial
        color={color}
        roughness={0.05}
        metalness={0.9}
        emissive={emissive}
        emissiveIntensity={0.5}
      />
    </Octahedron>
  );
}

// ── Scene ─────────────────────────────────────────────
function Scene({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 4, 6]} intensity={2} color="#8a6cff" />
      <pointLight position={[-5, -3, 3]} intensity={1.5} color="#27d7c4" />
      <pointLight position={[2, -4, 8]} intensity={0.8} color="#4d7cff" />
      <CameraRig scrollProgress={scrollProgress} />
      <StarField />
      <CoreSphere scrollProgress={scrollProgress} />
      <OrbitRing scrollProgress={scrollProgress} />
      <BlueRing />
      <FloatingFragments />
      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
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
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      dpr={[1, 2]}
      aria-hidden="true"
    >
      <Scene scrollProgress={scrollProgress} />
    </Canvas>
  );
}
