"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar, Mail, Sparkles, User, LogIn } from "lucide-react";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handlechange = (event) => {
    console.log("Input Name:", event.target.name);

    const { name, value } = event.target;
    setform((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("Updated form:", form);
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const signup = async () => {
    try {
      const res = await fetch("http://localhost:5000/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          confirmpassword: form.confirmpassword,
        }),
      });
      console.log("Signin attempt:", form);
      const data = await res.json();

      if (res.ok) {
        console.log("sign in sucess", data.error);
        router.push("/dashboard");
      } else {
        console.log("error:", data.message);
      }
    } catch (error) {
      console.error("Network or server error:", error.message);
    }
  };
  const signin = async () => {
    console.log("sign in press");
    try {
      const res = await fetch("http://localhost:5000/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });
      console.log("Signin attempt:", form);
      const data = await res.json();
      if (res.ok) {
        console.log("sign in sucess", data.error);
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          console.log("Token stored successfully!");
        } else {
          console.error("No token received.");
        }

        router.push("/dashboard");
      } else {
        console.log("error:", data.message);
      }
    } catch (error) {
      console.error("Network or server error:", error.message);
    }
  };

  const handleAuthAction = (event) => {
    event.preventDefault();

    if (authMode === "signin") {
      signin();
    } else {
      signup();
    }
  };

  return (
    <>
      <motion.nav
        className={styles.navbar}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.container}>
          {/* Logo */}
          <motion.div
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Calendar className={styles.logoIcon} />
            <span className={styles.logoText}>Capsual</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className={styles.navLinks}>
            <motion.a
              href="#features"
              className={styles.navLink}
              whileHover={{ y: -2 }}
            >
              <Mail size={18} />
              Features
            </motion.a>
            <motion.a
              href="#ai-generator"
              className={styles.navLink}
              whileHover={{ y: -2 }}
            >
              <Sparkles size={18} />
              AI Generator
            </motion.a>
            <motion.a
              href="#dashboard"
              className={styles.navLink}
              whileHover={{ y: -2 }}
            >
              <User size={18} />
              Dashboard
            </motion.a>
          </div>

          {/* Auth Buttons */}
          <div className={styles.authButtons}>
            <motion.button
              className={styles.signInBtn}
              onClick={() => openAuthModal("signin")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogIn size={18} />
              Sign In
            </motion.button>
            <motion.button
              className={styles.signUpBtn}
              onClick={() => openAuthModal("signup")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={styles.menuButton}
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.a
                href="#features"
                className={styles.mobileNavLink}
                whileHover={{ x: 10 }}
                onClick={() => setIsOpen(false)}
              >
                <Mail size={18} />
                Features
              </motion.a>
              <motion.a
                href="#ai-generator"
                className={styles.mobileNavLink}
                whileHover={{ x: 10 }}
                onClick={() => setIsOpen(false)}
              >
                <Sparkles size={18} />
                AI Generator
              </motion.a>
              <motion.a
                href="#dashboard"
                className={styles.mobileNavLink}
                whileHover={{ x: 10 }}
                onClick={() => setIsOpen(false)}
              >
                <User size={18} />
                Dashboard
              </motion.a>
              <div className={styles.mobileAuthButtons}>
                <button
                  className={styles.mobileSignInBtn}
                  onClick={() => {
                    openAuthModal("signin");
                    setIsOpen(false);
                  }}
                >
                  Sign In
                </button>
                <button
                  className={styles.mobileSignUpBtn}
                  onClick={() => {
                    openAuthModal("signup");
                    setIsOpen(false);
                  }}
                >
                  Sign Up
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAuthModal(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h2>
                  {authMode === "signin" ? "Welcome Back!" : "Join Capsual"}
                </h2>
                <button
                  className={styles.closeButton}
                  onClick={() => setShowAuthModal(false)}
                >
                  <X size={24} />
                </button>
              </div>

              <form className={styles.authForm}>
                {authMode === "signup" && (
                  <div className={styles.inputGroup}>
                    <label>Full name</label>
                    <input
                      type="email"
                      name="name"
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={handlechange}
                    />
                  </div>
                )}
                <div className={styles.inputGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handlechange}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handlechange}
                  />
                </div>

                {authMode === "signup" && (
                  <div className={styles.inputGroup}>
                    <label>Confirm Password</label>
                    <input
                      type="confirmpassword"
                      name="confirmpassword"
                      placeholder="Confirm your password"
                      value={form.confirmpassword}
                      onChange={handlechange}
                    />
                  </div>
                )}

                <motion.button
                  type="submit"
                  className={styles.submitButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAuthAction}
                >
                  {authMode === "signin" ? "Sign In" : "Create Account"}
                </motion.button>
              </form>

              <div className={styles.authSwitch}>
                {authMode === "signin" ? (
                  <p>
                    Don't have an account?{" "}
                    <button onClick={() => setAuthMode("signup")}>
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button onClick={() => setAuthMode("signin")}>
                      Sign in
                    </button>
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
