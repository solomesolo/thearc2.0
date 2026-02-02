"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "../components/HeroSection";
import { ArcButton } from "../components/ui/ArcButton";
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";
import { FAQAccordion } from "../components/ui/FAQAccordion";
import ReactiveByDesignSection from "../components/ReactiveByDesignSection";
import HowItWorksSection from "../components/HowItWorksSection";
import ClinicsSection from "../components/ClinicsSection";
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
      <p className="text-xs font-semibold text-gray-300 uppercase tracking-[0.12em]">
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
        <div className="flex gap-2 border-b border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab("individuals")}
            className={`px-4 py-2 text-sm font-medium transition-all relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DEECD] rounded-t-md ${
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
            onClick={() => setActiveTab("clinics")}
            className={`px-4 py-2 text-sm font-medium transition-all relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DEECD] rounded-t-md ${
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
                      className={`w-full text-left rounded-[20px] border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DEECD] ${
                        isActive
                          ? "border-[#4DEECD]/40 bg-gradient-to-b from-[#0b0b0b] to-[#121212] shadow-[0_0_20px_rgba(77,238,205,0.12)]"
                          : "border-white/10 bg-[#050607]"
                      }`}
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
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
            Integrated marketplace
          </p>
          <h3 className="text-2xl md:text-3xl font-semibold text-white">
            Act on your data with the right services
          </h3>
          <div className="space-y-3 text-gray-300 leading-relaxed max-w-xl">
            <p>
              Arc links every test device and service back to your health timeline. You can see what is relevant now what is optional and what unlocks the next step.
            </p>
            <p className="text-sm text-gray-400">
              Everything is contextual. Nothing is generic.
            </p>
          </div>
        </div>

        {/* Desktop contextual panel */}
        <div className="hidden md:block">
          {activeCategory ? (
            renderDetailsCard(activeCategory, activeTab)
          ) : (
            <div className="mt-4 rounded-xl bg-[#050607] border border-white/10 p-5 space-y-3">
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-[0.12em]">
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
          <ArcButton href="/catalog">
            Explore Marketplace
          </ArcButton>
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
      className={`p-6 rounded-lg bg-white/5 border transition-all relative flex flex-col h-full ${
        isHovered ? "border-[#4DEECD]/50 bg-white/8" : "border-white/10"
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tier Name */}
      <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">{tierName}</p>

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>

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

// Capability Card Component
function CapabilityCard({
  icon,
  title,
  explanation,
  youGet,
  example,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  explanation: string[];
  youGet: string;
  example: string;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all relative overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon */}
      <div className="text-[#4DEECD] mb-4">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>

      {/* Explanation (two lines) */}
      <div className="space-y-2 mb-4">
        <p className="text-gray-300 text-sm leading-relaxed">{explanation[0]}</p>
        <p className="text-gray-300 text-sm leading-relaxed">{explanation[1]}</p>
      </div>

      {/* You Get line */}
      <p className="text-[#4DEECD] text-sm font-medium mb-0">{youGet}</p>

      {/* Example line (reveals on hover) */}
      <motion.div
        className="overflow-hidden"
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          height: isHovered ? "auto" : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-gray-400 text-xs italic">{example}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HomePage() {

  return (
    <div className="min-h-screen bg-black text-white">
      {/* home.hero */}
      <section id="home.hero">
        <HeroSection
          title="Your health is not fragmented. Your data is."
          subtitle="The Arc is a health intelligence platform that brings your medical history into one system so you can see patterns understand trends and know what to do next."
          supportingLine="Built for individuals longevity programs and clinics."
          primaryCTA={{ label: "Get Started", href: "/your-arc" }}
          secondaryCTA={{ label: "For Clinics and Doctors", href: "/clinics" }}
          image={{ src: "/header main page.png", alt: "The Arc cinematic hero" }}
        />
      </section>

      {/* home.problem */}
      <ReactiveByDesignSection />

      {/* home.capabilities */}
      <section id="home.capabilities">
        <Section>
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="space-y-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="text-center space-y-6">
                <SectionTitle className="text-center text-4xl md:text-5xl font-semibold tracking-tight">
                  What you can do in The Arc
                </SectionTitle>
              </div>

              {/* Capability Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    ),
                    title: "Centralize medical documents",
                    explanation: [
                      "Upload lab results, doctor notes, and test reports.",
                      "Everything lives in one secure place."
                    ],
                    youGet: "You get: One source of truth for all your health data.",
                    example: "Example: Lab results from 3 different clinics in one timeline."
                  },
                  {
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    ),
                    title: "Build a health timeline",
                    explanation: [
                      "See your health history in chronological order.",
                      "Understand how your health has changed over time."
                    ],
                    youGet: "You get: A clear view of your health journey.",
                    example: "Example: Blood pressure readings from 2020 to 2024."
                  },
                  {
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    ),
                    title: "Detect patterns across time",
                    explanation: [
                      "Spot trends that single appointments miss.",
                      "See connections between different health markers."
                    ],
                    youGet: "You get: Early warning signs before problems escalate.",
                    example: "Example: Rising LDL over 18 months."
                  },
                  {
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    ),
                    title: "Track health trends",
                    explanation: [
                      "Monitor improvements or declines in key metrics.",
                      "Know what's getting better and what needs attention."
                    ],
                    youGet: "You get: Clear visibility into what's changing.",
                    example: "Example: Vitamin D levels improving after supplementation."
                  },
                  {
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 20V10" />
                        <path d="M12 20V4" />
                        <path d="M6 20v-6" />
                      </svg>
                    ),
                    title: "Get intervention updates",
                    explanation: [
                      "Receive alerts when action is recommended.",
                      "Know exactly what to test or change next."
                    ],
                    youGet: "You get: Proactive guidance, not reactive care.",
                    example: "Example: Alert when cholesterol pattern suggests retest."
                  },
                  {
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    ),
                    title: "Share a clean export with doctors",
                    explanation: [
                      "Generate a summary of your health timeline.",
                      "Give doctors context they need in one document."
                    ],
                    youGet: "You get: Better care coordination with your providers.",
                    example: "Example: PDF export with last 2 years of key metrics."
                  },
                ].map((capability, index) => (
                  <CapabilityCard
                    key={index}
                    icon={capability.icon}
                    title={capability.title}
                    explanation={capability.explanation}
                    youGet={capability.youGet}
                    example={capability.example}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </Section>
      </section>

      {/* home.tiers */}
      <section id="home.tiers">
        <Section>
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="space-y-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="text-center space-y-6">
                <SectionTitle className="text-center text-4xl md:text-5xl font-semibold tracking-tight">
                  Choose Your Tier
                </SectionTitle>
              </div>

              {/* Two Tier Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                {[
                  {
                    tierName: "Tier One",
                    title: "Health Intelligence",
                    bestFor: "Individuals who want to understand their health data",
                    coreFeatures: [
                      "A unified medical record",
                      "Interpreted health trends across history",
                      "Early signals before problems escalate",
                    ],
                    cta: "Explore Health Intelligence",
                    ctaAction: () => window.location.href = "/your-arc",
                  },
                  {
                    tierName: "Tier Two",
                    title: "Longevity Programs",
                    bestFor: "Those who want personalized guidance and programs",
                    coreFeatures: [
                      "Personalized programs based on your health data",
                      "Modular blueprints focused on specific health goals",
                      "Programs that evolve with your health",
                    ],
                    cta: "Explore Programs",
                    ctaAction: () => window.location.href = "/your-arc",
                  },
                ].map((tier, index) => (
                  <TierCard
                    key={index}
                    tierName={tier.tierName}
                    title={tier.title}
                    bestFor={tier.bestFor}
                    coreFeatures={tier.coreFeatures}
                    cta={tier.cta}
                    ctaAction={tier.ctaAction}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </Section>
      </section>

      {/* home.howItWorks */}
      <HowItWorksSection onCTAClick={() => window.location.href = "/your-arc"} />

      {/* home.marketplace */}
      <section id="home.marketplace">
        <Section>
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="text-center space-y-6 mb-12">
                <SectionTitle className="text-center text-4xl md:text-5xl font-semibold tracking-tight">
                  From insight to intervention
                </SectionTitle>
              </div>

              {/* Two Column Layout */}
              <MarketplaceContent />
            </motion.div>
          </div>
        </Section>
      </section>

      {/* home.clinics */}
      <ClinicsSection />

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
                <SectionTitle className="text-3xl md:text-4xl font-semibold tracking-tight">
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
              <SectionTitle className="text-center text-4xl md:text-5xl font-semibold tracking-tight">
                Health is not a moment. It is a trajectory.
              </SectionTitle>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ArcButton href="/your-arc">
                  Get Started with Health Intelligence
                </ArcButton>
                <ArcButton
                  href="/clinics"
                  className="border border-white/30 text-[#4DEECD] bg-transparent"
                >
                  Talk to Us Clinics and Doctors
                </ArcButton>
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
