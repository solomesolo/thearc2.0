"use client";

import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import AddDataMenu from "@/components/controls/AddDataMenu";
import ThemeToggle from "@/components/theme/ThemeToggle";

interface TopBarProps {
  lastUpdated?: string; // ISO string
  notificationsCount?: number;
  pageTitle?: string;
}

export default function TopBar({ 
  lastUpdated, 
  notificationsCount = 0,
  pageTitle = "Health Overview"
}: TopBarProps) {
  const [relativeTime, setRelativeTime] = useState<string>("—");

  useEffect(() => {
    if (!lastUpdated) {
      setRelativeTime("—");
      return;
    }

    const updateRelativeTime = () => {
      const now = new Date();
      const updated = new Date(lastUpdated);
      const diffMs = now.getTime() - updated.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) {
        setRelativeTime("just now");
      } else if (diffMins < 60) {
        setRelativeTime(`${diffMins} min ago`);
      } else if (diffHours < 24) {
        setRelativeTime(`${diffHours} hour${diffHours > 1 ? 's' : ''} ago`);
      } else {
        setRelativeTime(`${diffDays} day${diffDays > 1 ? 's' : ''} ago`);
      }
    };

    updateRelativeTime();
    const interval = setInterval(updateRelativeTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [lastUpdated]);

  return (
    <div
      style={{
        height: '64px',
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left: Logo */}
      <div style={{ 
        fontSize: '20px', 
        fontWeight: 600, 
        color: 'var(--text-primary)' 
      }}>
        Arc
      </div>

      {/* Center: Breadcrumb / Page title */}
      <div style={{ 
        fontSize: '16px', 
        fontWeight: 500, 
        color: 'var(--text-primary)',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
      }}>
        {pageTitle}
      </div>

      {/* Right: Add Data + Last refresh + Notifications + Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <ThemeToggle variant="icon" showLabel={false} />
        <AddDataMenu />
        {/* Last refresh */}
        <div style={{ 
          fontSize: '14px', 
          color: 'var(--text-secondary)' 
        }}>
          Last updated: {relativeTime}
        </div>

        {/* Notifications */}
        <button
          style={{
            position: 'relative',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--text-secondary)'
          }}
          aria-label={`Notifications${notificationsCount > 0 ? ` (${notificationsCount} unread)` : ''}`}
        >
          <Bell size={20} />
          {notificationsCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                backgroundColor: 'var(--danger)',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600
              }}
            >
              {notificationsCount > 9 ? '9+' : notificationsCount}
            </span>
          )}
        </button>

        {/* Profile menu */}
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--text-primary)'
          }}
          aria-label="Account menu"
        >
          Account
        </button>
      </div>
    </div>
  );
}

