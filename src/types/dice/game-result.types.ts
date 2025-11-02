export type GameResult = {
  success: boolean;
  code: number;
  data: {
    direction: 'under' | 'over';
    target_percent: number;
    roll: number;
    is_win: boolean;
    multiplier: number;
    win: number;
    bet_amount: number;
    bet_id: string;
    balance: number;
    client_seed: string;
    server_seed: string;
    next_hashed_server_seed: string;
  };
};
