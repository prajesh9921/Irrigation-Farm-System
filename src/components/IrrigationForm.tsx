
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
      const schedule = generateSchedule(formData);
      setSchedule(schedule);
      toast.success("Schedule generated successfully!");
    } catch (error) {
      toast.error("Error generating schedule. Please check your inputs.");
      console.error(error);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Irrigation Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="numberOfPlots">Number of Plots</Label>
            <Input
              id="numberOfPlots"
              name="numberOfPlots"
              type="number"
              value={formData.numberOfPlots}
              onChange={handleChange}
              min="1"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="motorsInParallel">Motors in Parallel</Label>
            <Input
              id="motorsInParallel"
              name="motorsInParallel"
              type="number"
              value={formData.motorsInParallel}
              onChange={handleChange}
              min="1"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time (HHMMSS)</Label>
              <Input
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                placeholder="060000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time (HHMMSS)</Label>
              <Input
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                placeholder="190000"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="motorRuntime">Motor Runtime (minutes)</Label>
            <Input
              id="motorRuntime"
              name="motorRuntime"
              type="number"
              value={formData.motorRuntime}
              onChange={handleChange}
              min="1"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="irrigationInterval">Irrigation Interval (minutes)</Label>
            <Input
              id="irrigationInterval"
              name="irrigationInterval"
              type="number"
              value={formData.irrigationInterval}
              onChange={handleChange}
              min="1"
            />
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Generate Schedule
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default IrrigationForm;
