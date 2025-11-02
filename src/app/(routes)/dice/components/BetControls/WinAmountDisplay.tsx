'use client';

import Image from 'next/image';
import { useDiceGame } from '@/hooks/useDiceGame';
import { cn } from '@/lib/utils';
import { formatWithPrecision } from '@/utils/dice';

type WinAmountDisplayProps = {
  value: number;
};

export function WinAmountDisplay({ value }: WinAmountDisplayProps) {
  const { gameConfig } = useDiceGame();
  const precision = gameConfig?.custom_settings.precision ?? 2;
  const disabled = value === 0;

  return (

    <div
      role="group"
      className={cn('flex flex-col gap-1 text-left mt-3', disabled && 'opacity-50')}
    >
      <span className="px-1 text-sm font-semibold text-secondary">
        Win Amount
      </span>
      <div className="pointer-events-none relative">
        <div className="absolute top-1/2 left-2 inline-flex size-6 shrink-0 -translate-y-1/2 items-center justify-center rounded-full leading-6">
          <Image src="/assets/images/UAH.webp" alt="UAH" width={16} height={16} />
        </div>
        <div className="input !pl-9 font-semibold" data-disabled="true">
          <input
            id="win-amount"
            disabled={value === 0}
            readOnly
            type="text"
            value={formatWithPrecision(value, precision)}
            className="w-full border-none bg-transparent p-0 text-inherit outline-none"
            tabIndex={-1}
            aria-label="Win Amount"
          />
        </div>
      </div>
    </div>

  );
}
