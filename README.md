# MONOFORM 2.0 — Hybrid Marketplace Experience & Browser Test Suite
> **FYND SDET Intern Hiring Hackathon 2026**  
> *A refined, editorial-style marketplace and automated quality assurance suite built with React, TypeScript, and Playwright.*

---

## 1. Project Overview

**MONOFORM 2.0** is an upgraded, full-journey boutique marketplace that combines the discovery, search, catalog filtering, wishlist, and review strengths of **Amazon** with the structured, multi-step checkout workflow of **Flipkart**—all while preserving MONOFORM's restrained, archival editorial design identity.

The visual system draws inspiration from architectural minimalism and archival publishing:
- **Warm Ivory:** `#F5F1E8`
- **Deep Forest Green:** `#183B32`
- **Muted Terracotta:** `#C66B4E`
- **Warm Stone:** `#DCD3C3`
- **Charcoal:** `#292B27`
- **Clean Surface:** `#FFFFFF`

Beneath its aesthetic presentation lies an uncompromising engineering foundation built specifically for rigorous SDET evaluation:
- **Integer Paise Financial Arithmetic:** Zero floating-point drift across unit calculations, line totals, delivery surcharges, and order totals.
- **Immediate Synchronous Submission Guard:** Atomic lock (`isSubmittingRef.current = true`) preventing duplicate order creation during rapid multi-click or Enter-key stress.
- **Input Validation & Complete State Preservation:** Blank and whitespace-only name submissions are rejected with accessible alerts, while preserving user inputs and cart items intact.
- **Structured Multi-Step Checkout:** 5-stage Flipkart-inspired stepper (Bag Review → Delivery Address → Shipping Speed → Simulated Payment → Final Review) terminating in a single verified Confirmation.
- **100% Automated Browser Test Suite:** 38 test executions across Desktop Chromium (1280×800) and Mobile Chromium (Pixel 7 emulation, touch-enabled) with **100% pass rate** (38 passed, 0 failed, 0 skipped).

---

## 2. Technology Stack

- **Frontend Core:** React 18.3, TypeScript 5.6
- **Build Tool & Bundler:** Vite 5.4
- **Styling Architecture:** Modern Semantic CSS3 with CSS Custom Properties, Editorial Typography, Flexbox, and CSS Grid
- **Test Automation Framework:** Playwright 1.48 with TypeScript
- **Target Browsers:** Desktop Chromium (1280×800) & Mobile Chromium (Pixel 7 Emulation with touch)
- **Zero External Backend / Zero Cloud Dependencies:** 100% client-side deterministic verification

---

## 3. Product Catalogue & Fixed Pricing

The marketplace includes the two mandatory catalog archetypes with immutable fixed prices, alongside clearly designated synthetic demo objects:

| Product Name | ID | Category | Unit Price | Unit Price (Paise) | Key Specifications |
|---|---|---|---:|---:|---|
| **Everyday Notebook** *(Mandatory)* | `notebook` | Stationery | **₹499.00** | 49,900 | 192 Numbered Pages, Smyth-Sewn, 100gsm Fountain-Friendly Paper |
| **Desk Bottle** *(Mandatory)* | `bottle` | Drinkware | **₹799.00** | 79,900 | 500ml 18/8 Pro Grade Stainless Steel, Double-Wall Vacuum Insulated |
| **Brass Desk Pen** *(Synthetic Demo)* | `pen` | Desk Accessories | **₹349.00** | 34,900 | Solid Machined Brass, 0.5mm Schmidt Gel Refill, Patina Finish |
| **Linen Organizer Tray** *(Synthetic Demo)* | `tray` | Lifestyle Essentials | **₹649.00** | 64,900 | Heavy Belgian Flax Linen, Stiffened Vegetable-Tanned Leather Base |
| **Stoneware Espresso Cup** *(Synthetic Demo)* | `cup` | Drinkware | **₹399.00** | 39,900 | 90ml Wheel-Thrown Ceramic, Matte Glaze, Heat Retentive |
| **Canvas Studio Apron** *(Synthetic Demo)* | `apron` | Lifestyle Essentials | **₹899.00** | 89,900 | 14oz Washed Cotton Duck, Brass Hardware, Reinforced Pockets |

*Note: All monetary values are defined as immutable integer paise constants in `src/data/products.ts`.*

---

## 4. Key Architectural Features

### 4.1 Marketplace Discovery (Amazon-Inspired)
- **Real-Time Search:** Filters catalog items in real time across titles, descriptions, and categories with instant query clearing.
- **Category Filtering:** Filter pills for *All Collections*, *Stationery*, *Drinkware*, *Desk Accessories*, and *Lifestyle Essentials*.
- **Price Range & Sorting:** Interactive price slider and multi-criteria sorting (*Featured*, *Price: Low to High*, *Price: High to Low*, *Highest Rated*).
- **Product Details Modal:** Dedicated modal displaying high-resolution illustration, complete technical specifications, real-time quantity selector, stock indicator, and synthetic customer reviews.
- **Wishlist Drawer:** Interactive wishlist toggle on every card and modal, with live badge synchronization in the header navigation.
- **Patron Profile Modal:** Simulated patron account summary for Asha Kumar.

