import {
  contactMethods,
  partnershipSteps,
  serviceCommitments,
} from "../data/sitePages";
import { useStaticPageMotion } from "./useStaticPageMotion";

export default function ContactPage() {
  const pageRef = useStaticPageMotion();

  return (
    <main
      ref={pageRef}
      className="static-page static-page--contact static-page--motion"
      aria-label="Contact Sail Express"
    >
      <section className="static-hero static-hero--contact">
        <div className="static-hero__copy">
          <p
            className="static-eyebrow about-reveal about-reveal--soft"
            data-reveal
          >
            Contact Sail Express
          </p>
          <h1
            className="about-reveal about-reveal--hero"
            data-reveal
            style={{ "--reveal-delay": "90ms" }}
          >
            Tell us what your kitchen needs restocked.
          </h1>
          <p
            className="about-reveal about-reveal--soft"
            data-reveal
            style={{ "--reveal-delay": "180ms" }}
          >
            Send your seafood list, sauce and dry goods needs, packaging
            requests, route questions, or new account details. We will help
            confirm availability and plan the right wholesale delivery mix.
          </p>
          <a
            className="static-primary-link about-reveal about-reveal--soft"
            data-reveal
            style={{ "--reveal-delay": "260ms" }}
            href="mailto:info@sail-express.com"
          >
            Email Sail Express
          </a>
        </div>
        <div
          className="static-hero__media about-reveal about-reveal--media"
          data-reveal
          style={{ "--reveal-delay": "320ms" }}
          aria-hidden="true"
        >
          <div className="about-parallax-surface" data-parallax="contact-hero">
            <img src="/generated/refrigerated-truck.png" alt="" />
          </div>
        </div>
      </section>

      <section className="static-section static-section--light">
        <div className="contact-grid">
          {contactMethods.map((method, index) => (
            <article
              className="contact-method about-reveal about-reveal--card"
              key={method.label}
              data-reveal
              style={{ "--reveal-delay": `${index * 100}ms` }}
            >
              <p>{method.label}</p>
              {method.href ? (
                <a href={method.href}>{method.title}</a>
              ) : (
                <h2>{method.title}</h2>
              )}
              <span>{method.copy}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="static-section static-section--split">
        <div className="about-reveal about-reveal--from-left" data-reveal>
          <p className="static-eyebrow">Partnership Flow</p>
          <h2>A simple path from supply list to loaded route.</h2>
        </div>
        <div className="partnership-list">
          {partnershipSteps.map((step, index) => (
            <article
              className="about-reveal about-reveal--from-right"
              key={step.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 100}ms` }}
            >
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="static-section static-section--commitments">
        <div
          className="static-section__intro about-reveal about-reveal--soft"
          data-reveal
        >
          <p className="static-eyebrow">Service Commitments</p>
          <h2>Wholesale support built around full-kitchen service.</h2>
        </div>
        <div
          className="contact-commitments__progress about-reveal"
          data-reveal
          style={{ "--reveal-delay": "60ms" }}
          aria-hidden="true"
        />
        <ul className="commitment-grid">
          {serviceCommitments.map((commitment, index) => (
            <li
              className="about-reveal about-reveal--card"
              key={commitment}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` }}
            >
              {commitment}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
