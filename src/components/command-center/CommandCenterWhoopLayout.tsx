"use client";

import React from "react";
import TopBar from "@/components/layout/TopBar";
import LeftNav from "@/components/layout/LeftNav";
import GlobalModals from "@/components/GlobalModals";
import GlobalDragDrop from "@/components/GlobalDragDrop";

interface CommandCenterWhoopLayoutProps {
  children: React.ReactNode;
  coachRail?: React.ReactNode;
  lastUpdated?: string;
  notificationsCount?: number;
  pageTitle?: string;
}

export default function CommandCenterWhoopLayout({
  children,
  coachRail,
  lastUpdated,
  notificationsCount,
  pageTitle = "Command Center",
}: CommandCenterWhoopLayoutProps) {
  const [isNavCollapsed, setIsNavCollapsed] = React.useState(false);

  return (
    <div
      className="command-center-whoop-layout"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#ffffff",
        color: "#1a1a1a",
        overflow: "hidden",
      }}
    >
      {/* Top Bar - Fixed height 64px */}
      <TopBar lastUpdated={lastUpdated} notificationsCount={notificationsCount} pageTitle={pageTitle} />

      <div style={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden" }}>
        {/* Left Nav - Collapsed: 72px, Expanded: 240px */}
        <LeftNav isCollapsed={isNavCollapsed} onToggle={() => setIsNavCollapsed(!isNavCollapsed)} />

        {/* Center Canvas - Grid Layout */}
        <div
          style={{
            flex: "1 1 0",
            minWidth: 0,
            overflowY: "auto",
            overflowX: "hidden",
            position: "relative",
            backgroundColor: "#ffffff",
            display: "grid",
            gridTemplateColumns: coachRail ? "1fr 280px" : "1fr",
            gap: "0",
          }}
        >
          {/* Main Content Area */}
          <div
            style={{
              padding: "24px",
              maxWidth: "1400px",
              width: "100%",
              margin: "0 auto",
            }}
          >
            {children}
          </div>

          {/* Right Coach Rail - Fixed 280px */}
          {coachRail && (
            <div
              style={{
                width: "280px",
                flexShrink: 0,
                borderLeft: "1px solid var(--border)",
                backgroundColor: "var(--surface)",
                overflowY: "auto",
                overflowX: "hidden",
                position: "sticky",
                top: "64px",
                alignSelf: "flex-start",
                maxHeight: "calc(100vh - 64px)",
              }}
            >
              {coachRail}
            </div>
          )}
        </div>
      </div>
      <GlobalModals />
      <GlobalDragDrop />
    </div>
  );
}



