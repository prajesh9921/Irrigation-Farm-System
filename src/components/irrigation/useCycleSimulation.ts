
import { useState, useEffect } from "react";
import { IrrigationCycle } from "@/types/irrigation";

const useCycleSimulation = (schedule: IrrigationCycle[]) => {
  const [liveSchedule, setLiveSchedule] = useState<IrrigationCycle[]>([]);
  const [lastCompletedIndex, setLastCompletedIndex] = useState(-1);
  const [processingIndex, setProcessingIndex] = useState(-1);

  // Initialize when schedule changes
  useEffect(() => {
    if (schedule.length) {
      console.log("Schedule updated:", schedule);
      const initialLiveSchedule = [...schedule];
      
      // Reset tracking variables when new schedule is set
      setLastCompletedIndex(-1);
      setProcessingIndex(-1);
      
      setLiveSchedule(initialLiveSchedule);
    }
  }, [schedule]);

  // Real-time status updates
  useEffect(() => {
    if (!schedule.length) return;
    
    const intervalId = setInterval(() => {
      setLiveSchedule(prev => {
        // Find the current in progress cycle if any
        const inProgressIndex = prev.findIndex(cycle => cycle.status === "In Progress");
        
        // If no cycle is in progress start the next pending one
        if (inProgressIndex === -1) {
          const nextPendingIndex = prev.findIndex(
            (cycle, idx) => cycle.status === "Pending" && idx > lastCompletedIndex
          );
          
          if (nextPendingIndex !== -1) {
            const updated = [...prev];
            updated[nextPendingIndex].status = "In Progress";
            setProcessingIndex(nextPendingIndex);
            return updated;
          }
          return prev;
        } 
        
        // Check if current in progress cycle should be marked as done
        if (inProgressIndex !== -1 && processingIndex === inProgressIndex) {
          if (processingIndex !== -1 && Math.random() > 0.7) {
            const updated = [...prev];
            updated[inProgressIndex].status = "Done";
            setLastCompletedIndex(inProgressIndex);
            setProcessingIndex(-1);
            return updated;
          }
        }
        
        return prev;
      });
    }, 2000); // Update every 2 seconds
    
    return () => clearInterval(intervalId);
  }, [schedule, lastCompletedIndex, processingIndex]);

  return liveSchedule;
};

export default useCycleSimulation;
