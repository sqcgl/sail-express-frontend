import { startTransition, useCallback, useEffect, useRef, useState } from "react";

export const PAGE_TRANSITION_MS = 420;

function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePageTransition(initialPage) {
  const [activePage, setActivePage] = useState(initialPage);
  const [visiblePage, setVisiblePage] = useState(initialPage);
  const [enteringPage, setEnteringPage] = useState(null);
  const [exitingPage, setExitingPage] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef(null);

  const clearTransition = useCallback(() => {
    if (timeoutRef.current === null) return;
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  const finishTransition = useCallback(
    (page) => {
      clearTransition();
      setVisiblePage(page);
      setEnteringPage(null);
      setExitingPage(null);
      setIsTransitioning(false);
    },
    [clearTransition],
  );

  useEffect(() => clearTransition, [clearTransition]);

  const navigate = useCallback(
    (page) => {
      const currentTarget = enteringPage ?? visiblePage;
      if (page === currentTarget) return;

      startTransition(() => {
        setActivePage(page);
      });

      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", page === "home" ? "/" : `#${page}`);
        window.scrollTo({ top: 0, behavior: "auto" });
      }

      if (prefersReducedMotion()) {
        finishTransition(page);
        return;
      }

      clearTransition();
      setExitingPage(currentTarget);
      setEnteringPage(page);
      setIsTransitioning(true);

      timeoutRef.current = window.setTimeout(() => {
        finishTransition(page);
      }, PAGE_TRANSITION_MS);
    },
    [clearTransition, enteringPage, finishTransition, visiblePage],
  );

  const layers = isTransitioning
    ? [
        { page: exitingPage, type: "exiting" },
        { page: enteringPage, type: "entering" },
      ]
    : [{ page: visiblePage, type: "active" }];

  return {
    activePage,
    isTransitioning,
    layers,
    navigate,
  };
}
