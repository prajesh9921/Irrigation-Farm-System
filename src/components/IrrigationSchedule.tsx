
import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  Chip,
  Pagination
} from "@mui/material";
import { IrrigationCycle } from "@/types/irrigation";
import { updateScheduleStatus } from "@/utils/scheduleGenerator";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import styles from "./IrrigationSchedule.module.css";

interface IrrigationScheduleProps {
  schedule: IrrigationCycle[];
}

const IrrigationSchedule = ({ schedule }: IrrigationScheduleProps) => {
  const [filteredSchedule, setFilteredSchedule] = useState<IrrigationCycle[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState({
    done: true,
    inProgress: true,
    pending: true
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [plots, setPlots] = useState<string[]>([]);
  const [liveSchedule, setLiveSchedule] = useState<IrrigationCycle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastCompletedIndex, setLastCompletedIndex] = useState(-1);
  const [processingIndex, setProcessingIndex] = useState(-1);
  const itemsPerPage = 7;

  // Update plots list when schedule changes
  useEffect(() => {
    if (schedule.length) {
      console.log("Schedule updated:", schedule);
      const uniquePlots = Array.from(new Set(schedule.map((item) => item.plot)));
      setPlots(uniquePlots);
    
      // Initialize with fresh schedule
      const initialLiveSchedule = [...schedule];
      
      // Reset tracking variables when new schedule is set
      setLastCompletedIndex(-1);
      setProcessingIndex(-1);
      
      setLiveSchedule(initialLiveSchedule);
    }
  }, [schedule]);

  // Real-time status updates with proper sequencing
  useEffect(() => {
    if (!schedule.length) return;
    
    const intervalId = setInterval(() => {
      setLiveSchedule(prev => {
        // Find the current in-progress cycle if any
        const inProgressIndex = prev.findIndex(cycle => cycle.status === "In Progress");
        
        // If no cycle is in progress, start the next pending one
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
        
        // Check if current in-progress cycle should be marked as done
        // (we're simulating completion after a few seconds)
        if (inProgressIndex !== -1 && processingIndex === inProgressIndex) {
          // Simulate random completion time between 5-15 seconds
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

  // Apply filters
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

  // Handle status filter change
  const handleStatusFilterChange = (status: keyof typeof statusFilter) => {
    setStatusFilter({
      ...statusFilter,
      [status]: !statusFilter[status]
    });
  };

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

  const getStatusChip = (status: string) => {
    switch (status) {
      case "Done":
        return <Chip label="Done" color="success" size="small" />;
      case "In Progress":
        return <Chip label="In Progress" color="primary" size="small" />;
      case "Pending":
        return <Chip label="Pending" color="warning" size="small" />;
      default:
        return <Chip label={status} color="default" size="small" />;
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

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSchedule.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSchedule.length / itemsPerPage);

  return (
    <Paper className={styles.scheduleContainer}>
      <Box className={styles.scheduleHeader}>
        <Typography variant="h6" className={styles.scheduleTitle}>
          Irrigation Schedule
        </Typography>
        <Typography variant="body2" className={styles.scheduleCount}>
          {filteredSchedule.length} of {liveSchedule.length} cycles
        </Typography>
      </Box>
      <Box className={styles.scheduleContent}>
        {liveSchedule.length > 0 ? (
          <>
            <Box className={styles.filterContainer}>
              <Box className={styles.searchContainer}>
                <TextField
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Box>
              <Box className={styles.filterActions}>
                <Select
                  value={selectedPlot}
                  onChange={(e) => setSelectedPlot(e.target.value as string)}
                  size="small"
                  displayEmpty
                >
                  <MenuItem value="all">All Plots</MenuItem>
                  {plots.map((plot) => (
                    <MenuItem key={plot} value={plot}>
                      {plot}
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  variant="outlined"
                  startIcon={<FilterAltIcon />}
                  onClick={resetFilters}
                  size="small"
                >
                  Reset
                </Button>
              </Box>
            </Box>
            
            <Box className={styles.statusFilterContainer}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={statusFilter.done}
                    onChange={() => handleStatusFilterChange("done")}
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    <Box className={`${styles.statusDot} ${styles.dotDone}`} />
                    <span>Done</span>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={statusFilter.inProgress}
                    onChange={() => handleStatusFilterChange("inProgress")}
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    <Box className={`${styles.statusDot} ${styles.dotInProgress}`} />
                    <span>In Progress</span>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={statusFilter.pending}
                    onChange={() => handleStatusFilterChange("pending")}
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    <Box className={`${styles.statusDot} ${styles.dotPending}`} />
                    <span>Pending</span>
                  </Box>
                }
              />
            </Box>
            
            <TableContainer>
              <Table className={styles.table}>
                <TableHead className={styles.tableHead}>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Plot</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                    <TableCell>Motor</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.length > 0 ? (
                    currentItems.map((cycle) => (
                      <TableRow key={cycle.index} className={styles.tableRow}>
                        <TableCell>{cycle.index + 1}</TableCell>
                        <TableCell>{cycle.plot}</TableCell>
                        <TableCell>{formatTime(cycle.startTime)}</TableCell>
                        <TableCell>{formatTime(cycle.endTime)}</TableCell>
                        <TableCell>{cycle.runBy}</TableCell>
                        <TableCell>{getStatusChip(cycle.status)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center" className={styles.emptyMessage}>
                        No results found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {totalPages > 1 && (
              <Box className={styles.pagination}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, page) => setCurrentPage(page)}
                />
              </Box>
            )}
          </>
        ) : (
          <Box className={styles.emptyMessage}>
            <Typography variant="body1" color="textSecondary">
              No irrigation schedule generated yet.
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Configure parameters and click Generate Schedule.
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default IrrigationSchedule;
