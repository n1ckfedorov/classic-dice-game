'use client';

import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

type BetAmountSliderProps = {
  value: number;
  min: number;
  max: number;
  onChangeAction: (value: number) => void;
  disabled?: boolean;
};

export const BetAmountSlider = ({ ref, value, min, max, onChangeAction, disabled = false }: BetAmountSliderProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const handleMinClick = () => {
    if (!disabled) {
      onChangeAction(min);
    }
  };

  const handleMaxClick = () => {
    if (!disabled) {
      onChangeAction(max);
    }
  };

  return (
    <div ref={ref} className="absolute top-full right-0 left-0 z-50 mt-0.5 flex w-full items-center gap-0 rounded-lg border border-layer5 bg-[#292D2E] shadow-lg">
      {/* Min Button */}
      <button
        type="button"
        aria-label="Min"
        onClick={handleMinClick}
        disabled={disabled}
        className={cn(
          'flex h-8 items-center justify-center rounded-l-lg rounded-r-none border-r border-layer5 px-3 text-sm font-bold text-primary transition-colors bg-layer5',
          'hover:bg-layer2 active:scale-95',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
      >
        Min
      </button>

      {/* Slider Container */}
      <div className="relative flex-1 px-2">
        <Slider
          value={[Math.max(value, min)]}
          min={min}
          max={max}
          step={1}
          onValueChange={(sliderValue) => {
            const newValue = sliderValue[0];
            if (typeof newValue === 'number') {
              onChangeAction(newValue);
            }
          }}
          disabled={disabled}
          className="relative w-full"
        />

        {/* Tick marks (dots) */}
        <div className="absolute inset-x-3 top-[3px] z-[-1] flex w-full -translate-y-1/2 justify-between opacity-50">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className="size-1 rounded-full bg-muted-foreground"
            />
          ))}
        </div>
      </div>

      {/* Max Button */}
      <button
        type="button"
        aria-label="Max"
        onClick={handleMaxClick}
        disabled={disabled}
        className={cn(
          'flex h-8 items-center justify-center rounded-l-none rounded-r-lg border-l border-layer5 px-3 text-sm font-bold text-primary transition-colors bg-layer5',
          'hover:bg-layer2 active:scale-95',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
      >
        Max
      </button>
    </div>
  );
};
