
import { Button } from "@mui/material";
import styles from "./SubmitButton.module.css";

interface SubmitButtonProps {
  label: string;
}

const SubmitButton = ({ label }: SubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      variant="contained" 
      color="primary"
      className={styles.submitButton}
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
