'use client';

import { useDiceGame } from '@/hooks/useDiceGame';
import { formatWithPrecision } from '@/utils/dice';

type BalanceDisplayProps = {
  balance: number;
};

export function BalanceDisplay({ balance }: BalanceDisplayProps) {
  const { gameConfig } = useDiceGame();
  const precision = gameConfig?.custom_settings.precision ?? 2;

  return (
    <div className="border-border flex items-center justify-center gap-2 border-t border-layer5 pt-3 text-center text-base">
      <span className="text-2xl">{balance > 0 ? '😊' : '😭'}</span>
      <span className="font-semibold text-muted-foreground">Balance:</span>
      <span className="ml-1 text-xl font-extrabold text-primary">{formatWithPrecision(balance, precision)}</span>
    </div>
  );
}
