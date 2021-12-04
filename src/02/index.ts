import { inputs } from "./inputs";
import { calculateFinalAnswer } from "./positionCalculator";

const part1Res = calculateFinalAnswer(inputs);
const part2Res = calculateFinalAnswer(inputs, true);
console.log("👽CLG - part2Res", part2Res);
