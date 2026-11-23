/**
 * Generates an editorial order reference in the format: MONO-XXXXXX
 * Note: This is a frontend demonstration identifier for client-side demo and testing,
 * not an authoritative server-issued database order ID.
 */
export function generateOrderReference(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // Unambiguous uppercase alphanumeric
  let code = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }
  return `MONO-${code}`;
}
