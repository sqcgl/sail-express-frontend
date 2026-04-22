# Sail Express About Page Animation Design

> Date: 2026-04-21
> Status: Approved for implementation

## Goal

Add more animation to the existing About Us page without turning it into a second scrollytelling homepage.

The page should feel more alive and cinematic, but remain readable and operationally focused. The approved direction is a standard narrative treatment: sections wake up as the user scrolls, images move subtly, and data and timeline content gain sequencing.

## Motion Direction

- Use a restrained narrative style rather than heavy cinematic choreography.
- Prioritize `fade`, `rise`, `stagger`, and subtle parallax.
- Keep motion strongest in the hero and section entry points, then let content settle.
- Preserve the current page structure and business copy.

## Section Behavior

### Hero

- Eyebrow, headline, body, and image enter in staggered order.
- Hero image uses a subtle scale-in and gentle vertical parallax shift.
- Motion should feel like a camera settling, not zooming dramatically.

### Facility Flow

- Section intro enters first.
- Flow cards reveal one-by-one as the section enters the viewport.
- Hover adds a light lift and shadow increase only.

### Company Profile

- Copy block reveals first, then the stats stack.
- Stats animate with a short rise and a passing highlight sweep instead of a numeric counter.

### Map And Principles

- Map panel and principles list enter from opposing directions.
- Map receives a very light parallax shift while visible.
- Principles reveal with short stagger timing.

### Timeline

- Timeline intro reveals first.
- Timeline cards reveal in sequence.
- A slim accent progress line expands as the timeline section becomes active.

## Accessibility And Performance

- Respect `prefers-reduced-motion: reduce`; reveal content immediately and disable parallax/long transitions.
- Use `IntersectionObserver` for reveal activation.
- Use a single `requestAnimationFrame` scroll loop for subtle parallax only while the About page is mounted.
- Keep transforms limited to `opacity`, `transform`, and shadow changes to avoid jank.

## Testing

- Add a focused About page test that verifies reveal targets are observed and activated.
- Add a reduced-motion fallback test that verifies content becomes visible without observers.
- Run the targeted test, full test suite, and production build.

## Constraints

- Keep homepage-owned files untouched.
- Keep CSS namespaced to About page motion classes.
- The workspace is not a git repository, so spec and plan cannot be committed here.
