
import { useState } from "react";
import { IrrigationCycle } from "@/types/irrigation";
import { generateSchedule } from "@/utils/scheduleGenerator";
import { toast } from "sonner";

interface UseIrrigationFormProps {
  setSchedule: React.Dispatch<React.SetStateAction<IrrigationCycle[]>>;
}

interface FormData {
  numberOfPlots: number;
  motorsInParallel: number;
  startTime: string;
  endTime: string;
  motorRuntime: number;
  irrigationInterval: number;
}

export const useIrrigationForm = ({ setSchedule }: UseIrrigationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    numberOfPlots: 0,
    motorsInParallel: 0,
    startTime: "",
    endTime: "",
    motorRuntime: 0,
    irrigationInterval: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "number" 
      ? parseInt(e.target.value) 
      : e.target.value;
      
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const validateForm = (): boolean => {
    if (formData.numberOfPlots < 1 || !formData.numberOfPlots) {
      toast.error("Number of plots must be at least 1");
      return false;
    }
      
    if (formData.motorsInParallel < 1 || !formData.motorsInParallel) {
      toast.error("Motors in parallel must be at least 1");
      return false;
    }
      
    if (parseInt(formData.startTime) >= parseInt(formData.endTime) || !formData.startTime || !formData.endTime) {
      toast.error("Start and end time required. End time must be after start time");
      return false;
    }
      
    if (formData.motorRuntime < 1 || !formData.motorRuntime) {
      toast.error("Motor runtime must be at least 1 minute");
      return false;
    }
      
    if (formData.irrigationInterval < formData.motorRuntime || !formData.irrigationInterval) {
      toast.error("Irrigation interval must be at least equal to motor runtime");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!validateForm()) {
        return;
      }

      // Generate and set schedule
      const generatedSchedule = generateSchedule(formData);
      console.log("Generated schedule:", generatedSchedule);
      setSchedule(generatedSchedule);
      toast.success("Schedule generated successfully!");
    } catch (error) {
      console.error("Error generating schedule:", error);
      toast.error("Error generating schedule. Please check your inputs.");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit
  };
};
