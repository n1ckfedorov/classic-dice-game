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
    <div className="border-border border-t border-layer5 pt-3 text-center text-sm">
      <span className="text-muted-foreground">Balance: </span>
      <span className="font-bold text-primary">{formatWithPrecision(balance, precision)}</span>
    </div>
  );
}
