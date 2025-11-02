import type { Bet, GameConfig, GameResult } from '@/types';

const API_BASE = '/api/dice';

export async function fetchGameConfig(): Promise<GameConfig> {
  const response = await fetch(`${API_BASE}/config`);
  if (!response.ok) {
    throw new Error('Failed to fetch game config');
  }
  const data = await response.json();
  return data.data;
}

export async function placeBet(bet: Bet): Promise<GameResult> {
  const response = await fetch(`${API_BASE}/bet`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bet),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to place bet');
  }

  return response.json();
}
