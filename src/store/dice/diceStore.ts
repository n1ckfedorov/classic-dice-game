import type { DiceStore } from './diceStore.types';
import type { Bet, BetDirection, GameConfig, GameResult } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Default initial balance (will be replaced when config loads)
const DEFAULT_BALANCE = 1000;

export const useDiceStore = create<DiceStore>()(
  persist(
    (set, get) => ({
      balance: DEFAULT_BALANCE,
      gameConfig: null,
      currentBet: null,
      betAmount: 0,
      isRolling: false,
      currentRoll: null,
      rollStartTime: null,
      targetPercent: 75,
      direction: 'under',
      gameResults: [],
      setGameConfig: (config: GameConfig) => set({ gameConfig: config }),
      setBalance: (balance: number) => set({ balance }),
      setCurrentBet: (bet: Bet | null) => set({ currentBet: bet }),
      setBetAmount: (amount: number) => set({ betAmount: amount }),
      setIsRolling: (isRolling: boolean) => set({ isRolling }),
      setCurrentRoll: (roll: number | null) => set({ currentRoll: roll }),
      setRollStartTime: (time: number | null) => set({ rollStartTime: time }),
      setTargetPercent: (percent: number) => set({ targetPercent: percent }),
      setDirection: (direction: BetDirection) => set({ direction }),
      addGameResult: (result: GameResult) => set({ gameResults: [...get().gameResults, result] }),
      resetGame: () => set({ currentBet: null, isRolling: false, currentRoll: null, rollStartTime: null }),
    }),
    {
      name: 'dice-storage',
      partialize: state => ({
        balance: state.balance,
        gameConfig: state.gameConfig,
        gameResults: state.gameResults,
        targetPercent: state.targetPercent,
        direction: state.direction,
      }),
    },
  ),
);
