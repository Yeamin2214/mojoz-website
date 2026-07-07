"use client";

import { memo, useMemo } from "react";
import * as THREE from "three";
import { GummyMaterial, HardCandyMaterial, WaffleMaterial } from "./materials";

/**
 * All candy props are modelled procedurally (no GLB downloads needed), which
 * keeps the payload tiny and lets every piece share the brand palette.
 * Each model is centred on its own origin so parents can float/rotate freely.
 */

/* ------------------------------------------------------------------ */
/* GummiCone — waffle cone + jelly scoop cluster                        */
/* ------------------------------------------------------------------ */

export const GummiCone3D = memo(function GummiCone3D({ scoop = "#FFB347" }: { scoop?: string }) {
  // Waffle criss-cross rendered as thin torus ribs wrapped around the cone.
  const ribs = useMemo(() => [0.25, 0.5, 0.75], []);

  return (
    <group>
      {/* cone body (tip down) */}
      <mesh position={[0, -0.85, 0]} rotation={[Math.PI, 0, 0]} castShadow>
        <coneGeometry args={[0.62, 1.5, 32, 1, true]} />
        <WaffleMaterial />
      </mesh>
      {ribs.map((t) => (
        <mesh key={t} position={[0, -0.1 - t * 1.5, 0]}>
          <torusGeometry args={[0.62 * (1 - t) + 0.02, 0.018, 8, 32]} />
          <meshStandardMaterial color="#C89454" roughness={0.7} />
        </mesh>
      ))}
      {/* scoop cluster (matches the 4-blob SVG illustration) */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <sphereGeometry args={[0.58, 48, 48]} />
        <GummyMaterial color={scoop} />
      </mesh>
      <mesh position={[-0.38, 0.5, 0.05]} castShadow>
        <sphereGeometry args={[0.32, 32, 32]} />
        <GummyMaterial color={scoop} />
      </mesh>
      <mesh position={[0.4, 0.52, -0.02]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <GummyMaterial color={scoop} />
      </mesh>
      <mesh position={[0, 0.78, 0.04]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <GummyMaterial color={scoop} />
      </mesh>
    </group>
  );
});

/* ------------------------------------------------------------------ */
/* GummyBear — stylised bear built from spheres/capsules                */
/* ------------------------------------------------------------------ */

export const GummyBear = memo(function GummyBear({ color = "#FF5C7A" }: { color?: string }) {
  return (
    <group scale={0.55}>
      {/* body */}
      <mesh castShadow scale={[0.72, 1, 0.55]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <GummyMaterial color={color} />
      </mesh>
      {/* head */}
      <mesh castShadow position={[0, 1.05, 0.05]} scale={[0.62, 0.58, 0.5]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <GummyMaterial color={color} />
      </mesh>
      {/* muzzle */}
      <mesh position={[0, 0.95, 0.42]} scale={[0.3, 0.22, 0.2]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <GummyMaterial color={color} />
      </mesh>
      {/* ears */}
      {[-0.38, 0.38].map((x) => (
        <mesh key={x} position={[x, 1.5, 0]} scale={0.22}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <GummyMaterial color={color} />
        </mesh>
      ))}
      {/* arms */}
      {[-0.62, 0.62].map((x) => (
        <mesh key={x} castShadow position={[x, 0.35, 0.12]} rotation={[0, 0, x > 0 ? -0.7 : 0.7]}>
          <capsuleGeometry args={[0.18, 0.4, 6, 12]} />
          <GummyMaterial color={color} />
        </mesh>
      ))}
      {/* legs */}
      {[-0.34, 0.34].map((x) => (
        <mesh key={x} castShadow position={[x, -0.78, 0.1]} rotation={[0.4, 0, 0]}>
          <capsuleGeometry args={[0.2, 0.34, 6, 12]} />
          <GummyMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
});

/* ------------------------------------------------------------------ */
/* CandyRing — translucent hard-candy torus                             */
/* ------------------------------------------------------------------ */

export const CandyRing = memo(function CandyRing({ color = "#FF7A45" }: { color?: string }) {
  return (
    <mesh castShadow>
      <torusGeometry args={[0.42, 0.17, 24, 48]} />
      <HardCandyMaterial color={color} />
    </mesh>
  );
});

/* ------------------------------------------------------------------ */
/* FruitSlice — half cylinder with rind + flesh segments                */
/* ------------------------------------------------------------------ */

export const FruitSlice = memo(function FruitSlice({
  rind = "#FF9F1C",
  flesh = "#FFD166",
}: {
  rind?: string;
  flesh?: string;
}) {
  const segments = useMemo(() => {
    const seg: { rot: number }[] = [];
    for (let i = 0; i < 5; i += 1) seg.push({ rot: (i / 5) * Math.PI - Math.PI / 2 + Math.PI / 10 });
    return seg;
  }, []);

  return (
    <group rotation={[Math.PI / 2, 0, 0]} scale={0.6}>
      {/* rind (half torus-ish shell via half cylinder) */}
      <mesh castShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.22, 32, 1, false, 0, Math.PI]} />
        <GummyMaterial color={rind} clarity={0.35} />
      </mesh>
      {/* flesh wedges */}
      {segments.map(({ rot }, i) => (
        <mesh key={i} rotation={[0, 0, rot]} position={[0, 0, 0]} scale={[0.68, 0.68, 1]}>
          <cylinderGeometry args={[0.8, 0.8, 0.18, 12, 1, false, -Math.PI / 12, Math.PI / 6]} />
          <GummyMaterial color={flesh} clarity={0.6} />
        </mesh>
      ))}
    </group>
  );
});

/* ------------------------------------------------------------------ */
/* SugarCrystal — small faceted icosahedron                             */
/* ------------------------------------------------------------------ */

export const SugarCrystal = memo(function SugarCrystal({ color = "#ffffff" }: { color?: string }) {
  return (
    <mesh>
      <icosahedronGeometry args={[0.14, 0]} />
      <HardCandyMaterial color={color} />
    </mesh>
  );
});

/** Utility: deterministic pseudo-random for stable layouts between renders. */
export function seeded(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export type CandyKind = "bear" | "ring" | "slice" | "crystal";

export const CANDY_COLORS = ["#7ED957", "#FF7A45", "#FFC24B", "#FF5C7A", "#32a2e8", "#00d2ff"];

/** Renders one candy by kind — used by scatter fields. */
export const CandyByKind = memo(function CandyByKind({ kind, color }: { kind: CandyKind; color: string }) {
  switch (kind) {
    case "bear":
      return <GummyBear color={color} />;
    case "ring":
      return <CandyRing color={color} />;
    case "slice":
      return <FruitSlice rind={color} flesh="#FFD166" />;
    default:
      return <SugarCrystal color={color} />;
  }
});

/** Shared vector scratch to avoid allocations inside frame loops. */
export const V3 = new THREE.Vector3();
