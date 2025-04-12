import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface UseSpaceScrollOptions {
  damping?: number; // Not directly used by GSAP tween, but conceptually useful
  maxVelocity?: number;
  scrollSensitivity?: number;
  decayDuration?: number; // Duration for velocity to return to 0
}

export const useSpaceScroll = (
  targetRef: React.RefObject<HTMLElement>,
  options?: UseSpaceScrollOptions
) => {
  const {
    // damping = 0.95, // GSAP handles decay via duration/ease
    maxVelocity = 50, // Reduced max velocity
    scrollSensitivity = 0.2, // Reduced sensitivity
    decayDuration = 2.5, // Increased decay duration for smoother slowdown
  } = options || {};

  const [velocity, setVelocity] = useState(0);
  const velocityRef = useRef(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      let deltaVelocity = event.deltaY * scrollSensitivity;
      velocityRef.current += deltaVelocity;
      velocityRef.current = Math.max(
        -maxVelocity,
        Math.min(maxVelocity, velocityRef.current)
      );

      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }

      setVelocity(velocityRef.current);

      tweenRef.current = gsap.to(velocityRef, {
        current: 0,
        duration: decayDuration, // Use the option
        ease: "power1.out",
        onUpdate: () => {
          setVelocity(velocityRef.current);
        },
        onComplete: () => {
          velocityRef.current = 0;
          setVelocity(0);
          tweenRef.current = null;
        },
      });
    };

    target.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      target.removeEventListener("wheel", handleWheel);
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
    // Include decayDuration in dependencies
  }, [targetRef, maxVelocity, scrollSensitivity, decayDuration]);

  return velocity;
};
