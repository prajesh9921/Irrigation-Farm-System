
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { generateSchedule } from "@/utils/scheduleGenerator";
import { IrrigationCycle } from "@/types/irrigation";
import { toast } from "sonner";

interface IrrigationFormProps {
  setSchedule: React.Dispatch<React.SetStateAction<IrrigationCycle[]>>;
}

const IrrigationForm = ({ setSchedule }: IrrigationFormProps) => {
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate inputs
      if (formData.numberOfPlots < 1) {
        toast.error("Number of plots must be at least 1");
        return;
      }
      
      if (formData.motorsInParallel < 1) {
        toast.error("Motors in parallel must be at least 1");
        return;
      }
      
      if (parseInt(formData.startTime) >= parseInt(formData.endTime)) {
        toast.error("End time must be after start time");
        return;
      }
      
      if (formData.motorRuntime < 1) {
        toast.error("Motor runtime must be at least 1 minute");
        return;
      }
      
      if (formData.irrigationInterval < formData.motorRuntime) {
        toast.error("Irrigation interval must be at least equal to motor runtime");
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

  return (
    <Card className="shadow-md bg-white rounded-xl">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-xl text-gray-700">Irrigation Configuration</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="numberOfPlots" className="text-gray-600">Number of Plots</Label>
            <Input
              id="numberOfPlots"
              name="numberOfPlots"
              type="number"
              value={formData.numberOfPlots}
              onChange={handleChange}
              min="1"
              className="border-gray-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="motorsInParallel" className="text-gray-600">Motors in Parallel</Label>
            <Input
              id="motorsInParallel"
              name="motorsInParallel"
              type="number"
              value={formData.motorsInParallel}
              onChange={handleChange}
              min="1"
              className="border-gray-200"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-gray-600">Start Time (HHMMSS)</Label>
              <Input
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                placeholder="060000"
                className="border-gray-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-gray-600">End Time (HHMMSS)</Label>
              <Input
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                placeholder="190000"
                className="border-gray-200"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="motorRuntime" className="text-gray-600">Motor Runtime (minutes)</Label>
            <Input
              id="motorRuntime"
              name="motorRuntime"
              type="number"
              value={formData.motorRuntime}
              onChange={handleChange}
              min="1"
              className="border-gray-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="irrigationInterval" className="text-gray-600">Irrigation Interval (minutes)</Label>
            <Input
              id="irrigationInterval"
              name="irrigationInterval"
              type="number"
              value={formData.irrigationInterval}
              onChange={handleChange}
              min="1"
              className="border-gray-200"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white"
          >
            Generate Schedule
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default IrrigationForm;
