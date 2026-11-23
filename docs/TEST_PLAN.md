# MONOFORM 2.0 — Quality Assurance & Test Plan
**Document Version:** 2.0.0  
**Project:** MONOFORM 2.0 — Hybrid Marketplace Experience & Browser Automation Test Suite  
**Evaluation:** FYND SDET Intern Hiring Hackathon 2026  
**Author:** Senior Frontend Architect & SDET Engineer  

---

## 1. Objective
To systematically evaluate and guarantee the functional correctness, visual hierarchy, currency precision, concurrency protection, and responsive behavior of the **MONOFORM 2.0 Hybrid Marketplace**. The application blends Amazon-inspired discovery, search, cart, and reviews with Flipkart-inspired multi-step structured checkout, all while upholding MONOFORM's restrained editorial brand identity.

---

## 2. In-Scope Functional Areas

1. **Marketplace Discovery & Header Navigation:**
   - Real-time search across product titles, descriptions, and categories.
   - Category filtering (All Collections, Stationery, Drinkware, Desk Accessories, Lifestyle Essentials).
   - Price range filtering and sorting (Featured, Price: Low to High, Price: High to Low, Highest Rated).
   - Wishlist toggle, item count synchronization, and dedicated Wishlist modal.
   - Studio Patron Profile modal.
   - Promotional announcement strip and hero presentation with smooth catalogue navigation.
2. **Product Presentation & Details Modal:**
   - Mandatory catalog archetypes: Everyday Notebook (₹499.00) and Desk Bottle (₹799.00) with immutable fixed pricing.
   - Additional synthetic demo products (Brass Desk Pen, Linen Organizer Tray, Stoneware Espresso Cup, Canvas Studio Apron).
   - Detailed product view containing specifications, real-time quantity selector, stock status, and sample customer reviews.
3. **Shopping Bag State Management (Amazon-Inspired Usability):**
   - Real-time cart updates (addition, quantity increment, decrement to zero removal, explicit item removal).
   - Exact integer paise calculations for line totals, subtotal, and order total.
   - Live synchronization with header cart badge.
4. **Structured Multi-Step Checkout Flow (Flipkart-Inspired):**
   - Step 1: Cart Review (itemized list, quantities, line totals).
   - Step 2: Delivery Information (Full Name, Mobile, Email, Address, City, State, PIN with validation).
   - Step 3: Delivery Options (Standard Complimentary ₹0.00 vs Express Priority ₹150.00 with real-time total update).
   - Step 4: Simulated Payment Selection (UPI, Card, COD with clear demo disclaimers).
   - Step 5: Final Review (Customer address, dispatch speed, payment choice, items summary, edit controls).
   - Step 6: Confirmation Screen (Unique reference `MONO-XXXXXX`, customer name, final total, items, delivery details).
5. **Reliability & Concurrency Safeguards:**
   - Immediate synchronous submission guard (`isSubmittingRef.current = true`) preventing duplicate order creation on rapid double-clicking.
   - Form input and cart state preservation upon failed validation.
   - Strict rejection of blank and whitespace-only customer names.
   - Empty cart submission protection.

---

## 3. Test Matrix & Environment

| Environment Factor | Details |
|---|---|
| **Host Operating System** | Windows 11 / x64 |
| **Node.js Runtime** | Node.js v20.18.0 (LTS), npm 10.8.2 |
| **Web Server** | Vite 5.4.21 (`http://127.0.0.1:5173`) |
| **Automation Tool** | Playwright 1.48.0 with TypeScript |
| **Browsers / Viewports** | 1. **Desktop Chromium**: 1280 × 800 px<br>2. **Mobile Chromium (Pixel 7)**: 393 × 851 px (touch-enabled) |

---

## 4. Automated Test Scenarios (Playwright)

| Scenario ID | Test Name | Classification | Target |
|---|---|---|---|
| **A01** | Successful Checkout Flow | Mandatory Core | Desktop & Mobile |
| **A02** | Missing Required Customer Name Validation | Mandatory Core | Desktop & Mobile |
| **A03** | Quantity Update & Exact Calculation (2 Notebooks + 1 Bottle = ₹1,797.00) | Mandatory Core | Desktop & Mobile |
| **A04** | Empty-Cart Checkout Blocked | Cart Safeguard | Desktop & Mobile |
| **A05** | Whitespace-Only Name Rejection & Input Preservation | Input Validation | Desktop & Mobile |
| **A06** | Duplicate Submission Protection on Rapid Double-Click | Concurrency Guard | Desktop & Mobile |
| **A07** | Cart Item Removal & Decrement to Zero | Cart State | Desktop & Mobile |
| **A08** | Keyboard Form Submission via Enter Key | Accessibility | Desktop & Mobile |
| **A09** | Mobile Responsive Layout Integrity (Zero Horizontal Overflow) | Responsive Visual | Desktop & Mobile |
| **A10** | Delivery Form Field Validation | Stepper Validation | Desktop & Mobile |
| **A11** | Delivery Option Updates Final Total (Express +₹150.00) | Financial Calculation | Desktop & Mobile |
| **A12** | Payment Method Selection Retained Across Steps | State Retention | Desktop & Mobile |
| **A13** | Final Review Displays Correct Order Information & Edit Links | Review Integrity | Desktop & Mobile |
| **A14** | Search Returns Matching Products & Clears Cleanly | Search Usability | Desktop & Mobile |
| **A15** | Category Filtering and Filter Reset | Discovery Filter | Desktop & Mobile |
| **A16** | Wishlist Toggles Correctly & Syncs Header Badge | Wishlist State | Desktop & Mobile |
| **A17** | Empty Search Results State & Reset | Empty State | Desktop & Mobile |
| **A18** | Cart Badge & Cart Total Live Synchronization | Live Badge Sync | Desktop & Mobile |
| **A19** | Product Details Modal Display & Sample Reviews | Modal Discovery | Desktop & Mobile |

---

## 5. Human Manual Verification Scenarios (Pending Human Execution)

### Scenario M01 — Empty Cart Protection
- Open `http://localhost:5173/`. Verify bag is unoccupied (`0 items`).
- Type `"Devashish Ray"` into Full Name.
- Click **Place Order**.
- Expected: Checkout blocked, error visible, name preserved, no confirmation.

### Scenario M02 — Rapid Double-Click Concurrency Guard
- Open `http://localhost:5173/`.
- Add Everyday Notebook and Desk Bottle.
- Type `"Asha Kumar"` into Full Name.
- Rapidly double-click **Place Order**.
- Expected: Exactly one confirmation rendered, unique reference `MONO-XXXXXX`, submit action disabled.
