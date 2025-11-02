'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { formatWithPrecision } from '@/utils/dice';

type DiceSliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  targetPercent: number;
  precision: number;
};

function DiceSlider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  targetPercent,
  precision,

  ...props
}: DiceSliderProps) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <div className="relative flex h-14 items-center rounded-full bg-layer6 px-4">
      <SliderPrimitive.Root
        data-slot="dice-slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        className={cn(
          'bg-layer3 rounded-full relative h-6 px-2 flex items-center flex-1 shadow-sm shadow-stone-800',
          className,
        )}
        {...props}
      >
        {/* Track */}
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative h-2.5 w-full grow overflow-hidden rounded-full bg-warning"
        >

          {/* Range overlay */}
          <SliderPrimitive.Range
            data-slot="slider-range"
            className="absolute h-full bg-gradient-to-r from-[#31ee88] to-[#9fe871]"

          />
        </SliderPrimitive.Track>

        {/* Thumb */}
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            aria-label="Slider thumb"
            key={index}
            className="group relative flex size-5 shrink-0 items-center justify-center transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 data-[disabled]:cursor-default"

          >
            <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 rounded-md bg-layer6 p-2 text-center text-sm leading-none font-semibold text-primary opacity-0 transition-all duration-200 group-hover:opacity-100 peer-disabled:cursor-not-allowed peer-disabled:opacity-40 after:absolute after:bottom-[-0.2rem] after:left-1/2 after:-z-10  after:h-2.5 after:w-2 after:-translate-x-1/2 after:rotate-45 after:bg-layer6 data-[invalid]:text-secondary">
              {formatWithPrecision(targetPercent, precision)}
            </div>
            <div className="h-9 w-8 shrink-0 bg-[url(/assets/images/slider.webp)] bg-cover bg-center bg-no-repeat" />
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Root>
    </div>
  );
}

export { DiceSlider };
