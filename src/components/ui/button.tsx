import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center text-center transition-all duration-200',
  {
    variants: {
      variant: {
        brand: 'bg-gradient-to-r from-[#24ee89] to-[#9fe871] font-extrabold text-black shadow-[0_4px_12px_rgba(36,238,137,0.4)] hover:shadow-[0_6px_16px_rgba(36,238,137,0.5)] hover:brightness-110 active:scale-95',
        input: 'border border-input bg-input_button font-semibold text-primary hover:border-brand-secondary/50 hover:bg-layer2',
      },
      size: {
        m: 'h-12 rounded-lg px-4',
        s: 'h-8 rounded-md px-3 text-sm sm:h-7',
      },
    },
    defaultVariants: {
      variant: 'brand',
      size: 'm',
    },
  },
);

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<'button'>
  & VariantProps<typeof buttonVariants>) {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
