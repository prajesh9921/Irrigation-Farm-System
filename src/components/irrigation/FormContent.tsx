
import React from "react";
import { Box } from "@mui/material";
import FormField from "./FormField";
import TimeFieldGroup from "./TimeFieldGroup";
import SubmitButton from "./SubmitButton";
import { useIrrigationForm } from "@/hooks/useIrrigationForm";
import { IrrigationCycle } from "@/types/irrigation";
import styles from "./FormContent.module.css";

interface FormContentProps {
  setSchedule: React.Dispatch<React.SetStateAction<IrrigationCycle[]>>;
}

const FormContent = ({ setSchedule }: FormContentProps) => {
  const { formData, handleChange, handleSubmit } = useIrrigationForm({ setSchedule });

  return (
    <Box className={styles.formContent}>
      <form onSubmit={handleSubmit}>
        <FormField
          id="numberOfPlots"
          name="numberOfPlots"
          label="Number of Plots"
          value={formData.numberOfPlots}
          onChange={handleChange}
          type="number"
          min="1"
        />
        
        <FormField
          id="motorsInParallel"
          name="motorsInParallel"
          label="Motors in Parallel"
          value={formData.motorsInParallel}
          onChange={handleChange}
          type="number"
          min="1"
        />
        
        <TimeFieldGroup
          startTime={formData.startTime}
          endTime={formData.endTime}
          handleChange={handleChange}
        />
        
        <FormField
          id="motorRuntime"
          name="motorRuntime"
          label="Motor Runtime (minutes)"
          value={formData.motorRuntime}
          onChange={handleChange}
          type="number"
          min="1"
        />
        
        <FormField
          id="irrigationInterval"
          name="irrigationInterval"
          label="Irrigation Interval (minutes)"
          value={formData.irrigationInterval}
          onChange={handleChange}
          type="number"
          min="1"
        />
        
        <SubmitButton label="Generate Schedule" />
      </form>
    </Box>
  );
};

export default FormContent;
