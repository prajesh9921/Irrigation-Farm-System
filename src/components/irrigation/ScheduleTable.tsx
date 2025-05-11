import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
} from "@mui/material";
import { IrrigationCycle } from "@/types/irrigation";
import StatusChip from "./StatusChip";
import styles from "./ScheduleTable.module.css";

interface ScheduleTableProps {
  cycles: IrrigationCycle[];
}

const ScheduleTable = ({ cycles }: ScheduleTableProps) => {
  // Format time from HHMMSS to HH:MM:SS
  const formatTime = (time: string): string => {
    if (!time || time.length !== 6) return time;
    const hours = time.substring(0, 2);
    const minutes = time.substring(2, 4);
    const seconds = time.substring(4, 6);
    return `${hours}:${minutes}:${seconds}`;
  };

  if (cycles.length === 0) {
    return (
      <div className={styles.emptyMessage}>
        <p className={styles.emptyText}>No results found</p>
      </div>
    );
  }
  

  return (
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
          {cycles.map((cycle) => (
            <TableRow key={cycle.index} className={styles.tableRow}>
              <TableCell>{cycle.index + 1}</TableCell>
              <TableCell>{cycle.plot}</TableCell>
              <TableCell>{formatTime(cycle.startTime)}</TableCell>
              <TableCell>{formatTime(cycle.endTime)}</TableCell>
              <TableCell>{cycle.runBy}</TableCell>
              <TableCell><StatusChip status={cycle.status} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScheduleTable;
