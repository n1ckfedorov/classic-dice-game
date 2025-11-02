import type { VariantProps } from 'class-variance-authority';
import type { LinkProps as NextLinkProps } from 'next/link';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center text-center transition-all duration-200',
  {
    variants: {
      variant: {
        brand: 'bg-gradient-to-r from-[#24ee89] to-[#9fe871] font-extrabold text-black shadow-[0_12px_0_0_rgba(35,238,136,0.3)] shadow-[inset_0_-2px_0_0_#1dca6a] hover:shadow-[0_0px_2px_0_rgba(36,238,137,0.5)] hover:brightness-110',
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

export type ButtonProps = {
  asChild?: boolean;
  textColor?: string;
  href?: string;
  LinkProps?: NextLinkProps;
  target?: string;
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>
& VariantProps<typeof buttonVariants>;

const Button = (
  { ref, className, variant, size, textColor, asChild = false, href, target, type = 'button', LinkProps, isLoading = false, ...props }: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> },
) => {
  const isLink = !!href;
  let Comp: React.ElementType;

  if (asChild) {
    Comp = Slot;
  } else if (isLink) {
    Comp = Link;
  } else {
    Comp = 'button';
  }

  const linkProps = isLink ? { href, target, ...LinkProps } : {};
  const buttonProps = isLink ? {} : { ref, type };

  return (
    <Comp
      className={cn(
        buttonVariants({ size, variant, className }),
        props.disabled && 'cursor-not-allowed opacity-50',
        isLoading
        && 'pointer-events-none opacity-50 flex items-center gap-2 flex-row-reverse',
        textColor,
      )}
      {...linkProps}
      {...buttonProps}
      {...props}
    >
      <>
        {isLoading && <Loader2 className="size-4 animate-spin" />}
        {props.children}
      </>
    </Comp>
  );
};
Button.displayName = 'Button';

export { Button };
