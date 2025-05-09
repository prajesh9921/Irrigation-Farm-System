import { IrrigationCycle, IrrigationFormValues } from "@/types/irrigation";

// Convert military time string to minutes since midnight
export const timeToMinutes = (timeString: string): number => {
  const hours = parseInt(timeString.substring(0, 2));
  const minutes = parseInt(timeString.substring(2, 4));
  const seconds = parseInt(timeString.substring(4, 6));
  
  return hours * 60 + minutes + seconds / 60;
};

// Convert minutes since midnight to military time string (HHMMSS)
export const minutesToTime = (minutes: number): string => {
  const totalMinutes = Math.floor(minutes);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const secs = Math.floor((minutes - totalMinutes) * 60);
  
  return `${hours.toString().padStart(2, "0")}${mins.toString().padStart(2, "0")}${secs.toString().padStart(2, "0")}`;
};

// Generate full irrigation schedule based on input parameters
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
  
  // Create plot names (D1, D2, etc)
  const plotNames = Array.from({ length: numberOfPlots }, (_, i) => `D${i + 1}`);
  
  // Create motor names (M1, M2, etc)
  const motorNames = Array.from({ length: motorsInParallel }, (_, i) => `M${i + 1}`);
  
  let currentTime = startMinutes;
  let index = 0;
  let plotIndex = 0;

  // Keep scheduling until we reach the end time
  while (currentTime + motorRuntime <= endMinutes) {
    // Schedule for motors running in parallel
    const batchStartTime = currentTime;
    
    for (let m = 0; m < motorsInParallel; m++) {
      if (plotIndex >= numberOfPlots || batchStartTime + motorRuntime > endMinutes) break;
      
      const plotName = plotNames[plotIndex];
      const motorName = motorNames[m];
      
      schedule.push({
        index,
        plot: plotName,
        startTime: minutesToTime(batchStartTime),
        endTime: minutesToTime(batchStartTime + motorRuntime),
        runBy: motorName,
        status: "Pending"
      });
      
      // Move to next plot
      plotIndex++;
      index++;
    }
    
    // Advance time by irrigation interval AFTER all parallel motors have run
    currentTime = batchStartTime + irrigationInterval;
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
  
  // Group cycles by their status to maintain consistency
  let doneCount = 0;
  let inProgressIndex = -1;
  
  return schedule.map((cycle, idx) => {
    const startMinutes = timeToMinutes(cycle.startTime);
    const endMinutes = timeToMinutes(cycle.endTime);
    
    // Check if this cycle should be marked as "Done"
    if (doneCount > 0 && idx <= doneCount) {
      return { ...cycle, status: "Done" };
    }
    
    // Check if we already have an in-progress cycle
    if (inProgressIndex !== -1 && inProgressIndex !== idx) {
      return { ...cycle, status: "Pending" };
    }
    
    let status: "Done" | "In Progress" | "Pending";
    
    if (currentMinutes > endMinutes) {
      status = "Done";
      doneCount = idx;
    } else if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
      status = "In Progress";
      inProgressIndex = idx;
    } else {
      status = "Pending";
    }
    
    return { ...cycle, status };
  });
};
