"use client";

import React, { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Force dynamic rendering to support search params
export const dynamic = 'force-dynamic';
import CommandCenterWhoopLayout from "@/components/command-center/CommandCenterWhoopLayout";
import DailyBriefingHeader from "@/components/command-center/DailyBriefingHeader";
import HeroTilesRow from "@/components/command-center/HeroTilesRow";
import DriversBoard from "@/components/command-center/DriversBoard";
import HealthTimelineCompact from "@/components/command-center/HealthTimelineCompact";
import ActionPlanCard from "@/components/command-center/ActionPlanCard";
import DomainStatusList from "@/components/domain/DomainStatusList";
import CoachRail from "@/components/command-center/CoachRail";
import dashboardData from "@/mock/dashboard.json";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import { computeAllDomainStatuses } from "@/domain/computeDomainStatus";
import { DomainId } from "@/domain/domainConfig";

function CommandCenterContent() {
  const { evtAppLoaded, selectedFocusTile, selectedDomain } = useCommandCenterStore();
  const searchParams = useSearchParams();
  const [preset, setPreset] = useState<string | null>(null);

  // Read preset from query params
  useEffect(() => {
    const presetParam = searchParams.get("preset");
    if (presetParam && ["records", "trends", "signals"].includes(presetParam)) {
      setPreset(presetParam);
    }
  }, [searchParams]);

  // Listen for postMessage from parent (if embedded)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "preset" && event.data?.preset) {
        setPreset(event.data.preset);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Initialize on mount only
  useEffect(() => {
    evtAppLoaded();
  }, []); // Empty dependency array - only run once on mount

  // Get data with safe defaults
  const today = dashboardData.today || { status: "Stable", watch_areas: [], data_confidence: 0 };
  const signals = dashboardData.signals || [];
  const actions = dashboardData.actions || [];
  const reminders = dashboardData.reminders?.active || [];
  const gaps = dashboardData.gaps || [];
  const screenings = dashboardData.screenings || [];
  const predispositions = dashboardData.predispositions || [];
  const domainDataConfidence = dashboardData.domainDataConfidence || {};
  const coveragePercent = dashboardData.coverage_percent || 70;

  // Compute domain statuses
  const domainStatuses = useMemo(() => {
    const domainData: Record<DomainId, any> = {
      overview: {
        gaps: gaps.filter((g: any) => !g.domain || g.domain === "overview"),
        signals: signals.filter((s: any) => !s.domain || s.domain === "overview"),
        screenings: [],
        predispositions: [],
        dataConfidence: domainDataConfidence.overview || "Low",
      },
      cardiovascular: {
        gaps: gaps.filter((g: any) => g.domain === "cardiovascular"),
        signals: signals.filter((s: any) => s.domain === "cardiovascular"),
        screenings: [],
        predispositions: predispositions.filter((p: any) => p.domain === "cardiovascular"),
        dataConfidence: domainDataConfidence.cardiovascular || "Low",
      },
      metabolic: {
        gaps: gaps.filter((g: any) => g.domain === "metabolic"),
        signals: signals.filter((s: any) => s.domain === "metabolic"),
        screenings: [],
        predispositions: [],
        dataConfidence: domainDataConfidence.metabolic || "Low",
      },
      cancer_screening: {
        gaps: [],
        signals: [],
        screenings: screenings.filter((s: any) => s.domain === "cancer_screening"),
        predispositions: [],
        dataConfidence: domainDataConfidence.cancer_screening || "Low",
      },
      neuro: {
        gaps: [],
        signals: [],
        screenings: [],
        predispositions: [],
        dataConfidence: domainDataConfidence.neuro || "Low",
      },
      sleep: {
        gaps: [],
        signals: [],
        screenings: [],
        predispositions: [],
        dataConfidence: domainDataConfidence.sleep || "Low",
        sleepSymptoms: [],
      },
      fitness: {
        gaps: [],
        signals: [],
        screenings: [],
        predispositions: [],
        dataConfidence: domainDataConfidence.fitness || "Low",
      },
    };

    return computeAllDomainStatuses(domainData);
  }, [gaps, signals, screenings, predispositions, domainDataConfidence]);

  // Calculate readiness score (mock - would come from real data)
  const readinessScore = 72;
  const readinessStatus: "Improving" | "Stable" | "Needs attention" = readinessScore >= 70 ? "Stable" : "Needs attention";
  const readinessDrivers = signals
    .filter((s: any) => s.direction === "Improving")
    .slice(0, 2)
    .map((s: any) => s.name);

  // Calculate risk load (lower is better) - based on red/yellow domain count
  const riskLoadScore = domainStatuses.filter((s) => s.dot === "red" || s.dot === "yellow").length * 15;
  const riskDomains = domainStatuses
    .filter((s) => s.dot === "red" || s.dot === "yellow")
    .slice(0, 2)
    .map((s) => ({
      id: s.domainId,
      name: s.domainId === "cardiovascular" ? "Cardiovascular" : s.domainId === "metabolic" ? "Metabolic" : s.domainId,
      hasPredisposition: s.reasonType === "predisposition",
    }));

  // Data confidence
  const dataConfidenceScore = coveragePercent;
  const missingCount = gaps.length;

  // Build drivers (signals + gaps)
  const drivers = [
    ...signals.slice(0, 4).map((s: any) => ({
      id: s.id,
      title: s.name,
      state: s.direction === "Improving" ? "Improving" : s.direction === "Worsening" ? "Worsening" : "Stable",
      sparkline: s.trend_data || [65, 70, 68, 72, 70, 75],
      source: s.source || "Lab",
      isGap: false,
    })),
    ...gaps.slice(0, 2).map((g: any) => ({
      id: g.id,
      title: g.title,
      state: g.priority === "High" ? "Missing" : "Outdated",
      sparkline: undefined,
      source: "Provider" as const,
      isGap: true,
      gapId: g.id,
    })),
  ];

  // Timeline events (mock - would come from real data)
  const timelineEvents = [
    { id: "1", date: "2024-01-15", type: "Lab" as const, title: "Lipid panel", source: "Quest Diagnostics" },
    { id: "2", date: "2024-01-14", type: "Wearable" as const, title: "Resting heart rate", source: "Apple Watch" },
    { id: "3", date: "2024-01-10", type: "Screening" as const, title: "Annual physical", source: "Dr. Smith" },
    { id: "4", date: "2024-01-08", type: "Lab" as const, title: "CBC", source: "LabCorp" },
    { id: "5", date: "2024-01-05", type: "Wearable" as const, title: "Sleep analysis", source: "Oura Ring" },
  ];

  // Get insight and CTA for header
  const getInsight = () => {
    if (missingCount > 0) {
      return `Your health data is ${coveragePercent}% complete. Add ${missingCount} ${missingCount === 1 ? "item" : "items"} to improve insights.`;
    }
    const topDomain = domainStatuses[0];
    return `Your health readiness is ${readinessScore}. Focus on ${topDomain?.domainId || "key areas"} to optimize.`;
  };

  const getPrimaryCTA = () => {
    if (missingCount > 0) {
      return {
        label: "Fix now",
        action: () => {
          if (gaps.length > 0) {
            useCommandCenterStore.getState().evtGapClick(gaps[0].id || "", gaps[0].title);
          } else {
            useCommandCenterStore.getState().evtAddDataClick();
          }
        },
      };
    }
    if (actions.length > 0) {
      return {
        label: "Do now",
        action: () => {
          const topAction = actions[0];
          useCommandCenterStore.getState().evtActionDoNow(topAction.id, topAction.title, topAction.has_services || false);
        },
      };
    }
    return {
      label: "Add data",
      action: () => {
        useCommandCenterStore.getState().evtAddDataClick();
      },
    };
  };

  return (
    <CommandCenterWhoopLayout
      lastUpdated={dashboardData.last_updated_iso}
      notificationsCount={dashboardData.notifications_count}
      pageTitle="Command Center"
      coachRail={
        <CoachRail
          todayFocus={{
            title: missingCount > 0 ? "Complete your health map" : "Optimize readiness",
            description: getInsight(),
            action: getPrimaryCTA().action,
          }}
          notifications={[
            { id: "1", message: "New lab results available", time: "2 hours ago" },
            { id: "2", message: "Reminder: Annual screening due", time: "1 day ago" },
          ]}
        />
      }
    >
      {/* Header */}
      <DailyBriefingHeader insight={getInsight()} primaryCTA={getPrimaryCTA()} />

      {/* Hero Tiles Row */}
      <HeroTilesRow
        readiness={{
          score: readinessScore,
          status: readinessStatus,
          drivers: readinessDrivers,
        }}
        riskLoad={{
          score: riskLoadScore,
          topDomains: riskDomains,
        }}
        dataConfidence={{
          score: dataConfidenceScore,
          missingCount: missingCount,
        }}
      />

      {/* Domain Status List + Action Plan Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <DomainStatusList statuses={domainStatuses} />
        <ActionPlanCard actions={actions} />
      </div>

      {/* Drivers Board */}
      <DriversBoard drivers={drivers} />

      {/* Bottom Row: Timeline + Health Map preview */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        <HealthTimelineCompact events={timelineEvents} />
        <div
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "20px",
            height: "100%",
          }}
        >
          <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "12px" }}>
            Health Map
          </h3>
          <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
            {coveragePercent}% complete. Click to view full map.
          </div>
        </div>
      </div>
    </CommandCenterWhoopLayout>
  );
}

export default function CommandCenterPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: "var(--bg)",
        color: "var(--text-primary)"
      }}>
        Loading...
      </div>
    }>
      <CommandCenterContent />
    </Suspense>
  );
}
