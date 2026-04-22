# Sail Express About / Contact Page Design

> Date: 2026-04-21
> Status: Approved direction, pending implementation plan

## Goal

Add About Us and Contact pages to the current Sail Express home project while preserving the homepage work owned by another agent.

The pages should use copy from `C:\Projects\sail-express` as source material, but correct the business narrative: Sail Express is not presented as a fishing or ocean-origin company. The core business is New York-area Japanese restaurant wholesale distribution after seafood arrives in New York.

## Business Narrative

Sail Express receives fish after it arrives in New York, brings it into the facility, checks and prepares it for restaurant orders, combines it with other Japanese restaurant supplies, loads refrigerated vehicles, and wholesales those goods to restaurants.

The pages should emphasize:

- New York receiving and facility handling
- Seafood plus broader Japanese restaurant ingredient wholesale
- Order assembly, route planning, and refrigerated delivery
- Restaurant-facing reliability, not fishing-origin storytelling

## Non-Interference Boundary

Do not edit these homepage-owned files:

- `src/components/homepage/*`
- `src/data/supplyChainScenes.js`

Avoid broad global CSS changes that could alter the homepage. New CSS must be namespaced for the added pages and navigation shell.

If route/navigation work requires touching `src/App.jsx`, keep the edit small and reread the file immediately before patching.

## Recommended Approach

Use a lightweight internal page switcher instead of adding `react-router-dom`.

Reasons:

- The current app is a Vite/React single-page experience.
- `react-router-dom` is not currently installed.
- Internal state plus hash links is enough for Home, About, and Contact.
- It keeps the change small while another agent works on the homepage.

## Page Structure

### About Us

Narrative role: explain the actual operation behind the brand.

Sections:

- Hero: "New York distribution for Japanese restaurant service."
- Facility flow: receive fish in New York, inspect and stage at the facility, combine with Japanese restaurant supplies, load refrigerated vehicles, deliver wholesale routes.
- Company profile: adapt the reference copy about Queens, New York, service areas, restaurant partners, and experience.
- Operating principles: quality checks, broad ingredient sourcing, cold-chain loading, restaurant support.
- Timeline: reuse the 2020-2023 milestones, but tune copy toward distribution growth and restaurant wholesale service.

### Contact

Narrative role: help restaurants start a supply relationship.

Sections:

- Hero: "Tell us what your kitchen needs next."
- Contact methods: email-first contact; omit phone numbers unless a verified number exists; include a service area summary.
- Partnership flow: send needs, confirm availability, plan route, receive delivery.
- Service commitments: 24-hour response, one-to-one support, quality control, timely refrigerated delivery.
- Final CTA: direct email link to `info@sail-express.com`.

## Visual Direction

Continue the homepage's cinematic seafood logistics language:

- Deep navy and cold-chain light surfaces from `docs/brand-spec.md`
- Large serif display headlines
- Monospace operational labels
- Real local assets where available: `public/logo.png`, `public/realistic/ny-map.png`, facility/truck/ice images if useful
- No decorative orb backgrounds, no generic glass-card stack, no fake fishing claims

The About and Contact pages should be calmer and more readable than the homepage. They can borrow the cinematic tone without requiring long scroll animation.

## Data Model

Create a small page data module for repeated content:

- About flow steps
- Stats
- Timeline
- Contact methods
- Partnership steps
- Commitments

This keeps JSX readable and makes business copy easier to update later.

## Testing

Add focused tests for:

- Navigation can switch to About and Contact without removing the homepage component.
- About page includes the corrected business narrative around New York receiving, facility handling, Japanese restaurant supplies, and refrigerated wholesale delivery.
- Contact page includes email CTA and restaurant partnership flow.

Run:

- `npm run test:run`
- `npm run build`

If feasible after implementation, run the Vite dev server and capture a quick browser check.

## Constraints

The project is not currently a git repository, so the spec cannot be committed from this workspace.
