'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useDiceGame } from '@/hooks/useDiceGame';
import { GameCell } from './GameCell';

export function GameHistory() {
  const { gameResults } = useDiceGame();

  // Show last 50 games
  const recentResults = gameResults.slice(-50).reverse();

  return (
    <div className="z-10 my-2 md:pr-4 xl:mt-1 xl:mb-3 xl:block xl:pl-6">
      <div
        style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%)' }}
        className="relative h-8 w-full flex-row-reverse overflow-hidden md:h-10"
      >
        <div className="flex flex-row-reverse gap-2 overflow-x-visible pr-4 pl-6">
          <AnimatePresence initial={false} mode="popLayout">
            {recentResults.length > 0
              ? (
                  recentResults.map(({ data }) => (
                    <motion.div
                      key={data.bet_id}
                      layout
                      initial={{ opacity: 0, scale: 0.5, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.5, x: -20 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                        opacity: { duration: 0.2 },
                        layout: { duration: 0.3 },
                      }}
                      style={{ originX: 0.5, originY: 0.5 }}
                    >
                      <GameCell roll={data.roll} is_win={data.is_win} />
                    </motion.div>
                  ))
                )
              : (
                  <div className="flex w-full items-center justify-center text-center text-sm text-muted-foreground">
                    No games yet
                  </div>
                )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
