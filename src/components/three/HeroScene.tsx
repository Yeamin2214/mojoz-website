"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import CameraRig from "./CameraRig";
import SceneLighting from "./SceneLighting";
import Effects from "./Effects";
import SugarParticles from "./SugarParticles";
import {
  CandyByKind,
  CandyRing,
  FruitSlice,
  GummiCone3D,
  GummyBear,
  seeded,
  type CandyKind,
} from "./CandyModels";
import { pointer } from "@/hooks/useGlobalPointer";
import { scrollStore } from "@/components/providers/SmoothScrollProvider";
import { damp, clamp } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/* Hero cone — slow rotation + scroll lift so it "hands over" to the    */
/* next section as the user scrolls                                     */
/* ------------------------------------------------------------------ */

function HeroCone({ progress }: { progress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    const g = group.current;
    if (!g) return;
    const t = clock.elapsedTime;
    g.rotation.y = t * 0.25 + pointer.x * 0.15;
    g.rotation.x = damp(g.rotation.x, pointer.y * 0.08, 3, delta);
    // Float up & drift back as the hero scrolls out — storytelling handoff.
    g.position.y = Math.sin(t * 0.8) * 0.08 + progress.current * 2.4;
    g.position.z = -progress.current * 1.2;
    const s = 1.35 - progress.current * 0.25;
    g.scale.setScalar(s);
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <GummiCone3D scoop="#FFB347" />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Orbiting candy props                                                 */
/* ------------------------------------------------------------------ */

interface OrbiterSpec {
  kind: CandyKind;
  color: string;
  pos: [number, number, number];
  scale: number;
  speed: number;
}

function CandyOrbiters({ progress }: { progress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);

  const specs = useMemo<OrbiterSpec[]>(() => {
    const rand = seeded(7);
    const kinds: CandyKind[] = ["bear", "ring", "slice", "bear", "ring", "crystal", "slice", "crystal"];
    const colors = ["#FF5C7A", "#FF7A45", "#FF9F1C", "#7ED957", "#00d2ff", "#ffffff", "#FFC24B", "#e8f7ff"];
    return kinds.map((kind, i) => {
      const angle = (i / kinds.length) * Math.PI * 2;
      const r = 2.4 + rand() * 1.6;
      return {
        kind,
        color: colors[i],
        pos: [Math.cos(angle) * r, (rand() - 0.5) * 2.4, Math.sin(angle) * r * 0.6 - 0.4],
        scale: 0.5 + rand() * 0.5,
        speed: 0.6 + rand() * 0.9,
      };
    });
  }, []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    // Whole candy field counter-rotates slightly with the mouse and drifts
    // upward on scroll so pieces "float into" the next section.
    g.rotation.y = damp(g.rotation.y, pointer.x * 0.2, 2, delta);
    g.position.y = progress.current * 3.2;
    // Scroll velocity gives the field a tiny inertial kick.
    g.rotation.z = damp(g.rotation.z, clamp(scrollStore.velocity * 0.002, -0.08, 0.08), 3, delta);
  });

  return (
    <group ref={group}>
      {specs.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={0.8} floatIntensity={1.2} floatingRange={[-0.25, 0.25]}>
          <group position={s.pos} scale={s.scale}>
            <CandyByKind kind={s.kind} color={s.color} />
          </group>
        </Float>
      ))}
      {/* two hero-adjacent statement pieces framing the cone */}
      <Float speed={1.1} rotationIntensity={0.6} floatIntensity={1}>
        <group position={[-2.1, -0.4, 0.6]} scale={0.9} rotation={[0.2, 0.6, -0.1]}>
          <GummyBear color="#7ED957" />
        </group>
      </Float>
      <Float speed={0.9} rotationIntensity={0.7} floatIntensity={1}>
        <group position={[2.2, 0.7, 0.4]} scale={0.85} rotation={[0.4, -0.4, 0.2]}>
          <CandyRing color="#FF5C7A" />
        </group>
      </Float>
      <Float speed={1.3} rotationIntensity={0.5} floatIntensity={1.1}>
        <group position={[1.7, -1.1, 1]} scale={0.8}>
          <FruitSlice rind="#FF9F1C" flesh="#FFD166" />
        </group>
      </Float>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Canvas wrapper                                                       */
/* ------------------------------------------------------------------ */

interface HeroSceneProps {
  /** Ref written by the Hero section: 0 = hero fully visible, 1 = scrolled away. */
  progressRef: React.MutableRefObject<number>;
}

export default function HeroScene({ progressRef }: HeroSceneProps) {
  // This component is loaded with `ssr: false`, so `window` exists on first
  // render — quality can be decided once via a lazy initializer (no effect).
  const [quality] = useState<"high" | "low">(() => {
    if (typeof window === "undefined") return "low";
    const low =
      window.innerWidth < 768 ||
      (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4);
    return low ? "low" : "high";
  });

  return (
    <Canvas
      className="pointer-events-none"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 6], fov: 38 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      shadows
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <SceneLighting />
        <HeroCone progress={progressRef} />
        <CandyOrbiters progress={progressRef} />
        <SugarParticles count={quality === "high" ? 140 : 70} />
        <Effects quality={quality} />
      </Suspense>
      <CameraRig heroProgress={progressRef} />
    </Canvas>
  );
}
