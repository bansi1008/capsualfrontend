"use client";
import { motion } from "framer-motion";
import {
  Calendar,
  Mail,
  Heart,
  Github,
  Twitter,
  Linkedin,
  Send,
} from "lucide-react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <motion.div
          className={styles.footerContent}
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div className={styles.brandSection} variants={fadeInUp}>
            <div className={styles.brand}>
              <Calendar className={styles.brandIcon} />
              <span className={styles.brandName}>Capsual</span>
            </div>
            <p className={styles.brandDescription}>
              Making heartfelt connections through perfectly timed messages.
              Never miss another special moment with AI-powered email
              scheduling.
            </p>
            <div className={styles.socialLinks}>
              <motion.a
                href="#"
                className={styles.socialLink}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="#"
                className={styles.socialLink}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="#"
                className={styles.socialLink}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className={styles.linksSection} variants={fadeInUp}>
            <h4 className={styles.sectionTitle}>Product</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="#features" className={styles.footerLink}>
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className={styles.footerLink}>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#dashboard" className={styles.footerLink}>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#integrations" className={styles.footerLink}>
                  Integrations
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div className={styles.linksSection} variants={fadeInUp}>
            <h4 className={styles.sectionTitle}>Support</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="#help" className={styles.footerLink}>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#contact" className={styles.footerLink}>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#api" className={styles.footerLink}>
                  API Docs
                </a>
              </li>
              <li>
                <a href="#status" className={styles.footerLink}>
                  System Status
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div className={styles.linksSection} variants={fadeInUp}>
            <h4 className={styles.sectionTitle}>Company</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="#about" className={styles.footerLink}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#blog" className={styles.footerLink}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#careers" className={styles.footerLink}>
                  Careers
                </a>
              </li>
              <li>
                <a href="#press" className={styles.footerLink}>
                  Press Kit
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div className={styles.newsletterSection} variants={fadeInUp}>
            <h4 className={styles.sectionTitle}>Stay Connected</h4>
            <p className={styles.newsletterDescription}>
              Get updates on new features and tips for better email scheduling.
            </p>
            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.newsletterInput}
              />
              <motion.button
                className={styles.newsletterBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          className={styles.bottomFooter}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © {currentYear} Capsual. All rights reserved.
            </p>
            <div className={styles.legalLinks}>
              <a href="#privacy" className={styles.legalLink}>
                Privacy Policy
              </a>
              <a href="#terms" className={styles.legalLink}>
                Terms of Service
              </a>
              <a href="#cookies" className={styles.legalLink}>
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Made with love indicator */}
          <motion.div
            className={styles.madeWithLove}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span>Made by Bansi</span>

            <span>for better connections</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className={styles.decorations}>
        <motion.div
          className={styles.decoration1}
          animate={{
            y: [-10, 10, -10],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={styles.decoration2}
          animate={{
            y: [10, -10, 10],
            rotate: [5, -5, 5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
