"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import RegionUnavailableModal from "@/components/modals/RegionUnavailableModal";
import { arcTokens } from "@/lib/ui/arcTokens";

// Blueprint data - will swap based on selection
const blueprints = {
  "caffeine-timing": {
    name: "Caffeine Timing Blueprint",
    phase: "Intervention",
    day: 6,
    totalDays: 14,
    dataCompleteness: 86,
    evidenceConfidence: "Moderate",
    confidenceTrend: "↑",
    clinicalIntent: "Reduce circadian disruption and sympathetic overactivation.",
    duration: "14 days (locked)",
    intervention: [
      "First caffeine ≥90 min after waking",
      "Last caffeine ≥9 h before sleep"
    ],
    expectedAdaptation: "5–10 days",
    signals: [
      {
        name: "Sleep Onset Latency (minutes)",
        why: "Time to fall asleep reflects nervous system arousal and caffeine clearance."
      },
      {
        name: "Nocturnal Fragmentation Index",
        why: "Frequent awakenings indicate disrupted sleep architecture."
      },
      {
        name: "Daytime Alertness Score",
        why: "Measures whether sleep changes improve real-world energy."
      },
      {
        name: "Autonomic Balance (HRV)",
        why: "Higher HRV suggests better stress recovery and parasympathetic tone."
      }
    ],
    dataSources: [
      "Wearable sleep tracking (duration + awakenings)",
      "Morning subjective check-in (1–10)",
      "Caffeine timing log (yes/no compliance)"
    ],
    compliance: 92,
    missedCutoff: 1,
    flaggedNotes: 2,
    trends: [
      { metric: "Sleep latency", change: "↓ 18%", color: "success" },
      { metric: "Night awakenings", change: "↓ 1.2/night", color: "success" },
      { metric: "HRV (7-day avg)", change: "↑ 9%", color: "success" },
      { metric: "Afternoon crash severity", change: "↓", color: "success" }
    ],
    investigatorNote: "Sleep improved by day 4. Mild morning grogginess initially. No increase in anxiety."
  }
};

const blueprintGroups = [
  {
    category: "Sleep & Circadian",
    items: [
      { id: "sleep-toolkit", name: "Sleep Toolkit" },
      { id: "caffeine-timing", name: "Caffeine Timing Blueprint" },
      { id: "sleep-temperature", name: "Sleep Temperature Protocol" },
      { id: "light-protocol", name: "Morning & Evening Light Protocol" }
    ]
  },
  {
    category: "Fitness & Cardiovascular",
    items: [
      { id: "foundational-fitness", name: "Foundational Fitness Protocol" },
      { id: "zone2-endurance", name: "Zone 2 Endurance Protocol" },
      { id: "hiit-protocol", name: "HIIT Heart-Rate Protocol" },
      { id: "resistance-periodization", name: "Resistance Periodization Blueprint" }
    ]
  },
  {
    category: "Stress & Focus",
    items: [
      { id: "nsdr", name: "NSDR / Yoga Nidra" },
      { id: "stress-control", name: "Stress Control & Physiological Sigh" },
      { id: "focus-toolkit", name: "Focus Toolkit" },
      { id: "meditation", name: "Short Meditation for Refocusing" }
    ]
  },
  {
    category: "Metabolic & Nutrition",
    items: [
      { id: "tre", name: "Time-Restricted Eating" },
      { id: "soleus", name: "Soleus Push-Up Protocol" },
      { id: "nutrition", name: "Foundational Nutrition Blueprint" }
    ]
  }
];

