'use client';

import type { BetDirection, GameConfig } from '@/types';
import { Icon } from '@/components/Sprite';
import { formatWithPrecision } from '@/utils/dice';

type GameInfoProps = {
  targetPercent: number;
  direction: BetDirection;
  precision: number;
  payoutInput: string;
  winChanceInput: string;
  isRolling: boolean;
  onDirectionToggleAction: () => void;
  onPayoutChangeAction: (value: string) => void;
  onWinChanceChangeAction: (value: string) => void;
  onPayoutBlurAction: () => void;
  onWinChanceBlurAction: () => void;
  gameConfig: GameConfig | null;
};

export function GameInfo({
  targetPercent,
  direction,
  precision,
  payoutInput,
  winChanceInput,
  isRolling,
  gameConfig,
  onDirectionToggleAction,
  onPayoutChangeAction,
  onWinChanceChangeAction,
  onPayoutBlurAction,
  onWinChanceBlurAction,
}: GameInfoProps) {
  return (
    <div className="mx-0 grid grid-cols-3 gap-2  rounded-xl bg-layer5 px-2 py-2 text-sm sm:mt-12 md:mt-24 lg:mx-3 lg:mt-38">
      <div className="flex flex-col gap-1">
        <label htmlFor="win-chance-input" className="text-sm font-medium text-muted-foreground">Payout</label>
        <div className="relative  font-normal">
          <div className="input h-10 border-none bg-layer4 pr-10">
            <input
              id="payout-input"
              type="decimal"
              min={gameConfig?.custom_settings.min_target}
              max={gameConfig?.custom_settings.max_target}
              step={gameConfig?.custom_settings.precision}
              value={payoutInput}
              onChange={e => onPayoutChangeAction(e.target.value)}
              onBlur={onPayoutBlurAction}
              disabled={isRolling}
              className="w-full focus:outline-none"
            />
          </div>
          <b className="absolute top-1/2 right-3 -translate-y-1/2 text-base text-primary">×</b>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="win-chance-input" className="text-sm font-medium text-muted-foreground">
          Roll
          {' '}
          {direction === 'under' ? 'Under' : 'Over'}
        </label>
        <div className="relative  font-normal">
          <div className="input h-10 border-none bg-layer4 pr-10">
            {formatWithPrecision(targetPercent, precision)}
          </div>
          <button onClick={onDirectionToggleAction} type="button" aria-label="Switch Direction" className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md bg-layer5 text-base text-brand transition-colors  hover:text-green-500 ">
            <Icon name="switch" className="size-7" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="win-chance-input" className="text-sm font-medium text-muted-foreground">Win Chance</label>
        <div className="relative  font-normal">
          <div className="input h-10 border-none bg-layer4 pr-10">
            <input
              id="win-chance-input"
              type="decimal"
              min={gameConfig?.custom_settings.min_target}
              max={gameConfig?.custom_settings.max_target}
              step={gameConfig?.custom_settings.precision}
              value={winChanceInput}
              onChange={e => onWinChanceChangeAction(e.target.value)}
              onBlur={onWinChanceBlurAction}
              disabled={isRolling}
              className="w-full focus:outline-none"
            />
          </div>
          <b className="absolute top-1/2 right-3 -translate-y-1/2 text-base text-primary">%</b>
        </div>
      </div>
    </div>
  );
}
