type CubeLogicProps = {
  isRolling: boolean;
  currentRoll: number | null;
  lastResult: { data: { roll: number; is_win: boolean } } | undefined;
  animatedValue: number;
  targetPercent: number;
};

export function getCubeLogic({
  isRolling,
  currentRoll,
  lastResult,
  animatedValue,
  targetPercent,
}: CubeLogicProps) {
  const isWin = lastResult?.data.is_win ?? false;

  let cubeValue: number;

  switch (true) {
    case isRolling && currentRoll !== null:
      // While rolling but animation not yet started, use animated value
      cubeValue = animatedValue;
      break;
    case lastResult && !isRolling:
      // After roll and animation are complete, show last result
      cubeValue = lastResult.data.roll;
      break;
    default:
      // If no result exists, show animated value or keep at last known position
      // Don't follow slider (targetPercent)
      cubeValue = animatedValue || targetPercent;
      break;
  }

  return { cubeValue, isWin };
}
