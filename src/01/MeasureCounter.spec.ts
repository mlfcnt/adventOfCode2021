import { MeasureCounter } from "./MeasureCounter";

describe("MeasureCounter", () => {
  describe("getLargerMeasurements()", () => {
    it("Should return the number of measurements are larger than the previous one", () => {
      const measurements = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
      expect(new MeasureCounter(measurements).getLargerMeasurements()).toEqual(
        7
      );
    });
  });

  describe("getLargerMeasurements(3) (groupped by 3)", () => {
    it("Should return the number of measurements are larger than the previous one", () => {
      const measurements = [607, 618, 618, 617, 647, 716, 769, 792];
      expect(new MeasureCounter(measurements).getLargerMeasurements()).toEqual(
        5
      );
    });
  });
});
