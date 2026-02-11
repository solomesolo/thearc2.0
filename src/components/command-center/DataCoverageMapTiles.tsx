"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, Circle, Upload } from "lucide-react";
import { useCommandCenterStore, TileId } from "@/state/useCommandCenterStore";
import { getDomainRelevantTiles } from "@/utils/commandCenterFilters";

interface TileData {
  id: TileId;
  label: string;
  status: "complete" | "missing" | "outdated" | "unknown" | "not connected";
  lastUpdated: string | null;
  count?: number;
}

interface DataCoverageMapTilesProps {
  tiles: TileData[];
}

export default function DataCoverageMapTiles({ tiles }: DataCoverageMapTilesProps) {
  const context = useCommandCenterStore((state) => state.context);
  const highlightTargetId = useCommandCenterStore((state) => state.highlightTargetId);
  const { evtTileClick, evtTileAddData, evtDragEnter, evtDragLeave, evtDropFiles } = useCommandCenterStore();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverTile, setDragOverTile] = useState<string | null>(null);

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      evtDragEnter();
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      evtDragLeave();
      setIsDragging(false);
      setDragOverTile(null);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (dragOverTile && e.dataTransfer?.files.length) {
        evtDropFiles(e.dataTransfer.files);
      }
      setDragOverTile(null);
    };

    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("dragleave", handleDragLeave);
    document.addEventListener("drop", handleDrop);

    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("dragleave", handleDragLeave);
      document.removeEventListener("drop", handleDrop);
    };
  }, [dragOverTile, evtDragEnter, evtDragLeave, evtDropFiles]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "complete":
        return "Complete";
      case "missing":
        return "Missing";
      case "outdated":
        return "Outdated";
      case "not connected":
        return "Not connected";
      default:
        return "Unknown";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 size={20} style={{ color: "var(--success)" }} />;
      case "missing":
      case "outdated":
        return <AlertCircle size={20} style={{ color: "var(--warning)" }} />;
      default:
        return <Circle size={20} style={{ color: "var(--text-tertiary)" }} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "var(--success)";
      case "missing":
      case "outdated":
        return "var(--warning)";
      default:
        return "var(--text-tertiary)";
    }
  };

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

  // Check if tile should be highlighted
  const shouldHighlightTile = (tile: TileData) => {
    if (context.type === "tile" && context.id === tile.id) return true;
    if (context.type === "domain" && context.id) {
      const relevantTiles = getDomainRelevantTiles(context.id as any);
      return relevantTiles.includes(tile.id);
    }
    return false;
  };

  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "16px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "4px",
        }}
      >
        Your health map
      </h2>
      <p
        style={{
          fontSize: "10px",
          color: "var(--text-tertiary)",
          marginBottom: "12px",
        }}
      >
        Click a category to see what's missing. Drop files on a tile to upload.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          flex: 1,
        }}
      >
        {tiles.map((tile) => {
          const isHighlighted = shouldHighlightTile(tile);
          const isDragOver = dragOverTile === tile.id;
          return (
            <div
              key={tile.id}
              id={`tile-${tile.id}`}
              onClick={() => evtTileClick(tile.id)}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverTile(tile.id);
              }}
              onDragLeave={() => setDragOverTile(null)}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer?.files.length) {
                  evtDropFiles(e.dataTransfer.files);
                }
                setDragOverTile(null);
              }}
              style={{
                padding: "12px",
                backgroundColor: isDragOver ? "var(--focus)" : "var(--surface-alt)",
                borderRadius: "8px",
                border: isDragOver
                  ? "2px dashed var(--primary)"
                  : isHighlighted
                  ? "2px solid var(--primary)"
                  : "1px solid var(--border)",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                textAlign: "center",
                position: "relative",
              }}
            onMouseEnter={(e) => {
              if (!isDragOver && !isHighlighted) {
                e.currentTarget.style.borderColor = "var(--primary)";
                const hoverActions = e.currentTarget.querySelector('[data-hover-actions]') as HTMLElement;
                if (hoverActions) {
                  hoverActions.style.opacity = "1";
                }
              }
            }}
            onMouseLeave={(e) => {
              if (!isDragOver && !isHighlighted) {
                e.currentTarget.style.borderColor = "var(--border)";
                const hoverActions = e.currentTarget.querySelector('[data-hover-actions]') as HTMLElement;
                if (hoverActions) {
                  hoverActions.style.opacity = "0";
                }
              }
            }}
          >
              {getStatusIcon(tile.status)}
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                }}
              >
                {tile.label}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                }}
              >
                {getStatusLabel(tile.status)}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-secondary)",
                }}
              >
                Last update: {formatDate(tile.lastUpdated)}
              </div>
              {tile.count !== undefined && (
                <div
                  style={{
                    fontSize: "10px",
                    color: "var(--text-tertiary)",
                  }}
                >
                  Items: {tile.count}
                </div>
              )}
              {isDragging && !isDragOver && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                    borderRadius: "12px",
                  }}
                >
                  <Upload size={24} style={{ color: "var(--primary)" }} />
                </div>
              )}
              {/* Hover actions */}
              <div
                data-hover-actions
                style={{
                  position: "absolute",
                  bottom: "-32px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "8px",
                  opacity: 0,
                  transition: "opacity 0.2s",
                  pointerEvents: "auto",
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    evtTileAddData(tile.id);
                  }}
                  style={{
                    padding: "4px 8px",
                    fontSize: "10px",
                    backgroundColor: "var(--primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Add to {tile.label}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    evtTileClick(tile.id);
                  }}
                  style={{
                    padding: "4px 8px",
                    fontSize: "10px",
                    backgroundColor: "transparent",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  View details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

