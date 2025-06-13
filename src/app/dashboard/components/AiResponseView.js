import { motion } from "framer-motion";
import { WandSparkles } from "lucide-react";
import styles from "../dashboard.module.css";

export default function AiResponseView({
  aiResponse,
  handleAiResponseChange,
  handleFinalSubmit,
}) {
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
      className={styles.aiResponseSection}
    >
      <div className={styles.responseTitle}>
        <div className={styles.responseIcon}>
          <WandSparkles size={24} />
        </div>
        <h2>AI Generated Message</h2>
      </div>
      <div className={styles.responseContainer}>
        <textarea
          value={aiResponse}
          onChange={handleAiResponseChange}
          className={styles.aiResponseTextarea}
          rows={10}
          placeholder="AI generated message will appear here..."
        />
      </div>
      <div className={styles.responseActions}>
        <button onClick={handleFinalSubmit} className={styles.finalSubmitBtn}>
          Use This Message
        </button>
      </div>
    </motion.div>
  );
}
