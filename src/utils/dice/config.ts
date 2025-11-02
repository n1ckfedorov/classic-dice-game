import type { GameConfig } from '@/types';

export function getGameConfig(): GameConfig {
  return {
    id: 'dice',
    game_link: 'https://domen.com/original-games/dice-by-original-games',
    status: 1,
    rtp: 98,
    max_bet: 1470.58,
    min_bet: 1.0e-5, // 0.00001
    max_win: 29411.6,
    title: 'Dice',
    description: '',
    updated_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
    created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
    custom_settings: {
      precision: 2,
      directions: ['under', 'over'],
      max_target: 98,
      min_target: 0.01,
    },
  };
}
