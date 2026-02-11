"use client";

import React from "react";
import { useDashboardUIStore } from "@/state/useDashboardUIStore";

interface WatchItem {
  id: string;
  name: string;
  why: string;
  cadence: string;
}

interface WatchlistCardProps {
  watchlist?: WatchItem[];
}

export default function WatchlistCard({ watchlist = [] }: WatchlistCardProps) {
  const { openReminder, openUpload } = useDashboardUIStore();

  const handleSetMonitoring = (item: WatchItem) => {
    openReminder({
      name: `${item.name} monitoring`,
      frequency: item.cadence,
      channels: ["In-app"],
    });
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
          marginBottom: "4px",
        }}
      >
        Your watchlist
      </h2>
      <p
        style={{
          fontSize: "12px",
          color: "var(--text-tertiary)",
          marginBottom: "20px",
        }}
      >
        Areas to monitor based on your history and predispositions.
      </p>

      {watchlist.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {watchlist.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "16px",
                backgroundColor: "var(--surface-alt)",
                borderRadius: "12px",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  marginBottom: "8px",
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  marginBottom: "4px",
                }}
              >
                <span style={{ fontWeight: 500 }}>Why:</span> {item.why}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  marginBottom: "12px",
                }}
              >
                <span style={{ fontWeight: 500 }}>Cadence:</span> {item.cadence}
              </div>
              <button
                onClick={() => handleSetMonitoring(item)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Set monitoring plan
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: "32px",
            textAlign: "center",
            color: "var(--text-secondary)",
          }}
        >
          <div style={{ marginBottom: "8px" }}>No watch areas identified.</div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--text-tertiary)",
              marginBottom: "16px",
            }}
          >
            Connect provider records or add family history to personalize monitoring.
          </div>
          <button
            onClick={() => openUpload()}
            style={{
              padding: "8px 16px",
              backgroundColor: "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            + Add data
          </button>
        </div>
      )}
    </div>
  );
}



