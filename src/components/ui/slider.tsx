'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
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
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          'bg-muted relative h-1.5 grow overflow-hidden rounded-full border border-layer5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            'bg-brand-secondary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          aria-label="Slider thumb"
          key={index}
          className="z-10  flex h-6 w-3 shrink-0  items-center justify-center rounded-full focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          <span
            className="relative  block flex size-full  cursor-pointer rounded-lg bg-white bg-cover bg-center bg-no-repeat transition-colors"
            style={{
              backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAwCAYAAAACYxrZAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHKADAAQAAAABAAAAMAAAAABgjDanAAAAjklEQVRYCe2TuwqAMAxFfeAi6v//p4OLr2QoBUmvdFM4hdCQm4T2tGkaFgQgAAEIQOCNQCsSRtNms07kRNJhwdVsi0TVbLICpUf9PNabLSVRNVS3L/VL8Ss5z91PU1qnCYOZOlRU63WOdI9EYv8noH4ic6jelzlUdNDqCDCHdbxyNnOYWeBBAAIQgMD3CdzithhMnuqNvgAAAABJRU5ErkJggg==")',
            }}
          />
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
