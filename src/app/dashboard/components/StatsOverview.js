import { motion } from "framer-motion";
import styles from "../dashboard.module.css";

export default function StatsOverview({ stats }) {
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={styles.statsGrid}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={fadeInUp}
          className={`${styles.statCard} ${styles[stat.color]}`}
        >
          <div className={styles.statIcon}>
            <stat.icon size={24} />
          </div>
          <div>
            <h3 className={styles.statValue}>{stat.value}</h3>
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
