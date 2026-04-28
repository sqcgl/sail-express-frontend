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

  it("renders the four-stage restaurant order workflow story", () => {
    render(<ScrollytellingHome />);

    expect(supplyChainScenes).toHaveLength(4);
    expect(screen.getByRole("main")).toHaveAttribute(
      "aria-label",
      "Sail Express restaurant wholesale story",
    );
    expect(screen.getAllByTestId("scene-photo")).toHaveLength(4);
    expect(document.querySelector(".motif")).toBeNull();
    expect(document.querySelector(".story-grain")).toBeNull();
    expect(supplyChainScenes.every((scene) => scene.photo.startsWith("/generated/"))).toBe(
      true,
    );
    expect(new Set(supplyChainScenes.map((scene) => scene.photo)).size).toBe(4);
    expect(
      screen.getByRole("heading", {
        name: "Send the full list your kitchen needs restocked.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Seafood, frozen items, sauces, rice, packaging, and daily supplies start as one restaurant order list.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Featured Products")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "From weekly list to refrigerated route, one wholesale workflow.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Add the staples your next order needs.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("KOSHI HIKARI RICE")).toBeInTheDocument();

    for (const scene of [
      "Restaurant List",
      "Availability Check",
      "Facility Assembly",
      "Cold Route Delivery",
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
      screen.getByRole("heading", { name: "Queens turns the approved list into one loaded order." }),
    ).toBeInTheDocument();
  });
});
