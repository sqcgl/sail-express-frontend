# Sail Express About / Contact Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add About Us and Contact pages that reflect Sail Express's real New York receiving, facility handling, Japanese restaurant supply assembly, refrigerated loading, and wholesale delivery business.

**Architecture:** Keep the homepage files isolated because another agent is working on them. Add focused static page components, a small shared data module, and a minimal App-level page switcher using React state and hash navigation instead of adding a router dependency.

**Tech Stack:** React 19, Vite 7, Tailwind/CSS, Vitest, Testing Library.

---

### File Structure

- Create: `src/data/sitePages.js`  
  Owns all About/Contact page copy and repeated arrays.
- Create: `src/pages/AboutPage.jsx`  
  Renders the corrected business narrative and operational flow.
- Create: `src/pages/ContactPage.jsx`  
  Renders restaurant partnership/contact flow and email CTA.
- Create: `src/App.test.jsx`  
  Tests navigation and business narrative without touching homepage tests.
- Modify: `src/App.jsx`  
  Adds a small page switcher and conditionally renders Home/About/Contact.
- Modify: `src/index.css`  
  Adds namespaced `.site-switcher` and `.static-page` styles only.

Do not modify:

- `src/components/homepage/*`
- `src/data/supplyChainScenes.js`

### Task 1: App-Level Behavior Tests

**Files:**
- Create: `src/App.test.jsx`

- [ ] **Step 1: Write the failing test**

Create `src/App.test.jsx`:

```jsx
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./components/homepage/ScrollytellingHome", () => ({
  default: () => (
    <main aria-label="Sail Express salmon supply chain story">
      <h1>Home story</h1>
    </main>
  ),
}));

describe("App page navigation", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("switches from the homepage to the corrected About page", () => {
    render(<App />);

    expect(
      screen.getByRole("main", { name: "Sail Express salmon supply chain story" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "About Us" }));

    expect(
      screen.getByRole("heading", {
        name: "New York distribution for Japanese restaurant service.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/receives fish after it arrives in New York/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/combined with the Japanese restaurant supplies/i),
    ).toBeInTheDocument();
  });

  it("switches to Contact and shows the restaurant partnership flow", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Contact" }));

    expect(
      screen.getByRole("heading", { name: "Tell us what your kitchen needs next." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Email Sail Express" })).toHaveAttribute(
      "href",
      "mailto:info@sail-express.com",
    );
    expect(screen.getByText("Confirm availability")).toBeInTheDocument();
    expect(screen.getByText("Load the route")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```powershell
npm run test:run -- src/App.test.jsx
```

Expected: FAIL because `About Us` and `Contact` navigation/page components do not exist yet.

### Task 2: Shared Page Data

**Files:**
- Create: `src/data/sitePages.js`

- [ ] **Step 1: Create the page copy module**

Create `src/data/sitePages.js`:

```js
const foundedYear = 2020;
const experienceYears = Math.max(new Date().getFullYear() - foundedYear, 0);

export const aboutStats = [
  { value: "200+", label: "Restaurant partners" },
  { value: "1000+", label: "Seafood and Japanese supply items" },
  { value: `${experienceYears}+`, label: "Years serving restaurants" },
];

export const facilityFlow = [
  {
    label: "01 / Receive",
    title: "Fish arrives in New York.",
    copy:
      "Sail Express receives fish after it arrives in New York and brings it into the facility for restaurant orders.",
  },
  {
    label: "02 / Check",
    title: "The facility becomes the control point.",
    copy:
      "Product is checked, organized, and staged so kitchens know what is ready for service.",
  },
  {
    label: "03 / Assemble",
    title: "Seafood moves with the rest of the order.",
    copy:
      "Fish is combined with the Japanese restaurant supplies each account needs, from ingredients to daily operating items.",
  },
  {
    label: "04 / Load",
    title: "Wholesale routes leave cold and organized.",
    copy:
      "Orders are loaded onto refrigerated vehicles for wholesale delivery to restaurants across the service area.",
  },
];

export const operatingPrinciples = [
  "New York receiving and facility handling",
  "Seafood plus broader Japanese restaurant ingredient wholesale",
  "Order assembly, route planning, and refrigerated delivery",
  "Restaurant-facing reliability for busy service schedules",
];

