"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";

interface SignalModalProps {
  signal: {
    id: string;
    name: string;
    latest: string | number;
    unit: string;
    baseline: string | number;
    direction: "Improving" | "Worsening" | "Stable";
    source: "Lab" | "Provider" | "Wearable";
    trend_data?: Array<{ date: string; value: number }>;
  } | null;
  onClose: () => void;
}

export default function SignalModal({ signal, onClose }: SignalModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { evtClearContext } = useCommandCenterStore();

  useEffect(() => {
    if (signal && titleRef.current) {
      titleRef.current.focus();
    }
  }, [signal]);

  useEffect(() => {
    if (!signal) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleTab = (e: KeyboardEvent) => {
      if (!modalRef.current) return;
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTab);

    if (modalRef.current) {
      const firstFocusable = modalRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTab);
    };
  }, [signal, onClose]);

  if (!signal) return null;

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

  const handleSeeWaysToImprove = () => {
    // Navigate to Marketplace with signal context
    onClose();
    window.location.href = "/demo/marketplace";
    // Context will be set by the signal click handler
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="signal-modal-title"
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: "var(--surface)",
          borderRadius: "8px",
          padding: "24px",
          maxWidth: "500px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
          <h2
            id="signal-modal-title"
            ref={titleRef}
            tabIndex={-1}
            style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)" }}
          >
            Signal details
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-secondary)",
              padding: "4px",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Summary */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "24px",
            padding: "16px",
            backgroundColor: "var(--surface-alt)",
            borderRadius: "6px",
          }}
        >
          <div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>
              Signal
            </div>
            <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
              {signal.name}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>
              Latest
            </div>
            <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
              {signal.latest} {signal.unit}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>
              Baseline
            </div>
            <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
              {signal.baseline} {signal.unit}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>
              Direction
            </div>
            <div style={{ fontSize: "14px", fontWeight: 500, color: getDirectionColor(signal.direction) }}>
              {signal.direction}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>
              Source
            </div>
            <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
              {signal.source}
            </div>
          </div>
        </div>

        {/* Chart */}
        {signal.trend_data && signal.trend_data.length > 1 && (
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "12px" }}>
              Trend over time
            </h3>
            <div style={{ height: "200px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={signal.trend_data}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={getDirectionColor(signal.direction)}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <button
            onClick={handleSeeWaysToImprove}
            style={{
              flex: 1,
              padding: "10px 16px",
              backgroundColor: "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            See ways to improve
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px 16px",
              backgroundColor: "transparent",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Close
          </button>
        </div>

        {/* Footer */}
        <div
          style={{
            fontSize: "11px",
            color: "var(--text-tertiary)",
            textAlign: "center",
            paddingTop: "16px",
            borderTop: "1px solid var(--border)",
          }}
        >
          Trends are based on the data you've uploaded and connected.
        </div>
      </div>
    </div>
  );
}

