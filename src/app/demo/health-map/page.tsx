"use client";

import React, { useState, useEffect } from "react";
import HealthCommandCenterLayout from "@/components/command-center/HealthCommandCenterLayout";
import DataCoverageMapTiles from "@/components/command-center/DataCoverageMapTiles";
import ActionInbox from "@/components/command-center/ActionInbox";
import { useCommandCenterStore, TileId } from "@/state/useCommandCenterStore";
import dashboardData from "@/mock/dashboard.json";
import { X, Upload, Link as LinkIcon, Watch, AlertCircle, CheckCircle2, Circle } from "lucide-react";

export default function HealthMapPage() {
  const { context, evtTileClick, evtGapClick, evtTileAddData, evtConnectProvider, evtConnectWearables, evtClearContext } =
    useCommandCenterStore();
  const [sortBy, setSortBy] = useState<"priority" | "date">("priority");

  // Get data
  const coveragePercent = dashboardData.coverage_percent || 0;
  const gaps = dashboardData.gaps || [];
  const actions = dashboardData.actions || [];
  const reminders = dashboardData.reminders?.active || [];
  const services = dashboardData.services || [];

  // Calculate data confidence
  const dataConfidence =
    coveragePercent >= 80 ? "Good" : coveragePercent >= 50 ? "Fair" : "Limited";

  // Get top priority gap
  const topGap = gaps.length > 0 ? gaps[0] : null;

  // Tiles data
  const tiles: Array<{
    id: TileId;
    label: string;
    status: "complete" | "missing" | "outdated" | "unknown" | "not connected";
    lastUpdated: string | null;
    count?: number;
  }> = [
    {
      id: "labs",
      label: "Labs",
      status: coveragePercent >= 70 ? "complete" : "missing",
      lastUpdated: "2024-01-15",
      count: 12,
    },
    {
      id: "imaging",
      label: "Imaging",
      status: "outdated",
      lastUpdated: "2023-06-20",
      count: 3,
    },
    {
      id: "medications",
      label: "Medications",
      status: "complete",
      lastUpdated: "2024-01-10",
      count: 5,
    },
    {
      id: "diagnoses",
      label: "Diagnoses",
      status: "complete",
      lastUpdated: "2024-01-05",
      count: 2,
    },
    {
      id: "screenings",
      label: "Screenings",
      status: "missing",
      lastUpdated: null,
      count: 0,
    },
    {
      id: "wearables",
      label: "Wearables",
      status: "not connected",
      lastUpdated: null,
      count: 0,
    },
  ];

  // Get selected tile data
  const selectedTile = context.type === "tile" ? tiles.find((t) => t.id === context.id) : null;

  // Filter gaps by selected tile
  const filteredGaps = context.type === "tile"
    ? gaps.filter((g: any) => g.category === context.id)
    : gaps;

  // Sort gaps
  const sortedGaps = [...filteredGaps].sort((a: any, b: any) => {
    if (sortBy === "priority") {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    } else {
      return new Date(b.last_date || 0).getTime() - new Date(a.last_date || 0).getTime();
    }
  });

  // Get top 3 gaps for summary
  const topGaps = sortedGaps.slice(0, 3);

  return (
    <HealthCommandCenterLayout
      pageTitle="Health Map"
      actionInbox={<ActionInbox actions={actions} reminders={reminders} services={services} />}
    >
      <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Coverage Summary Strip */}
        <div
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>
                Coverage
              </div>
              <div style={{ fontSize: "32px", fontWeight: 600, color: "var(--text-primary)" }}>
                {coveragePercent}%
              </div>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>
                Data confidence
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color:
                    dataConfidence === "Good"
                      ? "var(--success)"
                      : dataConfidence === "Fair"
                      ? "var(--warning)"
                      : "var(--danger)",
                }}
              >
                {dataConfidence}
              </div>
            </div>
          </div>
          {topGap && (
            <button
              onClick={() => evtGapClick(topGap.id || "", topGap.title)}
              style={{
                padding: "10px 20px",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Fix highest priority gap
            </button>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: selectedTile ? "1fr 360px" : "1fr", gap: "24px" }}>
          {/* Main: Category Matrix */}
          <div>
            <DataCoverageMapTiles tiles={tiles} />
          </div>

          {/* Right: Category Detail Panel */}
          {selectedTile && (
            <div
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "20px",
                position: "sticky",
                top: "88px",
                alignSelf: "flex-start",
                maxHeight: "calc(100vh - 120px)",
                overflowY: "auto",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)" }}>
                  {selectedTile.label}
                </h3>
                <button
                  onClick={evtClearContext}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-secondary)",
                    padding: "4px",
                  }}
                  aria-label="Close panel"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Status */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "8px" }}>Status</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {selectedTile.status === "complete" && <CheckCircle2 size={16} style={{ color: "var(--success)" }} />}
                  {selectedTile.status === "missing" && <Circle size={16} style={{ color: "var(--danger)" }} />}
                  {selectedTile.status === "outdated" && <AlertCircle size={16} style={{ color: "var(--warning)" }} />}
                  {selectedTile.status === "not connected" && (
                    <Circle size={16} style={{ color: "var(--text-tertiary)" }} />
                  )}
                  <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
                    {selectedTile.status === "complete"
                      ? "Complete"
                      : selectedTile.status === "missing"
                      ? "Missing"
                      : selectedTile.status === "outdated"
                      ? "Outdated"
                      : "Not connected"}
                  </span>
                </div>
              </div>

              {/* What's included */}
              {selectedTile.count !== undefined && (
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "8px" }}>
                    What's included
                  </div>
                  <div style={{ fontSize: "14px", color: "var(--text-primary)" }}>
                    {selectedTile.count} {selectedTile.count === 1 ? "item" : "items"}
                  </div>
                  {selectedTile.lastUpdated && (
                    <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "4px" }}>
                      Last updated: {new Date(selectedTile.lastUpdated).toLocaleDateString()}
                    </div>
                  )}
                </div>
              )}

              {/* Missing/outdated */}
              {selectedTile.status !== "complete" && (
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "8px" }}>
                    Missing or outdated
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                    {selectedTile.status === "missing"
                      ? "No documents uploaded for this category."
                      : selectedTile.status === "outdated"
                      ? "Documents are older than recommended."
                      : "Not connected to any data source."}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {selectedTile.id === "wearables" ? (
                  <button
                    onClick={() => evtConnectWearables()}
                    style={{
                      width: "100%",
                      padding: "10px 16px",
                      backgroundColor: "var(--primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <Watch size={16} />
                    Connect wearables
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => evtTileAddData(selectedTile.id)}
                      style={{
                        width: "100%",
                        padding: "10px 16px",
                        backgroundColor: "var(--primary)",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <Upload size={16} />
                      Upload {selectedTile.label.toLowerCase()}
                    </button>
                    <button
                      onClick={() => evtConnectProvider()}
                      style={{
                        width: "100%",
                        padding: "10px 16px",
                        backgroundColor: "transparent",
                        color: "var(--text-primary)",
                        border: "1px solid var(--border)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <LinkIcon size={16} />
                      Connect provider
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Missing & Outdated List */}
        <div
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "20px",
            marginTop: "24px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)" }}>
              Missing & outdated
            </h3>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setSortBy("priority")}
                style={{
                  padding: "6px 12px",
                  backgroundColor: sortBy === "priority" ? "var(--primary-light)" : "transparent",
                  color: sortBy === "priority" ? "var(--primary)" : "var(--text-secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: sortBy === "priority" ? 500 : 400,
                }}
              >
                Priority
              </button>
              <button
                onClick={() => setSortBy("date")}
                style={{
                  padding: "6px 12px",
                  backgroundColor: sortBy === "date" ? "var(--primary-light)" : "transparent",
                  color: sortBy === "date" ? "var(--primary)" : "var(--text-secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: sortBy === "date" ? 500 : 400,
                }}
              >
                Date
              </button>
            </div>
          </div>

          {sortedGaps.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
              No missing or outdated items.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {sortedGaps.map((gap: any) => (
                <div
                  key={gap.id}
                  style={{
                    padding: "16px",
                    backgroundColor: "var(--surface-alt)",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "4px" }}>
                        {gap.title}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "8px" }}>
                        {gap.subtext || "Missing or outdated document"}
                      </div>
                      {gap.last_date && (
                        <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
                          Last date: {new Date(gap.last_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        padding: "4px 8px",
                        backgroundColor:
                          gap.priority === "High"
                            ? "var(--danger-light)"
                            : gap.priority === "Medium"
                            ? "var(--warning-light)"
                            : "var(--info-light)",
                        color:
                          gap.priority === "High"
                            ? "var(--danger)"
                            : gap.priority === "Medium"
                            ? "var(--warning)"
                            : "var(--info)",
                        borderRadius: "4px",
                        fontSize: "11px",
                        fontWeight: 500,
                        marginLeft: "12px",
                      }}
                    >
                      {gap.priority}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                    <button
                      onClick={() => evtGapClick(gap.id || "", gap.title)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "var(--primary)",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      Fix now
                    </button>
                    <button
                      onClick={() => evtTileAddData(gap.category as TileId || "labs")}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "transparent",
                        color: "var(--text-primary)",
                        border: "1px solid var(--border)",
                        borderRadius: "6px",
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
          )}
        </div>
      </div>
    </HealthCommandCenterLayout>
  );
}
