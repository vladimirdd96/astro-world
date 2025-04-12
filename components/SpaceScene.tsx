import { useRef, useState, WheelEvent } from "react";
// import { useFrame } from "@react-three/fiber"; // No longer needed for camera drift
import { Stars, OrbitControls } from "@react-three/drei";
import { Group } from "three";
import Astronaut from "./Astronaut";
import ScrollParticles from "./ScrollParticles";

// Define props type
interface SpaceSceneProps {
  scrollVelocity: number;
}

export default function SpaceScene({ scrollVelocity }: SpaceSceneProps) {
  const sceneRef = useRef<Group>(null);
  const [astronautScale, setAstronautScale] = useState(1);

  // Removed the useFrame hook for camera drift
  // useFrame((state) => {
  //   if (sceneRef.current) {
  //     state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
  //     state.camera.position.y = Math.cos(state.clock.elapsedTime * 0.05) * 0.2;
  //     state.camera.lookAt(0, 0, 0);
  //   }
  // });

  const handleWheel = (event: WheelEvent) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      const zoomSpeed = 0.1;
      setAstronautScale((prevScale) =>
        Math.max(0.1, prevScale - event.deltaY * zoomSpeed * 0.01)
      );
    }
  };

  return (
    <>
      {/* The div wrapper was removed. Add onWheel={handleWheel} to the <Canvas> component instead */}
      {/* <div onWheel={handleWheel} style={{ width: "100%", height: "100%" }}> */}
      <OrbitControls enableZoom={false} enablePan={false} />
      <group ref={sceneRef}>
        {/* Lighting Setup */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#ffaaaa"
        />

        {/* Background Stars */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* Main Components */}
        <group scale={[astronautScale, astronautScale, astronautScale]}>
          <Astronaut />
        </group>
        <ScrollParticles scrollVelocity={scrollVelocity} />
      </group>
      {/* </div> */}
    </>
  );
}
