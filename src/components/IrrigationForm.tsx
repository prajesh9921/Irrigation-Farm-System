
import { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel
} from "@mui/material";
import { generateSchedule } from "@/utils/scheduleGenerator";
import { IrrigationCycle } from "@/types/irrigation";
import { toast } from "sonner";
import styles from "./IrrigationForm.module.css";

interface IrrigationFormProps {
  setSchedule: React.Dispatch<React.SetStateAction<IrrigationCycle[]>>;
}

const IrrigationForm = ({ setSchedule }: IrrigationFormProps) => {
  const [formData, setFormData] = useState({
    numberOfPlots: 4,
    motorsInParallel: 2,
    startTime: "060000",
    endTime: "190000",
    motorRuntime: 5,
    irrigationInterval: 20
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "number" 
      ? parseInt(e.target.value) 
      : e.target.value;
      
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate inputs
      if (formData.numberOfPlots < 1) {
        toast.error("Number of plots must be at least 1");
        return;
      }
      
      if (formData.motorsInParallel < 1) {
        toast.error("Motors in parallel must be at least 1");
        return;
      }
      
      if (parseInt(formData.startTime) >= parseInt(formData.endTime)) {
        toast.error("End time must be after start time");
        return;
      }
      
      if (formData.motorRuntime < 1) {
        toast.error("Motor runtime must be at least 1 minute");
        return;
      }
      
      if (formData.irrigationInterval < formData.motorRuntime) {
        toast.error("Irrigation interval must be at least equal to motor runtime");
        return;
      }

      // Generate and set schedule
      const generatedSchedule = generateSchedule(formData);
      console.log("Generated schedule:", generatedSchedule);
      setSchedule(generatedSchedule);
      toast.success("Schedule generated successfully!");
    } catch (error) {
      console.error("Error generating schedule:", error);
      toast.error("Error generating schedule. Please check your inputs.");
    }
  };

  return (
    <Paper className={styles.formContainer}>
      <Box className={styles.formHeader}>
        <Typography variant="h6" className={styles.formTitle}>
          Irrigation Configuration
        </Typography>
      </Box>
      <Box className={styles.formContent}>
        <form onSubmit={handleSubmit}>
          <Box className={styles.formGroup}>
            <InputLabel htmlFor="numberOfPlots" className={styles.formLabel}>
              Number of Plots
            </InputLabel>
            <TextField
              id="numberOfPlots"
              name="numberOfPlots"
              type="number"
              value={formData.numberOfPlots}
              onChange={handleChange}
              fullWidth
              size="small"
              inputProps={{ min: "1" }}
            />
          </Box>
          
          <Box className={styles.formGroup}>
            <InputLabel htmlFor="motorsInParallel" className={styles.formLabel}>
              Motors in Parallel
            </InputLabel>
            <TextField
              id="motorsInParallel"
              name="motorsInParallel"
              type="number"
              value={formData.motorsInParallel}
              onChange={handleChange}
              fullWidth
              size="small"
              inputProps={{ min: "1" }}
            />
          </Box>
          
          <Box className={styles.inputGroup}>
            <Box className={styles.formGroup}>
              <InputLabel htmlFor="startTime" className={styles.formLabel}>
                Start Time (HHMMSS)
              </InputLabel>
              <TextField
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                placeholder="060000"
                fullWidth
                size="small"
              />
            </Box>
            
            <Box className={styles.formGroup}>
              <InputLabel htmlFor="endTime" className={styles.formLabel}>
                End Time (HHMMSS)
              </InputLabel>
              <TextField
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                placeholder="190000"
                fullWidth
                size="small"
              />
            </Box>
          </Box>
          
          <Box className={styles.formGroup}>
            <InputLabel htmlFor="motorRuntime" className={styles.formLabel}>
              Motor Runtime (minutes)
            </InputLabel>
            <TextField
              id="motorRuntime"
              name="motorRuntime"
              type="number"
              value={formData.motorRuntime}
              onChange={handleChange}
              fullWidth
              size="small"
              inputProps={{ min: "1" }}
            />
          </Box>
          
          <Box className={styles.formGroup}>
            <InputLabel htmlFor="irrigationInterval" className={styles.formLabel}>
              Irrigation Interval (minutes)
            </InputLabel>
            <TextField
              id="irrigationInterval"
              name="irrigationInterval"
              type="number"
              value={formData.irrigationInterval}
              onChange={handleChange}
              fullWidth
              size="small"
              inputProps={{ min: "1" }}
            />
          </Box>
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            className={styles.submitButton}
          >
            Generate Schedule
          </Button>
        </form>
      </Box>
    </Paper>
  );
};

export default IrrigationForm;
