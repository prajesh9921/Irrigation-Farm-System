import styles from "./ScheduleHeader.module.css";

interface ScheduleHeaderProps {
  totalCount: number;
  filteredCount: number;
}

const ScheduleHeader = ({ totalCount, filteredCount }: ScheduleHeaderProps) => {
  return (
    <div className={styles.scheduleHeader}>
      <p className={styles.scheduleTitle}>Irrigation Schedule</p>
      <p className={styles.scheduleCount}>
        {filteredCount} of {totalCount} cycles
      </p>
    </div>
  );
};

export default ScheduleHeader;
