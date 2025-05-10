
import React from "react";
import { Paper } from "@mui/material";
import FormHeader from "./irrigation/FormHeader";
import FormContent from "./irrigation/FormContent";
import { IrrigationCycle } from "@/types/irrigation";
import styles from "./IrrigationForm.module.css";

interface IrrigationFormProps {
  setSchedule: React.Dispatch<React.SetStateAction<IrrigationCycle[]>>;
}

const IrrigationForm = ({ setSchedule }: IrrigationFormProps) => {
  return (
    <Paper className={styles.formContainer}>
      <FormHeader title="Irrigation Configuration" />
      <FormContent setSchedule={setSchedule} />
    </Paper>
  );
};

export default IrrigationForm;
