import type { NextRequest } from 'next/server';
import type { Bet, GameResult } from '@/types';
import { faker } from '@faker-js/faker';
import { NextResponse } from 'next/server';
import { calculateMultiplier, checkWin } from '@/utils/dice';
import { getGameConfig } from '@/utils/dice/config';
import { roundToPrecision } from '@/utils/dice/format';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, direction, target_percent }: Bet = body;

    // Get config for validation
    const gameConfig = getGameConfig();

    // Validation
    if (amount === undefined || !direction || target_percent === undefined) {
      return NextResponse.json(
        { success: false, code: 400, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    const isDemoMode = amount === 0;

    // Validation using config (skip for demo mode)
    if (!isDemoMode && (amount < gameConfig.min_bet || amount > gameConfig.max_bet)) {
      return NextResponse.json(
        { success: false, code: 400, message: `Invalid bet amount. Must be between ${gameConfig.min_bet} and ${gameConfig.max_bet}` },
        { status: 400 },
      );
    }

    const { min_target, max_target } = gameConfig.custom_settings;
    if (target_percent < min_target || target_percent > max_target) {
      return NextResponse.json(
        { success: false, code: 400, message: `Invalid target percent. Must be between ${min_target} and ${max_target}` },
        { status: 400 },
      );
    }

    // Check direction
    if (!gameConfig.custom_settings.directions.includes(direction)) {
      return NextResponse.json(
        { success: false, code: 400, message: `Invalid direction. Must be one of: ${gameConfig.custom_settings.directions.join(', ')}` },
        { status: 400 },
      );
    }

    // Generate random number from 1 to 100
    const roll = faker.number.float({ min: gameConfig.custom_settings.min_target, max: gameConfig.custom_settings.max_target, fractionDigits: 2 });

    // Apply precision first to ensure consistency between calculation and display
    const precision = gameConfig.custom_settings.precision;
    const roundedRoll = roundToPrecision(roll, precision);
    const roundedTargetPercent = roundToPrecision(target_percent, precision);

    // Calculate result using rounded values to match what user sees
    const isWin = checkWin(direction, roundedTargetPercent, roundedRoll);
    const multiplier = calculateMultiplier(direction, roundedTargetPercent, gameConfig.rtp);
    const winAmount = isWin ? amount * multiplier - amount : 0;

    // Apply max_win limit and precision
    const win = roundToPrecision(Math.min(winAmount, gameConfig.max_win), precision);

    // Seeds for transparency
    const clientSeed = faker.string.alphanumeric(32);
    const serverSeed = faker.string.alphanumeric(32);
    const nextHashedServerSeed = faker.string.alphanumeric(64);

    // Round multiplier considering precision
    const roundedMultiplier = roundToPrecision(multiplier, precision);

    const result: GameResult = {
      success: true,
      code: 200,
      data: {
        direction,
        target_percent: roundedTargetPercent,
        roll: roundedRoll,
        is_win: isWin,
        multiplier: roundedMultiplier,
        win,
        bet_amount: roundToPrecision(amount, precision),
        bet_id: faker.string.uuid(),
        balance: 0, // Will be updated on client
        client_seed: clientSeed,
        server_seed: serverSeed,
        next_hashed_server_seed: nextHashedServerSeed,
      },
    };

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { success: false, code: 500, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
