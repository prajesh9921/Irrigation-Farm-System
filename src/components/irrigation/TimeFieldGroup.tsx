
import React from "react";
import TimeField from "./TimeField";
import styles from "./FormField.module.css";

interface TimeFieldGroupProps {
  startTime: string;
  endTime: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeFieldGroup = ({
  startTime,
  endTime,
  handleChange
}: TimeFieldGroupProps) => {
  return (
    <div className={styles.inputGroup}>
      <TimeField
        id="startTime"
        name="startTime"
        label="Start Time (HHMMSS)"
        value={startTime}
        onChange={handleChange}
        placeholder="060000"
      />
      
      <TimeField
        id="endTime"
        name="endTime"
        label="End Time (HHMMSS)"
        value={endTime}
        onChange={handleChange}
        placeholder="190000"
      />
    </div>
  );
};

export default TimeFieldGroup;