export const aboutTimeline = [
  {
    year: "2020",
    title: "Company founded",
    copy:
      "Started in Queens, New York with a focus on seafood and Japanese restaurant ingredient wholesale.",
  },
  {
    year: "2021",
    title: "Route network expanded",
    copy:
      "Built recurring delivery coverage for restaurants beyond the immediate New York City market.",
  },
  {
    year: "2022",
    title: "Facility workflow strengthened",
    copy:
      "Improved receiving, checking, staging, and cold-chain handling for restaurant accounts.",
  },
  {
    year: "2023",
    title: "Wholesale scale grew",
    copy:
      "Supported more than 200 restaurant partners with seafood and Japanese restaurant supplies.",
  },
];

export const contactMethods = [
  {
    label: "Email",
    title: "info@sail-express.com",
    copy: "Best for supply lists, route questions, and new restaurant partnerships.",
    href: "mailto:info@sail-express.com",
  },
  {
    label: "Service Area",
    title: "NY, PA, Philadelphia, CT",
    copy:
      "Coverage includes New York upstate routes, Pennsylvania, Philadelphia, Connecticut, and surrounding restaurant markets.",
  },
  {
    label: "Facility",
    title: "Queens, New York",
    copy:
      "Receiving, order staging, and refrigerated route loading are coordinated through the New York facility workflow.",
  },
];

export const partnershipSteps = [
  {
    title: "Send your needs",
    copy: "Share the seafood, ingredients, and Japanese restaurant supplies your kitchen needs.",
  },
  {
    title: "Confirm availability",
    copy: "The team confirms product fit, timing, and route details for your account.",
  },
  {
    title: "Load the route",
    copy: "Your order is assembled with other required items and loaded for refrigerated wholesale delivery.",
  },
];

export const serviceCommitments = [
  "Respond to restaurant inquiries within 24 hours",
  "One-to-one account support for product and route planning",
  "Facility checks before orders leave New York",
  "Refrigerated delivery built around service timing",
];
```

- [ ] **Step 2: Run the app test to confirm it still fails at missing UI**

Run:

```powershell
npm run test:run -- src/App.test.jsx
```

Expected: FAIL because the page components and navigation have not been implemented.

### Task 3: Static Page Components

**Files:**
- Create: `src/pages/AboutPage.jsx`
- Create: `src/pages/ContactPage.jsx`

- [ ] **Step 1: Create the About page**

Create `src/pages/AboutPage.jsx`:

```jsx
import {
  aboutStats,
  aboutTimeline,
  facilityFlow,
  operatingPrinciples,
} from "../data/sitePages";

