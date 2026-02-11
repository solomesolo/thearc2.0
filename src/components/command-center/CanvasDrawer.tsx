"use client";

import React from "react";
import { X } from "lucide-react";
import { useCommandCenterStore, DomainId, TileId } from "@/state/useCommandCenterStore";

interface CanvasDrawerProps {
  children: React.ReactNode;
}

export default function CanvasDrawer({ children }: CanvasDrawerProps) {
  const context = useCommandCenterStore((state) => state.context);
  const isDrawerOpen = useCommandCenterStore((state) => state.isDrawerOpen);
  const { evtDrawerClose } = useCommandCenterStore();

  if (!isDrawerOpen || context.type === "none") return null;

  const getDrawerTitle = () => {
    if (context.type === "domain") {
      const domainMap: Record<string, string> = {
        heart: "Heart",
        metabolic: "Metabolic",
        sleep: "Sleep & recovery",
        fitness: "Fitness",
        inflammation: "Inflammation",
        mind: "Mind & stress",
      };
      return domainMap[context.id || ""] || context.id;
    } else if (context.type === "tile") {
      const tileMap: Record<string, string> = {
        labs: "Labs",
        imaging: "Imaging",
        medications: "Medications",
        diagnoses: "Diagnoses",
        screenings: "Screenings",
        wearables: "Wearables",
      };
      return tileMap[context.id || ""] || context.id;
    }
    return context.id || "";
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: "400px",
        backgroundColor: "var(--surface)",
        borderLeft: "1px solid var(--border)",
        boxShadow: "var(--shadow-lg)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        animation: "slideInRight 0.18s ease-out",
      }}
    >
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {getDrawerTitle()}
        </h3>
        <button
          onClick={evtDrawerClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-secondary)",
            padding: "4px",
            display: "flex",
            alignItems: "center",
          }}
          aria-label="Close drawer"
        >
          <X size={20} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>{children}</div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
