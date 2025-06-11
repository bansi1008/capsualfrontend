"use client";
import { motion } from "framer-motion";
import { Calendar, Send, Sparkles, ArrowRight, Play } from "lucide-react";
import styles from "../styles/Hero.module.css";

const Hero = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Main Heading */}
          <motion.div className={styles.badge} variants={fadeInUp}>
            <Sparkles className={styles.badgeIcon} />
            <span>AI-Powered Email Scheduling</span>
          </motion.div>

          <motion.h1 className={styles.title} variants={fadeInUp}>
            Schedule{" "}
            <span className={styles.highlight}>Heartfelt Messages</span> for
            Life's Special Moments
          </motion.h1>

          <motion.p className={styles.subtitle} variants={fadeInUp}>
            Never miss another birthday, anniversary, or special occasion. Let
            AI help you craft the perfect message and deliver it at just the
            right time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className={styles.ctaButtons} variants={fadeInUp}>
            <motion.button
              className={styles.primaryBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className={styles.btnIcon} />
              Start Scheduling
              <ArrowRight className={styles.btnIcon} />
            </motion.button>

            <motion.button
              className={styles.secondaryBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className={styles.btnIcon} />
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Features Grid */}
          <motion.div className={styles.features} variants={fadeInUp}>
            <div className={styles.feature}>
              <Calendar className={styles.featureIcon} />
              <span>Smart Scheduling</span>
            </div>
            <div className={styles.feature}>
              <Send className={styles.featureIcon} />
              <span>Auto Delivery</span>
            </div>
            <div className={styles.feature}>
              <Sparkles className={styles.featureIcon} />
              <span>AI Generated</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Images */}
        <motion.div
          className={styles.imageSection}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className={styles.imageGrid}>
            <motion.div
              className={styles.imageCard}
              animate={floatingAnimation}
              style={{ animationDelay: "0s" }}
            >
              <img src="/assest/cap_1.jpg" alt="Email scheduling interface" />
              <div className={styles.imageOverlay}>
                <span>Birthday Reminder</span>
              </div>
            </motion.div>

            <motion.div
              className={styles.imageCard}
              animate={floatingAnimation}
              style={{ animationDelay: "1s" }}
            >
              <img src="/assest/cap_2.jpg" alt="AI message generation" />
              <div className={styles.imageOverlay}>
                <span>AI-Generated Message</span>
              </div>
            </motion.div>

            <motion.div
              className={styles.imageCard}
              animate={floatingAnimation}
              style={{ animationDelay: "2s" }}
            >
              <img src="/assest/cap_3.jpg" alt="Calendar integration" />
              <div className={styles.imageOverlay}>
                <span>Calendar Sync</span>
              </div>
            </motion.div>

            <motion.div
              className={styles.imageCard}
              animate={floatingAnimation}
              style={{ animationDelay: "3s" }}
            >
              <img src="/assest/cap_4.jpg" alt="Message templates" />
              <div className={styles.imageOverlay}>
                <span>Custom Templates</span>
              </div>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <motion.div
            className={styles.floatingElement}
            animate={{
              y: [-20, 20, -20],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Calendar className={styles.floatingIcon} />
          </motion.div>

          <motion.div
            className={styles.floatingElement2}
            animate={{
              y: [20, -20, 20],
              rotate: [5, -5, 5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Send className={styles.floatingIcon} />
          </motion.div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
      </div>
    </section>
  );
};

export default Hero;
