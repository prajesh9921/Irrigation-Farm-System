import { useState } from "react";
import IrrigationForm from "@/components/IrrigationForm";
import IrrigationSchedule from "@/components/IrrigationSchedule";
import Header from "@/components/Header";
import { IrrigationCycle } from "@/types/irrigation";
import styles from "./Index.module.css";

const Index = () => {
  const [schedule, setSchedule] = useState<IrrigationCycle[]>([]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />

        <div className={styles.grid}>
          <div className={styles.form}>
            <IrrigationForm setSchedule={setSchedule} />
          </div>

          <div className={styles.schedule}>
            <IrrigationSchedule schedule={schedule} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
