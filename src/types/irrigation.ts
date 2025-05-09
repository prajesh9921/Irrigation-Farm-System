
export interface IrrigationCycle {
  index: number;
  plot: string;
  startTime: string;
  endTime: string;
  runBy: string;
  status: "Done" | "In Progress" | "Pending";
}

export interface IrrigationFormValues {
  numberOfPlots: number;
  motorsInParallel: number;
  startTime: string;
  endTime: string;
  motorRuntime: number;
  irrigationInterval: number;
}
