import { GameBoard } from './components';

export default function DicePage() {
  return (
    <div className="flex size-full grow flex-col items-center justify-center bg-body-bg">
      <div className="mx-auto w-full max-w-[1232px] sm:px-4 sm:pb-5">
        <GameBoard />
      </div>
    </div>
  );
}
