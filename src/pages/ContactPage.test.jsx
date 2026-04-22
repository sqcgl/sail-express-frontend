import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it } from "vitest";
import ContactPage from "./ContactPage";

describe("ContactPage", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the broader restaurant wholesale message", () => {
    render(<ContactPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Tell us what your kitchen needs restocked." }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/sauce and dry goods needs, packaging requests, route questions/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Best for item lists, restock requests, route questions, and new restaurant accounts."),
    ).toBeInTheDocument();
  });

  it("shows the updated partnership and service commitments", () => {
    render(<ContactPage />);

    expect(screen.getByText("Send your list")).toBeInTheDocument();
    expect(screen.getByText("Confirm the order mix")).toBeInTheDocument();
    expect(screen.getByText("Receive one wholesale route")).toBeInTheDocument();
    expect(
      screen.getByText("Respond to restaurant restock inquiries within 24 hours"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Refrigerated delivery coordinated around restaurant service timing"),
    ).toBeInTheDocument();
  });
});
