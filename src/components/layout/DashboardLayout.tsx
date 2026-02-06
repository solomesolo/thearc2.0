"use client";

import React, { useState } from "react";
import TopBar from "./TopBar";
import LeftNav from "./LeftNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
  lastUpdated?: string;
  notificationsCount?: number;
}

export default function DashboardLayout({ 
  children,
  lastUpdated,
  notificationsCount
}: DashboardLayoutProps) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  return (
    <div className="dashboard-layout" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      backgroundColor: 'var(--bg)'
    }}>
      {/* Top Bar - Fixed height 64px */}
      <TopBar lastUpdated={lastUpdated} notificationsCount={notificationsCount} />
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Nav - Collapsed: 72px, Expanded: 240px */}
        <LeftNav 
          isCollapsed={isNavCollapsed} 
          onToggle={() => setIsNavCollapsed(!isNavCollapsed)}
        />
        
        {/* Center Canvas - Scrolls */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto',
          minWidth: 0
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

