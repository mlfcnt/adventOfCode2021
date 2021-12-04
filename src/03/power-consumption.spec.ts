import { fakeDiagnosticReport1, fakeDiagnosticReport2 } from "./fakes";
import {
  binaryToDecimal,
  calculateBitForIndex,
  calculatePowerConsumption,
  calculateRate,
} from "./powerConsumption";

describe("calculate gamma rate", () => {
  it("should calculate the first bit", () => {
    expect(calculateBitForIndex("gamma", fakeDiagnosticReport1)).toEqual(1);
    expect(calculateBitForIndex("gamma", fakeDiagnosticReport2)).toEqual(0);
  });

  it("should calculate the second bit", () => {
    expect(calculateBitForIndex("gamma", fakeDiagnosticReport1, 1)).toEqual(0);
    expect(calculateBitForIndex("gamma", fakeDiagnosticReport2, 1)).toEqual(1);
  });

  it("should calculate the 3rd, 4th and 5th bits", () => {
    expect(calculateBitForIndex("gamma", fakeDiagnosticReport1, 2)).toEqual(1);
    expect(calculateBitForIndex("gamma", fakeDiagnosticReport1, 3)).toEqual(1);
    expect(calculateBitForIndex("gamma", fakeDiagnosticReport1, 4)).toEqual(0);
  });

  it("should calculate full gamma rate", () => {
    expect(calculateRate(fakeDiagnosticReport1).binary).toBe("10110");
    expect(calculateRate(fakeDiagnosticReport1).decimal).toBe(22);
  });
});

describe("calculate espilon rate", () => {
  it("should calculate the first bit", () => {
    expect(calculateBitForIndex("epsilon", fakeDiagnosticReport1)).toEqual(0);
    expect(calculateBitForIndex("epsilon", fakeDiagnosticReport2)).toEqual(1);
  });

  it("should calculate the second bit", () => {
    expect(calculateBitForIndex("epsilon", fakeDiagnosticReport1, 1)).toEqual(
      1
    );
    expect(calculateBitForIndex("epsilon", fakeDiagnosticReport2, 1)).toEqual(
      0
    );
  });

  it("should calculate the 3rd, 4th and 5th bits", () => {
    expect(calculateBitForIndex("epsilon", fakeDiagnosticReport1, 2)).toEqual(
      0
    );
    expect(calculateBitForIndex("epsilon", fakeDiagnosticReport1, 3)).toEqual(
      0
    );
    expect(calculateBitForIndex("epsilon", fakeDiagnosticReport1, 4)).toEqual(
      1
    );
  });

  it("should calculate full epsilon rate", () => {
    expect(calculateRate(fakeDiagnosticReport1, "epsilon").binary).toBe(
      "01001"
    );
    expect(calculateRate(fakeDiagnosticReport1, "epsilon").decimal).toBe(9);
  });
});

describe("binary to decimal", () => {
  test("binaryToDecimal", () => {
    expect(binaryToDecimal("10110")).toEqual(22);
    expect(binaryToDecimal("11111")).toEqual(31);
    expect(binaryToDecimal("00000")).toEqual(0);
    expect(binaryToDecimal("110011101111")).toEqual(3311);
    expect(binaryToDecimal("011110010111")).toEqual(1943);
    expect(binaryToDecimal("101010111001")).toEqual(2745);
  });
});

describe("calculate power consumption", () => {
  test("total power consumption", () => {
    expect(calculatePowerConsumption(fakeDiagnosticReport1)).toEqual(198);
  });
});
