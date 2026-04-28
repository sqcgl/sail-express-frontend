import { act } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

const TRANSITION_MS = 420;

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

vi.mock("./components/homepage/ScrollytellingHome", () => ({
  default: () => (
    <main aria-label="Sail Express restaurant wholesale story">
      <h1>Home story</h1>
    </main>
  ),
}));

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

describe("App page navigation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubEnv("VITE_SITE_PASSWORD", "");
    installMatchMedia(false);
    window.history.replaceState(null, "", "/");
    window.sessionStorage.clear();
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
    cleanup();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("requires the configured password before rendering the site", () => {
    vi.stubEnv("VITE_SITE_PASSWORD", "open-sesame");

    render(<App />);

    expect(screen.getByRole("heading", { name: "Private access" })).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
    expect(
      screen.queryByRole("main", { name: "Sail Express restaurant wholesale story" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Primary" })).not.toBeInTheDocument();
  });

  it("unlocks the site with the correct password and remembers the session", () => {
    vi.stubEnv("VITE_SITE_PASSWORD", "open-sesame");

    const { unmount } = render(<App />);

    act(() => {
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "wrong-password" },
      });
      fireEvent.submit(screen.getByRole("button", { name: "Enter" }).closest("form"));
    });

    expect(screen.getByRole("alert")).toHaveTextContent("Incorrect password.");
    expect(
      screen.queryByRole("main", { name: "Sail Express restaurant wholesale story" }),
    ).not.toBeInTheDocument();

    act(() => {
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "open-sesame" },
      });
      fireEvent.submit(screen.getByRole("button", { name: "Enter" }).closest("form"));
    });

    expect(
      screen.getByRole("main", { name: "Sail Express restaurant wholesale story" }),
    ).toBeInTheDocument();

    unmount();
    render(<App />);

    expect(
      screen.getByRole("main", { name: "Sail Express restaurant wholesale story" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Private access" })).not.toBeInTheDocument();
  });

  it("switches from the homepage to the corrected About page", () => {
    render(<App />);

    expect(
      screen.getByRole("main", { name: "Sail Express restaurant wholesale story" }),
    ).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByRole("link", { name: "About Us" }));
    });

    expect(
      screen.getByRole("heading", {
        name: "New York wholesale for Japanese restaurants, not just seafood.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/receives seafood after it arrives in New York/i),
    ).toHaveLength(2);
    expect(
      screen.getByText(/wider list of Japanese restaurant ingredients and supplies/i),
    ).toBeInTheDocument();
  });

  it("switches to Products and Why Us pages", () => {
    render(<App />);

    act(() => {
      fireEvent.click(screen.getByRole("link", { name: "Products" }));
    });

    expect(
      screen.getByRole("heading", {
        name: "A wholesale catalog built for Japanese restaurant service.",
      }),
    ).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(TRANSITION_MS + 20);
      fireEvent.click(screen.getByRole("link", { name: "Why Us" }));
    });

    expect(
      screen.getByRole("heading", {
        name: "Why restaurants build their weekly list around Sail Express.",
      }),
    ).toBeInTheDocument();
  });

  it("renders outgoing and incoming page layers while a transition is running", () => {
    render(<App />);

    act(() => {
      fireEvent.click(screen.getByRole("link", { name: "About Us" }));
    });

    const shell = screen.getByTestId("page-shell");
    const exitingLayer = document.querySelector('[data-page-layer="exiting"]');
    const enteringLayer = document.querySelector('[data-page-layer="entering"]');

    expect(shell).toHaveAttribute("data-transition-state", "transitioning");
    expect(exitingLayer).toHaveAttribute("data-page-id", "home");
    expect(enteringLayer).toHaveAttribute("data-page-id", "about");

    act(() => {
      vi.advanceTimersByTime(TRANSITION_MS + 20);
    });

    expect(shell).toHaveAttribute("data-transition-state", "idle");
    expect(document.querySelector('[data-page-layer="active"]')).toHaveAttribute(
      "data-page-id",
      "about",
    );
    expect(document.querySelector('[data-page-layer="exiting"]')).toBeNull();
    expect(document.querySelector('[data-page-layer="entering"]')).toBeNull();
  });

  it("switches to Contact and shows the restaurant partnership flow", () => {
    render(<App />);

    act(() => {
      fireEvent.click(screen.getByRole("link", { name: "Contact" }));
    });

    expect(
      screen.getByRole("heading", { name: "Tell us what your kitchen needs restocked." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Email Sail Express" })).toHaveAttribute(
      "href",
      "mailto:info@sail-express.com",
    );
    expect(screen.getByText("Confirm the order mix")).toBeInTheDocument();
    expect(screen.getByText("Receive one wholesale route")).toBeInTheDocument();
  });

  it("responds to hash changes from in-page links", () => {
    render(<App />);

    act(() => {
      window.location.hash = "#products";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });

    expect(
      screen.getByRole("heading", {
        name: "A wholesale catalog built for Japanese restaurant service.",
      }),
    ).toBeInTheDocument();
  });

  it("loads Products directly from the initial hash", () => {
    window.history.replaceState(null, "", "/#products");

    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: "A wholesale catalog built for Japanese restaurant service.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "href",
      "#products",
    );
  });

  it("keeps the active nav in sync when browser history returns during a transition", () => {
    window.history.replaceState(null, "", "/#products");
    render(<App />);

    act(() => {
      fireEvent.click(screen.getByRole("link", { name: "Why Us" }));
    });

    expect(screen.getByRole("link", { name: "Why Us" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    act(() => {
      window.history.replaceState(null, "", "/#products");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("skips animated transitions when reduced motion is enabled", () => {
    installMatchMedia(true);

    render(<App />);

    act(() => {
      fireEvent.click(screen.getByRole("link", { name: "Contact" }));
    });

    expect(screen.getByTestId("page-shell")).toHaveAttribute(
      "data-transition-state",
      "idle",
    );
    expect(document.querySelector('[data-page-layer="active"]')).toHaveAttribute(
      "data-page-id",
      "contact",
    );
    expect(document.querySelector('[data-page-layer="entering"]')).toBeNull();
  });
});
