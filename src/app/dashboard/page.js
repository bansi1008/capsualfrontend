"use client";
import { useState } from "react";
import { motion } from "framer-motion";
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
  Ruler,
} from "lucide-react";
import styles from "./dashboard.module.css";

// Import components
import DashboardHeader from "./components/DashboardHeader";
import StatsOverview from "./components/StatsOverview";
import CapsualList from "./components/CapsualList";
import CreateCapsualForm from "./components/CreateCapsualForm";
import AiCreateForm from "./components/AiCreateForm";
import AiResponseView from "./components/AiResponseView";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("main");
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
    length: "",
  });

  const [aiResponse, setAiResponse] = useState(null);

  // Mock data for stats
  const stats = [
    { label: "Total Capsuals", value: "24", icon: Mail, color: "primary" },
    { label: "Sent This Month", value: "12", icon: Send, color: "accent" },
    { label: "Scheduled", value: "8", icon: Clock, color: "orange" },
    { label: "Success Rate", value: "98%", icon: Star, color: "success" },
  ];

  // Mock data for recent capsuals
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
  ];

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
      setActiveView("main");
      if (res.ok) {
        console.log("created successfully", data);
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
    const token = localStorage.getItem("authToken");
    try {
      const finalData = {
        occasion:
          aiData.occasion === "Other" ? aiData.customOccasion : aiData.occasion,
        relationship:
          aiData.relationship === "Other"
            ? aiData.customRelationship
            : aiData.relationship,
        tone: aiData.tone === "Other" ? aiData.customTone : aiData.tone,
        lenght: aiData.length,
      };

      const res = await fetch("http://localhost:5000/v1/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalData),
      });

      const data = await res.json();
      if (res.ok) {
        setAiResponse(data.generatedMessage);
      }
    } catch (error) {
      console.error("Error creating AI capsual:", error);
      alert("Failed to create AI capsual. Please try again.");
    }
  };

  const handleFinalSubmit = async () => {
    try {
      setCapsualData((prev) => ({
        ...prev,
        message: aiResponse,
      }));
      setAiData({
        occasion: "",
        relationship: "",
        tone: "",
        customOccasion: "",
        customRelationship: "",
        customTone: "",
        length: "",
      });
      setAiResponse(null);
      setActiveView("create");
    } catch (error) {
      console.error("Error submitting final capsual:", error);
      alert("Failed to submit capsual. Please try again.");
    }
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Dashboard</h1>
          <p className={styles.headerSubtitle}>
            Manage your capsuals and create new ones
          </p>
        </div>
        <nav className={styles.navigation}>
          {activeView === "main" ? (
            <>
              <button
                className={`${styles.navButton} ${styles.createBtn}`}
                onClick={() => setActiveView("create")}
              >
                <Plus className={styles.btnIcon} />
                Create Capsual
              </button>
              <button
                className={`${styles.navButton} ${styles.aiCreateBtn}`}
                onClick={() => setActiveView("ai-create")}
              >
                <WandSparkles className={styles.btnIcon} />
                AI Create
              </button>
            </>
          ) : (
            <button
              className={`${styles.navButton} ${styles.backBtn}`}
              onClick={() => setActiveView("main")}
            >
              <ArrowLeft className={styles.btnIcon} />
              Back to Dashboard
            </button>
          )}
        </nav>
      </header>

      <div className={styles.overview}>
        {activeView === "main" && (
          <>
            <StatsOverview stats={stats} />
            <CapsualList capsuals={recentCapsuals} />
          </>
        )}

        {activeView === "create" && (
          <CreateCapsualForm
            capsualData={capsualData}
            handleInputChange={handleInputChange}
            onSubmit={handleCreateCapsual}
            onCancel={() => setActiveView("main")}
          />
        )}

        {activeView === "ai-create" && (
          <>
            <AiCreateForm
              aiData={aiData}
              handleAiInputChange={handleAiInputChange}
              onSubmit={handleAiCreateCapsual}
              onCancel={() => setActiveView("main")}
            />
            {aiResponse && (
              <AiResponseView
                response={aiResponse}
                onSubmit={handleFinalSubmit}
                onCancel={() => setAiResponse(null)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
