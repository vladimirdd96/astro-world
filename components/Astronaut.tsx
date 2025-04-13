import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group, Vector3 } from "three";
import { damp } from "three/src/math/MathUtils.js"; // Import damp for smooth interpolation

export default function Astronaut() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/models/astronaut_animated.glb");

  // State for target rotation and scale
  const [targetYRotation, setTargetYRotation] = useState(Math.PI / 2 + Math.PI); // Rotate 180 degrees to show face
  const [targetScale, setTargetScale] = useState(0.5); // Target scale
  const [smoothScale, setSmoothScale] = useState(0.5); // Interpolated scale for smoothness

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let handled = false; // Flag to check if we handled the key
      switch (event.key) {
        case "ArrowLeft":
          setTargetYRotation((prev) => prev - Math.PI / 4);
          handled = true;
          break;
        case "ArrowRight":
          setTargetYRotation((prev) => prev + Math.PI / 4);
          handled = true;
          break;
        case "ArrowUp":
          setTargetScale((prev) => Math.min(prev + 0.1, 1.5));
          handled = true;
          break;
        case "ArrowDown":
          setTargetScale((prev) => Math.max(prev - 0.1, 0.1));
          handled = true;
          break;
        default:
          break;
      }

      // Prevent default browser behavior (scrolling) only if we handled the key
      if (handled) {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  useFrame((state, delta) => {
    if (group.current) {
      // Smoothly interpolate rotation
      group.current.rotation.y = damp(
        group.current.rotation.y, // current value
        targetYRotation, // target value
        8, // damping factor (adjust for desired smoothness)
        delta // time delta since last frame
      );

      // Smoothly interpolate scale
      const currentSmoothScale = damp(smoothScale, targetScale, 8, delta);
      setSmoothScale(currentSmoothScale); // Update state for next frame's interpolation
      group.current.scale.set(
        currentSmoothScale,
        currentSmoothScale,
        currentSmoothScale
      );

      // Keep floating animation
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    // Rotation and scale are handled in useFrame
    <group
      ref={group}
      position={[0, 0, 0]}
      // scale is now handled in useFrame for smoothness
    >
      <primitive object={scene} />
    </group>
  );
}
