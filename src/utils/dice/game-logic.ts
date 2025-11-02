import type { BetDirection } from '@/types';

export function checkWin(direction: BetDirection, targetPercent: number, roll: number): boolean {
  if (direction === 'under') {
    return roll < targetPercent;
  }
  return roll >= targetPercent;
}