export default function AboutPage() {
  return (
    <main className="static-page" aria-label="About Sail Express">
      <section className="static-hero static-hero--about">
        <div className="static-hero__copy">
          <p className="static-eyebrow">About Sail Express</p>
          <h1>New York distribution for Japanese restaurant service.</h1>
          <p>
            Sail Express receives fish after it arrives in New York, brings it
            into the facility, checks and prepares it, combines it with the
            Japanese restaurant supplies each account needs, then loads
            refrigerated vehicles for wholesale delivery.
          </p>
        </div>
        <div className="static-hero__media" aria-hidden="true">
          <img src="/generated/ny-facility.png" alt="" />
        </div>
      </section>

      <section className="static-section static-section--light">
        <div className="static-section__intro">
          <p className="static-eyebrow">Facility Flow</p>
          <h2>From New York receiving to restaurant-ready routes.</h2>
        </div>
        <div className="flow-grid">
          {facilityFlow.map((step) => (
            <article className="flow-card" key={step.label}>
              <p>{step.label}</p>
              <h3>{step.title}</h3>
              <span>{step.copy}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="static-section static-section--split">
        <div>
          <p className="static-eyebrow">Company Profile</p>
          <h2>Built around restaurant operators, not retail shelves.</h2>
          <p>
            Founded in 2020 and based in Queens, New York, Sail Express serves
            restaurants across New York upstate routes, Pennsylvania,
            Philadelphia, Connecticut, and surrounding areas. The business is
            focused on seafood and Japanese restaurant supplies moving through
            a disciplined local wholesale workflow.
          </p>
        </div>
        <div className="stats-grid">
          {aboutStats.map((stat) => (
            <article key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="static-section static-section--map">
        <div className="map-panel">
          <img src="/realistic/ny-map.png" alt="" />
        </div>
        <div>
          <p className="static-eyebrow">Operating Principles</p>
          <h2>Every order is assembled for service timing.</h2>
          <ul className="principle-list">
            {operatingPrinciples.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="static-section static-section--timeline">
        <div className="static-section__intro">
          <p className="static-eyebrow">Timeline</p>
          <h2>Growth through wholesale reliability.</h2>
        </div>
        <div className="timeline-grid">
          {aboutTimeline.map((item) => (
            <article key={item.year}>
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
```

- [ ] **Step 2: Create the Contact page**

Create `src/pages/ContactPage.jsx`:

```jsx
import {
  contactMethods,
  partnershipSteps,
  serviceCommitments,
} from "../data/sitePages";

export default function ContactPage() {
  return (
    <main className="static-page" aria-label="Contact Sail Express">
      <section className="static-hero static-hero--contact">
        <div className="static-hero__copy">
          <p className="static-eyebrow">Contact Sail Express</p>
          <h1>Tell us what your kitchen needs next.</h1>
          <p>
            Send your seafood list, Japanese restaurant supply needs, route
            questions, or partnership details. We will help confirm availability
            and plan the right wholesale delivery path.
          </p>
          <a className="static-primary-link" href="mailto:info@sail-express.com">
            Email Sail Express
          </a>
        </div>
        <div className="static-hero__media" aria-hidden="true">
          <img src="/generated/refrigerated-truck.png" alt="" />
        </div>
      </section>

      <section className="static-section static-section--light">
        <div className="contact-grid">
          {contactMethods.map((method) => (
            <article className="contact-method" key={method.label}>
              <p>{method.label}</p>
              {method.href ? <a href={method.href}>{method.title}</a> : <h2>{method.title}</h2>}
              <span>{method.copy}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="static-section static-section--split">
        <div>
          <p className="static-eyebrow">Partnership Flow</p>
          <h2>A simple path from kitchen needs to loaded route.</h2>
        </div>
        <div className="partnership-list">
          {partnershipSteps.map((step, index) => (
            <article key={step.title}>
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
        <div className="static-section__intro">
          <p className="static-eyebrow">Service Commitments</p>
          <h2>Wholesale support built around restaurant service.</h2>
        </div>
        <ul className="commitment-grid">
          {serviceCommitments.map((commitment) => (
            <li key={commitment}>{commitment}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Run the app test to confirm navigation is still the missing piece**

Run:

```powershell
npm run test:run -- src/App.test.jsx
```

Expected: FAIL because `App.jsx` has not yet rendered the new pages.

### Task 4: App Switcher And Namespaced Styles

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/index.css`

- [ ] **Step 1: Reread App before patching**

Run:

```powershell
Get-Content -Raw src\App.jsx
```

Expected: Confirm it still imports and renders only `ScrollytellingHome`.

- [ ] **Step 2: Replace App with the page switcher**

Modify `src/App.jsx`:

```jsx
import { useCallback, useState } from "react";
import ScrollytellingHome from "./components/homepage/ScrollytellingHome";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

const pages = {
  home: "Home",
  about: "About Us",
  contact: "Contact",
};

function getInitialPage() {
  if (typeof window === "undefined") return "home";
  const hashPage = window.location.hash.replace("#", "");
  return Object.hasOwn(pages, hashPage) ? hashPage : "home";
}

function SiteSwitcher({ activePage, onNavigate }) {
  return (
    <nav className="site-switcher" aria-label="Primary">
      {Object.entries(pages).map(([page, label]) => (
        <button
          aria-current={activePage === page ? "page" : undefined}
          className="site-switcher__button"
          key={page}
          onClick={() => onNavigate(page)}
          type="button"
        >
          {label}
        </button>
      ))}
    </nav>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState(getInitialPage);

  const navigate = useCallback((page) => {
    setActivePage(page);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", page === "home" ? "/" : `#${page}`);
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  return (
    <>
      <SiteSwitcher activePage={activePage} onNavigate={navigate} />
      {activePage === "home" ? <ScrollytellingHome /> : null}
      {activePage === "about" ? <AboutPage /> : null}
      {activePage === "contact" ? <ContactPage /> : null}
    </>
  );
}
```

- [ ] **Step 3: Add namespaced CSS**

Append to `src/index.css`:

```css
@layer components {
  .site-switcher {
    align-items: center;
    background: rgba(7, 20, 36, 0.58);
    backdrop-filter: blur(18px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 999px;
    box-shadow: 0 18px 50px rgba(4, 18, 31, 0.24);
    display: flex;
    gap: 4px;
    left: 50%;
    padding: 5px;
    position: fixed;
    top: 22px;
    transform: translateX(-50%);
    z-index: 60;
  }

  .site-switcher__button {
    background: transparent;
    border: 0;
    border-radius: 999px;
    color: rgba(255, 250, 242, 0.72);
    cursor: pointer;
    font: inherit;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0;
    padding: 10px 14px;
    transition:
      background 180ms cubic-bezier(0.16, 1, 0.3, 1),
      color 180ms cubic-bezier(0.16, 1, 0.3, 1);
    white-space: nowrap;
  }

  .site-switcher__button[aria-current="page"] {
    background: rgba(255, 250, 242, 0.94);
    color: #071424;
  }

  .static-page {
    background: #071424;
    color: #fffaf2;
    min-height: 100vh;
    overflow: hidden;
  }

  .static-hero {
    align-items: center;
    display: grid;
    gap: clamp(32px, 6vw, 86px);
    grid-template-columns: minmax(0, 0.92fr) minmax(280px, 0.78fr);
    min-height: 92vh;
    padding: clamp(118px, 14vw, 180px) clamp(22px, 7vw, 96px) clamp(72px, 9vw, 128px);
    position: relative;
  }

  .static-hero::before {
    background:
      linear-gradient(90deg, rgba(7, 20, 36, 0.94), rgba(7, 20, 36, 0.44) 58%, rgba(7, 20, 36, 0.86)),
      radial-gradient(circle at 72% 44%, rgba(236, 111, 87, 0.22), transparent 34%);
    content: "";
    inset: 0;
    pointer-events: none;
    position: absolute;
  }

  .static-hero__copy,
  .static-hero__media {
    position: relative;
    z-index: 1;
  }

  .static-eyebrow {
    color: rgba(255, 255, 255, 0.66);
    font-family: "IBM Plex Mono", ui-monospace, monospace;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.11em;
    margin: 0 0 18px;
    text-transform: uppercase;
  }

  .static-hero h1,
  .static-section h2 {
    font-family: Georgia, "Times New Roman", serif;
    font-weight: 500;
    letter-spacing: 0;
    margin: 0;
  }

  .static-hero h1 {
    font-size: clamp(48px, 7vw, 104px);
    line-height: 0.93;
    max-width: 11ch;
  }

  .static-hero p:not(.static-eyebrow),
  .static-section p {
    color: rgba(248, 251, 253, 0.76);
    font-size: clamp(16px, 1.5vw, 20px);
    line-height: 1.65;
    margin: 26px 0 0;
    max-width: 42rem;
  }

  .static-hero__media {
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 8px;
    box-shadow: 0 36px 100px rgba(0, 0, 0, 0.36);
    overflow: hidden;
  }

  .static-hero__media img {
    display: block;
    filter: saturate(0.88) contrast(1.05) brightness(0.82);
    height: min(62vh, 620px);
    object-fit: cover;
    width: 100%;
  }

  .static-primary-link {
    background: #fffaf2;
    border-radius: 999px;
    color: #071424;
    display: inline-flex;
    font-weight: 900;
    margin-top: 32px;
    padding: 15px 20px;
  }

  .static-section {
    padding: clamp(78px, 10vw, 130px) clamp(22px, 7vw, 96px);
  }

  .static-section--light {
    background: #f4fbfd;
    color: #071424;
  }

  .static-section--light .static-eyebrow,
  .static-section--light p,
  .static-section--light span {
    color: rgba(7, 20, 36, 0.68);
  }

  .static-section__intro {
    margin-bottom: clamp(34px, 5vw, 64px);
    max-width: 760px;
  }

  .static-section h2 {
    font-size: clamp(38px, 5vw, 76px);
    line-height: 0.98;
  }

  .flow-grid,
  .timeline-grid,
  .commitment-grid,
  .contact-grid {
    display: grid;
    gap: 1px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .flow-card,
  .timeline-grid article,
  .contact-method,
  .commitment-grid li {
    background: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(7, 20, 36, 0.08);
    min-height: 230px;
    padding: clamp(22px, 3vw, 34px);
  }

  .flow-card p,
  .contact-method p {
    font-family: "IBM Plex Mono", ui-monospace, monospace;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    margin: 0 0 22px;
    text-transform: uppercase;
  }

  .flow-card h3,
  .timeline-grid h3,
  .partnership-list h3 {
    color: #071424;
    font-size: 22px;
    line-height: 1.08;
    margin: 0 0 18px;
  }

  .flow-card span,
  .contact-method span {
    color: rgba(7, 20, 36, 0.66);
    display: block;
    line-height: 1.55;
  }

  .static-section--split,
  .static-section--map {
    align-items: center;
    display: grid;
    gap: clamp(34px, 6vw, 80px);
    grid-template-columns: minmax(0, 0.85fr) minmax(280px, 0.75fr);
  }

  .stats-grid {
    display: grid;
    gap: 1px;
  }

  .stats-grid article {
    border-top: 1px solid rgba(255, 255, 255, 0.16);
    padding: 24px 0;
  }

  .stats-grid strong {
    display: block;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(42px, 5vw, 72px);
    font-weight: 500;
    line-height: 1;
  }

  .stats-grid span {
    color: rgba(255, 255, 255, 0.7);
    display: block;
    margin-top: 8px;
  }

  .map-panel {
    background: rgba(255, 250, 242, 0.94);
    border-radius: 8px;
    overflow: hidden;
    padding: 18px;
  }

  .map-panel img {
    display: block;
    width: 100%;
  }

  .principle-list,
  .commitment-grid {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .principle-list {
    display: grid;
    gap: 14px;
    margin-top: 34px;
  }

  .principle-list li {
    border-top: 1px solid rgba(255, 255, 255, 0.16);
    color: rgba(255, 250, 242, 0.82);
    font-size: 18px;
    line-height: 1.35;
    padding-top: 14px;
  }

  .static-section--timeline,
  .static-section--commitments {
    background: #fffaf2;
    color: #071424;
  }

  .timeline-grid article {
    background: #f4fbfd;
  }

  .timeline-grid strong {
    color: #ec6f57;
    font-family: "IBM Plex Mono", ui-monospace, monospace;
    font-size: 13px;
    letter-spacing: 0.08em;
  }

  .timeline-grid p,
  .static-section--timeline .static-eyebrow,
  .static-section--timeline p,
  .static-section--commitments .static-eyebrow,
  .static-section--commitments p {
    color: rgba(7, 20, 36, 0.66);
  }

  .contact-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .contact-method a,
  .contact-method h2 {
    color: #071424;
    display: block;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(28px, 3vw, 42px);
    font-weight: 500;
    line-height: 1;
    margin: 0 0 22px;
  }

  .partnership-list {
    display: grid;
    gap: 22px;
  }

  .partnership-list article {
    align-items: start;
    border-top: 1px solid rgba(255, 255, 255, 0.16);
    display: grid;
    gap: 20px;
    grid-template-columns: 56px minmax(0, 1fr);
    padding-top: 22px;
  }

  .partnership-list strong {
    color: #ec6f57;
    font-family: "IBM Plex Mono", ui-monospace, monospace;
    font-size: 13px;
  }

  .partnership-list h3 {
    color: #fffaf2;
  }

  .partnership-list p {
    margin-top: 8px;
  }

  .commitment-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .commitment-grid li {
    background: #f4fbfd;
    color: rgba(7, 20, 36, 0.76);
    font-size: 18px;
    line-height: 1.45;
  }
}

@media (max-width: 980px) {
  .site-switcher {
    top: 76px;
  }

  .static-hero,
  .static-section--split,
  .static-section--map {
    grid-template-columns: 1fr;
  }

  .flow-grid,
  .timeline-grid,
  .contact-grid,
  .commitment-grid {
    grid-template-columns: 1fr;
  }

  .static-hero {
    min-height: auto;
  }

  .static-hero__media img {
    height: 360px;
  }
}

@media (max-width: 560px) {
  .site-switcher {
    left: 18px;
    right: 18px;
    transform: none;
  }

  .site-switcher__button {
    flex: 1;
    padding-inline: 8px;
  }
}
```

- [ ] **Step 4: Run the focused app test**

Run:

```powershell
npm run test:run -- src/App.test.jsx
```

Expected: PASS.

### Task 5: Full Verification

**Files:**
- Read-only verification across the app

- [ ] **Step 1: Run the full test suite**

Run:

```powershell
npm run test:run
```

Expected: PASS.

- [ ] **Step 2: Run production build**

Run:

```powershell
npm run build
```

Expected: PASS.

- [ ] **Step 3: Start the local dev server**

Run:

```powershell
npm run dev -- --port 5174
```

Expected: Vite reports a local URL on `http://127.0.0.1:5174/`.

- [ ] **Step 4: Browser smoke check**

Open `http://127.0.0.1:5174/`, click `About Us`, click `Contact`, then return to `Home`.

Expected:

- Home renders without editing homepage-owned files.
- About headline and facility flow are visible.
- Contact email CTA and partnership flow are visible.
- No obvious console errors.

