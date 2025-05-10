
import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./FormHeader.module.css";

interface FormHeaderProps {
  title: string;
}

const FormHeader = ({ title }: FormHeaderProps) => {
  return (
    <Box className={styles.formHeader}>
      <Typography variant="h6" className={styles.formTitle}>
        {title}
      </Typography>
    </Box>
  );
};

export default FormHeader;
