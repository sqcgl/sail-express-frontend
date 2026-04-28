import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it } from "vitest";
import ProductsPage from "./ProductsPage";

describe("ProductsPage", () => {
  afterEach(() => cleanup());

  it("renders a restaurant wholesale catalog with category controls", () => {
    render(<ProductsPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "A wholesale catalog built for Japanese restaurant service.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fresh" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Frozen" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dry" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Supplies" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Pantry" })).not.toBeInTheDocument();
    expect(screen.getByText("UDON NOODLES")).toBeInTheDocument();
    expect(screen.getByText("KOSHI HIKARI RICE")).toBeInTheDocument();
  });

  it("filters product cards by category", () => {
    render(<ProductsPage />);

    fireEvent.click(screen.getByRole("button", { name: "Fresh" }));

    expect(screen.getByText("FLUKE")).toBeInTheDocument();
    expect(screen.getByText("SPANISH MACKEREL")).toBeInTheDocument();
    expect(screen.queryByText("UDON NOODLES")).not.toBeInTheDocument();
  });

  it("shows the imported fresh seafood inventory with clean product cards", () => {
    render(<ProductsPage />);

    fireEvent.click(screen.getByRole("button", { name: "Fresh" }));

    expect(screen.getAllByRole("article")).toHaveLength(29);
    expect(screen.queryByText("HIRA ME")).not.toBeInTheDocument();
    expect(screen.queryByText("AFL01 /LB")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "LIVE LOBSTER" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "FATTY TUNA" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "KANPACHI FILLET" }),
    ).toBeInTheDocument();
  });

  it("combines frozen food and ice cream into the Frozen category", () => {
    render(<ProductsPage />);

    fireEvent.click(screen.getByRole("button", { name: "Frozen" }));

    expect(screen.getAllByRole("article")).toHaveLength(99);
    expect(screen.getByText("UDON NOODLES")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "ICE CREAM - GREEN TEA" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("IGT01 2.4GL/TUB")).not.toBeInTheDocument();
  });

  it("combines dry food, sauce, and vegetable into the Dry category", () => {
    render(<ProductsPage />);

    fireEvent.click(screen.getByRole("button", { name: "Dry" }));

    expect(screen.getAllByRole("article")).toHaveLength(116);
    expect(screen.getByText("KOSHI HIKARI RICE")).toBeInTheDocument();
    expect(screen.queryByText("DRI03 50LB/BAG (NYFISH)")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "AVOCADO" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("VAV01-03 36/40/48PC/CS")).not.toBeInTheDocument();
  });

  it("places non-food inventory under Supplies", () => {
    render(<ProductsPage />);

    fireEvent.click(screen.getByRole("button", { name: "Supplies" }));

    expect(screen.queryByText("KOSHI HIKARI RICE")).not.toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(39);
    expect(
      screen.getByRole("heading", { level: 2, name: "PLASTIC WRAP910" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("NWP02 2000FEET/BOX Reynolds")).not.toBeInTheDocument();
  });

  it("offers an email ordering CTA", () => {
    render(<ProductsPage />);

    expect(screen.getByRole("link", { name: "Send a product list" })).toHaveAttribute(
      "href",
      "mailto:info@sail-express.com",
    );
  });
});
