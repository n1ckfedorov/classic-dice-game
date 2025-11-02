export type BetDirection = 'under' | 'over';

export type Bet = {
  amount: number;
  direction: BetDirection;
  target_percent: number;
};
