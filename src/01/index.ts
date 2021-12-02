import { MeasureCounter } from "./MeasureCounter";
import { measurementInputs } from "./measurement-inputs";

const higherMeasurementsExercice1 = new MeasureCounter(
  measurementInputs
).getLargerMeasurements();

const higherMeasurementsExercice2 = new MeasureCounter(
  measurementInputs,
  3
).getLargerMeasurements();

console.log({
  exercice1: higherMeasurementsExercice1,
  exercice2: higherMeasurementsExercice2,
});
