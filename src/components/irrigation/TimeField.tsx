
import React from "react";
import { TextField, InputLabel} from "@mui/material";
import styles from "./FormField.module.css";

interface TimeFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const TimeField = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder
}: TimeFieldProps) => {
  return (
    <div className={styles.formGroup}>
      <InputLabel htmlFor={id} className={styles.formLabel}>
        {label}
      </InputLabel>
      <TextField
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        fullWidth
        size="small"
      />
    </div>
  );
};

export default TimeField;
