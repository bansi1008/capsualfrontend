"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaSquarePlus } from "react-icons/fa6";
import { FaMagic } from "react-icons/fa";
import {
  Calendar,
  Send,
  Mail,
  Clock,
  Sparkles,
  User,
  Plus,
  ArrowLeft,
  Save,
  Eye,
  Heart,
  Gift,
  Star,
  Zap,
  WandSparkles,
} from "lucide-react";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("overview"); // 'overview', 'create', 'ai-create', 'sent', 'scheduled'
  const [capsualData, setCapsualData] = useState({
    recipientEmail: "",
    subject: "",
    message: "",
    sendAt: "",
    sendMethod: "app_email",
  });

  const [aiData, setAiData] = useState({
    occasion: "",
    relationship: "",
    tone: "",
    customOccasion: "",
    customRelationship: "",
    customTone: "",
  });

  const [aiResponse, setAiResponse] = useState("");
  const [showAiResponse, setShowAiResponse] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCapsualData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAiInputChange = (e) => {
    const { name, value } = e.target;
    setAiData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateCapsual = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      console.log("Creating capsual:", capsualData);
      const res = await fetch("http://localhost:5000/v1/capsual", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipientEmail: capsualData.recipientEmail,
          subject: capsualData.subject,
          message: capsualData.message,
          sendAt: new Date(capsualData.sendAt).toISOString(),
          sendMethod: capsualData.sendMethod,
        }),
      });

      const data = await res.json();
      setActiveView("overview");
      if (res.ok) {
        console.log("created succes fully", data.error);
      } else {
        console.log("error:", data.message);
      }
    } catch (error) {
      console.error("Error creating capsual:", error);
      alert("Failed to create capsual. Please try again.");
    }
  };

  const handleAiCreateCapsual = async (e) => {
    e.preventDefault();
    try {
      // Prepare the data for AI generation
      const finalData = {
        occasion:
          aiData.occasion === "Other" ? aiData.customOccasion : aiData.occasion,
        relationship:
          aiData.relationship === "Other"
            ? aiData.customRelationship
            : aiData.relationship,
        tone: aiData.tone === "Other" ? aiData.customTone : aiData.tone,
      };

      console.log("Creating AI capsual with data:", finalData);

      // Simulate AI response (replace with actual API call)
      setAiResponse(
        "Happy Work Anniversary! 🎉\n\nDear [Name],\n\nCongratulations on reaching another milestone in your professional journey! Your dedication, hard work, and positive attitude have made a significant impact on our team.\n\nWishing you continued success and many more years of growth and achievement.\n\nBest regards,\n[Your Name]"
      );
      setShowAiResponse(true);

      // Add your actual AI API call here
      // const response = await fetch('/api/ai-capsuals', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(finalData)
      // });
      // const result = await response.json();
      // setAiResponse(result.message);
      // setShowAiResponse(true);
    } catch (error) {
      console.error("Error creating AI capsual:", error);
      alert("Failed to create AI capsual. Please try again.");
    }
  };

  const handleAiResponseChange = (e) => {
    setAiResponse(e.target.value);
  };

  const handleFinalSubmit = async () => {
    try {
      // Here you would submit the final edited AI response
      console.log("Final AI response:", aiResponse);

      // Reset form on success
      setAiData({
        occasion: "",
        relationship: "",
        tone: "",
        customOccasion: "",
        customRelationship: "",
        customTone: "",
      });
      setAiResponse("");
      setShowAiResponse(false);

      // Show success message
      alert("AI Capsual created successfully!");
      setActiveView("overview");
    } catch (error) {
      console.error("Error submitting final capsual:", error);
      alert("Failed to submit capsual. Please try again.");
    }
  };

  const getViewTitle = () => {
    switch (activeView) {
      case "create":
        return "Create New Capsual";
      case "ai-create":
        return "Create with AI Magic";
      default:
        return "Dashboard";
    }
  };

  const getViewSubtitle = () => {
    switch (activeView) {
      case "create":
        return "Schedule a heartfelt message for the perfect moment";
      case "ai-create":
        return "Let AI craft the perfect message for your special occasion";
      default:
        return "Manage your time-delayed messages";
    }
  };

  // Mock data for demonstration
  const stats = [
    { label: "Total Capsuals", value: "24", icon: Mail, color: "primary" },
    { label: "Sent This Month", value: "12", icon: Send, color: "accent" },
    { label: "Scheduled", value: "8", icon: Clock, color: "orange" },
    { label: "Success Rate", value: "98%", icon: Star, color: "success" },
  ];

  const recentCapsuals = [
    {
      id: 1,
      recipient: "mom@email.com",
      subject: "Happy Birthday Mom!",
      sendAt: "2024-12-25",
      status: "scheduled",
    },
    {
      id: 2,
      recipient: "john@email.com",
      subject: "Anniversary Wishes",
      sendAt: "2024-12-20",
      status: "sent",
    },
    {
      id: 3,
      recipient: "sarah@email.com",
      subject: "Graduation Congratulations",
      sendAt: "2024-12-30",
      status: "scheduled",
    },
  ];

  const quickTemplates = [
    {
      id: 1,
      title: "Birthday Wish",
      icon: Gift,
      description: "Send heartfelt birthday messages",
    },
    {
      id: 2,
      title: "Anniversary",
      icon: Heart,
      description: "Celebrate special anniversaries",
    },
    {
      id: 3,
      title: "Holiday Greetings",
      icon: Star,
      description: "Share holiday joy and wishes",
    },
  ];

  // AI Options
  const occasionOptions = [
    "Birthday",
    "Anniversary",
    "Work Anniversary",
    "Graduation",
    "Wedding",
    "New Job",
    "Promotion",
    "Retirement",
    "Holiday",
    "Thank You",
    "Congratulations",
    "Sympathy",
    "Other",
  ];

  const relationshipOptions = [
    "Family Member",
    "Close Friend",
    "Colleague",
    "Manager",
    "Employee",
    "Client",
    "Mentor",
    "Teacher",
    "Student",
    "Neighbor",
    "Acquaintance",
    "Other",
  ];

  const toneOptions = [
    "Warm and personal",
    "Professional and respectful",
    "Casual and friendly",
    "Formal and elegant",
    "Heartfelt and emotional",
    "Light-hearted and fun",
    "Inspirational and motivating",
    "Grateful and appreciative",
  ];

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>{getViewTitle()}</h1>
            <p className={styles.subtitle}>{getViewSubtitle()}</p>
          </div>

          {activeView === "overview" ? (
            <div className={styles.headerButtons}>
              <motion.button
                className={styles.aiCreateBtn}
                onClick={() => setActiveView("ai-create")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaMagic className={styles.btnIcon} />
                Create with AI
              </motion.button>
              <motion.button
                className={styles.createBtn}
                onClick={() => setActiveView("create")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSquarePlus className={styles.btnIcon} />
                Create Manually
              </motion.button>
            </div>
          ) : (
            <motion.button
              className={styles.backBtn}
              onClick={() => setActiveView("overview")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className={styles.btnIcon} />
              Back to Dashboard
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      {activeView === "overview" && (
        <motion.div
          className={styles.overview}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Stats Grid */}
          <motion.div className={styles.statsGrid} variants={fadeInUp}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`${styles.statCard} ${styles[stat.color]}`}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.statIcon}>
                  <stat.icon />
                </div>
                <div className={styles.statContent}>
                  <h3 className={styles.statValue}>{stat.value}</h3>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Creation Options */}
          <motion.div className={styles.creationOptions} variants={fadeInUp}>
            <h2 className={styles.sectionTitle}>Create New Capsual</h2>
            <div className={styles.optionsGrid}>
              <motion.div
                className={styles.optionCard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView("ai-create")}
              >
                <div className={styles.optionIcon}>
                  <FaMagic className={styles.iconElemen} />
                </div>
                <h3>Create with AI</h3>
                <p>
                  Let our AI craft the perfect message based on your occasion
                  and relationship
                </p>
                <div className={styles.optionBadge}>
                  <Zap size={14} />
                  AI Powered
                </div>
              </motion.div>

              <motion.div
                className={styles.optionCard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView("create")}
              >
                <div className={styles.optionIcon}>
                  <FaSquarePlus className={styles.iconElement} />
                </div>
                <h3>Create Manually</h3>
                <p>
                  Write your own personalized message with full control over
                  every detail
                </p>
                <div className={styles.optionBadge}>
                  <Eye size={14} />
                  Full Control
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Templates */}
          <motion.div className={styles.templatesSection} variants={fadeInUp}>
            <h2 className={styles.sectionTitle}>Quick Templates</h2>
            <div className={styles.templatesGrid}>
              {quickTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  className={styles.templateCard}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveView("ai-create")}
                >
                  <template.icon className={styles.templateIcon} />
                  <h3>{template.title}</h3>
                  <p>{template.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Capsuals */}
          <motion.div className={styles.recentSection} variants={fadeInUp}>
            <h2 className={styles.sectionTitle}>Recent Capsuals</h2>
            <div className={styles.capsualsList}>
              {recentCapsuals.map((capsual) => (
                <motion.div
                  key={capsual.id}
                  className={styles.capsualItem}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.capsualIcon}>
                    <Mail />
                  </div>
                  <div className={styles.capsualDetails}>
                    <h4>{capsual.subject}</h4>
                    <p>To: {capsual.recipient}</p>
                    <span className={styles.capsualDate}>{capsual.sendAt}</span>
                  </div>
                  <div
                    className={`${styles.capsualStatus} ${
                      styles[capsual.status]
                    }`}
                  >
                    {capsual.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* AI Create Form */}
      {activeView === "ai-create" && (
        <motion.div
          className={styles.createForm}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.aiFormContainer}>
            <motion.form
              onSubmit={handleAiCreateCapsual}
              className={styles.aiForm}
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div className={styles.aiHeader} variants={fadeInUp}>
                <Sparkles className={styles.aiHeaderIcon} />
                <div>
                  <h2>AI Capsual Generator</h2>
                  <p>
                    Tell us about your occasion and we'll create the perfect
                    message
                  </p>
                </div>
              </motion.div>

              {/* Occasion */}
              <motion.div className={styles.inputGroup} variants={fadeInUp}>
                <label className={styles.label}>
                  <Gift className={styles.labelIcon} />
                  Occasion
                </label>
                <select
                  name="occasion"
                  value={aiData.occasion}
                  onChange={handleAiInputChange}
                  className={styles.select}
                  required
                >
                  <option value="">Select an occasion</option>
                  {occasionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {aiData.occasion === "Other" && (
                  <motion.input
                    type="text"
                    name="customOccasion"
                    value={aiData.customOccasion}
                    onChange={handleAiInputChange}
                    placeholder="Enter custom occasion"
                    className={styles.input}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    required
                  />
                )}
              </motion.div>

              {/* Relationship */}
              <motion.div className={styles.inputGroup} variants={fadeInUp}>
                <label className={styles.label}>
                  <User className={styles.labelIcon} />
                  Relationship
                </label>
                <select
                  name="relationship"
                  value={aiData.relationship}
                  onChange={handleAiInputChange}
                  className={styles.select}
                  required
                >
                  <option value="">Select your relationship</option>
                  {relationshipOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {aiData.relationship === "Other" && (
                  <motion.input
                    type="text"
                    name="customRelationship"
                    value={aiData.customRelationship}
                    onChange={handleAiInputChange}
                    placeholder="Enter custom relationship"
                    className={styles.input}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    required
                  />
                )}
              </motion.div>

              {/* Tone */}
              <motion.div className={styles.inputGroup} variants={fadeInUp}>
                <label className={styles.label}>
                  <Heart className={styles.labelIcon} />
                  Tone
                </label>
                <select
                  name="tone"
                  value={aiData.tone}
                  onChange={handleAiInputChange}
                  className={styles.select}
                  required
                >
                  <option value="">Select the tone</option>
                  {toneOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {aiData.tone === "Other" && (
                  <motion.input
                    type="text"
                    name="customTone"
                    value={aiData.customTone}
                    onChange={handleAiInputChange}
                    placeholder="Enter custom tone (e.g., Humorous and playful)"
                    className={styles.input}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    required
                  />
                )}
              </motion.div>

              {/* Preview */}
              <motion.div className={styles.aiPreview} variants={fadeInUp}>
                <h3>AI will generate:</h3>
                <div className={styles.aiPreviewContent}>
                  <div className={styles.previewRow}>
                    <strong>Occasion:</strong>{" "}
                    {aiData.occasion === "Other"
                      ? aiData.customOccasion
                      : aiData.occasion || "Not selected"}
                  </div>
                  <div className={styles.previewRow}>
                    <strong>Relationship:</strong>{" "}
                    {aiData.relationship === "Other"
                      ? aiData.customRelationship
                      : aiData.relationship || "Not selected"}
                  </div>
                  <div className={styles.previewRow}>
                    <strong>Tone:</strong>{" "}
                    {aiData.tone === "Other"
                      ? aiData.customTone
                      : aiData.tone || "Not selected"}
                  </div>
                </div>
              </motion.div>

              {/* Submit */}
              <motion.div className={styles.formActions} variants={fadeInUp}>
                <motion.button
                  type="submit"
                  className={styles.aiSubmitBtn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={
                    !aiData.occasion ||
                    !aiData.relationship ||
                    !aiData.tone ||
                    (aiData.occasion === "Other" && !aiData.customOccasion) ||
                    (aiData.relationship === "Other" &&
                      !aiData.customRelationship) ||
                    (aiData.tone === "Other" && !aiData.customTone)
                  }
                >
                  <FaMagic className={styles.btnIcon} />
                  Generate AI Message
                </motion.button>
              </motion.div>

              {/* AI Response Section */}
              {showAiResponse && (
                <motion.div
                  className={styles.aiResponseSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  variants={fadeInUp}
                >
                  <h3 className={styles.responseTitle}>
                    <Sparkles className={styles.responseIcon} />
                    AI Generated Message
                  </h3>
                  <textarea
                    value={aiResponse}
                    onChange={handleAiResponseChange}
                    className={styles.aiResponseTextarea}
                    rows={8}
                    placeholder="AI generated message will appear here..."
                  />
                  <div className={styles.responseActions}>
                    <motion.button
                      type="button"
                      className={styles.editBtn}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowAiResponse(false)}
                    >
                      <ArrowLeft className={styles.btnIcon} />
                      Back to Edit
                    </motion.button>
                    <motion.button
                      type="button"
                      className={styles.finalSubmitBtn}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleFinalSubmit}
                    >
                      <Save className={styles.btnIcon} />
                      Create Capsual
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.form>

            {/* AI Features Card */}
            <motion.div
              className={styles.aiFeaturesCard}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className={styles.featuresTitle}>
                <Zap className={styles.featuresIcon} />
                AI Magic Features
              </h3>

              <div className={styles.featuresList}>
                <div className={styles.feature}>
                  <Sparkles className={styles.featureIcon} />
                  <div>
                    <h4>Smart Content</h4>
                    <p>AI crafts personalized messages based on your inputs</p>
                  </div>
                </div>

                <div className={styles.feature}>
                  <Heart className={styles.featureIcon} />
                  <div>
                    <h4>Tone Perfect</h4>
                    <p>
                      Matches the perfect tone for your relationship and
                      occasion
                    </p>
                  </div>
                </div>

                <div className={styles.feature}>
                  <Clock className={styles.featureIcon} />
                  <div>
                    <h4>Quick & Easy</h4>
                    <p>Create meaningful messages in seconds, not minutes</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {activeView === "create" && (
        <motion.div
          className={styles.createForm}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.formContainer}>
            <motion.form
              onSubmit={handleCreateCapsual}
              className={styles.form}
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Recipient Email */}
              <motion.div className={styles.inputGroup} variants={fadeInUp}>
                <label className={styles.label}>
                  <User className={styles.labelIcon} />
                  Recipient Email
                </label>
                <input
                  type="email"
                  name="recipientEmail"
                  value={capsualData.recipientEmail}
                  onChange={handleInputChange}
                  placeholder="friend@example.com"
                  className={styles.input}
                  required
                />
              </motion.div>

              {/* Subject */}
              <motion.div className={styles.inputGroup} variants={fadeInUp}>
                <label className={styles.label}>
                  <Mail className={styles.labelIcon} />
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={capsualData.subject}
                  onChange={handleInputChange}
                  placeholder="Happy Birthday from the Past!"
                  className={styles.input}
                  required
                />
              </motion.div>

              {/* Message */}
              <motion.div className={styles.inputGroup} variants={fadeInUp}>
                <label className={styles.label}>
                  <Sparkles className={styles.labelIcon} />
                  Message
                </label>
                <textarea
                  name="message"
                  value={capsualData.message}
                  onChange={handleInputChange}
                  placeholder="Write your heartfelt message here... This will be delivered at the perfect time!"
                  className={styles.textarea}
                  rows={6}
                  required
                />
                <div className={styles.charCount}>
                  {capsualData.message.length} characters
                </div>
              </motion.div>

              {/* Send At */}
              <motion.div className={styles.inputGroup} variants={fadeInUp}>
                <label className={styles.label}>
                  <Clock className={styles.labelIcon} />
                  Send At
                </label>
                <input
                  type="datetime-local"
                  name="sendAt"
                  value={capsualData.sendAt}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
                <div className={styles.dateHelp}>
                  Choose when your capsual should be delivered
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div className={styles.formActions} variants={fadeInUp}>
                <motion.button
                  type="button"
                  className={styles.previewBtn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Eye className={styles.btnIcon} />
                  Preview
                </motion.button>

                <motion.button
                  type="submit"
                  className={styles.submitBtn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Save className={styles.btnIcon} />
                  Schedule Capsual
                </motion.button>
              </motion.div>
            </motion.form>

            {/* Preview Card */}
            <motion.div
              className={styles.previewCard}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className={styles.previewTitle}>
                <Eye className={styles.previewIcon} />
                Live Preview
              </h3>

              <div className={styles.previewEmail}>
                <div className={styles.previewHeader}>
                  <div className={styles.previewField}>
                    <strong>To:</strong>{" "}
                    {capsualData.recipientEmail || "recipient@example.com"}
                  </div>
                  <div className={styles.previewField}>
                    <strong>Subject:</strong>{" "}
                    {capsualData.subject || "Your Subject Here"}
                  </div>
                  <div className={styles.previewField}>
                    <strong>Scheduled:</strong>{" "}
                    {capsualData.sendAt
                      ? new Date(capsualData.sendAt).toLocaleString()
                      : "Select date and time"}
                  </div>
                </div>

                <div className={styles.previewBody}>
                  <div className={styles.previewMessage}>
                    {capsualData.message ||
                      "Your heartfelt message will appear here..."}
                  </div>
                </div>

                <div className={styles.previewFooter}>
                  <div className={styles.previewSignature}>
                    Sent with ❤️ from Capsual
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
