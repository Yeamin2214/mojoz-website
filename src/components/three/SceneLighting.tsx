"use client";

import { memo } from "react";
import { ContactShadows, Environment } from "@react-three/drei";

/**
 * Studio-style lighting: a generated HDR "studio" environment provides the
 * glossy candy reflections, a warm key + cool rim shape the forms, and soft
 * contact shadows ground the floating cone.
 */
const SceneLighting = memo(function SceneLighting() {
  return (
    <>
      {/* Generated preset HDR — no external .hdr download required. */}
      <Environment preset="studio" environmentIntensity={0.55} />

      <ambientLight intensity={0.35} color="#e2f2fb" />

      {/* warm key */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.6}
        color="#fff4e0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />

      {/* cool rim from behind-left picks out gummy edges */}
      <directionalLight position={[-6, 3, -4]} intensity={1.1} color="#7fd8ff" />

      {/* soft cyan bounce from below (brand glow) */}
      <pointLight position={[0, -3, 2]} intensity={0.5} color="#00d2ff" />

      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.35}
        scale={12}
        blur={2.8}
        far={4}
        resolution={512}
        frames={60}
        color="#0f2b8e"
      />
    </>
  );
});

export default SceneLighting;
