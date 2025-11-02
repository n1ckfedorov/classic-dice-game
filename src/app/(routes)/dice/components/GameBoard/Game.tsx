'use client';

import confetti from 'canvas-confetti';
import { useEffect, useRef, useState } from 'react';
import { useDiceGame } from '@/hooks/useDiceGame';
import { useGameSounds } from '@/hooks/useGameSounds';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useDiceStore } from '@/store/dice';
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
  const isSoundMuted = useDiceStore(state => state.isSoundMuted);
  const { playRollSound, stopRollSound, playWinSound, playSliderSound, stopSliderSound } = useGameSounds({ isSoundMuted });
  const previousRollingRef = useRef(false);
  const previousWinBetIdRef = useRef<string | undefined>(undefined);
  const isMountedRef = useRef(false);

  const isDesktop = useMediaQuery({ minWidth: 1024 });

  // Initialize previousWinBetIdRef on mount to prevent confetti on page reload
  useEffect(() => {
    if (!isMountedRef.current && lastResult?.data.bet_id) {
      previousWinBetIdRef.current = lastResult.data.bet_id;
      isMountedRef.current = true;
    }
  }, [lastResult?.data.bet_id]);

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
      playRollSound();
      previousRollingRef.current = true;
    } else if (!isRolling && previousRollingRef.current) {
      stopRollSound();
      previousRollingRef.current = false;
    }
  }, [isRolling, playRollSound, stopRollSound]);

  useEffect(() => {
    if (
      !isRolling
      && lastResult?.data.is_win
      && lastResult?.data.bet_id !== previousWinBetIdRef.current
    ) {
      playWinSound();
      previousWinBetIdRef.current = lastResult.data.bet_id;

      // Show confetti on win (desktop only)
      if (isDesktop) {
        const end = Date.now() + 1 * 300; // 300ms
        const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];
        const frame = () => {
          if (Date.now() > end) {
            return;
          }
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors,
            gravity: 0.05,
            zIndex: 0,
          });
          requestAnimationFrame(frame);
        };
        frame();
      }
    }
  }, [lastResult, isRolling, playWinSound, isDesktop]);

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
    },
    setSliderValue,
    setPayoutInput,
    setWinChanceInput,
    playSliderSound,
    stopSliderSound,
  });

  return (

    <div className="hide-scrollbar order-1 col-span-full  flex flex-col overflow-x-scroll rounded-t-xl bg-layer3 lg:order-2 lg:col-span-1 lg:h-full lg:rounded-tl-none lg:rounded-tr-xl lg:pt-2 xl:relative ">
      <GameHistory />
      <div className="mt-12 lg:mt-20">
        <div className=" w-full flex-1 grow flex-col items-center justify-center overflow-hidden rounded-lg p-2">
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
