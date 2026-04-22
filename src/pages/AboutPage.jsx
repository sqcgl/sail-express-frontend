import {
  aboutStats,
  aboutTimeline,
  facilityFlow,
  operatingPrinciples,
} from "../data/sitePages";
import { useStaticPageMotion } from "./useStaticPageMotion";

export default function AboutPage() {
  const pageRef = useStaticPageMotion();

  return (
    <main
      ref={pageRef}
      className="static-page static-page--about static-page--motion"
      aria-label="About Sail Express"
    >
      <section className="static-hero static-hero--about">
        <div className="static-hero__copy">
          <p
            className="static-eyebrow about-reveal about-reveal--soft"
            data-reveal
          >
            About Sail Express
          </p>
          <h1
            className="about-reveal about-reveal--hero"
            data-reveal
            style={{ "--reveal-delay": "90ms" }}
          >
            New York wholesale for Japanese restaurants, not just seafood.
          </h1>
          <p
            className="about-reveal about-reveal--soft"
            data-reveal
            style={{ "--reveal-delay": "180ms" }}
          >
            Sail Express receives seafood after it arrives in New York, checks
            and stages it in the facility, then combines it with the wider list
            of Japanese restaurant ingredients and supplies each account needs
            before loading refrigerated delivery routes.
          </p>
        </div>
        <div
          className="static-hero__media about-reveal about-reveal--media"
          data-reveal
          style={{ "--reveal-delay": "260ms" }}
          aria-hidden="true"
        >
          <div className="about-parallax-surface" data-parallax="hero">
            <img src="/generated/ny-facility.png" alt="" />
          </div>
        </div>
      </section>

      <section className="static-section static-section--light">
        <div
          className="static-section__intro about-reveal about-reveal--soft"
          data-reveal
        >
          <p className="static-eyebrow">Facility Flow</p>
          <h2>From New York receiving to complete restaurant orders.</h2>
        </div>
        <div className="flow-grid">
          {facilityFlow.map((step, index) => (
            <article
              className="flow-card about-reveal about-reveal--card"
              key={step.label}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` }}
            >
              <p>{step.label}</p>
              <h3>{step.title}</h3>
              <span>{step.copy}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="static-section static-section--split">
        <div className="about-reveal about-reveal--soft" data-reveal>
          <p className="static-eyebrow">Company Profile</p>
          <h2>Built around restaurant operators, not single-item sourcing.</h2>
          <p>
            Founded in 2020 and based in Queens, New York, Sail Express serves
            restaurants across New York upstate routes, Pennsylvania,
            Philadelphia, Connecticut, and surrounding areas. The business is
            focused on seafood, ingredients, sauces, frozen items, packaging,
            and Japanese restaurant supplies moving through a disciplined local
            wholesale workflow.
          </p>
        </div>
        <div className="stats-grid">
          {aboutStats.map((stat, index) => (
            <article
              className="about-reveal about-reveal--card"
              key={stat.label}
              data-reveal
              style={{ "--reveal-delay": `${index * 100}ms` }}
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="static-section static-section--map">
        <div
          className="map-panel about-reveal about-reveal--from-left"
          data-reveal
        >
          <div className="about-parallax-surface" data-parallax="map">
            <img src="/realistic/ny-map.png" alt="" />
          </div>
        </div>
        <div className="about-reveal about-reveal--from-right" data-reveal>
          <p className="static-eyebrow">Operating Principles</p>
          <h2>Every order is built for full-kitchen service timing.</h2>
          <ul className="principle-list">
            {operatingPrinciples.map((principle, index) => (
              <li
                className="about-reveal about-reveal--soft"
                key={principle}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` }}
              >
                {principle}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="static-section static-section--timeline">
        <div
          className="static-section__intro about-reveal about-reveal--soft"
          data-reveal
        >
          <p className="static-eyebrow">Timeline</p>
          <h2>Growth through broader restaurant wholesale.</h2>
        </div>
        <div
          className="about-timeline__progress about-reveal"
          data-reveal
          style={{ "--reveal-delay": "60ms" }}
          aria-hidden="true"
        />
        <div className="timeline-grid">
          {aboutTimeline.map((item, index) => (
            <article
              className="about-reveal about-reveal--card"
              key={item.year}
              data-reveal
              style={{ "--reveal-delay": `${index * 110}ms` }}
            >
              <strong>{item.year}</strong>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
