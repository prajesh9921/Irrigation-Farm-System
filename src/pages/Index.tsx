
import { useState } from "react";
import { Container, Box } from "@mui/material";
import IrrigationForm from "@/components/IrrigationForm";
import IrrigationSchedule from "@/components/IrrigationSchedule";
import Header from "@/components/Header";
import { IrrigationCycle } from "@/types/irrigation";
import styles from "./Index.module.css";

const Index = () => {
  const [schedule, setSchedule] = useState<IrrigationCycle[]>([]);
  
  return (
    <Box className={styles.container}>
      <Container className={styles.content}>
        <Header />
        
        <Box className={styles.grid}>
          <Box>
            <IrrigationForm setSchedule={setSchedule} />
          </Box>
          
          <Box>
            <IrrigationSchedule schedule={schedule} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Index;
