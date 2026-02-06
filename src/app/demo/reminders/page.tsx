"use client";

import React, { useState, useEffect, useMemo } from "react";
import CommandCenterWhoopLayout from "@/components/command-center/CommandCenterWhoopLayout";
import DomainStatusList from "@/components/domain/DomainStatusList";
import UpcomingStrip from "@/components/reminders/UpcomingStrip";
import ActiveRemindersList from "@/components/reminders/ActiveRemindersList";
import SuggestedRemindersList from "@/components/reminders/SuggestedRemindersList";
import MonitoringPlanPanel from "@/components/reminders/MonitoringPlanPanel";
import remindersData from "@/mock/reminders.json";
import dashboardData from "@/mock/dashboard.json";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import { computeAllDomainStatuses } from "@/domain/computeDomainStatus";
import { DomainId } from "@/domain/domainConfig";
import { parseISO, isAfter, isBefore, addDays, addWeeks, addMonths } from "date-fns";

type Domain = "all" | DomainId;
type UpcomingTab = "7d" | "30d" | "later";

export default function RemindersPage() {
  const { evtAppLoaded, evtActionSetReminder } = useCommandCenterStore();
  const [domain, setDomain] = useState<Domain>("all");
  const [upcomingTab, setUpcomingTab] = useState<UpcomingTab>("30d");
  const [selectedReminderId, setSelectedReminderId] = useState<string | null>(null);

  // Initialize on mount
  useEffect(() => {
    evtAppLoaded();
  }, []);

  // Compute domain statuses
  const domainStatuses = useMemo(() => {
    const gaps = dashboardData.gaps || [];
    const signals = dashboardData.signals || [];
    const predispositions = dashboardData.predispositions || [];
    const screenings = dashboardData.screenings || [];
    const domainDataConfidence = dashboardData.domain_data_confidence || {};
    return computeAllDomainStatuses(gaps, signals, predispositions, screenings, domainDataConfidence);
  }, []);

  // Filter reminders by domain
  const filteredReminders = useMemo(() => {
    let active = remindersData.active || [];
    let suggested = remindersData.suggested || [];

    if (domain !== "all") {
      active = active.filter((r: any) => r.domainId === domain);
      suggested = suggested.filter((r: any) => r.domainId === domain);
    }

    return { active, suggested };
  }, [domain]);

  // Get upcoming reminders based on tab
  const upcomingReminders = useMemo(() => {
    const now = new Date();
    const active = filteredReminders.active.filter((r: any) => r.isEnabled);

    if (upcomingTab === "7d") {
      const cutoff = addDays(now, 7);
      return active.filter((r: any) => {
        const nextDate = parseISO(r.nextRunDate);
        return isAfter(nextDate, now) && isBefore(nextDate, cutoff);
      });
    } else if (upcomingTab === "30d") {
      const cutoff = addDays(now, 30);
      return active.filter((r: any) => {
        const nextDate = parseISO(r.nextRunDate);
        return isAfter(nextDate, now) && isBefore(nextDate, cutoff);
      });
    } else {
      const cutoff = addDays(now, 30);
      return active.filter((r: any) => {
        const nextDate = parseISO(r.nextRunDate);
        return isAfter(nextDate, cutoff);
      });
    }
  }, [filteredReminders.active, upcomingTab]);

  const handleCreateReminder = () => {
    evtActionSetReminder("", "", "");
  };

  const handleDomainClick = (domainId: DomainId) => {
    setDomain(domainId);
  };

  const handleEnablePlan = (domainId: DomainId) => {
    // TODO: Bulk create reminders for domain
    alert("Monitoring plan enabled.");
  };

  return (
    <CommandCenterWhoopLayout
      lastUpdated={dashboardData.last_updated_iso}
      notificationsCount={dashboardData.notifications_count}
      pageTitle="Reminders"
    >
      <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "24px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "4px",
              }}
            >
              Reminders
            </h1>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              Your monitoring plan and upcoming check-ins.
            </p>
          </div>
          <button
            onClick={handleCreateReminder}
            style={{
              padding: "10px 20px",
              backgroundColor: "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            Create reminder
          </button>
        </div>

        {/* Domain Monitoring Overview */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--text-secondary)",
              marginBottom: "12px",
              display: "block",
            }}
          >
            Monitoring by domain
          </label>
          <DomainStatusList
            statuses={domainStatuses}
            onDomainClick={handleDomainClick}
            compact={false}
          />
        </div>

        {/* Upcoming Strip */}
        <div style={{ marginBottom: "24px" }}>
          <UpcomingStrip
            reminders={upcomingReminders}
            activeTab={upcomingTab}
            onTabChange={setUpcomingTab}
            onReminderClick={setSelectedReminderId}
          />
        </div>

        {/* Main Content: Lists + Monitoring Panel */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "24px" }}>
          {/* Left: Reminders Lists */}
          <div>
            <ActiveRemindersList
              reminders={filteredReminders.active}
              selectedReminderId={selectedReminderId}
              onReminderSelect={setSelectedReminderId}
            />
            <SuggestedRemindersList
              reminders={filteredReminders.suggested}
              onAddReminder={(reminderId) => {
                const reminder = filteredReminders.suggested.find((r: any) => r.id === reminderId);
                if (reminder) {
                  evtActionSetReminder(reminderId, reminder.name, reminder.recommendedFrequency || "");
                }
              }}
            />
          </div>

          {/* Right: Monitoring Plan Panel */}
          <MonitoringPlanPanel
            domain={domain}
            onEnablePlan={handleEnablePlan}
          />
        </div>
      </div>
    </CommandCenterWhoopLayout>
  );
}
