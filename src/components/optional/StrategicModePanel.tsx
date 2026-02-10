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
      className="rounded-[16px] border p-8 md:p-10"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3
            className="text-lg font-semibold mb-1"
            style={{
              color: "rgba(231,240,238,0.95)",
              fontWeight: 550,
            }}
          >
            {title}
          </h3>
        </div>
        <span
          className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.5px] rounded"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "rgba(143,166,163,0.78)",
          }}
        >
          {status}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-sm mb-6 leading-relaxed"
        style={{
          color: "rgba(143,166,163,0.78)",
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>

      {/* Data Inputs Block (Table style) */}
      <div className="mb-6">
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.8px] mb-2.5"
          style={{
            color: "rgba(143,166,163,0.65)",
          }}
        >
          Uses:
        </p>
        <div
          className="rounded border divide-y"
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          {dataInputs.map((input, idx) => (
            <div
              key={idx}
              className="text-xs py-2 px-3"
              style={{
                color: "rgba(231,240,238,0.85)",
              }}
            >
              {input}
            </div>
          ))}
        </div>
      </div>

      {/* Process Block (Horizontal step line) */}
      <div className="mb-6 pb-6 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2 flex-wrap">
          {processSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div
                className="text-xs px-2.5 py-1 rounded"
                style={{
                  backgroundColor: "rgba(110,211,194,0.08)",
                  color: "rgba(110,211,194,0.95)",
                }}
              >
                {step}
              </div>
              {idx < processSteps.length - 1 && (
                <div
                  className="w-px h-4"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Outcomes Block */}
      <div className="mb-6">
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.8px] mb-2.5"
          style={{
            color: "rgba(143,166,163,0.65)",
          }}
        >
          Outcomes:
        </p>
        <div className="space-y-1.5">
          {outcomes.map((outcome, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span
                className="text-xs mt-0.5"
                style={{
                  color: "rgba(110,211,194,0.95)",
                }}
              >
                •
              </span>
              <p
                className="text-xs leading-relaxed"
                style={{
                  color: "rgba(231,240,238,0.85)",
                }}
              >
                {outcome}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Row */}
      <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <Link
          href={primaryCTALink}
          className="px-4 py-2.5 text-xs font-semibold rounded-[10px] transition-colors"
          style={{
            backgroundColor: "rgba(110,211,194,0.15)",
            color: "rgba(110,211,194,0.95)",
            height: "40px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {primaryCTA}
        </Link>
        <button
          onClick={handleSecondaryClick}
          className="text-xs font-medium transition-colors"
          style={{
            color: "rgba(143,166,163,0.78)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          {secondaryCTA}
        </button>
      </div>
    </div>
  );
}

