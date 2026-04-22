import { useEffect, useRef } from "react";

const clamp = (value, min = -1, max = 1) => Math.min(max, Math.max(min, value));

function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useStaticPageMotion() {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const revealNodes = Array.from(page.querySelectorAll("[data-reveal]"));
    if (!revealNodes.length) return undefined;

    if (
      prefersReducedMotion() ||
      typeof window.IntersectionObserver !== "function"
    ) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return undefined;
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18,
      },
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || prefersReducedMotion()) return undefined;

    const parallaxNodes = Array.from(page.querySelectorAll("[data-parallax]"));
    if (!parallaxNodes.length) return undefined;

    let frameRef = null;

    const update = () => {
      const viewportHeight = window.innerHeight || 1;

      parallaxNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const progress = clamp((center - viewportHeight / 2) / viewportHeight);
        node.style.setProperty(
          "--about-parallax-shift",
          `${(progress * -22).toFixed(2)}px`,
        );
      });

      frameRef = null;
    };

    const requestUpdate = () => {
      if (frameRef !== null) return;
      frameRef = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameRef !== null) {
        window.cancelAnimationFrame(frameRef);
      }
    };
  }, []);

  return pageRef;
}
