"use client";

import React, { useState } from "react";
import CommandCenterWhoopLayout from "@/components/command-center/CommandCenterWhoopLayout";
import SettingsNav from "@/components/settings/SettingsNav";
import AccountSection from "@/components/settings/AccountSection";
import ConnectionsSection from "@/components/settings/ConnectionsSection";
import NotificationsSection from "@/components/settings/NotificationsSection";
import PrivacySecuritySection from "@/components/settings/PrivacySecuritySection";
import PreferencesSection from "@/components/settings/PreferencesSection";
import SupportSection from "@/components/settings/SupportSection";
import dashboardData from "@/mock/dashboard.json";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";

type SettingsSection = "account" | "connections" | "notifications" | "privacy" | "preferences" | "support";

export default function SettingsPage() {
  const { evtAppLoaded } = useCommandCenterStore();
  const [activeSection, setActiveSection] = useState<SettingsSection>("account");

  React.useEffect(() => {
    evtAppLoaded();
  }, [evtAppLoaded]);

  const renderSection = () => {
    switch (activeSection) {
      case "account":
        return <AccountSection />;
      case "connections":
        return <ConnectionsSection />;
      case "notifications":
        return <NotificationsSection />;
      case "privacy":
        return <PrivacySecuritySection />;
      case "preferences":
        return <PreferencesSection />;
      case "support":
        return <SupportSection />;
      default:
        return <AccountSection />;
    }
  };

  return (
    <CommandCenterWhoopLayout
      lastUpdated={dashboardData.last_updated_iso}
      notificationsCount={dashboardData.notifications_count}
      pageTitle="Settings"
    >
      <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "4px",
            }}
          >
            Settings
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            Manage your account, connections, and preferences.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "32px" }}>
          {/* Left: Settings Nav */}
          <SettingsNav activeSection={activeSection} onSectionChange={setActiveSection} />

          {/* Right: Selected Section */}
          <div>{renderSection()}</div>
        </div>
      </div>
    </CommandCenterWhoopLayout>
  );
}



