/**
 * Round number to precision
 */
export function roundToPrecision(value: number, precision: number): number {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

/**
 * Format number for display with precision
 */
export function formatWithPrecision(value: number, precision: number): string {
  return value.toFixed(precision);
}

/**
 * Format payout value, removing trailing zeros
 */
export function formatPayout(value: number): string {
  return Number.parseFloat(value.toFixed(4)).toString();
}
