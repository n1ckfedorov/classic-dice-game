import type { GameResult } from '@/types';
import { cn } from '@/lib/utils';

type GameCellProps = {
  gameResult: GameResult;
  onClick: () => void;
  setSelectedGameResult: (gameResult: GameResult) => void;
};

export const GameCell = ({ gameResult, onClick, setSelectedGameResult }: GameCellProps) => {
  const { roll, is_win } = gameResult.data;

  const handleClick = () => {
    setSelectedGameResult(gameResult);
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'flex h-8 w-16 cursor-pointer items-center justify-center rounded-lg text-center font-extrabold leading-10 transition-all duration-200 md:h-10 md:w-20 shrink-0 text-sm hover:brightness-110',
        is_win
          ? 'bg-brand-secondary text-white shadow-[0_2px_8px_rgba(26,169,100,0.5)]'
          : 'bg-[#4A5354] text-primary hover:bg-[#5A6566] hover:shadow-[0_2px_6px_rgba(0,0,0,0.2)]',
      )}
    >
      {roll.toFixed(2)}
    </button>
  );
};
