import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";

export default function Astronaut() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/models/astronaut_animated.glb");

  useFrame((state) => {
    if (group.current) {
      // Add floating animation
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]}>
      <primitive object={scene} />
    </group>
  );
}
