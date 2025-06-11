"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Send,
  Sparkles,
  Clock,
  Mail,
  Plus,
  BarChart3,
  Settings,
  Heart,
  Gift,
  Cake,
  Bell,
} from "lucide-react";
import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

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

  // Mock data
  const upcomingEmails = [
    {
      id: 1,
      recipient: "Mom",
      occasion: "Birthday",
      date: "2024-12-15",
      type: "birthday",
    },
    {
      id: 2,
      recipient: "Sarah",
      occasion: "Anniversary",
      date: "2024-12-20",
      type: "anniversary",
    },
    {
      id: 3,
      recipient: "Dad",
      occasion: "Retirement",
      date: "2024-12-25",
      type: "celebration",
    },
  ];

  const recentActivity = [
    { id: 1, action: "Email sent", recipient: "John", time: "2 hours ago" },
    { id: 2, action: "New schedule", recipient: "Emma", time: "5 hours ago" },
    { id: 3, action: "AI generated", recipient: "Mike", time: "1 day ago" },
  ];

  const stats = [
    {
      label: "Scheduled Emails",
      value: "24",
      icon: Calendar,
      color: "primary",
    },
    { label: "Sent This Month", value: "12", icon: Send, color: "accent" },
    { label: "AI Generated", value: "8", icon: Sparkles, color: "orange" },
    { label: "Success Rate", value: "98%", icon: BarChart3, color: "success" },
  ];

  const getOccasionIcon = (type) => {
    switch (type) {
      case "birthday":
        return <Cake className={styles.occasionIcon} />;
      case "anniversary":
        return <Heart className={styles.occasionIcon} />;
      case "celebration":
        return <Gift className={styles.occasionIcon} />;
      default:
        return <Calendar className={styles.occasionIcon} />;
    }
  };

  return (
    <section id="dashboard" className={styles.dashboard}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.subtitle}>
              Manage your scheduled messages and occasions
            </p>
          </div>

          <motion.button
            className={styles.newEmailBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className={styles.btnIcon} />
            Schedule New Email
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className={styles.statsGrid}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`${styles.statCard} ${styles[stat.color]}`}
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
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

        {/* Tab Navigation */}
        <motion.div
          className={styles.tabNavigation}
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {["overview", "scheduled", "sent", "analytics"].map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${
                activeTab === tab ? styles.active : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Left Column */}
          <motion.div
            className={styles.leftColumn}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Upcoming Emails */}
            <motion.div className={styles.card} variants={fadeInUp}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  <Clock className={styles.cardIcon} />
                  Upcoming Emails
                </h3>
                <span className={styles.badge}>{upcomingEmails.length}</span>
              </div>

              <div className={styles.cardContent}>
                {upcomingEmails.map((email) => (
                  <motion.div
                    key={email.id}
                    className={styles.emailItem}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.emailIcon}>
                      {getOccasionIcon(email.type)}
                    </div>
                    <div className={styles.emailDetails}>
                      <h4>{email.recipient}</h4>
                      <p>{email.occasion}</p>
                      <span className={styles.emailDate}>{email.date}</span>
                    </div>
                    <div className={styles.emailActions}>
                      <button className={styles.actionBtn}>
                        <Settings size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div className={styles.card} variants={fadeInUp}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  <Sparkles className={styles.cardIcon} />
                  Quick Actions
                </h3>
              </div>

              <div className={styles.quickActions}>
                <motion.button
                  className={styles.quickActionBtn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar className={styles.quickActionIcon} />
                  Schedule Birthday
                </motion.button>

                <motion.button
                  className={styles.quickActionBtn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className={styles.quickActionIcon} />
                  Anniversary Reminder
                </motion.button>

                <motion.button
                  className={styles.quickActionBtn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className={styles.quickActionIcon} />
                  AI Generate Message
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className={styles.rightColumn}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Recent Activity */}
            <motion.div className={styles.card} variants={fadeInUp}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  <Bell className={styles.cardIcon} />
                  Recent Activity
                </h3>
              </div>

              <div className={styles.cardContent}>
                {recentActivity.map((activity) => (
                  <motion.div
                    key={activity.id}
                    className={styles.activityItem}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: activity.id * 0.1 }}
                  >
                    <div className={styles.activityDot}></div>
                    <div className={styles.activityDetails}>
                      <p>
                        <strong>{activity.action}</strong> to{" "}
                        {activity.recipient}
                      </p>
                      <span className={styles.activityTime}>
                        {activity.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* AI Message Generator */}
            <motion.div className={styles.card} variants={fadeInUp}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  <Sparkles className={styles.cardIcon} />
                  AI Message Generator
                </h3>
              </div>

              <div className={styles.cardContent}>
                <p className={styles.aiDescription}>
                  Let AI help you craft the perfect message for any occasion.
                </p>

                <div className={styles.aiInputs}>
                  <select className={styles.aiSelect}>
                    <option>Select Occasion</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Graduation</option>
                    <option>Holiday</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Recipient's name"
                    className={styles.aiInput}
                  />

                  <motion.button
                    className={styles.generateBtn}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sparkles size={16} />
                    Generate Message
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
