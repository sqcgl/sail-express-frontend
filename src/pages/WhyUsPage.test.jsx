import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it } from "vitest";
import WhyUsPage from "./WhyUsPage";

describe("WhyUsPage", () => {
  afterEach(() => cleanup());

  it("renders Sail Express restaurant wholesale proof points", () => {
    render(<WhyUsPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Why restaurants build their weekly list around Sail Express.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Refrigerated delivery routes")).toBeInTheDocument();
    expect(
      screen.getByText("One-stop Japanese restaurant wholesale"),
    ).toBeInTheDocument();
    expect(screen.getByText("New York facility checks")).toBeInTheDocument();
    expect(
      screen.getByText("Account support for substitutions"),
    ).toBeInTheDocument();
  });
});
