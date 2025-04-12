import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, useCallback } from "react";
import SpaceScene from "../components/SpaceScene";
import Astronaut from "../components/Astronaut";
import { useSpaceScroll } from "../hooks/useSpaceScroll";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollVelocity = useSpaceScroll(scrollRef);

  return (
    <div
      ref={scrollRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["black"]} />
        <Suspense fallback={null}>
          <SpaceScene scrollVelocity={scrollVelocity} />
          <Astronaut />
        </Suspense>
      </Canvas>
    </div>
  );
}
