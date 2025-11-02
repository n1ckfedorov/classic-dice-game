import { useEffect, useRef, useState } from 'react';

type UseCubeAnimationProps = {
  currentRoll: number | null;
  isRolling: boolean;
  lastResult: { data: { roll: number } } | undefined;
  rollStartTime: number | null;
  targetPercent: number;
};

export function useCubeAnimation({
  currentRoll,
  isRolling,
  lastResult,
  rollStartTime,
  targetPercent,
}: UseCubeAnimationProps) {
  const animationRef = useRef<number | null>(null);
  const previousRollRef = useRef<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(targetPercent);

  // Initialize animatedValue from lastResult when it becomes available
  useEffect(() => {
    if (lastResult && !isRolling && !isAnimating) {
      // When roll completes and animation finishes, ensure animatedValue matches result
      // Use setTimeout to avoid synchronous state update in effect
      const timeoutId = setTimeout(() => {
        setAnimatedValue(lastResult.data.roll);
      }, 0);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return undefined;
  }, [lastResult, isRolling, isAnimating]);

  useEffect(() => {
    if (currentRoll !== null && isRolling && currentRoll !== previousRollRef.current) {
      previousRollRef.current = currentRoll;

      // Start animation from current cube position (last result or current animated value)
      const startValue = lastResult ? lastResult.data.roll : animatedValue;
      const endValue = currentRoll;

      // Start cube animation
      const timeoutId = setTimeout(() => {
        setIsAnimating(true);
      }, 0);

      // Calculate animation duration based on request time
      const minAnimationDuration = 500;
      let duration = minAnimationDuration;
      if (rollStartTime) {
        const requestDuration = Date.now() - rollStartTime;
        duration = Math.max(requestDuration, minAnimationDuration);
      }

      // Animation from current value to result
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const eased = 1 - (1 - progress) ** 3;
        const currentValue = startValue + (endValue - startValue) * eased;

        setAnimatedValue(currentValue);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Animation completed - ensure final value is set
          setAnimatedValue(endValue);
          setIsAnimating(false);
        }
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        clearTimeout(timeoutId);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        setIsAnimating(false);
      };
    }
    return undefined;
  }, [currentRoll, isRolling, lastResult, animatedValue, rollStartTime]);

  return { animatedValue, isAnimating };
}