// Dashboard card component (matches command center cards)
function DashboardCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      style={{
        backgroundColor: arcTokens.surface.card,
        border: `1px solid ${arcTokens.border.default}`,
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export default function BlueprintDemoPage() {
  const [selectedBlueprint, setSelectedBlueprint] = useState("caffeine-timing");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentBlueprint = blueprints[selectedBlueprint as keyof typeof blueprints] || blueprints["caffeine-timing"];

  // Find current blueprint display name
  const getBlueprintName = (id: string) => {
    for (const group of blueprintGroups) {
      const item = group.items.find(item => item.id === id);
      if (item) return item.name;
    }
    return "Active Blueprint";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleStartBlueprint = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <DashboardLayout>
        <div className="dashboard-container blueprint-demo-page relative z-10" style={{ position: "relative" }}>
          {/* Demo Banner */}
          <div
            style={{
              position: "absolute",
              top: "32px",
              right: "32px",
              padding: "8px 12px",
              borderRadius: "8px",
              backgroundColor: arcTokens.surface.card,
              border: `1px solid ${arcTokens.border.default}`,
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                color: arcTokens.text.tertiary,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Demo data — not your personal records
            </span>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Top Section - Active Self-Experiment Header */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h1 className="dashboard-h1 mb-0">Active Self-Experiment</h1>
                    {/* Blueprint Selector Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          border: `1px solid ${arcTokens.border.default}`,
                          backgroundColor: arcTokens.surface.card,
                          color: arcTokens.text.primary,
                          fontSize: "14px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = arcTokens.border.strong;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = arcTokens.border.default;
                        }}
                      >
                        {getBlueprintName(selectedBlueprint)}{" "}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{
                            transition: "transform 0.2s",
                            transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        >
                          <path
                            d="M4 6L8 10L12 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      {isDropdownOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            marginTop: "8px",
                            width: "320px",
                            borderRadius: "8px",
                            border: `1px solid ${arcTokens.border.default}`,
                            backgroundColor: arcTokens.surface.card,
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                            zIndex: 50,
                            maxHeight: "384px",
                            overflowY: "auto",
                          }}
                        >
                          {blueprintGroups.map((group, groupIdx) => (
                            <div key={groupIdx} style={{ borderBottom: `1px solid ${arcTokens.border.default}`, borderBottomWidth: groupIdx === blueprintGroups.length - 1 ? "0" : "1px" }}>
                              <div
                                style={{
                                  padding: "8px 16px",
                                  fontSize: "11px",
                                  fontWeight: 600,
                                  color: arcTokens.text.secondary,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.05em",
                                  backgroundColor: arcTokens.bg.panel,
                                }}
                              >
                                {group.category}
                              </div>
                              {group.items.map((item) => (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    setSelectedBlueprint(item.id);
                                    setIsDropdownOpen(false);
                                  }}
                                  style={{
                                    width: "100%",
                                    textAlign: "left",
                                    padding: "8px 16px",
                                    fontSize: "14px",
                                    color: arcTokens.text.primary,
                                    backgroundColor: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                  }}
                                >
                                  {item.name}
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="dashboard-description text-base max-w-2xl">
                    Personalized protocol testing with real-world physiological signals.
                  </p>
                </div>

                {/* Right-side meta */}
                <div className="flex flex-col gap-2 text-sm">
                  <div style={{ color: arcTokens.text.secondary }}>
                    <span style={{ color: arcTokens.text.tertiary }}>Blueprint:</span> {currentBlueprint.name}
                  </div>
                  <div style={{ color: arcTokens.text.secondary }}>
                    <span style={{ color: arcTokens.text.tertiary }}>Phase:</span> {currentBlueprint.phase} (Day {currentBlueprint.day} of {currentBlueprint.totalDays})
                  </div>
                  <div style={{ color: arcTokens.text.secondary }}>
                    <span style={{ color: arcTokens.text.tertiary }}>Data Completeness:</span> {currentBlueprint.dataCompleteness}%
                  </div>
                  <div style={{ color: arcTokens.text.secondary }}>
                    <span style={{ color: arcTokens.text.tertiary }}>Evidence Confidence:</span> {currentBlueprint.evidenceConfidence} {currentBlueprint.confidenceTrend}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Active Blueprint - 6 Card Grid */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <DashboardCard>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div>
                    <h2 className="dashboard-h2 mb-2">Active Blueprint</h2>
                    <p className="dashboard-description text-sm">
                      Structured protocol testing with real-world physiological signals.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Card 1 - Blueprint Overview */}
                    <motion.div
                      style={{
                        padding: "20px",
                        borderRadius: "12px",
                        backgroundColor: arcTokens.bg.panel,
                        border: `1px solid ${arcTokens.border.default}`,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                    >
                      <h3 style={{ fontSize: "16px", fontWeight: 600, color: arcTokens.text.primary, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: arcTokens.accent.primary }}></div>
                        Blueprint Overview
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
                        <div>
                          <div style={{ color: arcTokens.text.primary, fontWeight: 500, marginBottom: "4px" }}>{currentBlueprint.name}</div>
                        </div>
                        <div>
                          <div style={{ color: arcTokens.text.secondary, marginBottom: "4px" }}>
                            <span style={{ color: arcTokens.text.tertiary }}>Clinical intent:</span>
                          </div>
                          <div style={{ color: arcTokens.text.secondary }}>{currentBlueprint.clinicalIntent}</div>
                        </div>
                        <div>
                          <div style={{ color: arcTokens.text.secondary, marginBottom: "4px" }}>
                            <span style={{ color: arcTokens.text.tertiary }}>Duration:</span>
                          </div>
                          <div style={{ color: arcTokens.text.secondary }}>{currentBlueprint.duration}</div>
                        </div>
                        <div>
                          <div style={{ color: arcTokens.text.secondary, marginBottom: "4px" }}>
                            <span style={{ color: arcTokens.text.tertiary }}>Intervention:</span>
                          </div>
                          <ul style={{ marginTop: "4px", paddingLeft: "0", listStyle: "none" }}>
                            {currentBlueprint.intervention.map((item, idx) => (
                              <li key={idx} style={{ color: arcTokens.text.secondary, display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "4px" }}>
                                <span style={{ color: arcTokens.accent.primary }}>•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div style={{ color: arcTokens.text.secondary, marginBottom: "4px" }}>
                            <span style={{ color: arcTokens.text.tertiary }}>Expected adaptation window:</span>
                          </div>
                          <div style={{ color: arcTokens.text.secondary }}>{currentBlueprint.expectedAdaptation}</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Card 2 - Signals Being Measured */}
                    <motion.div
                      style={{
                        padding: "20px",
                        borderRadius: "12px",
                        backgroundColor: arcTokens.bg.panel,
                        border: `1px solid ${arcTokens.border.default}`,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <h3 style={{ fontSize: "16px", fontWeight: 600, color: arcTokens.text.primary, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: arcTokens.accent.primary }}></div>
                        Signals Being Measured
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {currentBlueprint.signals.map((signal, idx) => (
                          <div key={idx} style={{ borderBottom: idx < currentBlueprint.signals.length - 1 ? `1px solid ${arcTokens.border.default}` : "none", paddingBottom: idx < currentBlueprint.signals.length - 1 ? "12px" : "0" }}>
                            <div style={{ fontSize: "14px", fontWeight: 500, color: arcTokens.text.primary, marginBottom: "4px" }}>{signal.name}</div>
                            <div style={{ fontSize: "12px", color: arcTokens.text.tertiary }}>
                              <span style={{ color: arcTokens.text.secondary }}>Why it matters:</span> {signal.why}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Card 3 - Data Sources */}
                    <motion.div
                      style={{
                        padding: "20px",
                        borderRadius: "12px",
                        backgroundColor: arcTokens.bg.panel,
                        border: `1px solid ${arcTokens.border.default}`,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.25 }}
                    >
                      <h3 style={{ fontSize: "16px", fontWeight: 600, color: arcTokens.text.primary, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: arcTokens.accent.primary }}></div>
                        Data Sources
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {currentBlueprint.dataSources.map((source, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: arcTokens.text.secondary }}>
                            <span style={{ color: arcTokens.accent.primary }}>•</span>
                            <span>{source}</span>
                          </div>
                        ))}
                        <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: `1px solid ${arcTokens.border.default}` }}>
                          <div style={{ fontSize: "12px", color: arcTokens.accent.primary, display: "flex", alignItems: "center", gap: "8px" }}>
                            <span>Status: Connected</span>
                            <span style={{ color: arcTokens.semantic.success }}>✓</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Card 4 - Compliance & Adherence */}
                    <motion.div
                      style={{
                        padding: "20px",
                        borderRadius: "12px",
                        backgroundColor: arcTokens.bg.panel,
                        border: `1px solid ${arcTokens.border.default}`,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <h3 style={{ fontSize: "16px", fontWeight: 600, color: arcTokens.text.primary, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: arcTokens.accent.primary }}></div>
                        Compliance & Adherence
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
                        <div>
                          <div style={{ color: arcTokens.text.secondary, marginBottom: "4px" }}>
                            <span style={{ color: arcTokens.text.tertiary }}>Protocol adherence:</span> {currentBlueprint.compliance}%
                          </div>
                        </div>
                        <div>
                          <div style={{ color: arcTokens.text.secondary, marginBottom: "4px" }}>
                            <span style={{ color: arcTokens.text.tertiary }}>Missed caffeine cutoff:</span> {currentBlueprint.missedCutoff} day
                          </div>
                        </div>
                        <div>
                          <div style={{ color: arcTokens.text.secondary }}>
                            <span style={{ color: arcTokens.text.tertiary }}>Notes flagged:</span> {currentBlueprint.flaggedNotes}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Card 5 - Early Signal Trends */}
                    <motion.div
                      style={{
                        padding: "20px",
                        borderRadius: "12px",
                        backgroundColor: arcTokens.bg.panel,
                        border: `1px solid ${arcTokens.border.default}`,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.35 }}
                    >
                      <h3 style={{ fontSize: "16px", fontWeight: 600, color: arcTokens.text.primary, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: arcTokens.accent.primary }}></div>
                        Early Signal Trends
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
                        {currentBlueprint.trends.map((trend, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span style={{ color: arcTokens.text.secondary }}>{trend.metric}:</span>
                            <span style={{ fontWeight: 500, color: trend.color === "success" ? arcTokens.semantic.success : arcTokens.semantic.danger }}>
                              {trend.change}
                            </span>
                          </div>
                        ))}
                        <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: `1px solid ${arcTokens.border.default}` }}>
                          <div style={{ fontSize: "12px", color: arcTokens.text.tertiary, fontStyle: "italic" }}>Signals emerging — not yet conclusive</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Card 6 - Investigator Notes */}
                    <motion.div
                      style={{
                        padding: "20px",
                        borderRadius: "12px",
                        backgroundColor: arcTokens.bg.panel,
                        border: `1px solid ${arcTokens.border.default}`,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <h3 style={{ fontSize: "16px", fontWeight: 600, color: arcTokens.text.primary, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: arcTokens.accent.primary }}></div>
                        Investigator Notes
                      </h3>
                      <textarea
                        defaultValue={currentBlueprint.investigatorNote}
                        readOnly
                        style={{
                          width: "100%",
                          height: "128px",
                          padding: "12px",
                          borderRadius: "8px",
                          backgroundColor: arcTokens.bg.page,
                          border: `1px solid ${arcTokens.border.default}`,
                          fontSize: "14px",
                          color: arcTokens.text.primary,
                          fontFamily: "inherit",
                          resize: "none",
                          outline: "none",
                        }}
                        placeholder="Add your observations here..."
                      />
                    </motion.div>
                  </div>
                </div>
              </DashboardCard>
            </motion.section>

            {/* Adjunct Protocols Section */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <DashboardCard>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <h3 className="dashboard-h2">Adjunct Protocols (Held Constant During Experiment)</h3>
                    <p className="dashboard-description text-sm">
                      These variables are held constant to isolate causal effects.
                    </p>
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%" }}>
                      <thead>
                        <tr style={{ borderBottom: `1px solid ${arcTokens.border.strong}` }}>
                          <th style={{ textAlign: "left", padding: "12px 16px", fontSize: "12px", fontWeight: 400, color: arcTokens.text.secondary, textTransform: "uppercase", letterSpacing: "0.05em" }}>Supplement</th>
                          <th style={{ textAlign: "left", padding: "12px 16px", fontSize: "12px", fontWeight: 400, color: arcTokens.text.secondary, textTransform: "uppercase", letterSpacing: "0.05em" }}>Dose</th>
                          <th style={{ textAlign: "left", padding: "12px 16px", fontSize: "12px", fontWeight: 400, color: arcTokens.text.secondary, textTransform: "uppercase", letterSpacing: "0.05em" }}>Timing</th>
                          <th style={{ textAlign: "left", padding: "12px 16px", fontSize: "12px", fontWeight: 400, color: arcTokens.text.secondary, textTransform: "uppercase", letterSpacing: "0.05em" }}>Purpose</th>
                          <th style={{ textAlign: "left", padding: "12px 16px", fontSize: "12px", fontWeight: 400, color: arcTokens.text.secondary, textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <motion.tr
                          style={{ borderBottom: `1px solid ${arcTokens.border.default}`, transition: "background-color 0.2s" }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          <td style={{ padding: "16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: arcTokens.accent.primary }}></div>
                              <span style={{ fontSize: "14px", fontWeight: 600, color: arcTokens.text.primary }}>Magnesium glycinate</span>
                            </div>
                          </td>
                          <td style={{ padding: "16px", fontSize: "14px", color: arcTokens.text.secondary }}>400 mg</td>
                          <td style={{ padding: "16px", fontSize: "14px", color: arcTokens.text.secondary }}>Evening</td>
                          <td style={{ padding: "16px", fontSize: "14px", color: arcTokens.text.secondary }}>Sleep support</td>
                          <td style={{ padding: "16px", fontSize: "14px", color: arcTokens.semantic.success }}>Stable</td>
                        </motion.tr>
                        <motion.tr
                          style={{ borderBottom: `1px solid ${arcTokens.border.default}`, transition: "background-color 0.2s" }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.35 }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          <td style={{ padding: "16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: arcTokens.accent.primary }}></div>
                              <span style={{ fontSize: "14px", fontWeight: 600, color: arcTokens.text.primary }}>Omega-3</span>
                            </div>
                          </td>
                          <td style={{ padding: "16px", fontSize: "14px", color: arcTokens.text.secondary }}>2 g</td>
                          <td style={{ padding: "16px", fontSize: "14px", color: arcTokens.text.secondary }}>With meals</td>
                          <td style={{ padding: "16px", fontSize: "14px", color: arcTokens.text.secondary }}>Inflammation control</td>
                          <td style={{ padding: "16px", fontSize: "14px", color: arcTokens.semantic.success }}>Stable</td>
                        </motion.tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </DashboardCard>
            </motion.section>

            {/* Risk-Focused Micro-Plans */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <DashboardCard>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <h3 className="dashboard-h2">Risk-Focused Micro-Plans</h3>
                    <p className="dashboard-description text-sm">
                      Adaptive intelligence that activates when specific risk thresholds are met.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      style={{
                        padding: "20px",
                        borderRadius: "12px",
                        backgroundColor: arcTokens.bg.panel,
                        border: `1px solid ${arcTokens.border.strong}`,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: arcTokens.accent.primary }}></div>
                        <h4 style={{ fontSize: "16px", fontWeight: 600, color: arcTokens.text.primary }}>Sleep Disruption Risk</h4>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div>
                          <h5 style={{ fontSize: "11px", fontWeight: 600, color: arcTokens.text.secondary, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Trigger</h5>
                          <p style={{ fontSize: "14px", color: arcTokens.text.secondary }}>Sleep efficiency &lt;85% for 3 consecutive nights</p>
                        </div>

                        <div style={{ paddingTop: "12px", borderTop: `1px solid ${arcTokens.border.default}` }}>
                          <h5 style={{ fontSize: "11px", fontWeight: 600, color: arcTokens.text.secondary, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            Auto-Activated Actions
                          </h5>
                          <ul style={{ display: "flex", flexDirection: "column", gap: "8px", paddingLeft: "0", listStyle: "none" }}>
                            <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: arcTokens.text.secondary }}>
                              <span style={{ color: arcTokens.accent.primary }}>•</span>
                              <span>Advance caffeine cutoff by 60 min</span>
                            </li>
                            <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: arcTokens.text.secondary }}>
                              <span style={{ color: arcTokens.accent.primary }}>•</span>
                              <span>Add 10 min NSDR post-lunch</span>
                            </li>
                            <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: arcTokens.text.secondary }}>
                              <span style={{ color: arcTokens.accent.primary }}>•</span>
                              <span>Evening light dimming protocol</span>
                            </li>
                          </ul>
                        </div>

                        <div style={{ paddingTop: "12px", borderTop: `1px solid ${arcTokens.border.default}` }}>
                          <h5 style={{ fontSize: "11px", fontWeight: 600, color: arcTokens.text.secondary, marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            Expected Benefit
                          </h5>
                          <p style={{ fontSize: "14px", color: arcTokens.text.secondary }}>
                            Stabilize sleep architecture and reduce sleep debt accumulation.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </DashboardCard>
            </motion.section>

            {/* Red Flags & Action Thresholds */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <DashboardCard>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <h3 className="dashboard-h2">Red Flags & Action Thresholds</h3>
                    <p className="dashboard-description text-sm">
                      Clear guidelines for when to monitor, retest, or seek medical attention based on signal changes.
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <motion.div
                      style={{
                        padding: "20px",
                        borderRadius: "12px",
                        backgroundColor: arcTokens.bg.panel,
                        border: `1px solid ${arcTokens.border.default}`,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.55 }}
                    >
                      <h4 style={{ fontSize: "16px", fontWeight: 600, color: arcTokens.text.primary, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: arcTokens.semantic.danger, opacity: 0.6 }}></div>
                        Autonomic Stress Load
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h5 style={{ fontSize: "11px", fontWeight: 600, color: arcTokens.text.secondary, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            When to Monitor
                          </h5>
                          <ul style={{ display: "flex", flexDirection: "column", gap: "6px", paddingLeft: "0", listStyle: "none" }}>
                            <li style={{ fontSize: "12px", color: arcTokens.text.tertiary }}>• HRV ↓ &gt;20% from baseline for 5 days</li>
                            <li style={{ fontSize: "12px", color: arcTokens.text.tertiary }}>• Resting HR ↑ &gt;10 bpm from baseline</li>
                          </ul>
                        </div>

                        <div>
                          <h5 style={{ fontSize: "11px", fontWeight: 600, color: arcTokens.text.secondary, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            When to Retest
                          </h5>
                          <p style={{ fontSize: "12px", color: arcTokens.text.tertiary }}>After 7–10 days of protocol adjustment</p>
                        </div>

                        <div>
                          <h5 style={{ fontSize: "11px", fontWeight: 600, color: arcTokens.semantic.danger, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.8 }}>
                            When to Seek Review
                          </h5>
                          <p style={{ fontSize: "12px", color: arcTokens.text.tertiary }}>
                            Persistent fatigue, palpitations, or sleep fragmentation
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </DashboardCard>
            </motion.section>

            {/* CTA Button */}
            <div style={{ textAlign: "center", paddingTop: "16px" }}>
              <button
                onClick={handleStartBlueprint}
                style={{
                  padding: "12px 24px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: 600,
                  backgroundColor: arcTokens.accent.soft,
                  color: arcTokens.accent.primary,
                  border: `1px solid ${arcTokens.border.strong}`,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = arcTokens.accent.muted;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = arcTokens.accent.soft;
                }}
              >
                Start building your real blueprint
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>

      <RegionUnavailableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source="blueprint_demo"
      />
    </>
  );
}
