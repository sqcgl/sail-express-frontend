import { useMemo, useState } from "react";
import { productCategories, products } from "../data/products";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const visibleProducts = useMemo(
    () =>
      activeCategory === "all"
        ? products
        : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  return (
    <main className="catalog-page" aria-label="Sail Express product catalog">
      <section className="catalog-hero">
        <p className="static-eyebrow">Products</p>
        <h1>A wholesale catalog built for Japanese restaurant service.</h1>
        <p>
          Seafood, frozen food, dry goods, sauces, produce, packaging, and
          restaurant supplies can move together through one refrigerated Sail
          Express route.
        </p>
        <a className="static-primary-link" href="mailto:info@sail-express.com">
          Send a product list
        </a>
      </section>

      <section className="catalog-toolbar" aria-label="Product categories">
        {productCategories.map((category) => (
          <button
            aria-pressed={activeCategory === category.id}
            className="catalog-toolbar__button"
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            type="button"
          >
            {category.label}
          </button>
        ))}
      </section>

      <section className="product-grid" aria-label="Available product categories">
        {visibleProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <img src={product.image} alt="" />
            <div>
              <h2>{product.name}</h2>
            </div>
          </article>
        ))}
      </section>

      <section className="catalog-note">
        <p className="static-eyebrow">Procurement note</p>
        <h2>Availability changes. Send the list, then confirm the route.</h2>
        <p>
          The public catalog is a starting point for restaurant conversations.
          Email your weekly list so the team can confirm item availability,
          substitutions, pack sizes, and delivery timing.
        </p>
      </section>
    </main>
  );
}
