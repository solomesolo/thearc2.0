"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, X } from "lucide-react";
import { useDashboardUIStore } from "@/state/useDashboardUIStore";

interface ArcGuideProps {
  gaps?: Array<{ id: string; title: string; [key: string]: any }>;
  actions?: Array<{ id: string; title: string; urgency: string; [key: string]: any }>;
}

export default function ArcGuide({ gaps = [], actions = [] }: ArcGuideProps) {
  const contextSelection = useDashboardUIStore((state) => state.contextSelection);
  const marketplaceFilter = useDashboardUIStore((state) => state.marketplaceFilter);
  const openGap = useDashboardUIStore((state) => state.openGap);
  const setMarketplaceFilter = useDashboardUIStore((state) => state.setMarketplaceFilter);
  const scrollToSection = useDashboardUIStore((state) => state.scrollToSection);
  const openUpload = useDashboardUIStore((state) => state.openUpload);

  const [isOpen, setIsOpen] = useState(false);
  const [quickWin, setQuickWin] = useState<{
    title: string;
    body: string;
    cta: string;
    action: () => void;
  } | null>(null);

  // Determine if there's a quick win available
  useEffect(() => {
    // Check for gaps first
    if (contextSelection?.type === "gap") {
      const gap = gaps.find((g) => g.id === contextSelection.id);
      setQuickWin({
        title: "Today's focus",
        body: `You're missing a ${gap?.title || contextSelection.id} in the last 12 months. Updating it improves your heart-risk trend accuracy.`,
        cta: "Do it now",
        action: () => {
          setIsOpen(false);
          if (contextSelection.id) {
            openGap(contextSelection.id);
          }
        },
      });
    } else if (marketplaceFilter) {
      setQuickWin({
        title: "Today's focus",
        body: `Services tailored to address your ${marketplaceFilter.label} are ready.`,
        cta: "View services",
        action: () => {
          setIsOpen(false);
          scrollToSection("marketplace");
        },
      });
    } else {
      // Default quick win - check for gaps in data
      const highUrgencyGap = gaps.find((g: any) => g.priority === "High");
      const highUrgencyAction = actions.find((a: any) => a.urgency === "High");

      if (highUrgencyGap) {
        setQuickWin({
          title: "Today's focus",
          body: `You're missing a ${highUrgencyGap.title} in the last 12 months. Updating it improves your heart-risk trend accuracy.`,
          cta: "Do it now",
          action: () => {
            setIsOpen(false);
            openGap(highUrgencyGap.id);
          },
        });
      } else if (highUrgencyAction) {
        setQuickWin({
          title: "Today's focus",
          body: `${highUrgencyAction.title} is recommended based on your current data.`,
          cta: "Do it now",
          action: () => {
            setIsOpen(false);
            setMarketplaceFilter({
              sourceType: "action",
              sourceId: highUrgencyAction.id,
              label: highUrgencyAction.title,
            });
            scrollToSection("marketplace");
          },
        });
      } else {
        // No gaps, show general encouragement
        setQuickWin({
          title: "Today's focus",
          body: "Your health data is looking good! Keep tracking your metrics to maintain accurate trends.",
          cta: "Add data",
          action: () => {
            setIsOpen(false);
            openUpload();
          },
        });
      }
    }
  }, [contextSelection, marketplaceFilter, gaps, actions, openGap, setMarketplaceFilter, scrollToSection, openUpload]);

  const hasQuickWin = quickWin !== null;
  const buttonLabel = hasQuickWin ? "Arc Guide: 1 quick win" : "Arc Guide";

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 16px",
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "24px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          zIndex: 100,
          transition: "all 0.2s",
        }}
        aria-label={buttonLabel}
      >
        {/* Fox Avatar - Simple SVG */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C8 2 5 5 5 9C5 11 6 13 7 14C7 15 6 16 5 16C4 16 3 17 3 18V20H5C6 20 7 19 8 18C9 19 10 20 11 20H13C14 20 15 19 16 18C17 19 18 20 19 20H21V18C21 17 20 16 19 16C18 16 17 15 17 14C18 13 19 11 19 9C19 5 16 2 12 2Z"
            fill="#F59E0B"
          />
          <circle cx="9" cy="9" r="1" fill="#0F172A" />
          <circle cx="15" cy="9" r="1" fill="#0F172A" />
          <path d="M9 13C9.5 14 10.5 14.5 12 14.5C13.5 14.5 14.5 14 15 13" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
          {buttonLabel}
        </span>
        {hasQuickWin && (
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#8B5CF6",
              animation: "pulse 2s infinite",
            }}
          />
        )}
      </button>

      {/* Coach Drawer */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "88px",
            right: "24px",
            width: "320px",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
            zIndex: 101,
            padding: "20px",
            animation: "slideUp 0.3s ease-out",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={20} style={{ color: "#8B5CF6" }} />
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>
                {quickWin?.title || "Today's focus"}
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                padding: "4px",
              }}
              aria-label="Close guide"
            >
              <X size={16} />
            </button>
          </div>

          {quickWin && (
            <>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.5" }}>
                {quickWin.body}
              </p>
              <button
                onClick={() => {
                  quickWin.action();
                }}
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  backgroundColor: "#8B5CF6",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {quickWin.cta}
              </button>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
}
