import { useEffect, useRef, useState } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function useScrollProgress(sceneCount) {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const element = containerRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrollable = Math.max(element.offsetHeight - window.innerHeight, 1);
      const nextProgress = clamp(-rect.top / scrollable);

      setProgress((current) =>
        Math.abs(current - nextProgress) > 0.001 ? nextProgress : current,
      );
      frameRef.current = null;
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, []);

  const scenePosition = progress * (sceneCount - 1);
  const activeIndex = clamp(Math.round(scenePosition), 0, sceneCount - 1);
  const sceneProgress = clamp(scenePosition - Math.floor(scenePosition));

  return {
    activeIndex,
    containerRef,
    progress,
    scenePosition,
    sceneProgress,
  };
}
