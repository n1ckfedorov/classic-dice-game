'use client';

import { Button } from '@/components';
import { Icon } from '@/components/Sprite';

type RollButtonProps = {
  onClickAction: () => void;
  disabled?: boolean;
  betAmount: number;
  balance: number;
};

export function RollButton({ onClickAction, disabled = false, betAmount, balance }: RollButtonProps) {
  const isDisabled = disabled || (betAmount > 0 && betAmount > balance);

  return (
    <div className="mt-1.5">
      <Button
        variant="brand"
        size="m"
        onClick={onClickAction}
        disabled={isDisabled}
        type="button"
        className="w-full text-sm font-extrabold  tracking-wide disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Roll Now"
      >
        Roll Now
      </Button>
      {betAmount === 0 && (
        <div className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-[rgba(36,238,137,0.1)] px-2 py-1">
          <Icon name="info" size={16} className="text-secondary" />
          <p className="text-sm font-semibold text-secondary">
            Betting with 0 will enter demo mode.
          </p>
        </div>
      )}
      {betAmount > balance && (
        <div className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-[rgba(255,0,0,0.1)] px-2 py-1">
          <Icon name="info" size={16} className="text-secondary" />
          <p className="text-sm font-semibold text-secondary">
            Bet amount is greater than balance.
          </p>
        </div>
      )}
    </div>
  );
}
