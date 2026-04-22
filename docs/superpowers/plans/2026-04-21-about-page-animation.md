# About Page Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add staged reveal and subtle parallax motion to the existing About page while keeping the layout readable and performance-safe.

**Architecture:** Add a small About-page-specific motion hook that observes reveal targets and updates light parallax values for a few media blocks. Update the About page markup with focused motion hooks and extend namespaced CSS for staggered reveals, hover lift, stat sweeps, and timeline accents.

**Tech Stack:** React 19, Vite 7, CSS transitions, IntersectionObserver, requestAnimationFrame, Vitest, Testing Library.

---

### File Structure

- Create: `src/pages/AboutPage.test.jsx`
- Create: `src/pages/useAboutPageMotion.js`
- Modify: `src/pages/AboutPage.jsx`
- Modify: `src/index.css`

### Task 1: About Page Motion Tests

**Files:**
- Create: `src/pages/AboutPage.test.jsx`

- [ ] **Step 1: Write the failing test**

Add tests that verify:

- About page registers reveal targets with `IntersectionObserver`
- intersecting targets receive the `is-visible` class
- reduced-motion mode reveals all targets immediately without creating an observer

- [ ] **Step 2: Run the targeted test to verify it fails**

Run:

```powershell
npm run test:run -- src/pages/AboutPage.test.jsx
```

Expected: FAIL because the About page does not yet contain the motion hook or reveal-state behavior.

### Task 2: About Page Motion Hook

**Files:**
- Create: `src/pages/useAboutPageMotion.js`

- [ ] **Step 1: Implement the minimal motion hook**

Create a hook that:

- finds `[data-reveal]` nodes inside the page root
- immediately reveals them when reduced motion is enabled or observers are unavailable
- otherwise observes them and adds `is-visible` on first intersection
- updates `--about-parallax-shift` on `[data-parallax]` elements inside a single `requestAnimationFrame` scroll loop

- [ ] **Step 2: Run the targeted test**

Run:

```powershell
npm run test:run -- src/pages/AboutPage.test.jsx
```

Expected: still FAIL until the About page starts using the hook and reveal markup.

### Task 3: About Page Markup

**Files:**
- Modify: `src/pages/AboutPage.jsx`

- [ ] **Step 1: Add motion hooks to the existing sections**

Update the page so the hero, section intros, flow cards, stats, map panel, principle items, and timeline cards each expose the appropriate `data-reveal` and `data-parallax` markers, plus stagger delays where needed.

- [ ] **Step 2: Run the targeted test**

Run:

```powershell
npm run test:run -- src/pages/AboutPage.test.jsx
```

Expected: PASS.

### Task 4: Namespaced Motion Styles

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add About page motion styles**

Add namespaced CSS for:

- base hidden/visible reveal states
- hero stagger timing
- flow-card hover lift
- stat highlight sweep
- map/principle opposing entrances
- timeline accent line expansion
- reduced-motion safe behavior

- [ ] **Step 2: Run the targeted test and check for regressions**

Run:

```powershell
npm run test:run -- src/pages/AboutPage.test.jsx
```

Expected: PASS.

### Task 5: Verification

**Files:**
- Read-only verification

- [ ] **Step 1: Run the full test suite**

Run:

```powershell
npm run test:run
```

Expected: PASS.

- [ ] **Step 2: Run the production build**

Run:

```powershell
npm run build
```

Expected: PASS.

- [ ] **Step 3: Start a local preview and inspect About**

Run:

```powershell
npm run dev -- --port 4174
```

Expected: the local Vite URL opens and the About page shows staged narrative motion.
