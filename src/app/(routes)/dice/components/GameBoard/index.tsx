import { BetControls } from '../BetControls';
import { Game } from './Game';

export const GameBoard = () => {
  return (

    <div className="relative grid flex-grow grid-cols-1 rounded-lg bg-layer2  lg:grid-cols-[minmax(22.5rem,22.5rem)_auto] lg:pb-0">
      <BetControls />
      <Game />
    </div>
  );
};
