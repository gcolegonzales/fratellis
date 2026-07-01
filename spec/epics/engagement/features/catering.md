---
id: FEAT-engagement-2
title: Catering page & inquiry form
epic: engagement
status: ready
depends_on: [FEAT-engagement-1]
model_hint: sonnet
---

## Summary
A `/catering` page describing catering offerings (Fratelli's lists catering in its nav) and an inquiry form (event date, headcount, contact, event type, details) that routes through the same `submit()` seam. Reuses the validated-form patterns from FEAT-engagement-1.

## User stories
- As a Caterer, I want to learn that catering is offered and submit my event details to get a quote.

## Acceptance criteria
- [ ] `/catering` explains catering is available, what kinds of events/portions (described generally, no invented menu/prices beyond gathered content), and sets expectations (a team member follows up).
- [ ] Inquiry form: name (req), phone (req), email (req valid), event date (req, future), headcount (req, numeric), event type (opt), details (opt). Validation reuses `src/lib/form.ts`.
- [ ] On valid submit calls `submit('catering', payload)` (Formspree or mailto fallback), shows confirmation; failures retryable; no hard-coded transport.
- [ ] Accessible + responsive + tokens-styled; links to Menu and Contact; Playwright e2e covers validation + submit path (stubbed).

## Constraints / non-goals
- No online catering checkout/payment; inquiry only.
- Do not invent specific catering package prices.

## Affected areas
- `src/pages/catering.astro`, `src/components/CateringForm.astro` (or reuse a shared `<InquiryForm>`), `src/lib/form.ts`, `src/lib/submit.ts`, `e2e/catering.spec.ts`.

## Dependencies
- FEAT-engagement-1 (shared form + submit patterns).

## Open questions
- None.
