import { motion } from "framer-motion";
import styles from "../dashboard.module.css";

export default function DashboardHeader({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.header}
    >
      <div className={styles.headerContent}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
}
