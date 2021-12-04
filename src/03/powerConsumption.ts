type PowerConsumptionType = "gamma" | "epsilon";
type Bit = 0 | 1;
type BinaryNumber = string;
type Decimal = number;
export type DiagnosticReport = BinaryNumber[];
type PowerConsumption = number;

export const calculateBitForIndex = (
  type: PowerConsumptionType,
  diagnosticReport: DiagnosticReport,
  index = 0
): Bit => {
  // pour l'index 1 on cherche les occurences de l'index 0
  const bits = getBitsForIndex(index === 1 ? 0 : index, diagnosticReport);
  const occurences = bits.reduce((occurences, currentBinaryNumber) => {
    occurences = {
      ...occurences,
      [currentBinaryNumber]: occurences[currentBinaryNumber] + 1 || 0,
    };
    return occurences;
  }, {} as Record<string, number>);

  //highest for gamme, lowest for epsilon
  const wantedOccurence =
    type === "gamma"
      ? getHighestOccurence(occurences)
      : getLowestOccurence(occurences);
  // le 2e bit est toujours l'"inverse" du premier
  return index === 1 ? (wantedOccurence === 1 ? 0 : 1) : wantedOccurence;
};

const getBitsForIndex = (
  index = 0,
  diagnosticReport: DiagnosticReport
): Bit[] => {
  return diagnosticReport.map((binaryNumber) =>
    Number(binaryNumber.slice(index, index + 1))
  ) as Bit[];
};

export const getHighestOccurence = (
  occurences: Record<string, number>
): Bit => {
  return Object.entries(occurences).reduce((highestOccurence, [key, value]) => {
    if (value > occurences[highestOccurence]) {
      highestOccurence = Number(key) as Bit;
    }
    return highestOccurence;
  }, 0 as Bit);
};
export const getLowestOccurence = (occurences: Record<string, number>): Bit => {
  return Object.entries(occurences).reduce((highestOccurence, [key, value]) => {
    if (value < occurences[highestOccurence]) {
      highestOccurence = Number(key) as Bit;
    }
    return highestOccurence;
  }, 0 as Bit);
};

export const calculateRate = (
  diagnosticReport: DiagnosticReport,
  type: PowerConsumptionType = "gamma"
): {
  binary: BinaryNumber;
  decimal: Decimal;
} => {
  let binary: BinaryNumber = "";

  for (let index = 0; index < diagnosticReport[0].length; index++) {
    const bit = calculateBitForIndex(type, diagnosticReport, index);
    binary = `${binary}${bit}`;
  }

  return {
    binary,
    decimal: binaryToDecimal(binary),
  };
};

export const binaryToDecimal = (binaryNumber: BinaryNumber): Decimal =>
  parseInt(binaryNumber, 2);

export const calculatePowerConsumption = (
  diagnosticReport: DiagnosticReport
): PowerConsumption => {
  const gammaRate = calculateRate(diagnosticReport, "gamma").decimal;
  const espilonRate = calculateRate(diagnosticReport, "epsilon").decimal;
  return gammaRate * espilonRate;
};
