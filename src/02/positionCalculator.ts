type Direction = "forward" | "up" | "down";
type RawPosition = string;
type HorizontalPosition = number;
type VerticalPosition = number;

type DirectionInput = {
  [K in Direction]?: number;
};

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
  currentXPosition: HorizontalPosition,
  directionInput: DirectionInput
): HorizontalPosition => {
  switch (Object.keys(directionInput)[0]) {
    case "forward":
      return currentXPosition + Object.values(directionInput)[0];
    default:
      return currentXPosition;
  }
};

export const calculateNewYPosition = (
  currentYPosition: VerticalPosition,
  directionInput: DirectionInput
): VerticalPosition => {
  switch (Object.keys(directionInput)[0]) {
    case "up":
      return currentYPosition - Object.values(directionInput)[0];
    case "down":
      return currentYPosition + Object.values(directionInput)[0];
    default:
      return currentYPosition;
  }
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
export const calculateFinalYPosition = (
  rawPositions: RawPosition[]
): VerticalPosition => {
  const formattedPositions = formatPositions(rawPositions);
  let currentPosition = 0;
  const finalYPosition = formattedPositions.reduce(
    (finalYPosition, position) => {
      const newPosition = calculateNewYPosition(currentPosition, position);
      finalYPosition = newPosition;
      currentPosition = newPosition;
      return finalYPosition;
    },
    0
  );

  return finalYPosition;
};

export const calculateFinalAnswer = (rawPositions: RawPosition[]): number => {
  const finalYPosition = calculateFinalYPosition(rawPositions);
  const finalXPosition = calculateFinalXPosition(rawPositions);
  return finalYPosition * finalXPosition;
};
