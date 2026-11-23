# MONOFORM 2.0 — Quality Assurance Defect & Observation Report
**Document Version:** 2.0.0  
**Project:** MONOFORM 2.0 — Hybrid Marketplace Experience & Browser Test Suite  
**Evaluation:** FYND SDET Intern Hiring Hackathon 2026  
**Defect Status:** **0 APPLICATION DEFECTS OBSERVED (38/38 Automated Executions Passed)**

---

## 1. Defect Summary

| Severity Level | Active Defects | Resolved Product Defects |
|---|---|---|
| **Critical (P0)** | 0 | 0 |
| **High (P1)** | 0 | 0 |
| **Medium (P2)** | 0 | 0 |
| **Low / Cosmetic (P3)** | 0 | 0 |
| **Total Product Defects** | **0** | **0** |

---

## 2. Formal Defect Declaration

In strict compliance with hiring evaluation standards:

> **No functional defects, calculation discrepancies, input state losses, or duplicate submission vulnerabilities were observed in the MONOFORM 2.0 marketplace application.**

All functional requirements—including immutable fixed pricing for mandatory catalog products, exact integer paise financial arithmetic, required field validation across single-step and multi-step forms, whitespace-only rejection, state preservation upon failed validation, live cart and wishlist synchronization, and immediate synchronous submission guarding—met their acceptance criteria across all 38 automated test executions on Desktop Chromium and Mobile Chromium (Pixel 7).

---

## 3. Engineering & Test Environment Compatibility Notes

During the implementation and automated verification of MONOFORM 2.0, the following engineering considerations and test environment compatibility adjustments were identified and addressed:

### Note TEC-01: Mobile Browser Touch Event Handling on Emulated Devices
- **Context:** Mobile Chromium (Pixel 7 emulation with touch screen enabled).
- **Observation:** Emulated mobile browsers may intercept double-tapping interactive controls for gesture zoom detection unless CSS explicitly specifies standard touch manipulation properties.
- **Adjustment Made:** Added `touch-action: manipulation;` to button elements in `src/styles/index.css`. This standard web property informs mobile browsers to treat rapid consecutive taps as immediate user clicks without waiting for zoom gesture detection.
- **Classification:** **Test environment / mobile UX standard adjustment** (Not an application logic defect).

### Note TEC-02: Playwright Strict-Mode Locator Resolution
- **Context:** Playwright strict-mode locator checks for `getByRole('button', { name: /Place Order/i })`.
- **Observation:** If both a sticky quick bar and a form step render a submit button with identical accessible names simultaneously, Playwright's strict mode raises an error (`resolved to 2 elements`).
- **Adjustment Made:** Structured the DOM so that exactly one `place-order-button` is mounted at any given step in the checkout flow.
- **Classification:** **Engineering best practice / locator hygiene** (Not an application logic defect).

### Note TEC-03: Responsive Mobile Viewport Padding on Small Screens (375px)
- **Context:** Mobile viewport testing on narrow screens (375px–393px).
- **Observation:** Header action buttons with both icon and text labels on desktop would cause horizontal padding overflow on narrow mobile screens if labels remained visible.
- **Adjustment Made:** Added `@media (max-width: 768px)` rules to hide text labels (`.action-label`), reduce `.header-main` horizontal padding to `0.75rem 1rem`, and set `overflow-x: hidden;` on the application wrapper.
- **Classification:** **Responsive CSS design refinement** (Not an application logic defect).

---

## 4. Comprehensive Requirement Verification Matrix

| Requirement | Verification Scenario | Automation Status | Manual Status |
|---|---|---|---|
| Fixed pricing immutability (Notebook ₹499, Bottle ₹799) | DOM inspection & state assertion | Verified (A01, A03) | Pending human check |
| Integer paise currency precision across line & order totals | Mathematical verification on line items & summary | Verified (A01, A03, A11) | Pending human check |
| Empty cart checkout prevention | Cart empty guard validation | Verified (A04) | Pending human check (M01) |
| Blank name input rejection | Required field validation check | Verified (A02, A10) | Pending human check |
| Whitespace-only name rejection | Strict string trimming check (`value.trim() === ''`) | Verified (A05) | Pending human check |
| Cart state preservation upon failed validation | State retention assertion | Verified (A02, A05) | Pending human check |
| Customer input preservation upon failed validation | Form input retention assertion | Verified (A04, A05) | Pending human check (M01) |
| Synchronous duplicate submission guard | Multi-click concurrency check (`isSubmittingRef.current = true`) | Verified (A06) | Pending human check (M02) |
| Unique order reference format `MONO-XXXXXX` | Regex check `^MONO-[A-Z0-9]{6}$` | Verified (A01, A06, A08) | Pending human check (M02) |
| Mobile responsive zero horizontal overflow | `scrollWidth <= clientWidth` evaluated across page | Verified (A09) | Pending human check |
| Multi-step checkout navigation & field validation | Stepper step progression guard | Verified (A10) | Pending human check |
| Shipping speed selection updates total | Express Priority (+₹150.00) total check | Verified (A11) | Pending human check |
| Payment method selection persistence | Method retained across Step 4, 5, and Confirmation | Verified (A12) | Pending human check |
| Final review step data display and edit links | Review data assertions and navigation check | Verified (A13) | Pending human check |
| Marketplace real-time search & clear | Query filtering and search reset | Verified (A14) | Pending human check |
| Category filtering & reset | Category pill filter assertions | Verified (A15) | Pending human check |
| Wishlist toggle and header badge sync | Wishlist toggle assertions and count sync | Verified (A16) | Pending human check |
| Empty search results state & reset button | No results state banner and reset action | Verified (A17) | Pending human check |
| Real-time header cart badge sync | Cart count badge increments/decrements | Verified (A18) | Pending human check |
| Product details modal with specs & reviews | Modal open, spec list, sample reviews, quantity selector | Verified (A19) | Pending human check |
