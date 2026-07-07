"use client";

import { memo, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { seeded } from "./CandyModels";

interface SugarParticlesProps {
  count?: number;
  spread?: number;
  color?: string;
  size?: number;
  /** Vertical drift speed. */
  speed?: number;
}

/**
 * Instanced sugar-dust field. One draw call regardless of count; positions
 * are advanced on the CPU with a cheap sin/cos drift and re-uploaded once
 * per frame via instanceMatrix.
 */
const SugarParticles = memo(function SugarParticles({
  count = 120,
  spread = 9,
  color = "#ffffff",
  size = 0.028,
  speed = 0.12,
}: SugarParticlesProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const seedsData = useMemo(() => {
    const rand = seeded(42);
    return Array.from({ length: count }, () => ({
      x: (rand() - 0.5) * spread,
      y: (rand() - 0.5) * spread * 0.7,
      z: (rand() - 0.5) * spread * 0.6 - 1,
      phase: rand() * Math.PI * 2,
      amp: 0.25 + rand() * 0.5,
      scale: 0.5 + rand(),
    }));
  }, [count, spread]);

  useFrame(({ clock }) => {
    const inst = mesh.current;
    if (!inst) return;
    const t = clock.elapsedTime;
    for (let i = 0; i < seedsData.length; i += 1) {
      const s = seedsData[i];
      dummy.position.set(
        s.x + Math.sin(t * speed + s.phase) * s.amp,
        s.y + Math.cos(t * speed * 0.8 + s.phase * 1.3) * s.amp,
        s.z + Math.sin(t * speed * 0.5 + s.phase * 0.7) * 0.3
      );
      dummy.scale.setScalar(s.scale);
      dummy.rotation.set(t * 0.2 + s.phase, t * 0.15, 0);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <icosahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color={color} roughness={0.2} transparent opacity={0.75} />
    </instancedMesh>
  );
});

export default SugarParticles;
