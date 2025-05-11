import styles from "./Header.module.css";
import Drop from '@/assets/drop.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src={Drop} alt="Drop" className={styles.dropimg}/>
        <div>
          <h1 className={styles.title}>Farm Irrigation Scheduler</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
