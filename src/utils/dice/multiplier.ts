import type { BetDirection } from '@/types';

export function calculateMultiplier(direction: BetDirection, targetPercent: number, rtp: number = 100): number {
  let baseMultiplier: number;
  if (direction === 'under') {
    baseMultiplier = 100 / targetPercent;
  } else {
    baseMultiplier = 100 / (100 - targetPercent);
  }

  const multiplier = baseMultiplier * (rtp / 100);
  return multiplier;
}
