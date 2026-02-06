"use client";

import React, { useState, useEffect, useMemo } from "react";
import CommandCenterWhoopLayout from "@/components/command-center/CommandCenterWhoopLayout";
import SignalsHeader from "@/components/signals/SignalsHeader";
import KeyDriversStrip from "@/components/signals/KeyDriversStrip";
import SignalsGrid from "@/components/signals/SignalsGrid";
import SignalInsightPanel from "@/components/signals/SignalInsightPanel";
import ExpandedTrendSection from "@/components/signals/ExpandedTrendSection";
import signalsData from "@/mock/signals.json";
import dashboardData from "@/mock/dashboard.json";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import { computeAllDomainStatuses } from "@/domain/computeDomainStatus";
import { DomainId } from "@/domain/domainConfig";

type Domain = "all" | "heart" | "metabolic" | "sleep" | "fitness";
type Range = "30d" | "90d" | "6m" | "12m" | "24m";

export default function SignalsPage() {
  const { evtAppLoaded } = useCommandCenterStore();
  const [domain, setDomain] = useState<Domain>("all");
  const [range, setRange] = useState<Range>("6m");
  const [selectedSignalId, setSelectedSignalId] = useState<string | null>(null);

  // Initialize on mount only
  useEffect(() => {
    evtAppLoaded();
  }, []); // Empty dependency array - only run once on mount

  // Filter signals by domain
  const filteredSignals = useMemo(() => {
    let signals = signalsData.signals || [];
    if (domain !== "all") {
      signals = signals.filter((s) => s.domain === domain);
    }
    return signals;
  }, [domain]);

  // Compute key drivers (top 3-5 by delta magnitude)
  const keyDrivers = useMemo(() => {
    return filteredSignals
      .map((signal) => {
        const latest = typeof signal.latest === "number" ? signal.latest : parseFloat(String(signal.latest));
        const baseline = typeof signal.baseline === "number" ? signal.baseline : parseFloat(String(signal.baseline));
        const delta = latest - baseline;
        return {
          id: signal.id,
          name: signal.name,
          latest: signal.latest,
          baseline: signal.baseline,
          direction: signal.direction,
          delta: Math.abs(delta),
        };
      })
      .sort((a, b) => b.delta - a.delta)
      .slice(0, 5)
      .map((d) => ({
        ...d,
        delta: typeof d.latest === "number" && typeof d.baseline === "number" ? d.latest - d.baseline : 0,
      }));
  }, [filteredSignals]);

  // Compute domain statuses for header dots
  const domainStatuses = useMemo(() => {
    const domainData: Record<DomainId, any> = {
      overview: { gaps: [], signals: [], screenings: [], predispositions: [], dataConfidence: "Fair" },
      cardiovascular: {
        gaps: dashboardData.gaps?.filter((g: any) => g.domain === "cardiovascular") || [],
        signals: dashboardData.signals?.filter((s: any) => s.domain === "cardiovascular") || [],
        screenings: [],
        predispositions: dashboardData.predispositions?.filter((p: any) => p.domain === "cardiovascular") || [],
        dataConfidence: "High",
      },
      metabolic: {
        gaps: [],
        signals: dashboardData.signals?.filter((s: any) => s.domain === "metabolic") || [],
        screenings: [],
        predispositions: [],
        dataConfidence: "High",
      },
      cancer_screening: { gaps: [], signals: [], screenings: [], predispositions: [], dataConfidence: "Low" },
      neuro: { gaps: [], signals: [], screenings: [], predispositions: [], dataConfidence: "Low" },
      sleep: { gaps: [], signals: [], screenings: [], predispositions: [], dataConfidence: "Fair" },
      fitness: { gaps: [], signals: [], screenings: [], predispositions: [], dataConfidence: "High" },
    };
    return computeAllDomainStatuses(domainData);
  }, []);

  // Set default selected signal on load or domain change
  useEffect(() => {
    if (filteredSignals.length > 0 && !selectedSignalId) {
      // Find worsening high-impact signal first
      const worsening = filteredSignals.find((s) => s.direction === "Worsening");
      if (worsening) {
        setSelectedSignalId(worsening.id);
      } else {
        // Otherwise select first in ranked list
        setSelectedSignalId(filteredSignals[0].id);
      }
    } else if (filteredSignals.length === 0) {
      setSelectedSignalId(null);
    } else if (selectedSignalId && !filteredSignals.find((s) => s.id === selectedSignalId)) {
      // If selected signal is not in filtered list, select first
      setSelectedSignalId(filteredSignals[0].id);
    }
  }, [domain, filteredSignals, selectedSignalId]);

  const selectedSignal = filteredSignals.find((s) => s.id === selectedSignalId) || null;

  const handleDomainChange = (newDomain: Domain) => {
    setDomain(newDomain);
    // Reset selection - will be set by useEffect
    setSelectedSignalId(null);
  };

  const handleRangeChange = (newRange: Range) => {
    setRange(newRange);
    // Range change doesn't reset selection, but would filter series in real app
  };

  const handleDriverClick = (signalId: string) => {
    setSelectedSignalId(signalId);
    // Scroll to expanded trend if it exists
    setTimeout(() => {
      const element = document.getElementById("expanded-trend-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleSignalClick = (signalId: string) => {
    setSelectedSignalId(signalId);
    // Scroll to expanded trend
    setTimeout(() => {
      const element = document.getElementById("expanded-trend-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <CommandCenterWhoopLayout
      lastUpdated={signalsData.last_updated_iso}
      notificationsCount={0}
      pageTitle="Signals"
    >
      {/* Header */}
      <SignalsHeader
        domain={domain}
        range={range}
        onDomainChange={handleDomainChange}
        onRangeChange={handleRangeChange}
        domainStatuses={domainStatuses}
      />

      {/* Key Drivers Strip */}
      <KeyDriversStrip drivers={keyDrivers} onDriverClick={handleDriverClick} />

      {/* Main Content Split */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px", marginBottom: "24px" }}>
        {/* Left: Signals Grid */}
        <SignalsGrid signals={filteredSignals} selectedSignalId={selectedSignalId} onSignalClick={handleSignalClick} domain={domain} />

        {/* Right: Insight Panel */}
        <SignalInsightPanel signal={selectedSignal} />
      </div>

      {/* Expanded Trend Section */}
      {selectedSignal && (
        <ExpandedTrendSection signal={selectedSignal} events={signalsData.events || []} />
      )}
    </CommandCenterWhoopLayout>
  );
}
