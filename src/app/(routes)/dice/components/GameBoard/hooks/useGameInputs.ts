import type { BetDirection, GameConfig } from '@/types';
import { useEffect, useState } from 'react';
import { calculateMultiplier, formatPayout, formatWithPrecision } from '@/utils/dice';

type UseGameInputsProps = {
  direction: BetDirection;
  targetPercent: number;
  precision: number;
  isRolling: boolean;
  gameConfig: GameConfig | null;
};

export function useGameInputs({ direction, targetPercent, precision, gameConfig }: UseGameInputsProps) {
  const [payoutInput, setPayoutInput] = useState('');
  const [winChanceInput, setWinChanceInput] = useState('');

  const rtp = gameConfig?.rtp ?? 100;
  const multiplier = calculateMultiplier(direction, targetPercent, rtp);
  const winChance = direction === 'under' ? targetPercent : 100 - targetPercent;

  // Synchronize inputs with current values when direction or targetPercent changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const currentMultiplier = calculateMultiplier(direction, targetPercent, rtp);
      const currentWinChance = direction === 'under' ? targetPercent : 100 - targetPercent;

      // Update inputs only if they are not being changed by user
      const payoutNum = Number.parseFloat(payoutInput);
      const payoutMatches = !Number.isNaN(payoutNum) && Math.abs(payoutNum - currentMultiplier) < 0.0001;

      const winChanceNum = Number.parseFloat(winChanceInput);
      const winChanceMatches = !Number.isNaN(winChanceNum) && Math.abs(winChanceNum - currentWinChance) < 0.01;

      if (!payoutMatches) {
        setPayoutInput(formatPayout(currentMultiplier));
      }
      if (!winChanceMatches) {
        setWinChanceInput(formatWithPrecision(currentWinChance, precision));
      }
    }, 0);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [direction, targetPercent, multiplier, winChance, payoutInput, winChanceInput, precision, rtp]);

  return {
    payoutInput,
    winChanceInput,
    setPayoutInput,
    setWinChanceInput,
    multiplier,
    winChance,
  };
}
