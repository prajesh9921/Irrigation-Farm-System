
import React from "react";
import { Typography, Box } from "@mui/material";
import OpacityIcon from '@mui/icons-material/Opacity';
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Box className={styles.container}>
        <OpacityIcon className={styles.icon} fontSize="large" />
        <Box>
          <Typography variant="h1" className={styles.title}>
            Farm Irrigation Scheduler
          </Typography>
          <Typography variant="body1" className={styles.subtitle}>
            Configure and monitor your IoT irrigation system
          </Typography>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
