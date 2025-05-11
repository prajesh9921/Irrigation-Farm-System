
import React from "react";
import FormHeader from "./irrigation/FormHeader";
import FormContent from "./irrigation/FormContent";
import { IrrigationCycle } from "@/types/irrigation";
import styles from "./IrrigationForm.module.css";

interface IrrigationFormProps {
  setSchedule: React.Dispatch<React.SetStateAction<IrrigationCycle[]>>;
}

const IrrigationForm = ({ setSchedule }: IrrigationFormProps) => {
  return (
    <div className={styles.formContainer}>
      <FormHeader title="Irrigation Configuration" />
      <FormContent setSchedule={setSchedule} />
    </div>
  );
};

export default IrrigationForm;
