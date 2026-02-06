"use client";

import React, { useState, useEffect } from "react";
import { DashboardProvider, useDashboard } from "@/context/DashboardContext";
import "./styles.css";
import DashboardLayout from "@/components/layout/DashboardLayout";
import HealthSnapshotCard from "@/components/cards/HealthSnapshotCard";
import CoverageGapsCard from "@/components/cards/CoverageGapsCard";
import TrendsCard from "@/components/cards/TrendsCard";
import NextBestActionsPanel from "@/components/panels/NextBestActionsPanel";
import RemindersPanel from "@/components/panels/RemindersPanel";
import MarketplacePanel from "@/components/panels/MarketplacePanel";
import GapModal from "@/components/modals/GapModal";
import TrendModal from "@/components/modals/TrendModal";
import ReminderModal from "@/components/modals/ReminderModal";
import OnboardingEmptyState from "@/components/cards/OnboardingEmptyState";
import QuickWinCard from "@/components/cards/QuickWinCard";
import ArcGuide from "@/components/guide/ArcGuide";
import Toast from "@/components/ui/Toast";
import dashboardData from "@/mock/dashboard.json";

function OverviewContent() {
  const {
    activeSection,
    contextSelection,
    marketplaceFilter,
    openModal,
    openModalPayload,
    setContextSelection,
    setMarketplaceFilter,
    setOpenModal,
    closeModal,
    scrollToSection,
  } = useDashboard();

  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [lastUserScroll, setLastUserScroll] = useState<number>(Date.now());

  // Check if user has any data
  const hasData = dashboardData.signals && dashboardData.signals.length > 0;

  // Calculate coverage score (mock calculation)
  const coverageScore = dashboardData.gaps.length > 0 
    ? Math.max(0, 100 - (dashboardData.gaps.length * 10))
    : 100;

  // Track user scroll
  useEffect(() => {
    const handleScroll = () => {
      setLastUserScroll(Date.now());
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle anchor scrolling on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const sectionMap: Record<string, any> = {
        "#overview": "overview",
        "#documents": "documents",
        "#trends": "trends",
        "#recommendations": "recommendations",
        "#reminders": "reminders",
        "#marketplace": "marketplace",
      };
      const section = sectionMap[hash];
      if (section) {
        scrollToSection(section as any);
      }
    }
  }, [scrollToSection]);

  // Handle Fix Now from Coverage Gaps
  const handleFixNow = (gap: any) => {
    setContextSelection({ type: "gap", id: gap.title });
    setOpenModal("gap", gap);
  };

  // Handle Upload from Coverage Gaps
  const handleUpload = (gap: any) => {
    setContextSelection({ type: "gap", id: gap.title });
    setOpenModal("gap", gap);
  };

  // Handle View Options from Next Best Actions
  const handleViewOptions = (action: any) => {
    setContextSelection({ type: "action", id: action.title });
    setMarketplaceFilter({ sourceType: "action", sourceId: action.title });
    scrollToSection("marketplace");
  };

  // Handle Set Reminder from Next Best Actions
  const handleSetReminder = (actionOrGap?: any) => {
    const payload = actionOrGap 
      ? {
          name: actionOrGap.title || actionOrGap.name,
          frequency: "Monthly", // Could be from action.recommendedCadence
          startDate: new Date().toISOString().split("T")[0],
        }
      : null;
    setOpenModal("reminder", payload);
  };

  // Handle View Trend from Health Snapshot
  const handleViewTrend = (metric: any) => {
    setContextSelection({ type: "metric", id: metric.name });
    // Find trend data
    const trendData = dashboardData.trends.biomarkers?.find((t: any) => t.name === metric.name);
    if (trendData) {
      setOpenModal("trend", {
        name: metric.name,
        latest: metric.value,
        unit: metric.unit,
        baseline: trendData.baseline,
        direction: trendData.direction,
      });
    }
  };

  // Handle View Service Options from Gap Modal
  const handleViewServiceOptions = () => {
    if (openModalPayload) {
      setMarketplaceFilter({ sourceType: "gap", sourceId: openModalPayload.title });
      closeModal();
      scrollToSection("marketplace");
    }
  };

  // Handle Save Reminder
  const handleSaveReminder = (reminder: any) => {
    setShowToast(true);
    setToastMessage("Reminder saved.");
    closeModal();
    
    // Scroll to reminders if off-screen and user hasn't scrolled recently
    const timeSinceScroll = Date.now() - lastUserScroll;
    if (timeSinceScroll > 3000) {
      const remindersElement = document.querySelector("#reminders");
      if (remindersElement) {
        const rect = remindersElement.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (!isVisible) {
          scrollToSection("reminders");
        }
      }
    }
  };

  // Handle Select Service
  const handleSelectService = (service: any) => {
    // Toggle selected state
    const updatedService = { ...service, selected: !service.selected };
    // In a real app, this would update state/API
    console.log("Service selected:", updatedService);
  };

  // Get filtered services for marketplace
  const getFilteredServices = () => {
    if (!marketplaceFilter) return dashboardData.services;
    
    // Filter services based on marketplaceFilter
    // In a real app, this would be an API call
    return dashboardData.services.filter((s: any) => {
      if (marketplaceFilter.sourceType === "gap") {
        return s.why_now?.toLowerCase().includes("lipid") || true; // Mock filter
      }
      return true;
    });
  };

  return (
    <DashboardLayout
      lastUpdated={dashboardData.last_updated_iso}
      notificationsCount={dashboardData.notifications_count}
    >
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 360px',
        gap: '24px',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        padding: '24px',
        position: 'relative'
      }}>
        {/* Subtle gradient background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />
        {/* Main Content Area */}
        <div style={{ minWidth: 0, position: 'relative', zIndex: 1 }}>
          {!hasData ? (
            <OnboardingEmptyState
              onConnectProviders={() => console.log('Connect providers')}
              onUploadDocuments={() => console.log('Upload documents')}
            />
          ) : (
            <>
              {/* Health Snapshot - Full Width */}
              <HealthSnapshotCard
                status={(dashboardData.today?.status || 'Stable') as any}
                riskLevel="Moderate"
                metrics={dashboardData.signals?.slice(0, 4).map((s: any) => ({
                  name: s.name,
                  value: s.latest,
                  unit: s.unit,
                  delta: typeof s.latest === 'number' && typeof s.baseline === 'number' 
                    ? s.latest - s.baseline 
                    : 0,
                  deltaType: s.direction === 'Improving' ? 'down' : s.direction === 'Worsening' ? 'up' : 'stable'
                })) || []}
                onViewTrend={handleViewTrend}
              />

              {/* Quick Win Strip */}
              <QuickWinCard
                title="Upload your last lipid panel PDF"
                action="Upload"
                onAction={() => {
                  const firstGap = dashboardData.gaps[0];
                  if (firstGap) {
                    handleUpload(firstGap);
                  }
                }}
              />

              {/* Two Column Layout */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
                marginBottom: '24px'
              }}>
                {/* Coverage Gaps - Left Half */}
                <CoverageGapsCard
                  coverageScore={dashboardData.coverage_percent || coverageScore}
                  gaps={dashboardData.gaps}
                  onFixNow={handleFixNow}
                  onUpload={handleUpload}
                  onViewAll={() => console.log('View all documents')}
                />

                {/* Trends - Right Half */}
                <TrendsCard
                  biomarkers={dashboardData.signals?.filter((s: any) => s.source === 'Lab') || []}
                  cardio={dashboardData.signals?.filter((s: any) => s.name.toLowerCase().includes('heart') || s.name.toLowerCase().includes('cardio')) || []}
                  metabolic={dashboardData.signals?.filter((s: any) => s.name.toLowerCase().includes('glucose') || s.name.toLowerCase().includes('hba1c')) || []}
                />
              </div>
            </>
          )}
        </div>

        {/* Right Rail - Sticky Column */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '16px',
          position: 'sticky',
          top: '80px',
          alignSelf: 'flex-start',
          maxHeight: 'calc(100vh - 96px)',
          overflowY: 'auto',
          position: 'relative',
          zIndex: 1
        }}>
          <NextBestActionsPanel
            actions={dashboardData.actions}
            onSetReminder={handleSetReminder}
            onViewOptions={handleViewOptions}
            contextSelection={contextSelection}
          />
          <RemindersPanel
            active={dashboardData.reminders.active}
            suggested={dashboardData.reminders.suggested}
            onToggleReminder={(id, enabled) => console.log('Toggle reminder', id, enabled)}
            onAddReminder={(reminder) => handleSetReminder(reminder)}
            onManageReminders={() => console.log('Manage reminders')}
            onCreateReminder={() => handleSetReminder()}
          />
          <MarketplacePanel
            services={getFilteredServices()}
            onSelect={handleSelectService}
            onLearnMore={(service) => console.log('Learn more', service)}
            filter={marketplaceFilter}
            onClearFilter={() => setMarketplaceFilter(null)}
          />
        </div>
      </div>

      {/* Modals */}
      <GapModal
        gap={openModal === "gap" ? openModalPayload : null}
        onClose={closeModal}
        onUpload={() => {
          console.log('Upload document');
          closeModal();
        }}
        onSetReminder={() => {
          closeModal();
          handleSetReminder(openModalPayload);
        }}
        onViewServices={handleViewServiceOptions}
      />

      <TrendModal
        trend={openModal === "trend" ? openModalPayload : null}
        onClose={closeModal}
        onSeeWaysToImprove={() => console.log('See ways to improve')}
      />

      <ReminderModal
        isOpen={openModal === "reminder"}
        onClose={closeModal}
        onSave={handleSaveReminder}
        initialData={openModalPayload}
      />

      {/* Toast */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Arc Guide */}
      <ArcGuide gaps={dashboardData.gaps} />
    </DashboardLayout>
  );
}

export default function OverviewPage() {
  return (
    <DashboardProvider>
      <OverviewContent />
    </DashboardProvider>
  );
}
