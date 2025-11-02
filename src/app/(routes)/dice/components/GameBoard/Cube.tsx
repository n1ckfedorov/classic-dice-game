'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { formatWithPrecision, mapValueToVisualPercent } from '@/utils/dice';

type CubeProps = {
  value: number;
  precision: number;
  isWin: boolean;
  winKey?: string | number;
  minTarget?: number;
  maxTarget?: number;
  animatedValue: number;
};

export function Cube({ value, precision, isWin, winKey, animatedValue, minTarget, maxTarget }: CubeProps) {
  // Create unique key for each win
  const animationKey = isWin && winKey ? `win-${winKey}` : 'default';

  // Convert absolute value (minTarget-maxTarget range) to visual percentage (0-100%)
  const min = minTarget ?? 0.01;
  const max = maxTarget ?? 98;
  const visualPercent = mapValueToVisualPercent(animatedValue, min, max);

  return (

    <div
      className="relative mb-2 size-[5.62500rem] transition-all duration-500"
      style={{
        left: `clamp(0px, calc(1.12500rem + 1rem + 0.5rem + (100% - 5.25rem) * ${visualPercent / 100} - 2.8125rem), calc(100% - 2.8125rem))`,
      }}
    >
      {/* White dice with number */}
      <motion.div
        key={animationKey}
        className={cn('absolute top-0 flex size-full items-center justify-center rounded-lg overflow-hidden text-gray-900', isWin && 'text-green-500')}
        animate={isWin && winKey ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={isWin && winKey ? { duration: 1, ease: 'easeInOut' } : undefined}
        initial={false}
      >
        <Image
          src="/assets/images/cube.webp"
          alt="Dice"
          width={90}
          height={90}
          className="absolute inset-0 size-full object-cover"
          priority
          fetchPriority="high"
        />
        <span className="relative z-10 text-base font-extrabold lg:text-xl">
          {formatWithPrecision(value, precision)}
        </span>
      </motion.div>
      {/* Indicator line from cube to slider */}
      <div
        className="absolute bottom-[-2.5625rem] left-1/2 z-10 h-2.5 w-1.5 -translate-x-1/2 bg-[#FFF] opacity-50 lg:bottom-[-41px]"
      />
    </div>

  );
}
