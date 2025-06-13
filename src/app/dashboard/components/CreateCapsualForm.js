import { motion } from "framer-motion";
import styles from "../dashboard.module.css";

export default function CreateCapsualForm({
  capsualData,
  handleInputChange,
  handleSubmit,
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
      className={styles.formContainer}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="recipientEmail" className={styles.label}>
            Recipient Email
          </label>
          <input
            type="email"
            id="recipientEmail"
            name="recipientEmail"
            value={capsualData.recipientEmail}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="subject" className={styles.label}>
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={capsualData.subject}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="message" className={styles.label}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={capsualData.message}
            onChange={handleInputChange}
            className={styles.textarea}
            required
            rows={6}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="sendAt" className={styles.label}>
            Send At
          </label>
          <input
            type="datetime-local"
            id="sendAt"
            name="sendAt"
            value={capsualData.sendAt}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="sendMethod" className={styles.label}>
            Send Method
          </label>
          <select
            id="sendMethod"
            name="sendMethod"
            value={capsualData.sendMethod}
            onChange={handleInputChange}
            className={styles.input}
            required
          >
            <option value="app_email">App Email</option>
            <option value="user_email">User Email</option>
          </select>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn}>
            Create Capsual
          </button>
        </div>
      </form>
    </motion.div>
  );
}
