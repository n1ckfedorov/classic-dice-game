'use client';

import { useEffect, useRef, useState } from 'react';
import { useDiceGame } from '@/hooks/useDiceGame';
import { useGameSounds } from '@/hooks/useGameSounds';
import { formatPayout, formatWithPrecision } from '@/utils/dice';
import { GameHistory } from '../GameHistory';
import { Cube } from './Cube';
import { GameInfo } from './GameInfo';
import { useGameHandlers } from './handlers';
import { useCubeAnimation, useGameInputs } from './hooks';
import { SliderSection } from './SliderSection';
import { getCubeLogic } from './utils/cube-logic';

export function Game() {
  const {
    currentRoll,
    isRolling,
    gameResults,
    targetPercent,
    direction,
    rollStartTime,
    gameConfig,
    setTargetPercent,
    setDirection,
  } = useDiceGame();

  const precision = gameConfig?.custom_settings.precision ?? 2;
  const lastResult = gameResults[gameResults.length - 1];

  // Sound management
  const { playRollSound, stopRollSound, playWinSound } = useGameSounds();
  const previousRollingRef = useRef(false);
  const previousWinBetIdRef = useRef<string | undefined>(undefined);

  // Cube animation
  const { animatedValue } = useCubeAnimation({
    currentRoll,
    isRolling,
    lastResult,
    rollStartTime,
    targetPercent,
  });

  // Cube logic
  const { cubeValue, isWin } = getCubeLogic({
    isRolling,
    currentRoll,
    lastResult,
    animatedValue,
    targetPercent,
  });

  // Input logic
  const {
    payoutInput,
    winChanceInput,
    setPayoutInput,
    setWinChanceInput,
    multiplier,
    winChance,
  } = useGameInputs({
    direction,
    targetPercent,
    precision,
    isRolling,
    gameConfig,
  });

  // Slider logic
  const [sliderValue, setSliderValue] = useState(targetPercent);

  // Synchronize sliderValue with targetPercent (only when not rolling)
  useEffect(() => {
    if (!isRolling && currentRoll === null) {
      // Use setTimeout to avoid conflicts with state updates
      const timeoutId = setTimeout(() => {
        setSliderValue(targetPercent);
      }, 0);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return undefined;
  }, [targetPercent, direction, isRolling, currentRoll]);

  // Handle rolling sound
  useEffect(() => {
    if (isRolling && !previousRollingRef.current) {
      // Started rolling - play sound
      playRollSound();
      previousRollingRef.current = true;
    } else if (!isRolling && previousRollingRef.current) {
      // Stopped rolling - stop sound
      stopRollSound();
      previousRollingRef.current = false;
    }
  }, [isRolling, playRollSound, stopRollSound]);

  // Handle win sound (only when roll is complete and result is win)
  useEffect(() => {
    if (
      !isRolling
      && lastResult?.data.is_win
      && lastResult?.data.bet_id !== previousWinBetIdRef.current
    ) {
      // New win after roll completion - play win sound
      playWinSound();
      previousWinBetIdRef.current = lastResult.data.bet_id;
    }
  }, [lastResult, isRolling, playWinSound]);

  // Event handlers
  const { handleDirectionToggle, handlePayoutChange, handleWinChanceChange, handleSliderChange } = useGameHandlers({
    targetPercent,
    direction,
    isRolling,
    currentRoll,
    precision,
    gameConfig,
    setTargetPercent,
    setDirection,
    setAnimatedValue: () => {
      // animatedValue is managed in useCubeAnimation
    },
    setSliderValue,
    setPayoutInput,
    setWinChanceInput,
  });

  return (

    <div className="hide-scrollbar order-1 col-span-full  flex flex-col overflow-x-scroll rounded-t-xl bg-layer3 lg:order-2 lg:col-span-1 lg:h-full lg:rounded-tl-none lg:rounded-tr-xl lg:pt-2 xl:relative ">
      <GameHistory />
      <div className="mt-12 lg:mt-20">
        {/* Main Game Area */}
        <div className=" w-full flex-1 grow flex-col items-center justify-center overflow-hidden rounded-lg p-2">
          {/* Gradient Slider with Cube */}
          <div className="relative">

            <Cube
              value={cubeValue}
              isWin={isWin}
              precision={precision}
              winKey={lastResult?.data.bet_id}
              minTarget={gameConfig?.custom_settings.min_target}
              maxTarget={gameConfig?.custom_settings.max_target}
              animatedValue={animatedValue}
            />

            <SliderSection
              value={sliderValue}
              direction={direction}
              disabled={isRolling}
              gameConfig={gameConfig}
              onValueChangeAction={handleSliderChange}
            />
          </div>

          <GameInfo
            targetPercent={targetPercent}
            direction={direction}
            precision={precision}
            payoutInput={payoutInput}
            winChanceInput={winChanceInput}
            isRolling={isRolling}
            gameConfig={gameConfig}
            onDirectionToggleAction={handleDirectionToggle}
            onPayoutChangeAction={handlePayoutChange}
            onWinChanceChangeAction={handleWinChanceChange}
            onPayoutBlurAction={() => {
              setPayoutInput(formatPayout(multiplier));
            }}
            onWinChanceBlurAction={() => {
              setWinChanceInput(formatWithPrecision(winChance, precision));
            }}
          />
        </div>
      </div>
    </div>
  );
}
