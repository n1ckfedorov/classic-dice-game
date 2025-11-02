'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook for managing game sounds
 * Uses audio files from public folder
 */
export function useGameSounds() {
  const rollAudioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements
  useEffect(() => {
    if (typeof window !== 'undefined') {
      rollAudioRef.current = new Audio('assets/sounds/roll.mp3');
      rollAudioRef.current.loop = true;
      rollAudioRef.current.volume = 0.1;

      winAudioRef.current = new Audio('assets/sounds/win.mp3');
      winAudioRef.current.volume = 0.01;
    }

    return () => {
      // Cleanup on unmount
      if (rollAudioRef.current) {
        rollAudioRef.current.pause();
        rollAudioRef.current.currentTime = 0;
      }
      if (winAudioRef.current) {
        winAudioRef.current.pause();
        winAudioRef.current.currentTime = 0;
      }
    };
  }, []);

  /**
   * Play rolling sound (looping while rolling)
   */
  const playRollSound = () => {
    if (!rollAudioRef.current) {
      return;
    }

    try {
      rollAudioRef.current.currentTime = 0.1;
      rollAudioRef.current.play().catch((error) => {
        console.warn('Failed to play roll sound:', error);
      });
    } catch (error) {
      console.warn('Failed to play roll sound:', error);
    }
  };

  /**
   * Stop rolling sound
   */
  const stopRollSound = () => {
    if (rollAudioRef.current) {
      try {
        rollAudioRef.current.pause();
        rollAudioRef.current.currentTime = 0;
      } catch (error) {
        console.warn('Failed to stop roll sound:', error);
      }
    }
  };

  /**
   * Play win sound (single play)
   */
  const playWinSound = () => {
    if (!winAudioRef.current) {
      return;
    }

    try {
      winAudioRef.current.currentTime = 0.2;
      winAudioRef.current.play().catch((error) => {
        console.warn('Failed to play win sound:', error);
      });
    } catch (error) {
      console.warn('Failed to play win sound:', error);
    }
  };

  return {
    playRollSound,
    stopRollSound,
    playWinSound,
  };
}
