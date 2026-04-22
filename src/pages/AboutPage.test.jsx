import { act } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it, vi } from "vitest";
import AboutPage from "./AboutPage";

function installMatchMedia(matches) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
}

describe("AboutPage motion", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("observes reveal targets and marks them visible when they intersect", () => {
    installMatchMedia(false);

    let observerInstance;
    const observe = vi.fn();
    const unobserve = vi.fn();

    window.IntersectionObserver = vi.fn((callback, options) => {
      observerInstance = {
        callback,
        disconnect: vi.fn(),
        observe,
        options,
        unobserve,
      };

      return observerInstance;
    });

    render(<AboutPage />);

    const flowCard = screen
      .getByRole("heading", {
        level: 3,
        name: "Seafood arrives, wholesale orders take shape.",
      })
      .closest("article");

    expect(document.querySelectorAll("[data-reveal]").length).toBeGreaterThan(0);
    expect(window.IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(flowCard);
    expect(flowCard).not.toHaveClass("is-visible");

    act(() => {
      observerInstance.callback([{ isIntersecting: true, target: flowCard }]);
    });

    expect(flowCard).toHaveClass("is-visible");
    expect(unobserve).toHaveBeenCalledWith(flowCard);
  });

  it("reveals all motion targets immediately in reduced-motion mode", () => {
    installMatchMedia(true);
    window.IntersectionObserver = vi.fn();

    render(<AboutPage />);

    const timelineCard = screen
      .getByRole("heading", { level: 3, name: "Company founded" })
      .closest("article");

    expect(window.IntersectionObserver).not.toHaveBeenCalled();
    expect(timelineCard).toHaveClass("is-visible");
  });
});
