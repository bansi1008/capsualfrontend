import { motion } from "framer-motion";
import styles from "../dashboard.module.css";
import { WandSparkles } from "lucide-react";

export default function AiCreateForm({
  aiData,
  handleAiInputChange,
  handleSubmit,
}) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const occasions = [
    "Birthday",
    "Anniversary",
    "Graduation",
    "Wedding",
    "Thank You",
    "Other",
  ];

  const relationships = ["Family", "Friend", "Colleague", "Partner", "Other"];

  const tones = [
    "Formal",
    "Casual",
    "Humorous",
    "Emotional",
    "Professional",
    "Other",
  ];

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className={styles.aiFormContainer}
    >
      <form onSubmit={handleSubmit} className={styles.aiForm}>
        <div className={styles.aiHeader}>
          <div className={styles.aiHeaderIcon}>
            <WandSparkles size={24} />
          </div>
          <h2>AI Message Generator</h2>
          <p>Let AI help you craft the perfect message</p>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="occasion" className={styles.label}>
            Occasion
          </label>
          <select
            id="occasion"
            name="occasion"
            value={aiData.occasion}
            onChange={handleAiInputChange}
            className={styles.select}
            required
          >
            <option value="">Select an occasion</option>
            {occasions.map((occasion) => (
              <option key={occasion} value={occasion}>
                {occasion}
              </option>
            ))}
          </select>
          {aiData.occasion === "Other" && (
            <input
              type="text"
              name="customOccasion"
              value={aiData.customOccasion}
              onChange={handleAiInputChange}
              className={styles.input}
              placeholder="Enter custom occasion"
              required
            />
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="relationship" className={styles.label}>
            Relationship
          </label>
          <select
            id="relationship"
            name="relationship"
            value={aiData.relationship}
            onChange={handleAiInputChange}
            className={styles.select}
            required
          >
            <option value="">Select relationship</option>
            {relationships.map((relationship) => (
              <option key={relationship} value={relationship}>
                {relationship}
              </option>
            ))}
          </select>
          {aiData.relationship === "Other" && (
            <input
              type="text"
              name="customRelationship"
              value={aiData.customRelationship}
              onChange={handleAiInputChange}
              className={styles.input}
              placeholder="Enter custom relationship"
              required
            />
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="tone" className={styles.label}>
            Tone
          </label>
          <select
            id="tone"
            name="tone"
            value={aiData.tone}
            onChange={handleAiInputChange}
            className={styles.select}
            required
          >
            <option value="">Select tone</option>
            {tones.map((tone) => (
              <option key={tone} value={tone}>
                {tone}
              </option>
            ))}
          </select>
          {aiData.tone === "Other" && (
            <input
              type="text"
              name="customTone"
              value={aiData.customTone}
              onChange={handleAiInputChange}
              className={styles.input}
              placeholder="Enter custom tone"
              required
            />
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="length" className={styles.label}>
            Message Length
          </label>
          <select
            id="length"
            name="length"
            value={aiData.length}
            onChange={handleAiInputChange}
            className={styles.select}
            required
          >
            <option value="">Select length</option>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.aiSubmitBtn}>
            Generate with AI
          </button>
        </div>
      </form>
    </motion.div>
  );
}
