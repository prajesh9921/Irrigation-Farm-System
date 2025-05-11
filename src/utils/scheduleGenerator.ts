import { IrrigationCycle, IrrigationFormValues } from "@/types/irrigation";

// Convert military time to minute
export const timeToMinutes = (timeString: string): number => {
  const hours = parseInt(timeString.substring(0, 2));
  const minutes = parseInt(timeString.substring(2, 4));
  const seconds = parseInt(timeString.substring(4, 6));
  
  return hours * 60 + minutes + seconds / 60;
};

// Convert minutes to military time string (HHMMSS)
export const minutesToTime = (minutes: number): string => {
  const totalMinutes = Math.floor(minutes);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const secs = Math.floor((minutes - totalMinutes) * 60);
  
  return `${hours.toString().padStart(2, "0")}${mins.toString().padStart(2, "0")}${secs.toString().padStart(2, "0")}`;
};

export const generateSchedule = (params: IrrigationFormValues): IrrigationCycle[] => {
  const {
    numberOfPlots,
    motorsInParallel,
    startTime,
    endTime,
    motorRuntime,
    irrigationInterval
  } = params;

  const schedule: IrrigationCycle[] = [];

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  const plotNames = Array.from({ length: numberOfPlots }, (_, i) => `D${i + 1}`);
  const motorNames = Array.from({ length: motorsInParallel }, (_, i) => `M${i + 1}`);

  let currentTime = startMinutes;
  let index = 0;

  // Keep scheduling until we reach the end time
  while (currentTime + motorRuntime <= endMinutes) {
    const plotsRemaining = [...plotNames];

    // One full cycle
    while (plotsRemaining.length > 0 && currentTime + motorRuntime <= endMinutes) {
      // One batch means as many motors as possible
      const batchSize = Math.min(motorsInParallel, plotsRemaining.length);
      const batch = plotsRemaining.splice(0, batchSize);

      for (let i = 0; i < batch.length; i++) {
        schedule.push({
          index: index++,
          plot: batch[i],
          startTime: minutesToTime(currentTime),
          endTime: minutesToTime(currentTime + motorRuntime),
          runBy: motorNames[i],
          status: "Pending"
        });
      }

      currentTime += motorRuntime;
    }

    // After each full cycle wait for irrigation interval
    currentTime += irrigationInterval;
  }

  return updateScheduleStatus(schedule);
};

// Update the status of each irrigation cycle based on current time
export const updateScheduleStatus = (schedule: IrrigationCycle[]): IrrigationCycle[] => {
  const now = new Date();
  const currentTimeString = [
    now.getHours().toString().padStart(2, "0"),
    now.getMinutes().toString().padStart(2, "0"),
    now.getSeconds().toString().padStart(2, "0")
  ].join("");
  
  const currentMinutes = timeToMinutes(currentTimeString);
  
  return schedule.map(cycle => {
    const startMinutes = timeToMinutes(cycle.startTime);
    const endMinutes = timeToMinutes(cycle.endTime);
    
    let status: "Done" | "In Progress" | "Pending";
    
    if (currentMinutes > endMinutes) {
      status = "Done";
    } else if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
      status = "In Progress";
    } else {
      status = "Pending";
    }
    
    return { ...cycle, status };
  });
};
