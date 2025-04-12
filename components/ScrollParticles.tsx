import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import {
  BufferGeometry,
  Float32BufferAttribute,
  Points as ThreePoints,
  Color,
  AdditiveBlending,
} from "three";

const PARTICLE_COUNT = 1500;
const PARTICLE_RANGE_X = 150;
const PARTICLE_RANGE_Y = 100;
const PARTICLE_DEPTH_RANGE = 200;
const CAMERA_NEAR_CLIP = 0.1;
const BASE_DRIFT_SPEED = 0.01;
const VELOCITY_MULTIPLIER = 0.015;

interface ScrollParticlesProps {
  scrollVelocity: number;
}

export default function ScrollParticles({
  scrollVelocity,
}: ScrollParticlesProps) {
  const points = useRef<ThreePoints>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const siz = new Float32Array(PARTICLE_COUNT);
    const color = new Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * PARTICLE_RANGE_X;
      pos[i * 3 + 1] = (Math.random() - 0.5) * PARTICLE_RANGE_Y;
      pos[i * 3 + 2] =
        (Math.random() - 0.5) * PARTICLE_DEPTH_RANGE - PARTICLE_DEPTH_RANGE / 4;

      color.setHSL(1, 0, Math.random() > 0.1 ? 1 : 0.6);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      siz[i] =
        Math.random() > 0.1
          ? Math.random() * 0.05 + 0.02
          : Math.random() * 0.1 + 0.05;
    }
    return [pos, col, siz];
  }, []);

  useFrame((state, delta) => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position
        .array as Float32Array;
      const halfDepth = PARTICLE_DEPTH_RANGE / 2;

      const effectiveSpeed =
        BASE_DRIFT_SPEED + scrollVelocity * VELOCITY_MULTIPLIER;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const zIndex = i * 3 + 2;
        positions[zIndex] += effectiveSpeed * delta * 60;

        if (
          effectiveSpeed > 0 &&
          positions[zIndex] > halfDepth + CAMERA_NEAR_CLIP
        ) {
          positions[zIndex] -= PARTICLE_DEPTH_RANGE + Math.random() * 10;
        } else if (effectiveSpeed < 0 && positions[zIndex] < -halfDepth) {
          positions[zIndex] += PARTICLE_DEPTH_RANGE + Math.random() * 10;
        }
      }

      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={points} positions={positions} colors={colors} sizes={sizes}>
      <PointMaterial
        transparent
        vertexColors
        sizeAttenuation
        depthWrite={true}
        blending={AdditiveBlending}
        opacity={0.9}
      />
    </Points>
  );
}
