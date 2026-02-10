"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { investigationData } from "@/lib/demo/demoInvestigationData";

export default function InvestigationDemoPage() {
  // Simple chart data for comparison preview
  const baselineData = [102, 101, 103, 102, 101, 102];
  const observationData = [102, 105, 108, 112, 115, 118];

  return (
    <DashboardLayout>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #081214 0%, #071618 100%)",
          padding: "32px",
          position: "relative",
        }}
      >
        {/* Demo Banner */}
        <div
          style={{
            position: "absolute",
            top: "32px",
            right: "32px",
            padding: "8px 12px",
            borderRadius: "8px",
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              color: "rgba(143,166,163,0.78)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Demo investigation — not your personal data
          </span>
        </div>

        {/* Page Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: "rgba(231,240,238,0.95)",
              marginBottom: "8px",
            }}
          >
            Investigation — LDL Response to Diet Pattern
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(143,166,163,0.78)",
              lineHeight: 1.5,
            }}
          >
            Example investigation built from sample timeline + signal history.
          </p>
        </div>

        {/* Investigation Question Card */}
        <div
          style={{
            marginBottom: "24px",
            padding: "20px",
            borderRadius: "16px",
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "rgba(231,240,238,0.95)",
              marginBottom: "12px",
            }}
          >
            Investigation question
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(231,240,238,0.95)",
              marginBottom: "16px",
              lineHeight: 1.5,
            }}
          >
            {investigationData.question}
          </p>
          <div
            style={{
              display: "flex",
              gap: "24px",
              fontSize: "12px",
              color: "rgba(143,166,163,0.78)",
            }}
          >
            <div>
              <span style={{ color: "rgba(143,166,163,0.65)" }}>Baseline period: </span>
              <span>{investigationData.baselinePeriod}</span>
            </div>
            <div>
              <span style={{ color: "rgba(143,166,163,0.65)" }}>Observation period: </span>
              <span>{investigationData.observationPeriod}</span>
            </div>
          </div>
        </div>

        {/* Baseline Signals Card */}
        <div
          style={{
            marginBottom: "24px",
            padding: "20px",
            borderRadius: "16px",
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "rgba(231,240,238,0.95)",
              marginBottom: "16px",
            }}
          >
            Baseline context (before investigation)
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {investigationData.baselineSignals.map((signal) => (
              <div
                key={signal.id}
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "rgba(231,240,238,0.95)",
                        marginBottom: "4px",
                      }}
                    >
                      {signal.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "rgba(231,240,238,0.95)",
                        }}
                      >
                        {signal.value}
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "rgba(143,166,163,0.78)",
                        }}
                      >
                        {signal.unit}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(143,166,163,0.65)",
                    }}
                  >
                    {signal.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking Plan Card */}
        <div
          style={{
            marginBottom: "24px",
            padding: "20px",
            borderRadius: "16px",
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "rgba(231,240,238,0.95)",
              marginBottom: "16px",
            }}
          >
            What this investigation tracks
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {investigationData.trackingPlan.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "rgba(110,211,194,0.95)",
                      marginTop: "2px",
                    }}
                  >
                    →
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "rgba(231,240,238,0.95)",
                        marginBottom: "4px",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "rgba(143,166,163,0.78)",
                      }}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Preview Card */}
        <div
          style={{
            marginBottom: "24px",
            padding: "20px",
            borderRadius: "16px",
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "rgba(231,240,238,0.95)",
              marginBottom: "16px",
            }}
          >
            Early comparison view (example)
          </h2>
          <div style={{ marginBottom: "16px" }}>
            {/* Simple chart visualization */}
            <div style={{ height: "160px", position: "relative" }}>
              <svg width="100%" height="160" style={{ display: "block" }} viewBox="0 0 400 160" preserveAspectRatio="none">
                {/* Baseline ghost band */}
                <rect
                  x="0"
                  y="60"
                  width="200"
                  height="40"
                  fill="rgba(143,166,163,0.08)"
                  rx="4"
                />
                {/* Baseline line */}
                <polyline
                  points={baselineData
                    .map((val, i) => {
                      const x = (i / (baselineData.length - 1)) * 200;
                      const y = 80 - (val - 100) * 2;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                  fill="none"
                  stroke="rgba(143,166,163,0.3)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {/* Investigation data line */}
                <polyline
                  points={observationData
                    .map((val, i) => {
                      const x = 200 + (i / (observationData.length - 1)) * 200;
                      const y = 80 - (val - 100) * 2;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                  fill="none"
                  stroke="rgba(110,211,194,0.95)"
                  strokeWidth="2"
                />
                {/* Investigation dots */}
                {observationData.map((val, i) => {
                  const x = 200 + (i / (observationData.length - 1)) * 200;
                  const y = 80 - (val - 100) * 2;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="rgba(110,211,194,0.95)"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(143,166,163,0.78)",
              lineHeight: 1.5,
            }}
          >
            {investigationData.comparisonSummary}
          </p>
        </div>

        {/* Interpretation Card */}
        <div
          style={{
            marginBottom: "32px",
            padding: "20px",
            borderRadius: "16px",
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "rgba(231,240,238,0.95)",
              marginBottom: "12px",
            }}
          >
            What this could mean (example only)
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(143,166,163,0.78)",
              lineHeight: 1.5,
              marginBottom: "12px",
            }}
          >
            {investigationData.interpretation}
          </p>
          <p
            style={{
              fontSize: "11px",
              color: "rgba(143,166,163,0.5)",
              fontStyle: "italic",
            }}
          >
            This is example demo data.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

