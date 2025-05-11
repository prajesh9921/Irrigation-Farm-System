
import { useState, useEffect } from "react";
import { IrrigationCycle } from "@/types/irrigation";

interface StatusFilterState {
  done: boolean;
  inProgress: boolean;
  pending: boolean;
}

const useScheduleFiltering = (liveSchedule: IrrigationCycle[]) => {
  const [filteredSchedule, setFilteredSchedule] = useState<IrrigationCycle[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilterState>({
    done: true,
    inProgress: true,
    pending: true
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [plots, setPlots] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Update plots list when schedule changes
  useEffect(() => {
    if (liveSchedule.length) {
      const uniquePlots = Array.from(new Set(liveSchedule.map((item) => item.plot)));
      setPlots(uniquePlots);
    }
  }, [liveSchedule]);

  useEffect(() => {
    let result = [...liveSchedule];
    
    // Filter by plot
    if (selectedPlot && selectedPlot !== "all") {
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
    
    // Reset to first page whenever filters change
    setCurrentPage(1);
  }, [liveSchedule, selectedPlot, statusFilter, searchTerm]);

  // Reset filters
  const resetFilters = () => {
    setSelectedPlot("all");
    setStatusFilter({
      done: true,
      inProgress: true,
      pending: true
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSchedule.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSchedule.length / itemsPerPage);

  return {
    filteredSchedule,
    currentItems,
    plots,
    selectedPlot,
    setSelectedPlot,
    statusFilter,
    setStatusFilter,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    resetFilters
  };
};

export default useScheduleFiltering;
