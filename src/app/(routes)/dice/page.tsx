'use client';

import { useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { useDiceStore } from '@/store/dice';
import { GameBoard } from './components';
import { GameActions } from './components/GameBoard/GameActions';

export default function DicePage() {
  const { isMovieMode, setIsMovieMode } = useDiceStore();
  const isMobile = useMediaQuery({ maxWidth: 1023 }); // lg breakpoint

  // Disable movie mode on mobile
  useEffect(() => {
    if (isMobile && isMovieMode) {
      setIsMovieMode(false);
    }
  }, [isMobile, isMovieMode, setIsMovieMode]);

  return (
    <div className="flex size-full grow flex-col items-center justify-center bg-body-bg">
      <div className={cn('mx-auto max-w-[1232px] w-full sm:px-4 z-2', isMovieMode && !isMobile && 'max-w-none h-dvh flex flex-col')}>
        <GameBoard />
        <GameActions />
      </div>
    </div>
  );
}
