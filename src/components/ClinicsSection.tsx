"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { ArcButton } from "./ui/ArcButton";
import Link from "next/link";

type ClinicFeatureId =
  | "timeline"
  | "triage"
  | "protocols"
  | "interventions"
  | "marketplace";

interface ClinicFeature {
  id: ClinicFeatureId;
  label: string;
  preview: React.ReactNode;
}

const clinicFeatures: ClinicFeature[] = [
  {
    id: "timeline",
    label: "Unified patient timeline",
    preview: (
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: "var(--border)" }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>Sarah Chen</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Age 42, Low risk</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-2 rounded border" style={{ backgroundColor: "var(--surface-2)", borderColor: "var(--border)" }}>
            <div className="w-16 text-xs" style={{ color: "var(--text-muted)" }}>Jan 2024</div>
            <div className="flex-1">
              <p className="text-xs font-medium" style={{ color: "var(--text)" }}>Baseline panel</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Metabolic markers established</p>
            </div>
            <div className="w-2 h-2 rounded-full mt-1" style={{ backgroundColor: "var(--accent)" }}></div>
          </div>
          <div className="flex items-start gap-3 p-2 rounded border" style={{ backgroundColor: "var(--surface-2)", borderColor: "var(--border)" }}>
            <div className="w-16 text-xs" style={{ color: "var(--text-muted)" }}>Mar 2024</div>
            <div className="flex-1">
              <p className="text-xs font-medium" style={{ color: "var(--text)" }}>Protocol started</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Cardiometabolic blueprint</p>
            </div>
            <div className="w-2 h-2 rounded-full mt-1" style={{ backgroundColor: "var(--accent)" }}></div>
          </div>
          <div className="flex items-start gap-3 p-2 rounded border" style={{ backgroundColor: "var(--surface-2)", borderColor: "var(--border)" }}>
            <div className="w-16 text-xs" style={{ color: "var(--text-muted)" }}>Jun 2024</div>
            <div className="flex-1">
              <p className="text-xs font-medium" style={{ color: "var(--text)" }}>Follow up labs</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Markers improved</p>
            </div>
            <div className="w-2 h-2 rounded-full mt-1" style={{ backgroundColor: "var(--accent)" }}></div>
          </div>
          <div className="flex items-start gap-3 p-2 rounded border" style={{ backgroundColor: "var(--surface-2)", borderColor: "var(--border)" }}>
            <div className="w-16 text-xs" style={{ color: "var(--text-muted)" }}>Sep 2024</div>
            <div className="flex-1">
              <p className="text-xs font-medium" style={{ color: "var(--text)" }}>Review and adjustment</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Protocol updated</p>
            </div>
            <div className="w-2 h-2 rounded-full mt-1" style={{ backgroundColor: "var(--accent)" }}></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "triage",
    label: "Risk signal triage",
    preview: (
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: "var(--border)" }}>
          <h4 className="text-sm font-semibold" style={{ color: "var(--text)" }}>Critical signals</h4>
          <span className="text-xs px-2 py-1 rounded" style={{ color: "var(--accent)", backgroundColor: "var(--accent-soft)" }}>3 active</span>
        </div>
        <div className="space-y-2">
          <div className="p-3 rounded border flex items-center justify-between" style={{ backgroundColor: "var(--surface-2)", borderColor: "var(--danger)" }}>
            <div className="flex-1">
              <p className="text-xs font-medium mb-0.5" style={{ color: "var(--text)" }}>Elevated LDL trend</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>3 patients</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium" style={{ color: "var(--danger)" }}>High</span>
              <button className="text-xs px-2 py-1 rounded transition-colors" style={{ backgroundColor: "var(--surface-2)", color: "var(--text)" }}>
                Review
              </button>
            </div>
          </div>
          <div className="p-3 rounded border flex items-center justify-between" style={{ backgroundColor: "var(--surface-2)", borderColor: "var(--warning)" }}>
            <div className="flex-1">
              <p className="text-xs font-medium mb-0.5" style={{ color: "var(--text)" }}>Sleep marker shift</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>5 patients</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium" style={{ color: "var(--warning)" }}>Moderate</span>
              <button className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors">
                Review
              </button>
            </div>
          </div>
          <div className="p-3 rounded bg-[#050607] border border-white/10 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium text-white mb-0.5">Protocol adherence</p>
              <p className="text-xs text-gray-400">2 patients</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">Review</span>
              <button className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors">
                Review
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "protocols",
    label: "Protocol prescribing and tracking",
    preview: (
      <div className="arc-clinics-preview-content">
        <div className="arc-clinics-preview-header">
          <h4 className="arc-clinics-preview-header-title">Cardiometabolic optimization</h4>
          <p className="arc-clinics-preview-header-subhead">Active protocol</p>
        </div>
        <div className="arc-clinics-preview-sections">
          <div className="arc-clinics-preview-section">
            <div className="arc-clinics-preview-section-header">
              <span className="arc-clinics-preview-section-label">Adherence</span>
              <span className="arc-clinics-preview-section-value">87%</span>
            </div>
            <div className="arc-clinics-preview-progress">
              <div className="arc-clinics-preview-progress-track">
                <div className="arc-clinics-preview-progress-fill" style={{ width: "87%" }}></div>
              </div>
            </div>
          </div>
          <div className="arc-clinics-preview-section">
            <div className="arc-clinics-preview-section-header">
              <span className="arc-clinics-preview-section-label">Next review</span>
              <span className="arc-clinics-preview-section-value">14 days</span>
            </div>
          </div>
          <div className="arc-clinics-preview-section arc-clinics-preview-section-divider">
            <div className="arc-clinics-preview-section-header">
              <span className="arc-clinics-preview-section-label">Adjustments</span>
            </div>
            <p className="arc-clinics-preview-section-body">Reduced intervention frequency based on improved markers</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "interventions",
    label: "Intervention documentation",
    preview: (
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <h4 className="text-sm font-semibold text-white">Intervention log</h4>
          <span className="text-xs text-gray-400">Last 30 days</span>
        </div>
        <div className="space-y-2">
          <div className="p-3 rounded bg-[#050607] border border-white/5">
            <div className="flex items-start justify-between mb-1">
              <span className="text-xs font-medium text-white">Protocol adjustment</span>
              <span className="text-xs text-[var(--accent)] bg-[var(--accent-alpha-20)] px-2 py-0.5 rounded">Complete</span>
            </div>
            <p className="text-xs text-gray-300 mt-1">Reduced intervention frequency based on improved markers</p>
            <p className="text-xs text-gray-400 mt-1">Dr. Martinez, Jan 15</p>
          </div>
          <div className="p-3 rounded bg-[#050607] border border-white/5">
            <div className="flex items-start justify-between mb-1">
              <span className="text-xs font-medium text-white">Supplement added</span>
              <span className="text-xs text-gray-400 bg-white/10 px-2 py-0.5 rounded">Pending</span>
            </div>
            <p className="text-xs text-gray-300 mt-1">Omega-3 protocol initiated for inflammation markers</p>
            <p className="text-xs text-gray-400 mt-1">Dr. Martinez, Jan 20</p>
          </div>
          <div className="p-3 rounded bg-[#050607] border border-white/5">
            <div className="flex items-start justify-between mb-1">
              <span className="text-xs font-medium text-white">Lab review</span>
              <span className="text-xs text-[var(--accent)] bg-[var(--accent-alpha-20)] px-2 py-0.5 rounded">Complete</span>
            </div>
            <p className="text-xs text-gray-300 mt-1">Markers within target range, no changes needed</p>
            <p className="text-xs text-gray-400 mt-1">Dr. Martinez, Jan 10</p>
          </div>
        </div>
        <div className="pt-2">
          <input
            type="text"
            placeholder="Add note"
            className="w-full px-3 py-2 rounded bg-[#050607] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent-alpha-60)]"
            readOnly
          />
        </div>
      </div>
    ),
  },
  {
    id: "marketplace",
    label: "Marketplace ordering workflow",
    preview: (
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <h4 className="text-sm font-semibold text-white">Order diagnostics</h4>
          <span className="text-xs text-[var(--accent)]">3 selected</span>
        </div>
        <div className="space-y-2">
          <div className="p-3 rounded bg-[#050607] border border-white/5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-white">Baseline screening bundle</span>
              <span className="text-xs text-[var(--accent)]">Recommended</span>
            </div>
            <p className="text-xs text-gray-400">Metabolic markers, lipid panel, inflammation</p>
          </div>
          <div className="p-3 rounded bg-[#050607] border border-white/5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-white">Hormone health panel</span>
              <span className="text-xs text-[var(--accent)]">Recommended</span>
            </div>
            <p className="text-xs text-gray-400">Based on patient timeline signals</p>
          </div>
          <div className="p-3 rounded bg-[#050607] border border-white/5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-white">Advanced biomarker panel</span>
              <span className="text-xs text-gray-400">Optional</span>
            </div>
            <p className="text-xs text-gray-400">Extended screening</p>
          </div>
        </div>
        <div className="pt-2 border-t border-white/5">
          <p className="text-xs text-gray-400 mb-2">Status: Ready to send</p>
          <button className="w-full px-4 py-2 rounded-lg bg-[var(--accent-alpha-20)] border border-[var(--accent-alpha-60)] text-[var(--accent)] text-xs font-medium hover:bg-[var(--accent-alpha-20)] hover:border-[var(--accent)] transition-colors">
            Send order
          </button>
        </div>
      </div>
    ),
  },
];

