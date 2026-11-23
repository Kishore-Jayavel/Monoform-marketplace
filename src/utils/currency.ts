/**
 * Formats integer paise into standard Indian Rupee currency format (e.g., ₹1,298.00).
 * Storing currency as integer paise avoids floating-point precision issues.
 */
export function formatRupees(paise: number): string {
  if (isNaN(paise) || paise < 0) {
    paise = 0;
  }

  const rupees = Math.floor(paise / 100);
  const remainingPaise = Math.round(paise % 100);

  // Format rupees according to Indian numbering system:
  // Last 3 digits grouped, preceding digits grouped by 2
  const rupeesStr = rupees.toString();
  let formattedRupees = '';

  if (rupeesStr.length <= 3) {
    formattedRupees = rupeesStr;
  } else {
    const lastThree = rupeesStr.substring(rupeesStr.length - 3);
    const otherDigits = rupeesStr.substring(0, rupeesStr.length - 3);
    const withCommas = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    formattedRupees = `${withCommas},${lastThree}`;
  }

  const formattedPaise = remainingPaise.toString().padStart(2, '0');
  return `₹${formattedRupees}.${formattedPaise}`;
}

/**
 * Calculates line total in paise.
 */
export function calculateLineTotal(unitPricePaise: number, quantity: number): number {
  return Math.max(0, unitPricePaise * Math.max(0, Math.floor(quantity)));
}

/**
 * Calculates order total in paise.
 */
export function calculateOrderTotal(items: { pricePaise: number; quantity: number }[]): number {
  return items.reduce((total, item) => total + calculateLineTotal(item.pricePaise, item.quantity), 0);
}
