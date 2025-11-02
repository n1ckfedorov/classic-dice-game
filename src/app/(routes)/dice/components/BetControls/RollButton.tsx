'use client';

import { Button } from '@/components';

type RollButtonProps = {
  onClickAction: () => void;
  disabled?: boolean;
  betAmount: number;
  balance: number;
};

export function RollButton({ onClickAction, disabled = false, betAmount, balance }: RollButtonProps) {
  const isDisabled = disabled || (betAmount > 0 && betAmount > balance);

  return (
    <>
      <Button
        variant="brand"
        size="m"
        onClick={onClickAction}
        disabled={isDisabled}
        type="button"
        className="w-full font-bold tracking-wide uppercase disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Roll Now"
      >
        Roll Now
      </Button>
      {betAmount === 0 && !disabled && (
        <p className="text-center text-xs text-muted-foreground">
          Betting with 0 will enter demo mode.
        </p>
      )}
    </>
  );
}
