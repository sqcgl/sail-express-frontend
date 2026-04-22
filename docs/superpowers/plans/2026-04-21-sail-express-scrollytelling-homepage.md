# Sail Express Scrollytelling Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React/Tailwind homepage that follows a central salmon through six connected supply-chain scenes.

**Architecture:** Use a small Vite app with scene data separated from reusable React components. The sticky stage owns scroll progress and exposes scene progress to layered visual components.

**Tech Stack:** React, Tailwind CSS, Vite, Vitest, Testing Library.

---

### Task 1: Structure Contract

**Files:**
- Test: `src/components/homepage/ScrollytellingHome.test.jsx`

- [x] **Step 1: Write the failing test**

Test that the homepage renders a `main` landmark, six named scenes, and a central salmon actor.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:run`
Expected: FAIL because the homepage modules are not implemented yet.

### Task 2: Scrollytelling Implementation

**Files:**
- Create: `src/data/supplyChainScenes.js`
- Create: `src/components/homepage/ScrollytellingHome.jsx`
- Create: `src/components/homepage/SceneLayer.jsx`
- Create: `src/components/homepage/SalmonActor.jsx`
- Create: `src/components/homepage/ProgressRail.jsx`
- Create: `src/components/homepage/useScrollProgress.js`
- Create: `src/App.jsx`
- Create: `src/main.jsx`
- Create: `src/index.css`

- [ ] **Step 1: Implement scene data**

Six scene objects: ocean, fishing boat, ice packing, New York facility, refrigerated truck, restaurant kitchen.

- [ ] **Step 2: Implement scroll progress hook**

Compute normalized progress from the scrollytelling container using `requestAnimationFrame`, `scroll`, and `resize`.

- [ ] **Step 3: Implement reusable scene and salmon components**

Use transform/opacity only for motion. Keep salmon centered and vary stage layers around it.

- [ ] **Step 4: Implement the page shell**

Use a tall scroll container with a sticky viewport, cinematic copy, progress rail, and final CTA.

### Task 3: Verification

**Files:**
- Screenshot output: `output/playwright/`

- [ ] **Step 1: Run tests**

Run: `npm run test:run`
Expected: PASS.

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Verify in browser**

Run the dev server and capture desktop/mobile screenshots with Playwright.
