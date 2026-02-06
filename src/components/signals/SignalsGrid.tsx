"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus, FileText, Watch, Stethoscope } from "lucide-react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";

interface Signal {
  id: string;
  name: string;
  latest: number | string;
  direction: "Improving" | "Worsening" | "Stable";
  series: Array<{ date: string; value: number }>;
  source: "Lab" | "Wearable" | "Provider";
  dataPointCount: number;
  unit?: string;
}

interface SignalsGridProps {
  signals: Signal[];
  selectedSignalId: string | null;
  onSignalClick: (signalId: string) => void;
  domain?: string;
}

export default function SignalsGrid({ signals, selectedSignalId, onSignalClick, domain = "all" }: SignalsGridProps) {
  const getSectionTitle = () => {
    if (domain === "all") return "All signals";
    const domainMap: Record<string, string> = {
      heart: "Heart signals",
      metabolic: "Metabolic signals",
      sleep: "Sleep & recovery signals",
      fitness: "Fitness signals",
    };
    return domainMap[domain] || "All signals";
  };
  const getDirectionColor = (direction: string) => {
    switch (direction) {
      case "Improving":
        return "var(--success)";
      case "Worsening":
        return "var(--danger)";
      default:
        return "var(--info)";
    }
  };

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case "Improving":
        return <TrendingDown size={14} style={{ color: getDirectionColor(direction) }} />;
      case "Worsening":
        return <TrendingUp size={14} style={{ color: getDirectionColor(direction) }} />;
      default:
        return <Minus size={14} style={{ color: getDirectionColor(direction) }} />;
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "Lab":
        return <FileText size={12} style={{ color: "var(--text-tertiary)" }} />;
      case "Wearable":
        return <Watch size={12} style={{ color: "var(--text-tertiary)" }} />;
      case "Provider":
        return <Stethoscope size={12} style={{ color: "var(--text-tertiary)" }} />;
      default:
        return null;
    }
  };

  const renderSparkline = (series: Array<{ date: string; value: number }>) => {
    if (!series || series.length === 0) return null;
    const values = series.map((s) => s.value);
    const maxVal = Math.max(...values);
    const minVal = Math.min(...values);
    const range = maxVal - minVal || 1;

    return (
      <svg width="100%" height="30" style={{ display: "block" }}>
        <polyline
          points={values
            .map((val, idx) => {
              const x = (idx / Math.max(values.length - 1, 1)) * 100;
              const y = 30 - ((val - minVal) / range) * 28 - 1;
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  // Responsive grid columns
  const getGridColumns = () => {
    if (typeof window === "undefined") return "repeat(4, 1fr)";
    const width = window.innerWidth;
    if (width >= 1440) return "repeat(4, 1fr)";
    if (width >= 1280) return "repeat(3, 1fr)";
    if (width >= 1024) return "repeat(2, 1fr)";
    return "1fr";
  };

  const [gridColumns, setGridColumns] = React.useState(getGridColumns());

  React.useEffect(() => {
    const handleResize = () => {
      setGridColumns(getGridColumns());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "12px" }}>
        {getSectionTitle()}
      </h3>
      {signals.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            backgroundColor: "var(--surface-alt)",
            borderRadius: "12px",
            border: "1px dashed var(--border)",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "8px" }}>
            No signals available yet.
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px" }}>
            Upload labs or connect wearables to see trends over time.
          </div>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
            <button
              onClick={() => useCommandCenterStore.getState().evtAddDataClick()}
              style={{
                padding: "8px 16px",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Upload documents
            </button>
            <button
              onClick={() => useCommandCenterStore.getState().evtConnectWearables()}
              style={{
                padding: "8px 16px",
                backgroundColor: "transparent",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Connect wearables
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridColumns,
            gap: "12px",
          }}
        >
          {signals.map((signal) => (
            <div
              key={signal.id}
              onClick={() => onSignalClick(signal.id)}
              style={{
                padding: "12px",
                backgroundColor: selectedSignalId === signal.id ? "var(--primary-light)" : "var(--surface-alt)",
                border: selectedSignalId === signal.id ? "2px solid var(--primary)" : "1px solid var(--border)",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (selectedSignalId !== signal.id) {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.backgroundColor = "var(--surface)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedSignalId !== signal.id) {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.backgroundColor = "var(--surface-alt)";
                }
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)", flex: 1 }}>
                  {signal.name}
                </div>
                {getSourceIcon(signal.source)}
              </div>
              <div style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>
                {signal.latest} {signal.unit || ""}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                {getDirectionIcon(signal.direction)}
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    color: getDirectionColor(signal.direction),
                  }}
                >
                  {signal.direction}
                </span>
              </div>
              <div style={{ height: "30px", width: "100%", marginBottom: "8px" }}>{renderSparkline(signal.series)}</div>
              <div style={{ fontSize: "10px", color: "var(--text-tertiary)" }}>
                Data points: {signal.dataPointCount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

