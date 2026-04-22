# Sail Express Contact Email Form Design

> Date: 2026-04-21
> Status: Approved direction, pending implementation plan

## Goal

Add a working contact form to the current Sail Express Contact page so visitors can leave a message directly on the site and have that message sent to the existing Sail Express email inbox.

The implementation should reuse the email-delivery pattern already set up in `C:\Projects\sail-express`: front-end submission through EmailJS. It should not introduce a new backend or serverless API for this task.

## Why This Approach

Use the same EmailJS integration style as the existing Sail Express site instead of building a new API.

Reasons:

- The current project is a Vite front-end app with no existing backend surface.
- The older Sail Express project already has working EmailJS configuration and delivery flow.
- The user explicitly wants to reuse the currently connected website email setup.
- This keeps the change small, fast to ship, and easy to maintain.

## Scope

This work adds only the minimum pieces required for on-page contact submission:

- A contact form in the current `ContactPage`
- Front-end validation for the form
- An EmailJS service wrapper
- Success and error feedback states
- Environment-variable wiring for the EmailJS keys
- Focused tests for the new submission flow

This work does not include:

- A custom backend API
- Spam prevention beyond basic client-side validation
- File uploads
- CRM integration
- Product cart, inquiry list, or total-price fields from the legacy site

## Reuse Boundary

Reuse the old site's EmailJS approach, but do not copy legacy business-specific extras that do not belong in this site.

Reuse:

- The `@emailjs/browser` dependency
- The `import.meta.env` EmailJS configuration pattern
- The async service wrapper pattern
- Client-side validation structure

Do not reuse:

- Cart-dependent message content
- Selected-product formatting
- Price aggregation
- Legacy placeholder phone numbers or unrelated copy
- Hard-coded fallback EmailJS IDs in production code

## Page Design

The current contact page already has:

- Hero copy
- Contact methods
- Partnership flow
- Service commitments

The new form should be integrated into that structure without replacing the rest of the page.

Recommended placement:

- Keep the existing hero unchanged.
- Replace the first light section's single-purpose contact-method card grid with a two-column section.
- Left column: contact form card.
- Right column: the current contact-method summary cards.

This keeps the existing page recognizable while giving the user a clear place to send a message.

## Form Fields

Use a trimmed version of the old site's form so it matches the current site.

Fields:

- `name` — required
- `email` — required
- `phone` — required
- `message` — required

Do not add `company`. The user asked for direct留言 capability, not a larger sales intake flow.

## Submission Flow

The form submission behavior should be:

1. User fills out the form.
2. Per-field validation runs on blur and after touched fields change.
3. On submit, full-form validation runs.
4. If validation fails, inline field errors are shown and submission stops.
5. If validation passes, the submit button enters a loading state.
6. The page calls the EmailJS wrapper.
7. On success:
   - show a success message
   - reset the form fields
   - clear field errors and touched state
8. On failure:
   - show a general error message
   - preserve the user's input so they can retry

## EmailJS Integration

Create a small service module modeled after the old site, but simplified for this form.

Expected environment variables:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

The service should:

- read the keys from `import.meta.env`
- export a single async send function for the contact page
- pass template params that map to the new form fields

Template parameters should include:

- `to_name`
- `from_name`
- `from_email`
- `from_phone`
- `message`
- `submit_date`

If the existing EmailJS template in the old site already expects a slightly different parameter shape, the new wrapper should adapt to that expected shape rather than forcing a new backend layer.

## Validation Rules

Validation should be small and predictable.

Rules:

- `name`: required
- `email`: required and must match a normal email pattern
- `phone`: required
- `message`: required and limited to a reasonable maximum length

The validation utility should support:

- full-form validation
- single-field validation for blur/change feedback

## UI States

The contact form needs four clear states:

- default
- field validation error
- submitting
- submitted successfully / submission failed

UI expectations:

- Inline errors appear directly under the related input.
- The submit button is disabled during submission.
- The submit button text changes during loading.
- Success and failure messages appear above the form.

## File Plan

Expected files:

- Modify: `src/pages/ContactPage.jsx`
- Create: `src/services/emailService.js`
- Create: `src/utils/formValidation.js`
- Create: `.env.example`
- Update tests in the app test suite or add a focused contact-page test file

The implementation should keep changes surgical and avoid unrelated edits to the About page, homepage components, or broad visual refactors.

## Styling Direction

Stay consistent with the current static-page styling already used in this repo.

Guidelines:

- Reuse the page's existing typography and color language.
- Keep the new form visually integrated with the contact page rather than importing the old site's glassmorphism layout wholesale.
- Prefer namespaced selectors that only affect the contact page.
- Preserve mobile readability and spacing.

## Testing

Add focused tests for the new behavior:

- Contact page renders the new form fields.
- Empty submission shows validation errors.
- Valid submission calls the email service wrapper with the expected data.
- Success state is shown after a resolved send.
- Error state is shown after a rejected or failed send.

Verification commands after implementation:

- `npm run test:run`
- `npm run build`

If practical, also run the local dev server and submit a browser smoke test with the form.

## Risks And Mitigations

### Risk: EmailJS keys are missing in this repo

Mitigation:

- document the required environment variables
- fail gracefully with an error state rather than crashing

### Risk: The old site's EmailJS template expects extra fields

Mitigation:

- shape the outgoing template params to match the existing configured template
- keep the UI form smaller even if the send payload includes compatibility keys

### Risk: The page becomes visually crowded

Mitigation:

- keep the form to four fields
- preserve the existing contact information section but compress it if needed

## Constraints

- This workspace is not a git repository, so the design spec cannot be committed from here.
- The user wants to reuse the currently connected email setup from the older Sail Express site.
- The implementation should avoid adding a backend for this task.
