
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
    numberOfPlots: 4,
    motorsInParallel: 2,
    startTime: "060000",
    endTime: "190000",
    motorRuntime: 5,
    irrigationInterval: 20
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
    if (formData.numberOfPlots < 1) {
      toast.error("Number of plots must be at least 1");
      return false;
    }
      
    if (formData.motorsInParallel < 1) {
      toast.error("Motors in parallel must be at least 1");
      return false;
    }
      
    if (parseInt(formData.startTime) >= parseInt(formData.endTime)) {
      toast.error("End time must be after start time");
      return false;
    }
      
    if (formData.motorRuntime < 1) {
      toast.error("Motor runtime must be at least 1 minute");
      return false;
    }
      
    if (formData.irrigationInterval < formData.motorRuntime) {
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
