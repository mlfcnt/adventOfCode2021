type Measurement = number;

export class MeasureCounter {
  private readonly measurements;
  constructor(measurements: Measurement[], private readonly groupBy = 1) {
    if (!measurements?.length)
      throw new Error("Measurements should be specified");
    this.measurements = measurements;
  }

  getLargerMeasurements() {
    let higherMeasurements = 0;
    const grouppedMeasurements = this.groupMeasurements();

    for (let i = 0; i < grouppedMeasurements.length; i++) {
      if (grouppedMeasurements[i] < grouppedMeasurements[i + 1]) {
        higherMeasurements++;
      }
    }
    return higherMeasurements;
  }

  private groupMeasurements(): Measurement[] {
    if (this.groupBy === 1) return this.measurements;
    let groupOfMeasurements = [];
    const measurements = this.measurements;
    for (let i = 0; i < measurements.length; i++) {
      if (this.groupBy > 1 && i >= measurements.length - (this.groupBy - 1))
        break;
      groupOfMeasurements.push(
        (isNaN(measurements[i - 1]) ? 0 : measurements[i - 1]) +
          measurements[i] +
          measurements[i + 1]
      );
    }
    return groupOfMeasurements;
  }
}
