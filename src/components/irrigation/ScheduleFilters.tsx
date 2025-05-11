
import { TextField, Box, Select, MenuItem, Button, FormControlLabel, Checkbox } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import styles from "./ScheduleFilters.module.css";

interface StatusFilterType {
  done: boolean;
  inProgress: boolean;
  pending: boolean;
}

interface ScheduleFiltersProps {
  selectedPlot: string;
  setSelectedPlot: (plot: string) => void;
  statusFilter: StatusFilterType;
  setStatusFilter: (filter: StatusFilterType) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  plots: string[];
  resetFilters: () => void;
}

const ScheduleFilters = ({
  selectedPlot,
  setSelectedPlot,
  statusFilter,
  setStatusFilter,
  searchTerm,
  setSearchTerm,
  plots,
  resetFilters
}: ScheduleFiltersProps) => {
  
  const handleStatusFilterChange = (status: keyof typeof statusFilter) => {
    setStatusFilter({
      ...statusFilter,
      [status]: !statusFilter[status]
    });
  };
  
  return (
    <>
      <div className={styles.filterContainer}>
        <div className={styles.searchContainer}>
          <TextField
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            size="small"
          />
        </div>
        <div className={styles.filterActions}>
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
        </div>
      </div>
      
      <div className={styles.statusFilterContainer}>
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
              <span className={styles.text}>Done</span>
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
              <span className={styles.text}>In Progress</span>
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
              <span className={styles.text}>Pending</span>
            </Box>
          }
        />
      </div>
    </>
  );
};

export default ScheduleFilters;
