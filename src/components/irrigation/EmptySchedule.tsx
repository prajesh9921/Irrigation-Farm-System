
import { Box, Typography } from "@mui/material";
import styles from "./EmptySchedule.module.css";

const EmptySchedule = () => {
  return (
    <Box className={styles.emptyMessage}>
      <Typography variant="body1" color="textSecondary">
        No irrigation schedule generated yet.
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        Configure parameters and click Generate Schedule.
      </Typography>
    </Box>
  );
};

export default EmptySchedule;
