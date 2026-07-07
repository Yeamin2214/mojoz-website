"use client";

import { memo } from "react";
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

/**
 * Cinematic post stack. Depth of field is the most expensive pass, so it is
 * skipped on low-power devices (the caller decides via `quality`).
 */
const Effects = memo(function Effects({ quality = "high" }: { quality?: "high" | "low" }) {
  return (
    <EffectComposer multisampling={quality === "high" ? 4 : 0}>
      <Bloom intensity={0.35} luminanceThreshold={0.82} luminanceSmoothing={0.3} mipmapBlur />
      {quality === "high" ? (
        <DepthOfField focusDistance={0.012} focalLength={0.05} bokehScale={2.2} />
      ) : (
        <></>
      )}
      <Noise opacity={0.025} />
      <Vignette eskil={false} offset={0.18} darkness={0.55} />
    </EffectComposer>
  );
});

export default Effects;
