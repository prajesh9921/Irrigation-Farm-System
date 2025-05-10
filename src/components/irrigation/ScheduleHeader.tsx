
import { Box, Typography } from "@mui/material";
import styles from "./ScheduleHeader.module.css";

interface ScheduleHeaderProps {
  totalCount: number;
  filteredCount: number;
}

const ScheduleHeader = ({ totalCount, filteredCount }: ScheduleHeaderProps) => {
  return (
    <Box className={styles.scheduleHeader}>
      <Typography variant="h6" className={styles.scheduleTitle}>
        Irrigation Schedule
      </Typography>
      <Typography variant="body2" className={styles.scheduleCount}>
        {filteredCount} of {totalCount} cycles
      </Typography>
    </Box>
  );
};

export default ScheduleHeader;
