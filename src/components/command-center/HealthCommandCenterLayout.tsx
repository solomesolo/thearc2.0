"use client";

import React from "react";
import TopBar from "@/components/layout/TopBar";
import LeftNav from "@/components/layout/LeftNav";
import GlobalModals from "@/components/GlobalModals";
import GlobalDragDrop from "@/components/GlobalDragDrop";

interface HealthCommandCenterLayoutProps {
  children: React.ReactNode;
  actionInbox?: React.ReactNode | null;
  lastUpdated?: string;
  notificationsCount?: number;
  pageTitle?: string;
}

export default function HealthCommandCenterLayout({
  children,
  actionInbox,
  lastUpdated,
  notificationsCount,
  pageTitle = "Health Overview",
}: HealthCommandCenterLayoutProps) {
  const [isNavCollapsed, setIsNavCollapsed] = React.useState(false);

  return (
    <div
      className="health-command-center-layout"
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

        {/* Center Canvas - Workspace (min 70% width) */}
        <div
          style={{
            flex: "1 1 70%",
            minWidth: 0,
            overflowY: "auto",
            overflowX: "hidden",
            position: "relative",
            backgroundColor: "#ffffff",
          }}
        >
          {children}
        </div>

        {/* Right Action Inbox - Fixed 320px (only if provided) */}
        {actionInbox && (
          <div
            style={{
              width: "320px",
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
            {actionInbox}
          </div>
        )}
      </div>
      <GlobalModals />
      <GlobalDragDrop />
    </div>
  );
}