### 4.2 Structured Multi-Step Checkout (Flipkart-Inspired)
- **Step 1 — Cart Review:** Itemized list of selected archetypes, line-item pricing, quantity increment/decrement, and item removal.
- **Step 2 — Delivery Information:** Full Name, Phone, Email, Street Address, City, State, and PIN Code with rigorous validation alerts.
- **Step 3 — Delivery Options:** Choice between *Standard Complimentary Delivery (₹0.00)* and *Express Priority Dispatch (+₹150.00)* with real-time recalculation of the order total.
- **Step 4 — Payment Method Selection:** Simulated payment selection (UPI, Credit/Debit Card, Cash on Delivery) with clear demonstration disclaimers.
- **Step 5 — Final Review:** Consolidated review of customer address, shipping speed, selected payment method, itemized bag, and instant step edit links.
- **Order Confirmation:** Single confirmation card stamped with customer name, unique client reference formatted as `MONO-XXXXXX`, delivery method, payment method, and complete line breakdown.

### 4.3 SDET Quality & Concurrency Safeguards
1. **Integer Paise Financial Calculations (`src/utils/currency.ts`):**  
   Money values are manipulated strictly in integer paise. Formatted strings use Indian locale grouping (`₹1,298.00`, `₹1,797.00`, `₹2,596.00`).
2. **Synchronous Submission Lock (`src/components/CheckoutForm.tsx`):**  
   An immediate synchronous ref (`isSubmittingRef.current = true`) is engaged before any asynchronous dispatch. Rapid multi-clicks or double-taps are blocked deterministically.
3. **State Retention on Failed Validation:**  
   If form validation fails, shopping bag contents, selected options, and entered customer inputs remain completely intact.
4. **Empty Cart Protection:**  
   Attempting to checkout with an empty bag is blocked synchronously, displaying a clear accessible warning alert.

---

## 5. Project Directory Structure

```
d:\Projects\FYND - SDET INTERN\
├── artifacts/
│   └── screenshots/              # 18 captured PNG evidence files
│       ├── 00-initial-marketplace.png
│       ├── 00-initial-state.png
│       ├── 01-cart-with-both-products.png
│       ├── 01-successful-checkout-confirmation.png
│       ├── 02-missing-required-field-error.png
│       ├── 03-quantity-update-calculations.png
│       ├── 04-empty-cart-checkout-blocked.png
│       ├── 05-whitespace-name-rejected.png
│       ├── 06-double-click-single-confirmation.png
│       ├── 07-cart-items-cleared.png
│       ├── 08-product-details-modal.png
│       ├── 09-mobile-checkout-responsive.png
│       ├── 10-step-delivery-address.png
│       ├── 11-step-delivery-options.png
│       ├── 12-step-payment-methods.png
│       ├── 13-step-final-review.png
│       ├── 14-search-results.png
│       ├── 15-category-filtering.png
│       ├── 16-wishlist-modal.png
│       └── 17-empty-search-results.png
├── docs/
│   ├── TEST_PLAN.md              # Quality Assurance Test Plan v2.0.0
│   ├── TEST_RESULTS.md           # Automated test results & manual audit procedures
│   └── DEFECT_REPORT.md          # Formal zero-defect QA report
├── src/
│   ├── components/
│   │   ├── AccountModal.tsx      # Patron profile modal
│   │   ├── CartItem.tsx          # Shopping bag line item
│   │   ├── CatalogControls.tsx   # Search, filters, sort, price slider
│   │   ├── CheckoutForm.tsx      # 5-step checkout orchestrator with concurrency guard
│   │   ├── CheckoutStepper.tsx   # Visual progress stepper (Flipkart-style)
│   │   ├── EmptyCartState.tsx    # Bag empty state illustration
│   │   ├── Header.tsx            # Header with search, wishlist & cart badges
│   │   ├── Hero.tsx              # Editorial hero banner
│   │   ├── OrderConfirmation.tsx # Confirmed order receipt screen
│   │   ├── OrderSummary.tsx      # Integer paise cost summary
│   │   ├── ProductArtwork.tsx    # Bespoke SVG illustrations for all 6 products
│   │   ├── ProductCard.tsx       # Catalog product card with ratings & actions
│   │   ├── ProductDetailsModal.tsx # Specs modal with synthetic reviews
│   │   ├── ValidationMessage.tsx # Accessible ARIA live banner
│   │   └── WishlistModal.tsx     # Wishlist drawer with 'Move to Bag' action
│   ├── data/
│   │   └── products.ts           # Product data, fixed pricing, and reviews
│   ├── styles/
│   │   └── index.css             # Comprehensive design system & responsive styling
│   ├── types/
│   │   └── index.ts              # TypeScript definitions for marketplace
│   ├── utils/
│   │   └── currency.ts           # Integer paise arithmetic & Indian currency formatter
│   ├── App.tsx                   # Main marketplace application orchestrator
│   └── main.tsx                  # React entry point
├── tests/
│   └── checkout.spec.ts          # Playwright test suite (19 scenarios)
├── package.json                  # NPM scripts and dependencies
├── playwright.config.ts          # Desktop & Mobile Chromium configurations
├── tsconfig.json                 # TypeScript strict compiler config
└── vite.config.ts                # Vite React configuration
```

