import { whyUsProofPoints } from "../data/products";

export default function WhyUsPage() {
  return (
    <main className="why-page" aria-label="Why choose Sail Express">
      <section className="why-hero">
        <p className="static-eyebrow">Why Us</p>
        <h1>Why restaurants build their weekly list around Sail Express.</h1>
        <p>
          Sail Express is built for recurring restaurant accounts that need
          seafood and the rest of the kitchen list handled together.
        </p>
      </section>

      <section className="why-proof-grid">
        {whyUsProofPoints.map((point, index) => (
          <article className="why-proof" key={point.title}>
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <h2>{point.title}</h2>
            <p>{point.copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
