"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HeroSection } from "../components/HeroSection";
import Button from "../components/ui/Button";
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";
import { FAQAccordion } from "../components/ui/FAQAccordion";
import ReactiveByDesignSection from "../components/ReactiveByDesignSection";
import Disclosure from "../components/ui/Disclosure";
import HowItWorksSection from "../components/HowItWorksSection";
import ClinicsSection from "../components/ClinicsSection";
import TimelineDemoSection from "../components/TimelineDemoSection";
import ReactiveFeaturePanels from "../components/ReactiveFeaturePanels";
import DataSourcesPrivacyTrust from "../components/DataSourcesPrivacyTrust";
import TierDecisionHelper from "../components/TierDecisionHelper";
import Link from "next/link";


// Marketplace Content Component
type MarketplaceAudience = "individuals" | "clinics";

type MarketplaceCategoryId =
  | "diagnostics"
  | "labTesting"
  | "devices"
  | "clinicalSupport"
  | "services";

interface MarketplaceCategoryContent {
  id: MarketplaceCategoryId;
  name: string;
  description: Record<MarketplaceAudience, string>;
  examples: Record<MarketplaceAudience, string[]>;
  exampleCount: number;
  timelineConnection: string;
  trigger: string;
  outcome: string;
  href: string;
}

const marketplaceCategories: MarketplaceCategoryContent[] = [
  {
    id: "diagnostics",
    name: "Diagnostics",
    description: {
      individuals: "At home diagnostics and screening kits matched to your timeline.",
      clinics: "Diagnostic pathways and ordering workflows for patient care.",
    },
    examples: {
      individuals: ["Blood panel kit", "Sleep assessment kit", "Metabolic screening kit"],
      clinics: ["Baseline screening bundle", "Follow up lab panel", "Advanced biomarker panel"],
    },
    exampleCount: 12,
    timelineConnection:
      "Diagnostics appear when your timeline shows a gap in screening or missing baseline data.",
    trigger:
      "Example trigger: Recommended when a risk marker is present and no recent diagnostic is on record.",
    outcome:
      "Example outcome: Results anchor a new point on your timeline and update your screening plan automatically.",
    href: "/catalog/diagnostics",
  },
  {
    id: "labTesting",
    name: "Lab testing",
    description: {
      individuals: "Lab partners for deeper testing with clear preparation and follow up steps.",
      clinics: "Lab ordering with standardized panels and result ingestion.",
    },
    examples: {
      individuals: ["Quarterly markers panel", "Inflammation markers", "Hormone health panel"],
      clinics: ["Standard longevity panel", "Cardiometabolic panel", "Gut health panel"],
    },
    exampleCount: 18,
    timelineConnection: "Lab testing extends your timeline with structured marker sets over time.",
    trigger: "Example trigger: Prompted when a marker drifts or when a follow up window is due.",
    outcome:
      "Example outcome: New lab values adjust your risk view and refine your next blueprint.",
    href: "/catalog/labs",
  },
  {
    id: "devices",
    name: "Devices",
    description: {
      individuals:
        "Wearables and home devices that improve data quality and trend tracking.",
      clinics: "Patient monitoring devices that feed directly into the care timeline.",
    },
    examples: {
      individuals: ["Sleep tracker", "Glucose monitor", "Blood pressure cuff"],
      clinics: ["Remote monitoring pack", "Home vitals kit", "Continuous glucose program kit"],
    },
    exampleCount: 9,
    timelineConnection:
      "Devices stream continuous signals into your timeline between structured check points.",
    trigger:
      "Example trigger: Suggested when your plan depends on sleep, glucose, or blood pressure trends.",
    outcome:
      "Example outcome: Device data confirms whether interventions are working and informs your next adjustments.",
    href: "/catalog/devices",
  },
  {
    id: "clinicalSupport",
    name: "Clinical support",
    description: {
      individuals: "Book a clinician when your data suggests you need medical input.",
      clinics: "Refer patients to vetted specialists and coordinate shared care.",
    },
    examples: {
      individuals: ["Longevity clinician review", "Nutrition consult", "Sleep specialist consult"],
      clinics: ["Specialist referral network", "Second opinion pathway", "Shared care coordination"],
    },
    exampleCount: 14,
    timelineConnection:
      "Clinical support appears when your data crosses a threshold that benefits from medical review.",
    trigger:
      "Example trigger: Raised risk level or persistent pattern that meets a predefined clinical rule.",
    outcome:
      "Example outcome: Consultation notes and decisions attach to your timeline next to the driving markers.",
    href: "/catalog/clinical-support",
  },
  {
    id: "services",
    name: "Services",
    description: {
      individuals: "Programs and services that help you act on recommendations in real life.",
      clinics: "Services that extend the clinic offering and improve adherence.",
    },
    examples: {
      individuals: ["Coaching session", "Lifestyle program", "Movement assessment"],
      clinics: ["Patient education modules", "Follow up adherence support", "Program delivery tools"],
    },
    exampleCount: 20,
    timelineConnection:
      "Services are linked to specific actions in your plan and appear when you reach that stage.",
    trigger:
      "Example trigger: A new module in your blueprint starts and requires structured support.",
    outcome:
      "Example outcome: Completion data and progress notes update your plan and future recommendations.",
    href: "/catalog/services",
  },
];

