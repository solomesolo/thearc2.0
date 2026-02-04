"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import Button from "./ui/Button";
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
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div>
            <p className="text-sm font-semibold text-white">Sarah Chen</p>
            <p className="text-xs text-gray-400">Age 42, Low risk</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-2 rounded bg-[#050607] border border-white/5">
            <div className="w-16 text-xs text-gray-400">Jan 2024</div>
            <div className="flex-1">
              <p className="text-xs font-medium text-white">Baseline panel</p>
              <p className="text-xs text-gray-400">Metabolic markers established</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#4DEECD] mt-1"></div>
          </div>
          <div className="flex items-start gap-3 p-2 rounded bg-[#050607] border border-white/5">
            <div className="w-16 text-xs text-gray-400">Mar 2024</div>
            <div className="flex-1">
              <p className="text-xs font-medium text-white">Protocol started</p>
              <p className="text-xs text-gray-400">Cardiometabolic blueprint</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#4DEECD] mt-1"></div>
          </div>
          <div className="flex items-start gap-3 p-2 rounded bg-[#050607] border border-white/5">
            <div className="w-16 text-xs text-gray-400">Jun 2024</div>
            <div className="flex-1">
              <p className="text-xs font-medium text-white">Follow up labs</p>
              <p className="text-xs text-gray-400">Markers improved</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#4DEECD] mt-1"></div>
          </div>
          <div className="flex items-start gap-3 p-2 rounded bg-[#050607] border border-white/5">
            <div className="w-16 text-xs text-gray-400">Sep 2024</div>
            <div className="flex-1">
              <p className="text-xs font-medium text-white">Review and adjustment</p>
              <p className="text-xs text-gray-400">Protocol updated</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#4DEECD] mt-1"></div>
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
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <h4 className="text-sm font-semibold text-white">Critical signals</h4>
          <span className="text-xs text-[#4DEECD] bg-[#4DEECD]/10 px-2 py-1 rounded">3 active</span>
        </div>
        <div className="space-y-2">
          <div className="p-3 rounded bg-[#050607] border border-red-500/30 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium text-white mb-0.5">Elevated LDL trend</p>
              <p className="text-xs text-gray-400">3 patients</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-400 font-medium">High</span>
              <button className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors">
                Review
              </button>
            </div>
          </div>
          <div className="p-3 rounded bg-[#050607] border border-yellow-500/30 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium text-white mb-0.5">Sleep marker shift</p>
              <p className="text-xs text-gray-400">5 patients</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-yellow-400 font-medium">Moderate</span>
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
      <div className="space-y-3">
        <div className="pb-2 border-b border-white/5">
          <h4 className="text-sm font-semibold text-white mb-1">Cardiometabolic optimization</h4>
          <p className="text-xs text-gray-400">Active protocol</p>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">Adherence</span>
              <span className="text-xs text-white font-medium">87%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#4DEECD] rounded-full" style={{ width: "87%" }}></div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Next review</span>
            <span className="text-white font-medium">14 days</span>
          </div>
          <div className="pt-2 border-t border-white/5">
            <p className="text-xs text-gray-400 mb-2">Adjustments</p>
            <p className="text-xs text-gray-300">Reduced intervention frequency based on improved markers</p>
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
              <span className="text-xs text-[#4DEECD] bg-[#4DEECD]/10 px-2 py-0.5 rounded">Complete</span>
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
              <span className="text-xs text-[#4DEECD] bg-[#4DEECD]/10 px-2 py-0.5 rounded">Complete</span>
            </div>
            <p className="text-xs text-gray-300 mt-1">Markers within target range, no changes needed</p>
            <p className="text-xs text-gray-400 mt-1">Dr. Martinez, Jan 10</p>
          </div>
        </div>
        <div className="pt-2">
          <input
            type="text"
            placeholder="Add note"
            className="w-full px-3 py-2 rounded bg-[#050607] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#4DEECD]/50"
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
          <span className="text-xs text-[#4DEECD]">3 selected</span>
        </div>
        <div className="space-y-2">
          <div className="p-3 rounded bg-[#050607] border border-white/5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-white">Baseline screening bundle</span>
              <span className="text-xs text-[#4DEECD]">Recommended</span>
            </div>
            <p className="text-xs text-gray-400">Metabolic markers, lipid panel, inflammation</p>
          </div>
          <div className="p-3 rounded bg-[#050607] border border-white/5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-white">Hormone health panel</span>
              <span className="text-xs text-[#4DEECD]">Recommended</span>
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
          <button className="w-full px-4 py-2 rounded-lg bg-[#4DEECD]/10 border border-[#4DEECD]/30 text-[#4DEECD] text-xs font-medium hover:bg-[#4DEECD]/20 transition-colors">
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
    <section id="home.clinics">
      <Section>
        <div className="max-w-6xl mx-auto">
          {/* Section Header - Visible on all screen sizes */}
          <div className="mb-8 md:mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">
              For clinics
            </p>
            <SectionTitle className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Clinical operating system for preventive care
            </SectionTitle>
            <p className="text-gray-300 leading-relaxed max-w-3xl">
              A unified patient timeline, actionable risk signals, and intervention workflows designed for longitudinal medicine.
            </p>
          </div>

          {/* Desktop: Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column */}
            <div className="space-y-6 order-2 lg:order-1">

              {/* Proof Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                <div className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-white/5">
                  <h4 className="text-sm font-semibold text-white mb-1">One patient view</h4>
                  <p className="text-xs text-gray-300">See every test note protocol and intervention in one place.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-white/5">
                  <h4 className="text-sm font-semibold text-white mb-1">Faster prioritization</h4>
                  <p className="text-xs text-gray-300">Detect risk shifts early and route cases to the right workflow.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-white/5">
                  <h4 className="text-sm font-semibold text-white mb-1">Documented outcomes</h4>
                  <p className="text-xs text-gray-300">Track plans over time, measure results, and document changes.</p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2 space-y-2">
                <Button href="/clinics">
                  Explore Clinics
                </Button>
                <div>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-300 hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    Request a demo
                  </Link>
                </div>
                <p className="text-xs text-gray-400 pt-2">
                  Not a replacement for clinical judgment. Built to support longitudinal care workflows.
                </p>
              </div>
            </div>

            {/* Right Column: Feature list and preview */}
            <div className="space-y-4 order-1 lg:order-2">
              {/* Feature List */}
              <div className="space-y-1.5">
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
                      className={`w-full text-left p-3 rounded-[20px] border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DEECD] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                        isActive
                          ? "border-[#4DEECD]/40 bg-gradient-to-b from-[#0b0b0b] to-[#121212] shadow-[0_0_20px_rgba(77,238,205,0.12)]"
                          : "border-white/10 bg-[#050607] hover:border-white/25"
                      }`}
                      aria-label={`View ${feature.label} preview`}
                      aria-pressed={isActive}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#4DEECD] flex-shrink-0"></div>
                        <span className="text-sm font-medium text-white">{feature.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Preview Panel */}
              <div ref={previewRef} className="mt-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.1em] mb-3">
                  Preview
                </p>
                <div className="rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border border-white/6 p-5 shadow-[0_0_15px_rgba(77,238,205,0.05)] min-h-[280px]">
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
