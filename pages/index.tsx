import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, useCallback } from "react";
import SpaceScene from "@/components/SpaceScene";
import Astronaut from "@/components/Astronaut";
import { useSpaceScroll } from "@/hooks/useSpaceScroll";
import HelpTooltip from "@/components/HelpTooltip";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollVelocity = useSpaceScroll(scrollRef);

  return (
    <>
      {/* Global styles to remove default margin/padding */}
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          overflow: hidden; /* Prevent scrollbars on body */
          background-color: black; /* Ensure background is black */
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
      <div
        ref={scrollRef}
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden", // Keep hidden on the container too
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
        <HelpTooltip />
      </div>
    </>
  );
}