function MarketplaceContent() {
  const [activeTab, setActiveTab] = useState<MarketplaceAudience>("individuals");
  const [activeCategoryId, setActiveCategoryId] =
    useState<MarketplaceCategoryId>("diagnostics");

  const activeCategory =
    marketplaceCategories.find((cat) => cat.id === activeCategoryId) ??
    marketplaceCategories[0];

  const handleCategoryToggle = (id: MarketplaceCategoryId) => {
    setActiveCategoryId(id);
  };

  const renderDetailsCard = (
    category: MarketplaceCategoryContent,
    audience: MarketplaceAudience
  ) => (
    <div className="mt-4 rounded-xl bg-[#050607] border border-white/10 p-4 md:p-5 space-y-3">
      <p className="text-xs font-medium text-[var(--text-2)] tracking-[0.02em]">
        How it connects to your timeline
      </p>
      <p className="text-sm text-gray-300">{category.timelineConnection}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-400">Trigger</p>
          <p className="text-xs text-gray-300">{category.trigger}</p>
          </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-400">Outcome</p>
          <p className="text-xs text-gray-300">{category.outcome}</p>
        </div>
        </div>
      </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Right side on mobile: tabs and category list */}
      <div className="space-y-6 order-1 lg:order-2">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-white/10" role="tablist" aria-label="Marketplace audience">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "individuals"}
            aria-controls="marketplace-content-individuals"
            id="marketplace-tab-individuals"
            onClick={() => setActiveTab("individuals")}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                setActiveTab("clinics");
                document.getElementById("marketplace-tab-clinics")?.focus();
              }
              if (e.key === "Home") {
                e.preventDefault();
                setActiveTab("individuals");
                document.getElementById("marketplace-tab-individuals")?.focus();
              }
              if (e.key === "End") {
                e.preventDefault();
                setActiveTab("clinics");
                document.getElementById("marketplace-tab-clinics")?.focus();
              }
            }}
            className={`px-4 py-2 text-sm font-medium transition-all relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-page)] rounded-t-md ${
              activeTab === "individuals"
                ? "text-[#4DEECD]"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            For individuals
            {activeTab === "individuals" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4DEECD]"
                layoutId="marketplaceTab"
                transition={{ duration: 0.18 }}
              />
            )}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "clinics"}
            aria-controls="marketplace-content-clinics"
            id="marketplace-tab-clinics"
            onClick={() => setActiveTab("clinics")}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                setActiveTab("individuals");
                document.getElementById("marketplace-tab-individuals")?.focus();
              }
              if (e.key === "Home") {
                e.preventDefault();
                setActiveTab("individuals");
                document.getElementById("marketplace-tab-individuals")?.focus();
              }
              if (e.key === "End") {
                e.preventDefault();
                setActiveTab("clinics");
                document.getElementById("marketplace-tab-clinics")?.focus();
              }
            }}
            className={`px-4 py-2 text-sm font-medium transition-all relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-page)] rounded-t-md ${
              activeTab === "clinics"
                ? "text-[#4DEECD]"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            For clinics
            {activeTab === "clinics" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4DEECD]"
                layoutId="marketplaceTab"
                transition={{ duration: 0.18 }}
              />
            )}
          </button>
        </div>

        {/* Category list */}
        <div className="relative">
          <AnimatePresence mode="wait">
              <motion.div
              key={activeTab}
                role="tabpanel"
                id={`marketplace-content-${activeTab}`}
                aria-labelledby={`marketplace-tab-${activeTab}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
                className="space-y-3"
              >
              {marketplaceCategories.map((category) => {
                const isActive = category.id === activeCategoryId;
                const audience: MarketplaceAudience = activeTab;
                const description = category.description[audience];
                const examples = category.examples[audience];

                return (
                  <div key={`${category.id}-${audience}`}>
                    <button
                      type="button"
                      onClick={() => handleCategoryToggle(category.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleCategoryToggle(category.id);
                        }
                      }}
                      className={`w-full text-left rounded-[20px] border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-page)] ${
                        isActive
                          ? "border-[#4DEECD]/40 bg-gradient-to-b from-[#0b0b0b] to-[#121212] shadow-[0_0_20px_rgba(77,238,205,0.12)]"
                          : "border-white/10 bg-[#050607]"
                      }`}
                      aria-pressed={isActive}
                      tabIndex={0}
                    >
                      <div className="flex items-center justify-between gap-3 px-4 py-4 md:px-5 md:py-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 w-2.5 h-2.5 rounded-full bg-[#4DEECD] shadow-[0_0_10px_rgba(77,238,205,0.8)]" />
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {category.name}
                            </p>
                            <p className="text-xs text-gray-300 mt-1">
                              {description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400">
                            Examples: {category.exampleCount} options
                          </span>
                          <motion.span
                            aria-hidden="true"
                            initial={false}
                            animate={{ rotate: isActive ? 90 : 0 }}
                            transition={{ duration: 0.18 }}
                            className="text-gray-400"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                        fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                                d="M6 4L10 8L6 12"
                          stroke="currentColor"
                                strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                          </motion.span>
                    </div>
                  </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
              <motion.div
                          key={`details-${category.id}-${audience}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pt-3 pb-4 md:pb-5 space-y-3">
                            <div className="space-y-1">
                              <p className="text-xs font-semibold text-gray-400">
                                Example options
                              </p>
                              <ul className="space-y-1">
                                {examples.map((item) => (
                                  <li
                                    key={item}
                                    className="text-sm text-gray-200 flex items-center gap-2"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#4DEECD]" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="pt-1">
                              <Link
                                href={category.href}
                                className="text-xs text-[#4DEECD] hover:text-[#4DEECD]/80 font-medium inline-flex items-center gap-1"
                              >
                                View options
                                <span aria-hidden="true">→</span>
                              </Link>
                    </div>

                            {/* Mobile contextual card directly under the row */}
                            <div className="md:hidden">
                              {renderDetailsCard(category, audience)}
                  </div>
                          </div>
              </motion.div>
            )}
          </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Left side: explanation and desktop contextual panel */}
      <div className="space-y-6 order-2 lg:order-1">
        <div className="space-y-3">
          <p className="typography-eyebrow">
            Integrated marketplace
          </p>
          <h3 className="typography-h3">
            Act on your data with the right services
          </h3>
          <div className="space-y-3 max-w-xl">
            <Disclosure
              summary="Arc links every test device and service back to your health timeline so you can see what's relevant now, what's optional, and what unlocks the next step."
              details={
                <div className="space-y-2">
                  <p className="typography-body-secondary">
                    Everything is contextual. Nothing is generic. Marketplace options appear when your data and goals reach a point where a diagnostic device or service can move you forward.
                  </p>
                  <p className="text-sm text-gray-400 italic">
                    Example: A change in a marker can prompt a new diagnostic and the result adjusts your plan automatically.
                  </p>
                </div>
              }
              label="See example"
            />
          </div>
        </div>

        {/* Desktop contextual panel */}
        <div className="hidden md:block">
          {activeCategory ? (
            renderDetailsCard(activeCategory, activeTab)
          ) : (
            <div className="mt-4 rounded-xl bg-[#050607] border border-white/10 p-5 space-y-3">
              <p className="text-xs font-medium text-[var(--text-2)] tracking-[0.02em]">
                How it connects to your timeline
              </p>
              <p className="text-sm text-gray-300">
                Marketplace options appear when your data and goals reach a point where a diagnostic device or service can move you forward.
              </p>
              <p className="text-xs text-gray-400">
                Example: A change in a marker can prompt a new diagnostic and the result adjusts your plan automatically.
              </p>
            </div>
          )}
        </div>

        <div className="pt-2 space-y-2">
          <Button variant="primary" href="/catalog">
            Explore Marketplace
          </Button>
          <div>
            <Link
              href="/method"
              className="mt-2 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <span>See how recommendations are generated</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


