import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ScrollytellingHome from "./ScrollytellingHome";
import { supplyChainScenes } from "../../data/supplyChainScenes";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("ScrollytellingHome", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders the six-stage supply-chain story", () => {
    render(<ScrollytellingHome />);

    expect(supplyChainScenes).toHaveLength(6);
    expect(screen.getByRole("main")).toHaveAttribute(
      "aria-label",
      "Sail Express restaurant wholesale story",
    );
    expect(screen.getAllByTestId("scene-photo")).toHaveLength(6);
    expect(document.querySelector(".motif")).toBeNull();
    expect(document.querySelector(".story-grain")).toBeNull();
    expect(supplyChainScenes.every((scene) => scene.photo.startsWith("/generated/"))).toBe(
      true,
    );

    for (const scene of [
      "Sourcing Network",
      "Inbound Flow",
      "Cold Handling",
      "New York Facility",
      "Refrigerated Truck",
      "Restaurant Delivery",
    ]) {
      expect(screen.getByText(scene)).toBeInTheDocument();
    }
  });

  it("updates the active scene after scrolling in React StrictMode", () => {
    const frames = new Map();
    let nextFrame = 1;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      const frame = nextFrame;
      nextFrame += 1;
      frames.set(frame, callback);
      return frame;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation((frame) => {
      frames.delete(frame);
    });

    render(
      <React.StrictMode>
        <ScrollytellingHome />
      </React.StrictMode>,
    );

    const story = document.querySelector(".story-scroll");
    Object.defineProperty(story, "offsetHeight", {
      configurable: true,
      value: 7000,
    });

    let top = 0;
    story.getBoundingClientRect = () => ({ top });

    const flushFrames = () => {
      const callbacks = Array.from(frames.values());
      frames.clear();
      callbacks.forEach((callback) => callback(performance.now()));
    };

    act(flushFrames);
    top = -3900;

    act(() => {
      window.dispatchEvent(new Event("scroll"));
      flushFrames();
    });

    expect(
      screen.getByRole("heading", { name: "Queens turns lists into loaded orders." }),
    ).toBeInTheDocument();
  });
});
