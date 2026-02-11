"use client";

import React from "react";
import { CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { useDashboardUIStore } from "@/state/useDashboardUIStore";

interface Gap {
  id: string;
  title: string;
  last_on_file: string | null;
  priority: "High" | "Medium" | "Low";
}

interface HealthMapCardProps {
  coveragePercent: number;
  gaps?: Gap[];
  milestones?: {
    Labs: "complete" | "missing" | "unknown";
    Imaging: "complete" | "missing" | "unknown";
    Vitals: "complete" | "missing" | "unknown";
    Medications: "complete" | "missing" | "unknown";
    Screenings: "complete" | "missing" | "unknown";
  };
}

export default function HealthMapCard({
  coveragePercent,
  gaps = [],
  milestones = {
    Labs: "complete",
    Imaging: "missing",
    Vitals: "complete",
    Medications: "unknown",
    Screenings: "missing",
  },
}: HealthMapCardProps) {
  const { openGap, openUpload } = useDashboardUIStore();

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "var(--danger)";
      case "Medium":
        return "var(--warning)";
      default:
        return "var(--info)";
    }
  };

  const getMilestoneStatus = (status: string) => {
    switch (status) {
      case "complete":
        return { icon: <CheckCircle2 size={16} style={{ color: "var(--success)" }} />, color: "var(--success)" };
      case "missing":
        return { icon: <AlertCircle size={16} style={{ color: "var(--warning)" }} />, color: "var(--warning)" };
      default:
        return { icon: <Circle size={16} style={{ color: "var(--text-tertiary)" }} />, color: "var(--text-tertiary)" };
    }
  };

  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "24px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "20px",
        }}
      >
        Complete your health map
      </h2>

      {/* Journey Ring Visual */}
      <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ position: "relative", width: "200px", height: "200px", marginBottom: "16px" }}>
          {/* Ring SVG */}
          <svg width="200" height="200" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="100" cy="100" r="80" fill="none" stroke="var(--surface-alt)" strokeWidth="12" />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="12"
              strokeDasharray={`${2 * Math.PI * 80}`}
              strokeDashoffset={`${2 * Math.PI * 80 * (1 - coveragePercent / 100)}`}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
          </svg>

          {/* Center Percentage */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "32px", fontWeight: 600, color: "var(--text-primary)" }}>
              {coveragePercent}%
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Coverage</div>
          </div>

          {/* Milestones around ring */}
          {[
            { label: "Labs", angle: 0, status: milestones.Labs },
            { label: "Imaging", angle: 72, status: milestones.Imaging },
            { label: "Vitals", angle: 144, status: milestones.Vitals },
            { label: "Medications", angle: 216, status: milestones.Medications },
            { label: "Screenings", angle: 288, status: milestones.Screenings },
          ].map((milestone, idx) => {
            const angleRad = (milestone.angle * Math.PI) / 180;
            const radius = 100;
            const x = 100 + radius * Math.cos(angleRad);
            const y = 100 + radius * Math.sin(angleRad);
            const statusInfo = getMilestoneStatus(milestone.status);

            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {statusInfo.icon}
                <span
                  style={{
                    fontSize: "10px",
                    color: "var(--text-secondary)",
                    whiteSpace: "nowrap",
                    fontWeight: 500,
                  }}
                >
                  {milestone.label}
                </span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            fontSize: "12px",
            color: "var(--text-tertiary)",
            textAlign: "center",
            maxWidth: "240px",
          }}
        >
          Higher coverage improves recommendations and trend accuracy.
        </div>
      </div>

      {/* Missing or outdated list */}
      {gaps.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <h3
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "12px",
            }}
          >
            Missing or outdated
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {gaps.slice(0, 3).map((gap) => (
              <div
                key={gap.id}
                style={{
                  padding: "12px",
                  backgroundColor: "var(--surface-alt)",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "var(--text-primary)",
                        marginBottom: "4px",
                      }}
                    >
                      {gap.title}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Last on file: {formatDate(gap.last_on_file)}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: getPriorityColor(gap.priority),
                      backgroundColor: `${getPriorityColor(gap.priority)}20`,
                      padding: "4px 8px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span>▲</span> {gap.priority}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => openGap(gap.id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "var(--primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    Fix now
                  </button>
                  <button
                    onClick={() => openUpload(gap.id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "transparent",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    Upload
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer link */}
      {gaps.length > 0 && (
        <button
          onClick={() => {
            // Navigate to documents view
            window.location.href = "/documents";
          }}
          style={{
            fontSize: "12px",
            color: "var(--primary)",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
          }}
        >
          View all documents
        </button>
      )}
    </div>
  );
}



