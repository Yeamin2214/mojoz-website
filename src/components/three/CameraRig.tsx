"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pointer } from "@/hooks/useGlobalPointer";
import { scrollStore } from "@/components/providers/SmoothScrollProvider";
import { damp } from "@/lib/motion";

interface CameraRigProps {
  /** Base distance from the origin. */
  radius?: number;
  /** How far the camera zooms in as the hero scrolls away (world units). */
  scrollZoom?: number;
  /** Ref holding 0→1 progress of the hero leaving the viewport. */
  heroProgress: React.MutableRefObject<number>;
}

/**
 * The camera never sits still: a very slow orbital drift + breathing sway is
 * layered with smoothed mouse parallax, and scrolling pulls the camera toward
 * the cone for a cinematic dolly-in as the hero exits.
 */
export default function CameraRig({ radius = 6, scrollZoom = 1.6, heroProgress }: CameraRigProps) {
  const smooth = useRef({ x: 0, y: 0 });
  const look = useRef(new THREE.Vector3(0, 0.2, 0));

  useFrame(({ camera, clock }, delta) => {
    const t = clock.elapsedTime;

    // Smooth the raw pointer so parallax feels weighty, not twitchy.
    smooth.current.x = damp(smooth.current.x, pointer.x, 2.5, delta);
    smooth.current.y = damp(smooth.current.y, pointer.y, 2.5, delta);

    const progress = heroProgress.current;

    // Slow orbit + breathing sway.
    const orbit = t * 0.06;
    const sway = Math.sin(t * 0.35) * 0.12;
    const r = radius - progress * scrollZoom;

    camera.position.x = Math.sin(orbit) * 1.1 + smooth.current.x * 0.7 + sway;
    camera.position.y = 0.35 + smooth.current.y * -0.45 + Math.sin(t * 0.22) * 0.08 + progress * 0.6;
    camera.position.z = r + Math.cos(orbit) * 0.4;

    look.current.set(smooth.current.x * 0.25, 0.2 - progress * 0.4, 0);
    camera.lookAt(look.current);

    // Gentle roll adds the "handheld cinema" feel; scroll velocity tilts it.
    camera.rotation.z += Math.sin(t * 0.3) * 0.004 + scrollStore.velocity * 0.00006;
  });

  return null;
}
