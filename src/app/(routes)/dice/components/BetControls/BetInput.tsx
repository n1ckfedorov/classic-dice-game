'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components';
import { Icon } from '@/components/Sprite';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { BetAmountSlider } from './BetAmountSlider';

type BetInputProps = {
  value: string;
  onChangeAction: (value: string) => void;
  disabled?: boolean;
  onQuickBetAction: (amount: number) => void;
  onQuickBetMultiplierAction: (multiplier: number) => void;
  onMaxBetAction: () => void;
  balance: number;
  maxBet: number;
  sliderValue?: number;
  sliderMin?: number;
  sliderMax?: number;
  onSliderChangeAction?: (value: number) => void;
  maxProfit: number;
};

const formatAmount = (amount: number) => {
  switch (true) {
    case amount < 1:
      if (amount >= 0.1) {
        return amount.toFixed(1);
      }
      if (amount >= 0.01) {
        return amount.toFixed(2);
      }
      return amount.toFixed(3);
    case amount >= 1000:
      return `${(amount / 1000).toFixed(1)}k`;
    default:
      return amount.toString();
  }
};

export function BetInput({
  value,
  onChangeAction,
  disabled = false,
  onQuickBetMultiplierAction,
  onQuickBetAction,
  balance,
  maxBet,
  sliderValue,
  sliderMin,
  sliderMax,
  onSliderChangeAction,
  maxProfit,
}: BetInputProps) {
  const [inputInFocus, setInputInFocus] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const presetAmounts = balance < 1
    ? [0.001, 0.01, 0.1, 0.5] // If balance < 1
    : [1, 5, 10, 50]; // If balance >= 1

  // Close slider when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSliderOpen
        && sliderRef.current
        && buttonRef.current
        && !sliderRef.current.contains(event.target as Node)
        && !buttonRef.current.contains(event.target as Node)
      ) {
        setIsSliderOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSliderOpen]);

  return (
    <>
      <div className="relative">
        <div className="mb-1 flex items-center justify-between">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1">
                <label htmlFor="bet-input" className="mr-1 flex h-4.5 items-center px-1 pl-1 text-sm font-extrabold text-secondary peer-disabled:cursor-not-allowed peer-disabled:opacity-40 data-[invalid]:text-secondary">Amount</label>
                <div className="flex grow items-center">
                  <button type="button" aria-label="Info" className="size-4 focus-visible:outline-none">
                    <Icon name="info" size={16} className="text-brand" />
                  </button>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm font-semibold whitespace-nowrap text-primary">
                Max Profit:

                UAH
                {' '}
                {' '}
                {maxProfit?.toFixed(2)}

              </p>
            </TooltipContent>
          </Tooltip>

        </div>
        <div className={cn('input rounded-lg pl-2 relative font-extrabold pr-1 h-10 transition-all duration-200', inputInFocus && 'border-brand')}>
          <input
            id="bet-input"
            size={30}
            inputMode="decimal"
            className="w-full"
            value={value}
            onChange={e => onChangeAction(e.target.value)}
            placeholder="0"
            disabled={disabled}
            onFocus={() => setInputInFocus(true)}
            onBlur={() => setInputInFocus(false)}
          />
          <div className="order-first inline-flex size-6 shrink-0 scale-125 items-center justify-center rounded-full leading-6">
            <Image src="/assets/images/UAH.webp" width={16} height={16} alt="UAH" />
          </div>
          <div className=" flex items-center gap-1">
            <Button variant="input" size="s" className="h-10 w-12 md:h-8" onClick={() => onQuickBetMultiplierAction(0.5)} aria-label="1/2">
              1/2
            </Button>

            <Button variant="input" size="s" className="h-10 w-12 md:h-8" onClick={() => onQuickBetMultiplierAction(2)} aria-label="2×">
              2×
            </Button>

            <Button
              ref={buttonRef}
              variant="input"
              size="s"
              className="h-10 w-12 md:h-8"
              disabled={disabled}
              onClick={() => setIsSliderOpen(!isSliderOpen)}
              aria-label="Slider"
            >
              <div className="flex flex-col">
                <Icon name="arrow-up" size={16} className="rotate-90" />
                <Icon name="arrow-up" size={16} className="-rotate-90" />
              </div>
            </Button>

            {isSliderOpen && sliderValue !== undefined && sliderMin !== undefined && sliderMax !== undefined && onSliderChangeAction && (
              <BetAmountSlider
                ref={sliderRef}
                value={sliderValue}
                min={sliderMin}
                max={sliderMax}
                onChangeAction={onSliderChangeAction}
                disabled={disabled}
              />
            )}
          </div>
        </div>
        <div className="w-full">
          <div className="grid w-full grid-cols-4 gap-2 rounded-xl bg-transparent p-0 pt-1">
            {presetAmounts.map(amount => (
              <Button key={amount} variant="input" size="s" className="h-10 md:h-8" onClick={() => onQuickBetAction(amount)} disabled={disabled || amount > balance || amount > maxBet} aria-label={`${formatAmount(amount)} Bet`}>
                {formatAmount(amount)}
              </Button>
            ))}
          </div>
        </div>
      </div>

    </>
  );
}
