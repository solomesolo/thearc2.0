"use client";

import { arcTokens } from "@/lib/ui/arcTokens";

interface InvestigationNextActionCardProps {
  recommendation: string;
  whyNow: string;
  timeSensitivity?: string;
  onDoNow?: () => void;
  onSchedule?: () => void;
  onLearnWhy?: () => void;
}

export default function InvestigationNextActionCard({
  recommendation,
  whyNow,
  timeSensitivity,
  onDoNow,
  onSchedule,
  onLearnWhy,
}: InvestigationNextActionCardProps) {
  return (
    <div
      style={{
        backgroundColor: arcTokens.surface.card,
        border: `1px solid ${arcTokens.border.strong}`,
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        marginBottom: "24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
        <span style={{ fontSize: "18px" }}>⭐</span>
        <h2
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: arcTokens.text.primary,
            margin: 0,
          }}
        >
          What to do next
        </h2>
      </div>

      {/* Primary Recommendation */}
      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            fontSize: "15px",
            fontWeight: 500,
            color: arcTokens.text.primary,
            marginBottom: "8px",
          }}
        >
          {recommendation}
        </div>
        <div
          style={{
            fontSize: "13px",
            color: arcTokens.text.secondary,
            lineHeight: 1.5,
            marginBottom: "4px",
          }}
        >
          {whyNow}
        </div>
        {timeSensitivity && (
          <div
            style={{
              fontSize: "12px",
              color: arcTokens.text.tertiary,
              fontStyle: "italic",
            }}
          >
            {timeSensitivity}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {onDoNow && (
          <button
            onClick={onDoNow}
            style={{
              padding: "8px 16px",
              backgroundColor: arcTokens.accent.primary,
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Do now
          </button>
        )}
        {onSchedule && (
          <button
            onClick={onSchedule}
            style={{
              padding: "8px 16px",
              backgroundColor: "transparent",
              color: arcTokens.text.primary,
              border: `1px solid ${arcTokens.border.default}`,
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Schedule
          </button>
        )}
        {onLearnWhy && (
          <button
            onClick={onLearnWhy}
            style={{
              padding: "8px 16px",
              backgroundColor: "transparent",
              color: arcTokens.text.secondary,
              border: `1px solid ${arcTokens.border.default}`,
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Learn why
          </button>
        )}
      </div>
    </div>
  );
}

