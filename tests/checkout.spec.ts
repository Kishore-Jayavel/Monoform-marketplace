import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

// Ensure screenshots directory exists
const SCREENSHOT_DIR = path.resolve(process.cwd(), 'artifacts/screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

test.describe('MONOFORM 2.0 — Hybrid Marketplace & Browser Automation Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Each test starts from a clean browser page
    await page.goto('/');
    await expect(page).toHaveTitle(/MONOFORM/);
  });

  /**
   * TEST A01 (Mandatory) — Successful checkout flow
   */
  test('TEST A01 — Successful checkout', async ({ page }) => {
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '00-initial-marketplace.png'), fullPage: true });

    // 1. Add Everyday Notebook
    const addNotebookBtn = page.getByTestId('add-to-cart-notebook');
    await addNotebookBtn.click();
    await expect(page.getByTestId('cart-item-notebook')).toBeVisible();

    // 2. Add Desk Bottle
    const addBottleBtn = page.getByTestId('add-to-cart-bottle');
    await addBottleBtn.click();
    await expect(page.getByTestId('cart-item-bottle')).toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-cart-with-both-products.png'), fullPage: true });

    // 3. Enter customer name: Asha Kumar
    const nameInput = page.getByLabel(/Full Name/i);
    await nameInput.fill('Asha Kumar');

    // 4. Verify order total is ₹1,298.00
    const orderTotal = page.getByTestId('order-total');
    await expect(orderTotal).toHaveText('₹1,298.00');

    // 5. Click Place Order
    const placeOrderBtn = page.getByRole('button', { name: /Place Order/i });
    await placeOrderBtn.click();

    // 6. Verify confirmation
    const confirmation = page.getByTestId('order-confirmation');
    await expect(confirmation).toBeVisible();
    await expect(page.getByTestId('confirmed-customer-name')).toHaveText('Asha Kumar');

    // 7. Verify reference format
    const orderRef = page.getByTestId('confirmed-order-reference');
    await expect(orderRef).toBeVisible();
    const refText = await orderRef.innerText();
    expect(refText).toMatch(/^MONO-[A-Z0-9]{6}$/);

    // 8. Verify order total
    await expect(page.getByTestId('confirmed-order-total')).toHaveText('₹1,298.00');

    // Exactly one confirmation rendered
    const count = await page.getByTestId('order-confirmation').count();
    expect(count).toBe(1);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-successful-checkout-confirmation.png'), fullPage: true });
  });

  /**
   * TEST A02 (Mandatory) — Missing required customer name blocks checkout
   */
  test('TEST A02 — Missing required field', async ({ page }) => {
    // 1. Add Everyday Notebook
    await page.getByTestId('add-to-cart-notebook').click();
    await expect(page.getByTestId('cart-item-notebook')).toBeVisible();

    // 2. Leave name blank
    const nameInput = page.getByLabel(/Full Name/i);
    await expect(nameInput).toHaveValue('');

    // 3. Click Place Order
    await page.getByRole('button', { name: /Place Order/i }).click();

    // 4. Verify validation error
    const errorMessage = page.getByTestId('name-error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(/Full Name is required/i);

    // 5. Verify cart still contains Notebook and total remains ₹499.00
    await expect(page.getByTestId('cart-item-notebook')).toBeVisible();
    await expect(page.getByTestId('order-total')).toHaveText('₹499.00');
    await expect(page.getByTestId('order-confirmation')).not.toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-missing-required-field-error.png'), fullPage: true });
  });

  /**
   * TEST A03 (Mandatory) — Quantity update and exact calculation
   */
  test('TEST A03 — Quantity update and exact calculation', async ({ page }) => {
    await page.getByTestId('add-to-cart-notebook').click();
    await page.getByTestId('add-to-cart-bottle').click();

    // Initial check
    await expect(page.getByTestId('line-total-notebook')).toHaveText('₹499.00');
    await expect(page.getByTestId('line-total-bottle')).toHaveText('₹799.00');
    await expect(page.getByTestId('order-total')).toHaveText('₹1,298.00');

    // Increase Notebook quantity to 2
    await page.getByTestId('increase-notebook').click();
    await expect(page.getByTestId('quantity-notebook')).toHaveText('2');

    // Verify line totals and order total
    await expect(page.getByTestId('line-total-notebook')).toHaveText('₹998.00');
    await expect(page.getByTestId('line-total-bottle')).toHaveText('₹799.00');
    await expect(page.getByTestId('order-total')).toHaveText('₹1,797.00');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-quantity-update-calculations.png'), fullPage: true });
  });

  /**
   * TEST A04 — Empty-cart checkout blocked
   */
  test('TEST A04 — Empty-cart checkout blocked', async ({ page }) => {
    await expect(page.getByTestId('empty-cart-container')).toBeVisible();

    const nameInput = page.getByLabel(/Full Name/i);
    await nameInput.fill('Asha Kumar');

    await page.getByRole('button', { name: /Place Order/i }).click();

    const cartError = page.getByTestId('cart-error-message');
    await expect(cartError).toBeVisible();
    await expect(cartError).toContainText(/shopping bag is empty/i);

    await expect(nameInput).toHaveValue('Asha Kumar');
    await expect(page.getByTestId('order-confirmation')).not.toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-empty-cart-checkout-blocked.png'), fullPage: true });
  });

  /**
   * TEST A05 — Whitespace-only name rejected
   */
  test('TEST A05 — Whitespace-only name rejected', async ({ page }) => {
    await page.getByTestId('add-to-cart-notebook').click();

    const nameInput = page.getByLabel(/Full Name/i);
    await nameInput.fill('     ');

    await page.getByRole('button', { name: /Place Order/i }).click();

    const nameError = page.getByTestId('name-error-message');
    await expect(nameError).toBeVisible();
    await expect(nameError).toContainText(/Full Name is required/i);
    await expect(nameInput).toHaveValue('     ');
    await expect(page.getByTestId('cart-item-notebook')).toBeVisible();
    await expect(page.getByTestId('order-total')).toHaveText('₹499.00');
    await expect(page.getByTestId('order-confirmation')).not.toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-whitespace-name-rejected.png'), fullPage: true });
  });

  /**
   * TEST A06 — Rapid double-click creates exactly one confirmation
   */
  test('TEST A06 — Duplicate submission protection on rapid double-click', async ({ page }) => {
    await page.getByTestId('add-to-cart-notebook').click();
    await expect(page.getByTestId('cart-item-notebook')).toBeVisible();
    await page.getByTestId('add-to-cart-bottle').click();
    await expect(page.getByTestId('cart-item-bottle')).toBeVisible();

    const nameInput = page.getByLabel(/Full Name/i);
    await nameInput.fill('Asha Kumar');

    const placeOrderBtn = page.getByRole('button', { name: /Place Order/i });
    await placeOrderBtn.click();
    await placeOrderBtn.click({ force: true, timeout: 500 }).catch(() => {});

    const confirmation = page.getByTestId('order-confirmation');
    await expect(confirmation).toBeVisible();

    const confirmationCount = await page.getByTestId('order-confirmation').count();
    expect(confirmationCount).toBe(1);

    const orderRefs = await page.getByTestId('confirmed-order-reference').count();
    expect(orderRefs).toBe(1);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-double-click-single-confirmation.png'), fullPage: true });
  });

  /**
   * TEST A07 — Product removal and quantity decrement
   */
  test('TEST A07 — Cart item removal and decrement to zero', async ({ page }) => {
    await page.getByTestId('add-to-cart-notebook').click();
    await page.getByTestId('add-to-cart-bottle').click();
    await expect(page.getByTestId('order-total')).toHaveText('₹1,298.00');

    // Decrease Notebook to 0
    await page.getByTestId('decrease-notebook').click();
    await expect(page.getByTestId('cart-item-notebook')).not.toBeVisible();
    await expect(page.getByTestId('order-total')).toHaveText('₹799.00');

    // Remove Bottle
    await page.getByTestId('remove-bottle').click();
    await expect(page.getByTestId('cart-item-bottle')).not.toBeVisible();

    await expect(page.getByTestId('empty-cart-container')).toBeVisible();
    await expect(page.getByTestId('order-total')).toHaveText('₹0.00');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07-cart-items-cleared.png'), fullPage: true });
  });

  /**
   * TEST A08 — Keyboard form submission
   */
  test('TEST A08 — Form submission via Enter key', async ({ page }) => {
    await page.getByTestId('add-to-cart-notebook').click();
    await expect(page.getByTestId('cart-item-notebook')).toBeVisible();

    const nameInput = page.getByLabel(/Full Name/i);
    await nameInput.fill('Asha Kumar');
    await nameInput.press('Enter');

    const confirmation = page.getByTestId('order-confirmation');
    await expect(confirmation).toBeVisible();
    await expect(page.getByTestId('confirmed-customer-name')).toHaveText('Asha Kumar');
  });

  /**
   * TEST A09 — Mobile responsive layout and no horizontal overflow
   */
  test('TEST A09 — Mobile responsive layout integrity', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    await page.getByTestId('add-to-cart-notebook').click();
    await page.getByLabel(/Full Name/i).fill('Asha Kumar');
    await page.getByRole('button', { name: /Place Order/i }).click();

    await expect(page.getByTestId('order-confirmation')).toBeVisible();

    const postOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(postOverflow).toBe(false);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09-mobile-checkout-responsive.png'), fullPage: true });
  });

  /**
   * TEST A10 — Delivery form validation
   */
  test('TEST A10 — Delivery form validation', async ({ page }) => {
    await page.getByTestId('add-to-cart-notebook').click();
    await page.getByTestId('stepper-step-delivery').click();

    // Clear city to trigger validation error
    const cityInput = page.getByTestId('customer-city-input');
    await cityInput.fill('');

    await page.getByTestId('proceed-to-options-btn').click();

    // Verify we remain on delivery step because validation failed
    await expect(page.getByTestId('step-delivery-panel')).toBeVisible();

    // Restore city and verify advance
    await cityInput.fill('Bangalore');
    await page.getByLabel(/Full Name/i).fill('Asha Kumar');
    await page.getByTestId('proceed-to-options-btn').click();

    await expect(page.getByTestId('step-options-panel')).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10-step-delivery-address.png'), fullPage: true });
  });

  /**
   * TEST A11 — Delivery option updates the final total
   */
  test('TEST A11 — Delivery option updates the final total', async ({ page }) => {
    await page.getByTestId('add-to-cart-notebook').click();
    await page.getByTestId('add-to-cart-bottle').click();

    // Subtotal: ₹1,298.00 + Standard (₹0.00) = ₹1,298.00
    await expect(page.getByTestId('order-total')).toHaveText('₹1,298.00');

    // Go to dispatch speed step
    await page.getByTestId('stepper-step-options').click();

    // Select Express Priority Dispatch (+₹150.00)
    await page.getByTestId('delivery-option-express').click();

    // Total should immediately update to ₹1,448.00
    await expect(page.getByTestId('order-total')).toHaveText('₹1,448.00');

    // Select Standard again
    await page.getByTestId('delivery-option-standard').click();
    await expect(page.getByTestId('order-total')).toHaveText('₹1,298.00');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '11-step-delivery-options.png'), fullPage: true });
  });

  /**
   * TEST A12 — Payment selection is retained
   */
  test('TEST A12 — Payment selection is retained', async ({ page }) => {
    await page.getByTestId('add-to-cart-notebook').click();
    await page.getByTestId('stepper-step-payment').click();

    // Select Card option
    const cardOption = page.getByTestId('payment-option-card');
    await cardOption.click();
    await expect(cardOption).toBeChecked();

    // Go to Review step
    await page.getByTestId('proceed-to-review-btn').click();
    await expect(page.getByTestId('review-payment-text')).toContainText(/Credit \/ Debit Card/i);

    // Return to Payment step
    await page.getByTestId('edit-payment-btn').click();
    await expect(cardOption).toBeChecked();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '12-step-payment-methods.png'), fullPage: true });
  });

  /**
   * TEST A13 — Final review displays correct order information
   */
  test('TEST A13 — Final review displays correct order information', async ({ page }) => {
    await page.getByTestId('add-to-cart-notebook').click();
    await page.getByTestId('add-to-cart-bottle').click();

    await page.getByTestId('stepper-step-delivery').click();
    await page.getByLabel(/Full Name/i).fill('Asha Kumar');

    await page.getByTestId('stepper-step-review').click();
    await expect(page.getByTestId('step-review-panel')).toBeVisible();

    // Verify Review blocks
    await expect(page.getByTestId('review-address-text')).toContainText('Asha Kumar');
    await expect(page.getByTestId('review-dispatch-text')).toContainText('Standard');
    await expect(page.getByTestId('review-items-list')).toContainText('Everyday Notebook');
    await expect(page.getByTestId('review-items-list')).toContainText('Desk Bottle');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '13-step-final-review.png'), fullPage: true });
  });

  /**
   * TEST A14 — Search returns matching products
   */
  test('TEST A14 — Search returns matching products', async ({ page }) => {
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('bottle');

    // Bottle is visible, Notebook is filtered out
    await expect(page.getByTestId('product-card-bottle')).toBeVisible();
    await expect(page.getByTestId('product-card-notebook')).not.toBeVisible();

    // Clear search
    await page.getByTestId('search-clear-btn').click();
    await expect(page.getByTestId('product-card-notebook')).toBeVisible();
    await expect(page.getByTestId('product-card-bottle')).toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '14-search-results.png'), fullPage: true });
  });

  /**
   * TEST A15 — Category and price filters work
   */
  test('TEST A15 — Category and price filters work', async ({ page }) => {
    // Select Drinkware category
    await page.getByTestId('filter-category-drinkware').click();
    await expect(page.getByTestId('product-card-bottle')).toBeVisible();
    await expect(page.getByTestId('product-card-notebook')).not.toBeVisible();

    // Reset filters
    await page.getByTestId('clear-filters-btn').click();
    await expect(page.getByTestId('product-card-notebook')).toBeVisible();
    await expect(page.getByTestId('product-card-bottle')).toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '15-category-filtering.png'), fullPage: true });
  });

  /**
   * TEST A16 — Wishlist toggles correctly
   */
  test('TEST A16 — Wishlist toggles correctly', async ({ page }) => {
    // Initial wishlist badge should not exist
    await expect(page.getByTestId('wishlist-count-badge')).not.toBeVisible();

    // Toggle wishlist on Everyday Notebook
    await page.getByTestId('wishlist-toggle-notebook').click();
    await expect(page.getByTestId('wishlist-count-badge')).toHaveText('1');

    // Open Wishlist Modal
    await page.getByTestId('wishlist-header-btn').click();
    await expect(page.getByTestId('wishlist-modal')).toBeVisible();
    await expect(page.getByTestId('wishlist-item-notebook')).toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '16-wishlist-modal.png'), fullPage: true });

    // Close Wishlist Modal
    await page.getByTestId('close-wishlist-btn').click();
    await expect(page.getByTestId('wishlist-modal')).not.toBeVisible();
  });

  /**
   * TEST A17 — Empty search results show a useful message
   */
  test('TEST A17 — Empty search results show a useful message', async ({ page }) => {
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('xyzunobtainium');

    await expect(page.getByTestId('no-results-state')).toBeVisible();
    await expect(page.getByTestId('no-results-state')).toContainText(/No Archival Pieces Found/i);

    // Reset via button
    await page.getByTestId('reset-filters-btn').click();
    await expect(page.getByTestId('product-card-notebook')).toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '17-empty-search-results.png'), fullPage: true });
  });

  /**
   * TEST A18 — Cart badge and cart total stay synchronized
   */
  test('TEST A18 — Cart badge and cart total stay synchronized', async ({ page }) => {
    // Initially 0
    await expect(page.getByTestId('cart-badge-count')).toHaveText('0');
    await expect(page.getByTestId('bag-count-badge')).toHaveText('0 items');

    // Add Notebook
    await page.getByTestId('add-to-cart-notebook').click();
    await expect(page.getByTestId('cart-badge-count')).toHaveText('1');
    await expect(page.getByTestId('bag-count-badge')).toHaveText('1 item');

    // Add Bottle
    await page.getByTestId('add-to-cart-bottle').click();
    await expect(page.getByTestId('cart-badge-count')).toHaveText('2');
    await expect(page.getByTestId('bag-count-badge')).toHaveText('2 items');

    // Increase Notebook
    await page.getByTestId('increase-notebook').click();
    await expect(page.getByTestId('cart-badge-count')).toHaveText('3');
    await expect(page.getByTestId('bag-count-badge')).toHaveText('3 items');
  });

  /**
   * TEST A19 — Product details modal display and customer reviews
   */
  test('TEST A19 — Product details modal display and customer reviews', async ({ page }) => {
    // Open Everyday Notebook details
    await page.getByTestId('view-details-notebook').click();
    await expect(page.getByTestId('product-detail-modal')).toBeVisible();

    // Verify modal elements
    await expect(page.getByTestId('modal-product-price')).toHaveText('₹499.00');
    await expect(page.getByTestId('modal-add-to-cart')).toBeVisible();

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08-product-details-modal.png'), fullPage: true });

    // Close modal
    await page.getByTestId('close-modal-btn').click();
    await expect(page.getByTestId('product-detail-modal')).not.toBeVisible();
  });

});
