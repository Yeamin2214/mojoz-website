"use client";

import { memo } from "react";

/**
 * Shared candy materials. Gummies use physical transmission so light passes
 * through them like real gelatine; "glass" pushes transmission further for
 * hard-candy rings. Both stay cheap enough for mobile because we rely on
 * meshPhysicalMaterial rather than drei's per-mesh transmission buffer.
 */

interface CandyMaterialProps {
  color: string;
  /** 0 = opaque jelly, 1 = clear hard candy. */
  clarity?: number;
}

export const GummyMaterial = memo(function GummyMaterial({ color, clarity = 0.55 }: CandyMaterialProps) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={0.18}
      metalness={0}
      transmission={clarity}
      thickness={1.2}
      ior={1.4}
      clearcoat={1}
      clearcoatRoughness={0.25}
      attenuationColor={color}
      attenuationDistance={1.4}
      envMapIntensity={1.1}
    />
  );
});

export const HardCandyMaterial = memo(function HardCandyMaterial({ color }: { color: string }) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={0.05}
      metalness={0}
      transmission={0.92}
      thickness={0.8}
      ior={1.5}
      clearcoat={1}
      clearcoatRoughness={0.05}
      attenuationColor={color}
      attenuationDistance={2}
      envMapIntensity={1.4}
    />
  );
});

export const WaffleMaterial = memo(function WaffleMaterial() {
  return (
    <meshStandardMaterial color="#E8B978" roughness={0.65} metalness={0} envMapIntensity={0.5} />
  );
});