// Tier Card Component
function TierCard({
  tierName,
  title,
  bestFor,
  coreFeatures,
  cta,
  ctaAction,
  index,
}: {
  tierName: string;
  title: string;
  bestFor: string;
  coreFeatures: string[];
  cta: string;
  ctaAction: () => void;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="card-premium flex flex-col h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tier Name */}
      <p className="typography-eyebrow mb-2">{tierName}</p>

      {/* Title */}
      <h3 className="card-title">{title}</h3>

      {/* Best For */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-2">Best for:</p>
        <p className="text-sm text-gray-300 leading-relaxed">{bestFor}</p>
      </div>

      {/* Core Features */}
      <div className="flex-1 mb-6">
        <p className="text-sm text-gray-400 mb-3">Core features:</p>
        <ul className="space-y-2">
          {coreFeatures.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                className="text-[#4DEECD] flex-shrink-0 mt-0.5"
              >
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M6 10L9 13L14 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-gray-300 leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Primary CTA */}
      <button
        onClick={ctaAction}
                className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                  isHovered
                    ? "bg-[#4DEECD] text-black"
                    : "bg-white/10 text-[#4DEECD] border border-[#4DEECD]/30 hover:bg-white/15"
                } focus:outline-none focus:ring-2 focus:ring-[#4DEECD] focus:ring-offset-2 focus:ring-offset-black`}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        {cta}
      </button>
    </motion.div>
  );
}

// Capability Card Component with Progressive Disclosure
function CapabilityCard({
  icon,
  title,
  summary,
  explanation,
  youGet,
  example,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  summary: string; // 1-sentence summary
  explanation?: string[]; // Expandable details
  youGet?: string;
  example?: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      className="card-premium relative overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
    >
      {/* Icon */}
      <div className="card-icon text-accent mb-4">
        {icon}
      </div>

      {/* Title */}
      <h3 className="card-title">{title}</h3>

      {/* 1-sentence summary - always visible */}
      <p className="typography-body mb-4">{summary}</p>

      {/* Expandable details */}
      {explanation && explanation.length > 0 && (
        <div className="mt-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group flex items-center gap-2 text-sm font-medium text-accent hover:text-[var(--color-accent-primary-hover)] transition-colors"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Hide details" : "Learn how"}
          >
            <span>{isOpen ? "Hide" : "Learn how"}</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <ChevronDown className="w-4 h-4" strokeWidth={2} />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-2 border-t border-[var(--color-border-base)] space-y-2">
                  {explanation.map((line, idx) => (
                    <p key={idx} className="typography-body-secondary">{line}</p>
                  ))}
                  {youGet && (
                    <p className="text-accent text-sm font-medium mt-3">{youGet}</p>
                  )}
                  {example && (
                    <p className="text-tier-muted text-xs italic mt-2">{example}</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

export default function HomePage() {

  return (
    <div className="min-h-screen bg-layer-page text-tier-primary" style={{ backgroundColor: 'var(--color-bg-page)' }}>
      {/* home.hero */}
      <section id="home.hero">
        <HeroSection
          headline="Your health is not fragmented. Your data is."
          subheadline="The Arc turns years of scattered medical data into a single health trajectory—so you can see risk earlier and act with confidence."
          primaryCTA={{ label: "Get Started", href: "/your-arc" }}
        />
      </section>

      {/* home.problem */}
      <ReactiveByDesignSection />

      {/* home.capabilities */}
      <section id="home.capabilities">
        <Section>
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="text-center space-y-6 mb-12">
              <SectionTitle className="text-center">
                What you can do in The Arc
              </SectionTitle>
            </div>

            {/* Reactive Feature Panels */}
            <ReactiveFeaturePanels />
          </motion.div>
        </Section>
      </section>

      {/* home.tiers */}
      <section id="home.tiers">
        <Section>
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "100px" }}
            transition={{ duration: 0.38, ease: [0.25, 0.8, 0.5, 1] }}
          >
            <TierDecisionHelper />
          </motion.div>
        </Section>
      </section>

      {/* home.howItWorks */}
      <HowItWorksSection onCTAClick={() => window.location.href = "/your-arc"} />

      {/* home.timelineDemo */}
      <TimelineDemoSection />

      {/* home.marketplace */}
      <section id="home.marketplace">
        <Section>
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="text-center space-y-6 mb-12">
              <SectionTitle className="text-center">
                From insight to intervention
              </SectionTitle>
            </div>

            {/* Two Column Layout */}
            <MarketplaceContent />
          </motion.div>
        </Section>
      </section>

      {/* home.clinics */}
      <ClinicsSection />

      {/* home.trust */}
      <DataSourcesPrivacyTrust />

      {/* home.trustFaq */}
      <section id="home.trustFaq">
        <Section>
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Trust Bar */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {[
                "Privacy and security",
                "Medical clarity not medical replacement",
                "Data export and portability",
              ].map((point, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-lg bg-white/5 border border-white/10"
                >
                  <p className="text-sm text-gray-300">{point}</p>
                </div>
              ))}
            </motion.div>

            {/* Short FAQ */}
            <div className="space-y-6">
              <div className="text-center">
                <SectionTitle className="text-center">
                  Frequently asked questions
                </SectionTitle>
              </div>
              <div className="space-y-4">
                {[
                  {
                    q: "What makes The Arc different from regular health apps?",
                    a: "Most health apps rely on generic advice. The Arc uses clinical-grade analysis to reveal your personal predispositions, overlooked biological shifts, and the exact screenings that matter for you. It's the closest alternative to a longevity clinic — but accessible to everyone.",
                  },
                  {
                    q: "Is this based on real medical science?",
                    a: "Yes. Your roadmap is informed by validated biomarkers, clinician-informed guidelines, and evidence-based lifestyle protocols. Every recommendation is built to support metabolic health, inflammation control, circadian stability, and long-term risk reduction.",
                  },
                  {
                    q: "Is this a medical service?",
                    a: "The Arc provides clinically informed guidance. Our Care tier includes access to licensed professionals who review your plan, explain biomarkers, and supervise your progress.",
                  },
                  {
                    q: "How does The Arc protect my health data?",
                    a: "Your health data is encrypted and stored securely. We never share your personal information without your explicit consent. You control what data is included and can delete your account and data at any time.",
                  },
                  {
                    q: "What if I'm not sure where to start?",
                    a: "Start with the free screening. It reveals what you may be missing and shows the first steps toward clarity — with zero commitment.",
                  },
                ].map((faq, idx) => (
                  <FAQAccordion
                    key={faq.q}
                    question={faq.q}
                    answer={faq.a}
                    index={idx}
                  />
                ))}
              </div>
              <div className="text-center pt-4">
                <Link
                  href="/faq"
                  className="text-[#4DEECD] hover:text-[#4DEECD]/80 text-sm font-medium transition-colors inline-flex items-center gap-2"
                >
                  View all FAQs
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 12l4-4-4-4" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* home.finalCta */}
      <section id="home.finalCta">
        <Section>
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center space-y-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <SectionTitle className="text-center">
                Health is not a moment. It is a trajectory.
              </SectionTitle>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" href="/your-arc">
                  Get Started with Health Intelligence
                </Button>
                <Button variant="secondary" href="/clinics">
                  Talk to Us Clinics and Doctors
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                Set up takes minutes. You can start with uploads.
              </p>
            </motion.div>
          </div>
        </Section>
      </section>

    </div>
  );
}
