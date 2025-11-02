export type GameConfigCustomSettings = {
  precision: number;
  directions: ('under' | 'over')[];
  max_target: number;
  min_target: number;
};

export type GameConfig = {
  id: string;
  game_link: string;
  status: number;
  rtp: number;
  max_bet: number;
  min_bet: number;
  max_win: number;
  title: string;
  description: string;
  updated_at: string;
  created_at: string;
  custom_settings: GameConfigCustomSettings;
};
