import type { BetDirection, GameConfig } from '@/types';
import { useCallback } from 'react';
import { calculateMultiplier, formatAmount, formatPayout, formatWithPrecision } from '@/utils/dice';

type UseGameHandlersProps = {
  targetPercent: number;
  direction: BetDirection;
  isRolling: boolean;
  currentRoll: number | null;
  precision: number;
  gameConfig: GameConfig | null;
  setTargetPercent: (value: number) => void;
  setDirection: (direction: BetDirection) => void;
  setAnimatedValue: (value: number) => void;
  setSliderValue: (value: number) => void;
  setPayoutInput: (value: string) => void;
  setWinChanceInput: (value: string) => void;
};

export function useGameHandlers({
  targetPercent,
  direction,
  isRolling,
  currentRoll,
  precision,
  gameConfig,
  setTargetPercent,
  setDirection,
  setAnimatedValue,
  setSliderValue,
  setPayoutInput,
  setWinChanceInput,
}: UseGameHandlersProps) {
  const rtp = gameConfig?.rtp ?? 100;
  const maxTarget = gameConfig?.custom_settings.max_target ?? 99;
  const minTarget = gameConfig?.custom_settings.min_target ?? 1;

  const handleDirectionToggle = useCallback(() => {
    const newDirection: BetDirection = direction === 'under' ? 'over' : 'under';
    const newTargetPercent = 100 - targetPercent;
    setTargetPercent(newTargetPercent);
    setAnimatedValue(newTargetPercent);
    setSliderValue(newTargetPercent);
    setDirection(newDirection);

    // Update inputs after direction change
    const newMultiplier = calculateMultiplier(newDirection, newTargetPercent, rtp);
    const newWinChance = newDirection === 'under' ? newTargetPercent : 100 - newTargetPercent;
    setPayoutInput(formatPayout(newMultiplier));
    setWinChanceInput(formatWithPrecision(newWinChance, precision));
  }, [direction, targetPercent, precision, rtp, setTargetPercent, setAnimatedValue, setSliderValue, setDirection, setPayoutInput, setWinChanceInput]);

  const handlePayoutChange = useCallback((value: string) => {
    if (isRolling) {
      return;
    }
    const formattedValue = formatAmount(value);
    setPayoutInput(formattedValue);
    const numValue = Number.parseFloat(value);
    if (!Number.isNaN(numValue) && numValue >= 1.01) {
      const baseMultiplier = numValue * (100 / rtp);
      let newTargetPercent: number;
      if (direction === 'under') {
        newTargetPercent = 100 / baseMultiplier;
      } else {
        newTargetPercent = 100 - (100 / baseMultiplier);
      }

      if (newTargetPercent >= 1 && newTargetPercent <= 99) {
        setTargetPercent(newTargetPercent);
        // Don't update animatedValue - cube should stay at last result position
        setSliderValue(newTargetPercent);
        const newWinChance = direction === 'under' ? newTargetPercent : 100 - newTargetPercent;
        setWinChanceInput(formatWithPrecision(newWinChance, precision));
      }
    }
  }, [isRolling, direction, precision, rtp, setPayoutInput, setTargetPercent, setSliderValue, setWinChanceInput]);

  const handleWinChanceChange = useCallback((value: string) => {
    if (isRolling) {
      return;
    }
    const formattedValue = formatAmount(value);
    setWinChanceInput(formattedValue);
    const numValue = Number.parseFloat(formattedValue);
    if (!Number.isNaN(numValue) && numValue >= minTarget && numValue <= maxTarget) {
      const newTargetPercent = direction === 'under' ? numValue : 100 - numValue;
      if (newTargetPercent >= minTarget && newTargetPercent <= maxTarget) {
        setTargetPercent(newTargetPercent);
        // Don't update animatedValue - cube should stay at last result position
        setSliderValue(newTargetPercent);
        const newMultiplier = calculateMultiplier(direction, newTargetPercent, rtp);
        setPayoutInput(formatPayout(newMultiplier));
      }
    }
  }, [isRolling, direction, rtp, maxTarget, minTarget, setWinChanceInput, setTargetPercent, setSliderValue, setPayoutInput]);

  const handleSliderChange = useCallback((value: number[]) => {
    const newValue = value[0];
    if (isRolling) {
      return;
    }
    if (currentRoll === null && typeof newValue === 'number') {
      setTargetPercent(newValue);
      // Don't update animatedValue - cube should stay at last result position
      setSliderValue(newValue);

      const newMultiplier = calculateMultiplier(direction, newValue, rtp);
      const newWinChance = direction === 'under' ? newValue : 100 - newValue;
      setPayoutInput(formatPayout(newMultiplier));
      setWinChanceInput(formatWithPrecision(newWinChance, precision));
    }
  }, [isRolling, currentRoll, direction, precision, rtp, setTargetPercent, setSliderValue, setPayoutInput, setWinChanceInput]);

  return {
    handleDirectionToggle,
    handlePayoutChange,
    handleWinChanceChange,
    handleSliderChange,
  };
}
