"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import HighlightOnTarget from "@/components/util/HighlightOnTarget";
import TodayHeroCard from "@/components/cards/TodayHeroCard";
import AddDataButton from "@/components/controls/AddDataButton";
import QuickWinStrip from "@/components/cards/QuickWinStrip";
import SignalsThatMatterCard from "@/components/cards/SignalsThatMatterCard";
import WatchlistCard from "@/components/cards/WatchlistCard";
import HealthMapCard from "@/components/cards/HealthMapCard";
import NextStepsPanel from "@/components/panels/NextStepsPanel";
import RemindersPanel from "@/components/panels/RemindersPanel";
import MarketplacePanel from "@/components/panels/MarketplacePanel";
import SignalModal from "@/components/modals/SignalModal";
import GapModal from "@/components/modals/GapModal";
import ReminderModal from "@/components/modals/ReminderModal";
import UploadModal from "@/components/modals/UploadModal";
import ArcGuide from "@/components/guide/ArcGuide";
import Toast from "@/components/ui/Toast";
import dashboardData from "@/mock/dashboard.json";
import { useDashboardUIStore } from "@/state/useDashboardUIStore";

export default function OverviewPageV2() {
  const {
    openModal,
    modalPayload,
    contextSelection,
    closeModal,
    openGap,
    openSignal,
    openReminder,
    openUpload,
  } = useDashboardUIStore();

  // Get data
  const today = dashboardData.today;
  const signals = dashboardData.signals || [];
  const watchlist = dashboardData.watchlist || [];
  const gaps = dashboardData.gaps || [];
  const actions = dashboardData.actions || [];
  const reminders = dashboardData.reminders || { active: [], suggested: [] };
  const services = dashboardData.services || [];

  // Find next action
  const nextAction = today.next_action_id
    ? actions.find((a: any) => a.id === today.next_action_id)
    : actions[0];

  // Find top gap for quick win
  const topGap = gaps.find((g: any) => g.priority === "High") || gaps[0];

  // Get signal data for modal
  const selectedSignal = openModal === "signal" && contextSelection?.type === "signal"
    ? signals.find((s: any) => s.id === contextSelection.id)
    : null;

  // Get gap data for modal
  const selectedGap = openModal === "gap" && contextSelection?.type === "gap"
    ? gaps.find((g: any) => g.id === contextSelection.id)
    : null;

  return (
    <DashboardLayout
      lastUpdated={dashboardData.last_updated_iso}
      notificationsCount={dashboardData.notifications_count}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(640px, 1fr) 360px",
          gap: "24px",
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
          padding: "24px",
          position: "relative",
        }}
      >
        {/* Subtle gradient background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "200px",
            background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Main Content Area */}
        <div style={{ minWidth: 0, position: "relative", zIndex: 1 }}>
          {/* Today Hero Card */}
          <HighlightOnTarget id="today">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ flex: 1 }} />
              <AddDataButton />
            </div>
            <TodayHeroCard
              status={today.status as any}
              watchAreas={today.watch_areas}
              dataConfidence={today.data_confidence}
              nextAction={nextAction}
            />
          </HighlightOnTarget>

          {/* Quick Win Strip */}
          <QuickWinStrip gap={topGap} action={nextAction} />

          {/* Signals That Matter */}
          <HighlightOnTarget id="signals">
            <SignalsThatMatterCard signals={signals} />
          </HighlightOnTarget>

          {/* Watchlist */}
          <HighlightOnTarget id="watchlist">
            <WatchlistCard watchlist={watchlist} />
          </HighlightOnTarget>

          {/* Health Map */}
          <HighlightOnTarget id="healthmap">
            <HealthMapCard coveragePercent={dashboardData.coverage_percent} gaps={gaps} />
          </HighlightOnTarget>
        </div>

        {/* Right Rail - Sticky Column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            position: "sticky",
            top: "80px",
            alignSelf: "flex-start",
            maxHeight: "calc(100vh - 96px)",
            overflowY: "auto",
            zIndex: 1,
          }}
        >
          <HighlightOnTarget id="nextsteps">
            <NextStepsPanel actions={actions} />
          </HighlightOnTarget>

          <HighlightOnTarget id="reminders">
            <RemindersPanel
              active={reminders.active}
              suggested={reminders.suggested}
              onToggleReminder={(id, enabled) => console.log("Toggle reminder", id, enabled)}
              onAddReminder={(reminder) => openReminder({ name: reminder.name })}
              onManageReminders={() => console.log("Manage reminders")}
              onCreateReminder={() => openReminder()}
            />
          </HighlightOnTarget>

          <HighlightOnTarget id="marketplace">
            <MarketplacePanel services={services} />
          </HighlightOnTarget>
        </div>
      </div>

      {/* Modals */}
      <SignalModal signal={selectedSignal} onClose={closeModal} />

      <GapModal
        gap={selectedGap}
        onClose={closeModal}
        onUpload={() => {
          if (selectedGap) {
            openUpload(selectedGap.id);
            closeModal();
          }
        }}
        onSetReminder={() => {
          if (selectedGap) {
            closeModal();
            openReminder({ name: `${selectedGap.title} reminder` });
          }
        }}
        onViewServices={() => {
          if (selectedGap) {
            closeModal();
            // This would set marketplace filter
          }
        }}
      />

      <ReminderModal
        isOpen={openModal === "reminder"}
        onClose={closeModal}
        onSave={(reminder) => {
          console.log("Reminder saved:", reminder);
          closeModal();
        }}
        initialData={modalPayload}
      />

      <UploadModal isOpen={openModal === "upload"} onClose={closeModal} gapId={modalPayload?.gapId} />

      {/* Arc Guide */}
      <ArcGuide gaps={gaps} actions={actions} />

      {/* Toast would be handled by upload modal */}
    </DashboardLayout>
  );
}

