
import React from "react";
import { TextField, InputLabel, Box } from "@mui/material";
import styles from "./FormField.module.css";

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number";
  placeholder?: string;
  min?: string;
  className?: string;
}

const FormField = ({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  min,
  className,
}: FormFieldProps) => {
  return (
    <Box className={`${styles.formGroup} ${className}`}>
      <InputLabel htmlFor={id} className={styles.formLabel}>
        {label}
      </InputLabel>
      <TextField
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        fullWidth
        size="small"
        inputProps={{ min }}
      />
    </Box>
  );
};

export default FormField;
