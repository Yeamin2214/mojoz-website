"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { CandyByKind, seeded, CANDY_COLORS, type CandyKind } from "./CandyModels";
import { pointer } from "@/hooks/useGlobalPointer";
import { scrollStore } from "@/components/providers/SmoothScrollProvider";
import { damp, clamp } from "@/lib/motion";

/**
 * A very light, fixed, full-viewport candy field that lives BEHIND the page
 * content (z-index 0, pointer-events none). As the user scrolls, the field
 * translates and hue of ambient light drifts, so candies appear to float
 * between sections. No shadows, no postprocessing — this canvas must stay
 * nearly free.
 */

function DriftingCandies() {
  const group = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  const color = useMemo(() => new THREE.Color(), []);

  const specs = useMemo(() => {
    const rand = seeded(99);
    const kinds: CandyKind[] = ["ring", "crystal", "bear", "crystal", "ring", "slice", "crystal", "ring", "crystal", "bear"];
    return kinds.map((kind, i) => ({
      kind,
      color: CANDY_COLORS[i % CANDY_COLORS.length],
      pos: [
        (rand() - 0.5) * 14,
        (rand() - 0.5) * 8,
        -2 - rand() * 4,
      ] as [number, number, number],
      scale: 0.3 + rand() * 0.45,
      speed: 0.5 + rand(),
    }));
  }, []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    // Candies climb slowly as the page scrolls — parallax against content.
    g.position.y = scrollStore.progress * 6 - 1;
    g.rotation.y = damp(g.rotation.y, pointer.x * 0.12, 2, delta);
    g.rotation.x = damp(g.rotation.x, pointer.y * 0.06, 2, delta);
    // Lighting evolves through the scroll story: lavender → cyan → warm.
    if (light.current) {
      const p = clamp(scrollStore.progress, 0, 1);
      color.setHSL(0.55 - p * 0.35, 0.85, 0.6);
      light.current.color.copy(color);
    }
  });

  return (
    <group ref={group}>
      <pointLight ref={light} position={[0, 2, 3]} intensity={0.9} />
      {specs.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={1} floatIntensity={1.4} floatingRange={[-0.4, 0.4]}>
          <group position={s.pos} scale={s.scale}>
            <CandyByKind kind={s.kind} color={s.color} />
          </group>
        </Float>
      ))}
    </group>
  );
}

export default function AmbientCandyField() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={0.4} />
          <ambientLight intensity={0.5} />
          <DriftingCandies />
        </Suspense>
      </Canvas>
    </div>
  );
}
