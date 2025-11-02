'use client';

import { useEffect, useRef } from 'react';

type UseGameSoundsProps = {
  isSoundMuted?: boolean;
};

/**
 * Hook for managing game sounds
 * Uses audio files from public folder
 */
export function useGameSounds({ isSoundMuted = false }: UseGameSoundsProps = {}) {
  const rollAudioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);
  const sliderAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastSliderSoundTimeRef = useRef<number>(0);

  // Initialize audio elements
  useEffect(() => {
    if (typeof window !== 'undefined') {
      rollAudioRef.current = new Audio('assets/sounds/roll.mp3');
      rollAudioRef.current.loop = true;
      rollAudioRef.current.volume = 0.1;

      winAudioRef.current = new Audio('assets/sounds/win.mp3');
      winAudioRef.current.volume = 0.15;

      sliderAudioRef.current = new Audio('assets/sounds/roll.mp3');
      sliderAudioRef.current.loop = false;
      sliderAudioRef.current.volume = 0.1;
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
      if (sliderAudioRef.current) {
        sliderAudioRef.current.pause();
        sliderAudioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Stop all sounds when muted
  useEffect(() => {
    if (isSoundMuted) {
      if (rollAudioRef.current) {
        rollAudioRef.current.pause();
        rollAudioRef.current.currentTime = 0;
      }
      if (sliderAudioRef.current) {
        sliderAudioRef.current.pause();
        sliderAudioRef.current.currentTime = 0;
      }
      if (winAudioRef.current) {
        winAudioRef.current.pause();
        winAudioRef.current.currentTime = 0;
      }
    }
  }, [isSoundMuted]);

  /**
   * Play rolling sound (looping while rolling)
   */
  const playRollSound = () => {
    if (isSoundMuted || !rollAudioRef.current) {
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
    if (isSoundMuted || !winAudioRef.current) {
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

  /**
   * Play slider sound (single play, no loop)
   * Throttled to prevent sound overlapping when slider moves quickly
   */
  const playSliderSound = () => {
    if (isSoundMuted || !sliderAudioRef.current) {
      return;
    }

    const now = Date.now();
    const throttleDelay = 100;

    // Throttle: only play if enough time has passed since last sound
    if (now - lastSliderSoundTimeRef.current < throttleDelay) {
      return;
    }

    lastSliderSoundTimeRef.current = now;

    try {
      const audio = sliderAudioRef.current;

      // Completely stop and reset audio
      audio.pause();
      audio.currentTime = 0;

      // Load audio again to ensure clean state
      audio.load();

      // Set volume and play
      audio.volume = 0.1;
      audio.currentTime = 0.5;
      audio.play().catch((error) => {
        console.warn('Failed to play slider sound:', error);
      });
    } catch (error) {
      console.warn('Failed to play slider sound:', error);
    }
  };

  /**
   * Stop slider sound immediately
   */
  const stopSliderSound = () => {
    if (sliderAudioRef.current) {
      try {
        sliderAudioRef.current.pause();
        sliderAudioRef.current.currentTime = 0;
      } catch (error) {
        console.warn('Failed to stop slider sound:', error);
      }
    }
  };

  return {
    playRollSound,
    stopRollSound,
    playWinSound,
    playSliderSound,
    stopSliderSound,
  };
}
