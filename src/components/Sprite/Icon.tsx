import React from 'react';
import { cn } from '@/lib/utils';

export type SvgProps = {
  name: 'arrow-up' | 'info' | 'mark' | 'star' | 'switch';
  size?: string | number;
  className?: string;
  strokeWidth?: string | number;
  absoluteStrokeWidth?: boolean;
};

const Icon = (
  { ref, name, size = 16, strokeWidth = 2, absoluteStrokeWidth, className }: SvgProps & { ref?: React.RefObject<SVGSVGElement | null> },
) => (
  <svg
    ref={ref}
    width={size}
    height={size}
    className={cn('', className)}
    strokeWidth={
      absoluteStrokeWidth
        ? (Number(strokeWidth) * 24) / Number(size)
        : strokeWidth
    }
    name={`#icon-${name}`}
  >
    <use xlinkHref={`#icon-${name}`} />
  </svg>
);

Icon.displayName = 'Icon';
export { Icon };
