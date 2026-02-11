"use client";

import { arcTokens } from "@/lib/ui/arcTokens";

interface Driver {
  id: string;
  name: string;
  strength: "strong" | "weak" | "none";
  description?: string;
}

interface InvestigationDriversCardProps {
  drivers: Driver[];
}

export default function InvestigationDriversCard({ drivers }: InvestigationDriversCardProps) {
  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "strong":
        return arcTokens.accent.primary;
      case "weak":
        return arcTokens.text.secondary;
      default:
        return arcTokens.text.tertiary;
    }
  };

  const getStrengthLabel = (strength: string) => {
    switch (strength) {
      case "strong":
        return "Strong signal";
      case "weak":
        return "Weak signal";
      default:
        return "No signal";
    }
  };

  return (
    <div
      style={{
        backgroundColor: arcTokens.surface.card,
        border: `1px solid ${arcTokens.border.default}`,
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        marginBottom: "24px",
      }}
    >
      <h2
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: arcTokens.text.primary,
          marginBottom: "16px",
        }}
      >
        Likely drivers
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {drivers.map((driver, idx) => (
          <div
            key={driver.id}
            style={{
              padding: "16px",
              borderRadius: "12px",
              backgroundColor: arcTokens.bg.panel,
              border: `1px solid ${arcTokens.border.default}`,
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: `${getStrengthColor(driver.strength)}20`,
                border: `1px solid ${getStrengthColor(driver.strength)}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 600,
                color: getStrengthColor(driver.strength),
                flexShrink: 0,
              }}
            >
              {idx + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: arcTokens.text.primary,
                  }}
                >
                  {driver.name}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    color: getStrengthColor(driver.strength),
                    padding: "2px 6px",
                    borderRadius: "4px",
                    backgroundColor: `${getStrengthColor(driver.strength)}15`,
                  }}
                >
                  {getStrengthLabel(driver.strength)}
                </div>
              </div>
              {driver.description && (
                <div
                  style={{
                    fontSize: "12px",
                    color: arcTokens.text.secondary,
                    lineHeight: 1.5,
                  }}
                >
                  {driver.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


