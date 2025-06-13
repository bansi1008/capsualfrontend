import { motion } from "framer-motion";
import styles from "../dashboard.module.css";

export default function CapsualList({ capsuals }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className={styles.recentSection}
    >
      <h2 className={styles.sectionTitle}>Recent Capsuals</h2>
      <div>
        {capsuals.map((capsual) => (
          <div key={capsual.id} className={styles.capsualItem}>
            <div className={styles.capsualDetails}>
              <h4>{capsual.subject}</h4>
              <p>{capsual.recipient}</p>
            </div>
            <div className={styles.capsualDate}>
              Send at: {new Date(capsual.sendAt).toLocaleDateString()}
            </div>
            <span
              className={`${styles.capsualStatus} ${styles[capsual.status]}`}
            >
              {capsual.status}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