export default function ClinicsSection() {
  const [activeFeature, setActiveFeature] = useState<ClinicFeatureId>("protocols");
  const activeFeatureData = clinicFeatures.find((f) => f.id === activeFeature) || clinicFeatures[0];
  const previewRef = useRef<HTMLDivElement>(null);

  const handleFeatureClick = (id: ClinicFeatureId) => {
    setActiveFeature(id);
    // Scroll preview into view on mobile
    if (window.innerWidth < 768 && previewRef.current) {
      setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  };

  return (
    <section id="home.clinics" className="arc-clinics-section">
      <Section>
        <div className="arc-clinics-wrapper">
          {/* Section Header - Visible on all screen sizes */}
          <div className="arc-clinics-heading-block">
            <p className="arc-clinics-eyebrow">
              FOR CLINICS
            </p>
            <h2 className="arc-clinics-headline">
              Clinical operating system for preventive care
            </h2>
            <p className="arc-clinics-subhead">
              A unified patient timeline, actionable risk signals, and intervention workflows designed for longitudinal medicine.
            </p>
          </div>

          {/* Desktop: Two column layout */}
          <div className="arc-clinics-grid">
            {/* Left Column */}
            <div className="arc-clinics-left order-2 lg:order-1">

              {/* Proof Points - Clinical Capability Slabs */}
              <div className="arc-clinics-benefits">
                <div className="arc-clinics-benefit-card">
                  <h4 className="arc-clinics-benefit-title">One patient view</h4>
                  <p className="arc-clinics-benefit-body">See every test note protocol and intervention in one place.</p>
                </div>
                <div className="arc-clinics-benefit-card">
                  <h4 className="arc-clinics-benefit-title">Faster prioritization</h4>
                  <p className="arc-clinics-benefit-body">Detect risk shifts early and route cases to the right workflow.</p>
                </div>
                <div className="arc-clinics-benefit-card">
                  <h4 className="arc-clinics-benefit-title">Documented outcomes</h4>
                  <p className="arc-clinics-benefit-body">Track plans over time, measure results, and document changes.</p>
                </div>
              </div>

              {/* CTA */}
              <div className="arc-clinics-cta">
                <button
                  onClick={() => window.location.href = '/clinics'}
                  className="arc-clinics-cta-button"
                >
                  Explore Clinics
                </button>
                <div>
                  <Link
                    href="/contact"
                    className="arc-clinics-secondary-link"
                  >
                    Request a demo
                  </Link>
                </div>
                <p className="arc-clinics-disclaimer">
                  Not a replacement for clinical judgment. Built to support longitudinal care workflows.
                </p>
              </div>
            </div>

            {/* Right Column: Protocol Index + Preview */}
            <div className="arc-clinics-right order-1 lg:order-2">
              {/* Protocol Index List */}
              <div className="arc-clinics-protocol-list">
                {clinicFeatures.map((feature) => {
                  const isActive = feature.id === activeFeature;
                  return (
                    <button
                      key={feature.id}
                      type="button"
                      onClick={() => handleFeatureClick(feature.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleFeatureClick(feature.id);
                        }
                      }}
                      className={`arc-clinics-protocol-row ${isActive ? 'arc-clinics-protocol-row-active' : 'arc-clinics-protocol-row-inactive'}`}
                      aria-label={`View ${feature.label} preview`}
                      aria-pressed={isActive}
                      role="button"
                      tabIndex={0}
                    >
                      {/* Left indicator strip (active only) */}
                      {isActive && <div className="arc-clinics-protocol-row-indicator" />}
                      
                      <div className="arc-clinics-protocol-row-content">
                        <div className={`arc-clinics-protocol-row-dot ${isActive ? 'arc-clinics-protocol-row-dot-active' : 'arc-clinics-protocol-row-dot-inactive'}`} />
                        <span className="arc-clinics-protocol-row-title">{feature.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Preview Panel - Clinical Protocol Sheet */}
              <div ref={previewRef} className="arc-clinics-preview">
                <p className="arc-clinics-preview-label">
                  PREVIEW
                </p>
                <div className="arc-clinics-preview-container">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                    >
                      {activeFeatureData.preview}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
