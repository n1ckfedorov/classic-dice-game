/**
 * Converts actual value from minTarget-maxTarget range to visual percentage (0-100%)
 * Visually we always show 0-100%, but map actual values to this range
 */
export function mapValueToVisualPercent(
  value: number,
  minTarget: number,
  maxTarget: number,
): number {
  const normalizedValue = Math.max(minTarget, Math.min(maxTarget, value));
  return ((normalizedValue - minTarget) / (maxTarget - minTarget)) * 100;
}
