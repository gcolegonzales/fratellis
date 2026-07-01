---
id: FEAT-engagement-1
title: Reservation request form
epic: engagement
status: ready
depends_on: [FEAT-foundation-3]
model_hint: sonnet
---

## Summary
A `/reservations` page with an accessible, validated request form (name, phone, email, date, time, party size, notes). On submit it calls the shared `submit()` seam (Formspree when configured, else `mailto:` fallback) and shows a clear confirmation. This is the canonical example of the swappable side-effect interface that a future `POST /api/reservations` + DB would replace.

## User stories
- As a Reserver, I want to request a table for a date/time/party size and get confirmation that my request was sent.

## Acceptance criteria
- [ ] `/reservations` form fields: name (req), phone (req), email (req, valid format), date (req, not in the past), time (req), party size (req, 1–20+), notes (opt).
- [ ] Client-side validation via pure functions in `src/lib/form.ts` (unit-tested): rejects empty required fields, invalid email, past dates; shows inline, screen-reader-associated error messages; submit disabled/blocked until valid.
- [ ] On valid submit, calls `submit('reservation', payload)`; on success shows a confirmation state (and clears/locks the form); on failure shows a retryable error. No transport is hard-coded in the component.
- [ ] With `PUBLIC_FORMSPREE_ID` unset, the fallback composes a `mailto:` with a prefilled subject/body (documented), and the UI explains the fallback.
- [ ] Fully keyboard accessible, labelled inputs, `aria-invalid`/`aria-describedby` on errors, visible focus; no console errors.
- [ ] Playwright e2e: submitting empty form shows errors; filling valid data reaches the confirmation/intended-submit path (transport stubbed).

## Constraints / non-goals
- v1 does not store reservations or guarantee a table — it's a *request*. Copy must say so.
- Must not hard-code Formspree URL in the component (goes through `submit()`).

## Affected areas
- `src/pages/reservations.astro`, `src/components/ReservationForm.astro` + island, `src/lib/form.ts`, `src/lib/submit.ts` (consume), `tests/form.test.ts`, `e2e/reservation.spec.ts`.

## Dependencies
- FEAT-foundation-3 (submit seam + shell).

## Open questions
- None (Formspree id optional; fallback covers v1).
