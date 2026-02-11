"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface StrategicModePanelProps {
  title: string;
  status: string;
  description: string;
  dataInputs: string[];
  processSteps: string[];
  outcomes: string[];
  primaryCTA: string;
  secondaryCTA: string;
  primaryCTALink: string;
  secondaryCTALink: string;
}

export default function StrategicModePanel({
  title,
  status,
  description,
  dataInputs,
  processSteps,
  outcomes,
  primaryCTA,
  secondaryCTA,
  primaryCTALink,
  secondaryCTALink,
}: StrategicModePanelProps) {
  const router = useRouter();

  const handleSecondaryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Check if it's a blueprint example link
    if (secondaryCTALink === "/programs/blueprints/example") {
      router.push("/demo/blueprint");
    } else if (secondaryCTALink === "/programs/investigations/example") {
      router.push("/demo/investigation");
    } else {
      router.push(secondaryCTALink);
    }
  };

  return (
    <div
      className="advanced-card rounded-[24px] border transition-all duration-[180ms] ease-out"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px",
        boxShadow: "0 30px 120px rgba(0,0,0,0.55)",
      }}
    >
      {/* Card Content */}
      <div className="p-8 md:p-10">
        {/* Mode Header */}
        <div className="flex items-start justify-between mb-6">
          <h3
            className="mode-title"
            style={{
              fontSize: "26px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "rgba(231,240,238,0.95)",
            }}
          >
            {title}
          </h3>
          <span
            className="mode-badge"
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "6px 10px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(143,166,163,0.90)",
            }}
          >
            {status}
          </span>
        </div>
        {/* Description */}
        <p
          className="text-sm mb-6 leading-relaxed"
          style={{
            color: "rgba(143,166,163,0.80)",
            lineHeight: 1.6,
            fontSize: "15px",
          }}
        >
          {description}
        </p>

        {/* Data Inputs Block (Card band style) */}
        <div className="mb-6">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.8px] mb-2.5"
            style={{
              color: "rgba(143,166,163,0.75)",
            }}
          >
            Uses:
          </p>
          <div
            className="card-band"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: "16px",
              padding: "12px 14px",
              border: 0,
            }}
          >
            {dataInputs.map((input, idx) => (
              <div
                key={idx}
                className="band-row"
                style={{
                  padding: "10px 6px",
                  borderTop: idx === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
                  color: "rgba(231,240,238,0.90)",
                  fontSize: "14px",
                }}
              >
                {input}
              </div>
            ))}
          </div>
        </div>

        {/* Process Block (Quiet chips) */}
        <div className="mb-6 pb-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-2 flex-wrap">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="chip text-xs px-3 rounded-full transition-all duration-[150ms] ease-out"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(143,166,163,0.80)",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "13px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(110,211,194,0.12)";
                  e.currentTarget.style.borderColor = "rgba(110,211,194,0.18)";
                  e.currentTarget.style.color = "rgba(231,240,238,0.90)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "rgba(143,166,163,0.80)";
                }}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes Block */}
        <div className="mb-6">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.8px] mb-2.5"
            style={{
              color: "rgba(143,166,163,0.75)",
            }}
          >
            Outcomes:
          </p>
          <div className="space-y-2">
            {outcomes.map((outcome, idx) => (
              <div
                key={idx}
                className="outcome"
                style={{
                  position: "relative",
                  paddingLeft: "14px",
                  margin: "10px 0",
                  color: "rgba(231,240,238,0.90)",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                {outcome}
              </div>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <Link
            href={primaryCTALink}
            className="btn-primary-dark px-4 rounded-full transition-all duration-[150ms] ease-out"
            style={{
              height: "44px",
              padding: "0 16px",
              borderRadius: "9999px",
              background: "rgba(110,211,194,0.16)",
              border: "1px solid rgba(110,211,194,0.26)",
              color: "rgba(231,240,238,0.95)",
              fontWeight: 500,
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(110,211,194,0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(110,211,194,0.16)";
            }}
          >
            {primaryCTA}
          </Link>
          <button
            onClick={handleSecondaryClick}
            className="btn-link-dark text-sm font-medium transition-all duration-[150ms] ease-out"
            style={{
              color: "rgba(143,166,163,0.90)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(231,240,238,0.95)";
              e.currentTarget.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(143,166,163,0.90)";
              e.currentTarget.style.textDecoration = "none";
            }}
          >
            {secondaryCTA}
          </button>
        </div>
      </div>
    </div>
  );
}

