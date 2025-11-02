'use client';

import type { BetDirection, GameConfig } from '@/types';
import { DiceSlider } from '@/components/ui/dice-slider';
import { mapValueToVisualPercent } from '@/utils/dice';

type SliderSectionProps = {
  value: number;
  direction: BetDirection;
  disabled: boolean;
  gameConfig: GameConfig | null;
  onValueChangeAction: (value: number[]) => void;

};

export function SliderSection({ value, direction, disabled, gameConfig, onValueChangeAction }: SliderSectionProps) {
  const minTarget = gameConfig?.custom_settings.min_target ?? 1;
  const maxTarget = gameConfig?.custom_settings.max_target ?? 99;
  const precision = gameConfig?.custom_settings.precision ?? 2;

  const step = 1 / (10 ** precision);

  const sliderValue = direction === 'over'
    ? maxTarget + minTarget - value
    : value;

  const handleValueChange = (newValue: number[]) => {
    if (direction === 'over' && newValue[0] !== undefined) {
      // Invert back to get correct targetPercent
      const invertedValue = [maxTarget + minTarget - newValue[0]];
      onValueChangeAction(invertedValue);
    } else {
      onValueChangeAction(newValue);
    }
  };

  return (
    <div className="relative mx-[1.12500rem]">

      <DiceSlider

        value={[sliderValue]}
        min={minTarget}
        max={maxTarget}
        step={step}
        onValueChange={handleValueChange}
        disabled={disabled}
        targetPercent={value}
        precision={precision}
        dir={direction === 'under' ? 'ltr' : 'rtl'}
        className="cursor-pointer"
      />

      <div className="relative flex h-14 items-start px-4 pr-[5px]">
        <div className="relative flex h-6 flex-1 items-center justify-between px-2 pt-5.5 text-sm text-muted-foreground">

          <span style={{ left: `${mapValueToVisualPercent(minTarget, minTarget, maxTarget)}%` }}>
            0
          </span>
          <span style={{ left: `${mapValueToVisualPercent(minTarget + (maxTarget - minTarget) * 0.25, minTarget, maxTarget)}%` }}>
            25
          </span>
          <span style={{ left: `${mapValueToVisualPercent(minTarget + (maxTarget - minTarget) * 0.5, minTarget, maxTarget)}%` }}>
            50
          </span>
          <span style={{ left: `${mapValueToVisualPercent(minTarget + (maxTarget - minTarget) * 0.75, minTarget, maxTarget)}%` }}>
            75
          </span>
          <span style={{ left: `${mapValueToVisualPercent(maxTarget, minTarget, maxTarget)}%` }}>
            100
          </span>
        </div>
      </div>
    </div>
  );
}
