import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { IrrigationCycle } from "@/types/irrigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckIcon, FilterIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { updateScheduleStatus } from "@/utils/scheduleGenerator";

interface IrrigationScheduleProps {
  schedule: IrrigationCycle[];
}

const IrrigationSchedule = ({ schedule }: IrrigationScheduleProps) => {
  const [filteredSchedule, setFilteredSchedule] = useState<IrrigationCycle[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState({
    done: true,
    inProgress: true,
    pending: true
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [plots, setPlots] = useState<string[]>([]);
  const [liveSchedule, setLiveSchedule] = useState<IrrigationCycle[]>([]);

  // Update plots list when schedule changes
  useEffect(() => {
    if (schedule.length) {
      const uniquePlots = Array.from(new Set(schedule.map((item) => item.plot)));
      setPlots(uniquePlots);
    }
    
    // Initialize with fresh schedule
    const initialLiveSchedule = [...schedule];
    setLiveSchedule(updateScheduleStatus(initialLiveSchedule));
  }, [schedule]);

  // Real-time status updates
  useEffect(() => {
    if (!schedule.length) return;
    
    const intervalId = setInterval(() => {
      setLiveSchedule((prevSchedule) => updateScheduleStatus(prevSchedule));
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(intervalId);
  }, [schedule]);

  // Apply filters
  useEffect(() => {
    let result = [...liveSchedule];
    
    // Filter by plot
    if (selectedPlot) {
      result = result.filter((item) => item.plot === selectedPlot);
    }
    
    // Filter by status
    result = result.filter((item) => {
      if (item.status === "Done" && statusFilter.done) return true;
      if (item.status === "In Progress" && statusFilter.inProgress) return true;
      if (item.status === "Pending" && statusFilter.pending) return true;
      return false;
    });
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.plot.toLowerCase().includes(term) ||
          item.runBy.toLowerCase().includes(term) ||
          item.status.toLowerCase().includes(term)
      );
    }
    
    setFilteredSchedule(result);
  }, [liveSchedule, selectedPlot, statusFilter, searchTerm]);

  // Handle status filter change
  const handleStatusFilterChange = (status: keyof typeof statusFilter) => {
    setStatusFilter({
      ...statusFilter,
      [status]: !statusFilter[status]
    });
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedPlot("");
    setStatusFilter({
      done: true,
      inProgress: true,
      pending: true
    });
    setSearchTerm("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Done":
        return <Badge className="bg-green-500">Done</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "Pending":
        return <Badge className="bg-amber-500">Pending</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  // Format time from HHMMSS to HH:MM:SS
  const formatTime = (time: string): string => {
    if (!time || time.length !== 6) return time;
    const hours = time.substring(0, 2);
    const minutes = time.substring(2, 4);
    const seconds = time.substring(4, 6);
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <CardTitle className="text-xl">Irrigation Schedule</CardTitle>
          <div className="text-sm text-gray-500 mt-2 md:mt-0">
            {filteredSchedule.length} of {liveSchedule.length} cycles
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {liveSchedule.length > 0 ? (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Select
                  value={selectedPlot}
                  onValueChange={(value) => setSelectedPlot(value)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Plot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Plots</SelectItem>
                    {plots.map((plot) => (
                      <SelectItem key={plot} value={plot}>
                        {plot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={resetFilters}
                >
                  <FilterIcon className="h-4 w-4" /> Reset
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="done"
                  checked={statusFilter.done}
                  onCheckedChange={() => handleStatusFilterChange("done")}
                />
                <Label htmlFor="done" className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  Done
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inProgress"
                  checked={statusFilter.inProgress}
                  onCheckedChange={() => handleStatusFilterChange("inProgress")}
                />
                <Label htmlFor="inProgress" className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  In Progress
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pending"
                  checked={statusFilter.pending}
                  onCheckedChange={() => handleStatusFilterChange("pending")}
                />
                <Label htmlFor="pending" className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                  Pending
                </Label>
              </div>
            </div>
            
            <div className="relative overflow-x-auto rounded-md border">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Plot</th>
                    <th scope="col" className="px-6 py-3">Start Time</th>
                    <th scope="col" className="px-6 py-3">End Time</th>
                    <th scope="col" className="px-6 py-3">Motor</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchedule.map((cycle) => (
                    <tr key={cycle.index} className="bg-white border-b">
                      <td className="px-6 py-4">{cycle.index + 1}</td>
                      <td className="px-6 py-4 font-medium">{cycle.plot}</td>
                      <td className="px-6 py-4">{formatTime(cycle.startTime)}</td>
                      <td className="px-6 py-4">{formatTime(cycle.endTime)}</td>
                      <td className="px-6 py-4">{cycle.runBy}</td>
                      <td className="px-6 py-4">{getStatusBadge(cycle.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">No irrigation schedule generated yet.</p>
            <p className="text-sm mt-2">Configure parameters and click Generate Schedule.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IrrigationSchedule;
