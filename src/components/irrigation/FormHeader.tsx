import styles from "./FormHeader.module.css";

interface FormHeaderProps {
  title: string;
}

const FormHeader = ({ title }: FormHeaderProps) => {
  return (
    <div className={styles.formHeader}>
      <p className={styles.formTitle}>{title}</p>
    </div>
  );
};

export default FormHeader;
