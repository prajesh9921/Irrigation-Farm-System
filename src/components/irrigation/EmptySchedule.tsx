import styles from "./EmptySchedule.module.css";

const EmptySchedule = () => {
  return (
    <div className={styles.emptyMessage}>
      <p className={styles.primaryText}>
        No irrigation schedule generated yet.
      </p>
      <p className={styles.secondaryText}>
        Configure parameters and click Generate Schedule.
      </p>
    </div>
  );
};

export default EmptySchedule;
