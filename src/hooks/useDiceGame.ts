import type { Bet } from '@/types';
import { useCallback, useEffect } from 'react';

import { fetchGameConfig, placeBet } from '@/api/dice';
import { useDiceStore } from '@/store/dice';
import { roundToPrecision } from '@/utils/dice';

export function useDiceGame() {
  const {
    balance,
    gameConfig,
    currentBet,
    betAmount,
    isRolling,
    currentRoll,
    targetPercent,
    direction,
    gameResults,
    setGameConfig,
    setBalance,
    setCurrentBet,
    setBetAmount,
    setIsRolling,
    setCurrentRoll,
    rollStartTime,
    setRollStartTime,
    setTargetPercent,
    setDirection,
    addGameResult,
    resetGame,
  } = useDiceStore();

  // Load config on mount
  useEffect(() => {
    if (!gameConfig) {
      fetchGameConfig()
        .then((config) => {
          setGameConfig(config);
        })
        .catch((error) => {
          console.error('Failed to fetch game config:', error);
        });
    }
  }, [gameConfig, balance, setGameConfig, setBalance]);

  const handlePlaceBet = useCallback(
    async (bet: Bet) => {
      if (!gameConfig) {
        return;
      }

      const isDemoMode = bet.amount === 0;

      // Validation (skip for demo mode)
      if (!isDemoMode) {
        if (bet.amount < gameConfig.min_bet || bet.amount > gameConfig.max_bet) {
          throw new Error(`Bet amount must be between ${gameConfig.min_bet} and ${gameConfig.max_bet}`);
        }

        if (bet.amount > balance) {
          throw new Error('Insufficient balance');
        }
      }

      // Use values from custom_settings
      const { min_target, max_target } = gameConfig.custom_settings;
      if (bet.target_percent < min_target || bet.target_percent > max_target) {
        throw new Error(
          `Target percent must be between ${min_target} and ${max_target}`,
        );
      }

      // Check direction
      if (!gameConfig.custom_settings.directions.includes(bet.direction)) {
        throw new Error(
          `Invalid direction. Must be one of: ${gameConfig.custom_settings.directions.join(', ')}`,
        );
      }

      setCurrentBet(bet);
      setIsRolling(true);
      const startTime = Date.now();
      setRollStartTime(startTime);

      try {
        // Send original bet to API (0 for demo mode)
        const result = await placeBet(bet);
        const requestDuration = Date.now() - startTime;
        setCurrentRoll(result.data.roll);

        const precision = gameConfig.custom_settings.precision;

        // Update balance only if not demo mode
        if (!isDemoMode) {
          // Update balance considering precision
          // result.data.win is net win (without initial bet)
          // On win: balance = balance - bet.amount + bet.amount * multiplier
          // On loss: balance = balance - bet.amount
          const newBalance = result.data.is_win
            ? balance - bet.amount + bet.amount * result.data.multiplier
            : balance - bet.amount;
          const roundedBalance = roundToPrecision(newBalance, precision);
          setBalance(roundedBalance);

          // Update result with correct balance
          const resultWithBalance = {
            ...result,
            data: {
              ...result.data,
              balance: roundedBalance,
              bet_amount: roundToPrecision(bet.amount, precision), // Use actual bet amount
              win: roundToPrecision(result.data.is_win ? bet.amount * result.data.multiplier - bet.amount : 0, precision),
            },
          };

          addGameResult(resultWithBalance);
        } else {
          // For demo mode save result for display but don't change balance
          // Use current balance for display
          const demoResult = {
            ...result,
            data: {
              ...result.data,
              balance, // Keep balance unchanged
              bet_amount: roundToPrecision(bet.amount, precision), // 0 for demo mode
              win: roundToPrecision(result.data.win, precision), // Use win from API (will be 0 for demo mode)
            },
          };

          addGameResult(demoResult);
        }

        // Animation will last as long as the request took
        // If request is fast (less than 500ms), minimum animation duration is 500ms
        const minAnimationDuration = 500;
        const animationDuration = Math.max(requestDuration, minAnimationDuration);

        // Delay before resetting state (after cube animation completes)
        setTimeout(() => {
          setIsRolling(false);
          resetGame();
        }, animationDuration);
      } catch (error) {
        setIsRolling(false);
        resetGame();
        throw error;
      }
    },
    [gameConfig, balance, setCurrentBet, setIsRolling, setBalance, setCurrentRoll, setRollStartTime, addGameResult, resetGame],
  );

  return {
    balance,
    gameConfig,
    currentBet,
    betAmount,
    isRolling,
    currentRoll,
    rollStartTime,
    targetPercent,
    direction,
    gameResults,
    handlePlaceBet,
    setBetAmount,
    setTargetPercent,
    setDirection,
  };
}
