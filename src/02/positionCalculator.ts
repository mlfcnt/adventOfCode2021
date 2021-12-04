type Direction = "forward" | "up" | "down";
type RawPosition = string;
type HorizontalPosition = number;
type VerticalPosition = number;

type DirectionInput = {
  [K in Direction]?: number;
};

type Aim = number;

export const formatRawPosition = (rawPosition: RawPosition): DirectionInput => {
  const [direction, value] = rawPosition.split(" ") as [Direction, number];
  return {
    [direction]: Number(value),
  };
};

export const formatPositions = (
  rawPositions: RawPosition[]
): DirectionInput[] => {
  return rawPositions.map((x) => formatRawPosition(x));
};

export const calculateNewXPosition = (
  currentXPosition: HorizontalPosition = 0,
  directionInput: DirectionInput
): HorizontalPosition => {
  switch (Object.keys(directionInput)[0]) {
    case "forward": {
      return currentXPosition + Object.values(directionInput)[0];
    }
    default:
      return currentXPosition;
  }
};

export const calculateNewYPosition = (
  currentYPosition: VerticalPosition = 0,
  directionInput: DirectionInput,
  handleAim = false,
  updateAim?: (aim: Aim) => void,
  currentAim?: Aim
): VerticalPosition => {
  const distance = Object.values(directionInput)[0];
  const direction = Object.keys(directionInput)[0];
  switch (direction) {
    case "up": {
      handleAim && updateAim && updateAim((currentAim || 0) - distance);
      return handleAim ? currentYPosition : currentYPosition - distance;
    }
    case "down": {
      handleAim && updateAim && updateAim((currentAim || 0) + distance);
      return handleAim ? currentYPosition : currentYPosition + distance;
    }
    case "forward": {
      return handleAim
        ? (currentYPosition += (currentAim || 0) * distance)
        : currentYPosition;
    }
    default:
      return currentYPosition;
  }
};

export const calculateFinalYPosition = (
  rawPositions: RawPosition[],
  handleAim = false
): VerticalPosition => {
  const formattedPositions = formatPositions(rawPositions);
  let currentPosition = 0;
  let currentAim = 0;
  const updateAim = (aim: Aim) => {
    currentAim = aim;
  };
  const finalYPosition = formattedPositions.reduce(
    (finalYPosition, position) => {
      const newPosition = calculateNewYPosition(
        currentPosition,
        position,
        handleAim,
        updateAim,
        currentAim
      );
      finalYPosition = newPosition;
      currentPosition = newPosition;
      return finalYPosition;
    },
    0
  );

  return finalYPosition;
};

export const calculateFinalXPosition = (
  rawPositions: RawPosition[]
): HorizontalPosition => {
  const formattedPositions = formatPositions(rawPositions);
  let currentPosition = 0;
  const finalXPosition = formattedPositions.reduce(
    (finalXPosition, position) => {
      const newPosition = calculateNewXPosition(currentPosition, position);
      finalXPosition = newPosition;
      currentPosition = newPosition;
      return finalXPosition;
    },
    0
  );

  return finalXPosition;
};

export const calculateFinalAnswer = (
  rawPositions: RawPosition[],
  handleAim = false
): number => {
  const finalYPosition = calculateFinalYPosition(rawPositions, handleAim);
  const finalXPosition = calculateFinalXPosition(rawPositions);
  return finalYPosition * finalXPosition;
};
