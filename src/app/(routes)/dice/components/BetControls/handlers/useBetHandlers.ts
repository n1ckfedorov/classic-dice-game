import type { GameConfig } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { calculateMultiplier, formatAmount } from '@/utils/dice';

type UseBetHandlersProps = {
  gameConfig: GameConfig | null;
  balance: number;
  targetPercent: number;
  direction: 'under' | 'over';
  handlePlaceBet: (bet: { amount: number; direction: 'under' | 'over'; target_percent: number }) => Promise<void>;
  setBetAmount: (amount: number) => void;
};

export function useBetHandlers({
  gameConfig,
  balance,
  targetPercent,
  direction,
  handlePlaceBet,
  setBetAmount,
}: UseBetHandlersProps) {
  const [betAmountInput, setBetAmountInput] = useState('0');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'manual' | 'auto' | 'advanced'>('manual');

  const multiplier = calculateMultiplier(direction, targetPercent, gameConfig?.rtp);
  const potentialWin = Number.parseFloat(betAmountInput) && !Number.isNaN(Number.parseFloat(betAmountInput)) && Number.parseFloat(betAmountInput) > 0
    ? Number.parseFloat(betAmountInput) * multiplier - Number.parseFloat(betAmountInput)
    : 0;

  // Synchronize betAmountInput with store
  useEffect(() => {
    const numAmount = Number.parseFloat(betAmountInput) || 0;
    setBetAmount(numAmount);
  }, [betAmountInput, setBetAmount]);

  const handleAmountChange = useCallback((value: string) => {
    const formattedValue = formatAmount(value);
    setBetAmountInput(formattedValue);
    setError('');
  }, []);

  const handleQuickBet = useCallback((amount: number) => {
    if (!gameConfig) {
      return;
    }
    const maxAmount = Math.min(amount, balance, gameConfig.max_bet);
    setBetAmountInput(maxAmount.toString());
    setError('');
  }, [balance, gameConfig]);

  const handleQuickBetMultiplier = useCallback((multiplier: number) => {
    if (!gameConfig) {
      return;
    }
    const current = Number.parseFloat(betAmountInput) || 0;
    const newAmount = Math.min(
      Math.max(Math.floor(current * multiplier), gameConfig.min_bet),
      balance,
      gameConfig.max_bet,
    );
    setBetAmountInput(newAmount.toString());
    setError('');
  }, [betAmountInput, balance, gameConfig]);

  const handleMaxBet = useCallback(() => {
    if (!gameConfig) {
      return;
    }
    setBetAmountInput(Math.min(balance, gameConfig.max_bet).toString());
    setError('');
  }, [balance, gameConfig]);

  const handleSliderChange = useCallback((value: number) => {
    setBetAmountInput(value.toString());
    setError('');
  }, []);

  const handlePlaceBetClick = useCallback(async () => {
    if (!gameConfig) {
      setError('Game config not loaded');
      return;
    }

    const amount = Number.parseFloat(betAmountInput);
    if (Number.isNaN(amount) || amount < 0) {
      setError('Please enter a valid bet amount');
      return;
    }

    const isDemoMode = amount === 0;

    // Validation only for real bets (not demo mode)
    if (!isDemoMode) {
      if (amount < gameConfig.min_bet || amount > gameConfig.max_bet) {
        setError(`Bet must be between ${gameConfig.min_bet} and ${gameConfig.max_bet}`);
        return;
      }

      if (amount > balance) {
        setError('Insufficient balance');
        return;
      }
    }

    setError('');

    try {
      await handlePlaceBet({
        amount,
        direction,
        target_percent: targetPercent,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place bet');
    }
  }, [betAmountInput, direction, targetPercent, gameConfig, balance, handlePlaceBet]);

  const currentBetAmount = Number.parseFloat(betAmountInput) || 0;
  const sliderMax = gameConfig ? Math.min(balance, gameConfig.max_bet) : 0;

  return {
    betAmountInput,
    error,
    activeTab,
    multiplier,
    potentialWin,
    currentBetAmount,
    sliderMax,
    setBetAmountInput,
    setActiveTab,
    handleAmountChange,
    handleQuickBet,
    handleQuickBetMultiplier,
    handleMaxBet,
    handleSliderChange,
    handlePlaceBetClick,
  };
}