---

## 6. Execution Commands

All scripts match `package.json` exactly:

### 6.1 Install Dependencies
```powershell
npm install
```

### 6.2 Start Local Development Server
```powershell
npm run dev
```
*Application opens at `http://localhost:5173/`.*

### 6.3 Run Production Build
```powershell
npm run build
```
*Executes TypeScript compiler (`tsc`) and Vite production bundler. Verifies clean compilation with exit code `0`.*

### 6.4 Preview Production Build
```powershell
npm run preview
```

### 6.5 Run Playwright Automated Test Suite (Headless)
```powershell
npm test
```
*or directly:*
```powershell
npx playwright test
```
*Executes all 19 scenarios across Desktop Chromium (1280×800) and Mobile Chromium (Pixel 7), totaling 38 executions.*

### 6.6 Run Playwright Tests with Headed Browser
```powershell
npm run test:headed
```

### 6.7 View HTML Playwright Test Report
```powershell
npm run test:report
```

---

## 7. Automated Test Suite Summary (38 / 38 Passed)

| Scenario ID | Test Scenario | Project | Status |
|---|---|---|---|
| **A01** | Successful checkout with Everyday Notebook & Desk Bottle | Desktop & Mobile | **PASS** |
| **A02** | Missing required customer name field validation | Desktop & Mobile | **PASS** |
| **A03** | Quantity update & exact calculation (2 Notebooks + 1 Bottle = ₹1,797.00) | Desktop & Mobile | **PASS** |
| **A04** | Empty cart checkout attempt blocked | Desktop & Mobile | **PASS** |
| **A05** | Whitespace-only name rejection & input preservation | Desktop & Mobile | **PASS** |
| **A06** | Duplicate submission protection on rapid multi-click | Desktop & Mobile | **PASS** |
| **A07** | Cart item removal & decrement to zero | Desktop & Mobile | **PASS** |
| **A08** | Keyboard submission via Enter key | Desktop & Mobile | **PASS** |
| **A09** | Mobile responsive layout integrity & zero overflow | Desktop & Mobile | **PASS** |
| **A10** | Stepper validation: delivery form field checks | Desktop & Mobile | **PASS** |
| **A11** | Stepper shipping options update final order total (+₹150.00) | Desktop & Mobile | **PASS** |
| **A12** | Stepper payment method selection & retention | Desktop & Mobile | **PASS** |
| **A13** | Stepper final review step & edit navigation | Desktop & Mobile | **PASS** |
| **A14** | Marketplace search filters catalogue in real time | Desktop & Mobile | **PASS** |
| **A15** | Marketplace category filtering & filter reset | Desktop & Mobile | **PASS** |
| **A16** | Wishlist toggle updates state & header count | Desktop & Mobile | **PASS** |
| **A17** | Empty search results state & reset button | Desktop & Mobile | **PASS** |
| **A18** | Header cart badge and cart total live synchronization | Desktop & Mobile | **PASS** |
| **A19** | Product details modal displays specifications & reviews | Desktop & Mobile | **PASS** |

**Total Automated Executions:** **38**  
**Passed:** **38 (100%)**  
**Failed:** **0**  
**Skipped:** **0**  

---

## 8. Manual Verification Status & Evaluator Instructions

In accordance with strict SDET evaluation standards, automated test runs are recorded as automated tests. The two scenarios below are marked **Pending human manual execution**:

### Scenario M01 — Empty Cart Protection
1. Open `http://localhost:5173/` in a browser.
2. Verify that the shopping bag is unoccupied (`0 items`).
3. Enter `Devashish Ray` into the `Full Name` input field.
4. Click **Place Order**.
5. **Expected Observation:** Checkout is blocked; an error alert states *"Your shopping bag is empty. Please select an item to purchase."*; the name `Devashish Ray` remains in the input field; no order reference is generated.

### Scenario M02 — Rapid Double-Click Concurrency Guard
1. Open `http://localhost:5173/`.
2. Add the Everyday Notebook and Desk Bottle to the bag.
3. Enter `Asha Kumar` into the `Full Name` field.
4. Perform a rapid double-click on **Place Order**.
5. **Expected Observation:** Exactly **one** order confirmation is displayed; exactly **one** order reference in the format `MONO-XXXXXX` is generated; the button disables with *"Order Confirmed"*; no duplicate orders appear.
