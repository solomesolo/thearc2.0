"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmailSignupModal from "../components/EmailSignupModal";
import PartnershipModal from "../components/PartnershipModal";
import { HeroSectionV2 } from "../components/hero/HeroSectionV2";
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
    <div className="mt-4 rounded-xl p-4 md:p-5 space-y-3" style={{ backgroundColor: "var(--surface-2)", border: "1px solid var(--border)" }}>
      <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--text-muted)" }}>
        How it connects to your timeline
      </p>
      <p className="text-sm" style={{ color: "var(--text)" }}>{category.timelineConnection}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="space-y-1">
          <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Trigger</p>
          <p className="text-xs" style={{ color: "var(--text)" }}>{category.trigger}</p>
          </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Outcome</p>
          <p className="text-xs" style={{ color: "var(--text)" }}>{category.outcome}</p>
        </div>
        </div>
      </div>
  );

  return (
    <div className="arc-marketplace-grid">
      {/* Right side on mobile: tabs and category list */}
      <div className="arc-marketplace-right order-1 lg:order-2">
        {/* Tabs - Editorial Toggle Style */}
        <div className="arc-marketplace-tabs">
          <div className="arc-marketplace-tabs-baseline" />
          <button
            type="button"
            onClick={() => setActiveTab("individuals")}
            className={`arc-marketplace-tab ${activeTab === "individuals" ? 'arc-marketplace-tab-active' : 'arc-marketplace-tab-inactive'}`}
          >
            For individuals
            {activeTab === "individuals" && (
              <motion.div
                className="arc-marketplace-tab-indicator"
                layoutId="marketplaceTab"
                transition={{ duration: 0.18 }}
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("clinics")}
            className={`arc-marketplace-tab ${activeTab === "clinics" ? 'arc-marketplace-tab-active' : 'arc-marketplace-tab-inactive'}`}
          >
            For clinics
            {activeTab === "clinics" && (
              <motion.div
                className="arc-marketplace-tab-indicator"
                layoutId="marketplaceTab"
                transition={{ duration: 0.18 }}
              />
            )}
          </button>
        </div>

        {/* Category list */}
        <div className="arc-marketplace-categories">
          <AnimatePresence mode="wait">
              <motion.div
              key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
                className="arc-marketplace-categories-list"
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
                      className={`arc-marketplace-category ${isActive ? 'arc-marketplace-category-active' : 'arc-marketplace-category-inactive'}`}
                    >
                      {/* Left indicator strip (active only) */}
                      {isActive && <div className="arc-marketplace-category-indicator" />}
                      
                      <div className="arc-marketplace-category-content">
                        <div className="arc-marketplace-category-text">
                          <p className={`arc-marketplace-category-title ${isActive ? 'arc-marketplace-category-title-active' : 'arc-marketplace-category-title-inactive'}`}>
                            {category.name}
                          </p>
                          <p className="arc-marketplace-category-description">
                            {description}
                          </p>
                        </div>
                        <div className="arc-marketplace-category-meta">
                          <span className="arc-marketplace-category-examples">
                            Examples: {category.exampleCount} options
                          </span>
                          <motion.span
                            aria-hidden="true"
                            initial={false}
                            animate={{ rotate: isActive ? 90 : 0 }}
                            transition={{ duration: 0.18 }}
                            className="arc-marketplace-category-chevron"
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
                          <div className="arc-marketplace-category-expanded">
                            <div className="arc-marketplace-category-examples-block">
                              <p className="arc-marketplace-category-examples-label">
                                Example options
                              </p>
                              <ul className="arc-marketplace-category-examples-list">
                                {examples.map((item) => (
                                  <li
                                    key={item}
                                    className="arc-marketplace-category-examples-item"
                                  >
                                    <span className="arc-marketplace-category-examples-dot" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="arc-marketplace-category-view-link">
                              <Link
                                href={category.href}
                                className="arc-marketplace-category-view-link-text"
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
      <div className="arc-marketplace-left order-2 lg:order-1">
        <div className="arc-marketplace-left-content">
          <p className="arc-marketplace-eyebrow">
            INTEGRATED MARKETPLACE
          </p>
          <h3 className="arc-marketplace-subheadline">
            Act on your data with the right services
          </h3>
          <div className="arc-marketplace-body">
            <p>
              Arc links every test device and service back to your health timeline. You can see what is relevant now what is optional and what unlocks the next step.
            </p>
            <p className="arc-marketplace-principle">
              Everything is contextual. Nothing is generic.
            </p>
          </div>
        </div>

        {/* Desktop contextual panel */}
        <div className="hidden md:block">
          {activeCategory ? (
            renderDetailsCard(activeCategory, activeTab)
          ) : (
            <div className="mt-4 rounded-xl border p-5 space-y-3" style={{ backgroundColor: "var(--surface-2)", borderColor: "var(--border)" }}>
              <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--text-muted)" }}>
                How it connects to your timeline
              </p>
              <p className="text-sm" style={{ color: "var(--text)" }}>
                Marketplace options appear when your data and goals reach a point where a diagnostic device or service can move you forward.
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Example: A change in a marker can prompt a new diagnostic and the result adjusts your plan automatically.
              </p>
            </div>
          )}
        </div>

        <div className="arc-marketplace-cta">
          <button
            onClick={() => window.location.href = '/catalog'}
            className="arc-marketplace-cta-button"
          >
            Explore Marketplace
          </button>
          <div>
            <Link
              href="/method"
              className="arc-marketplace-secondary-link"
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
  const isTierTwo = index === 1;

  return (
    <motion.div
      className={`arc-tier-card ${isTierTwo ? 'arc-tier-card-tier-two' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tier Name (Eyebrow) */}
      <p className="arc-tier-eyebrow">{tierName}</p>

      {/* Title */}
      <h3 className="arc-tier-title">{title}</h3>

      {/* Best For */}
      <div className="arc-tier-best-for">
        <span className="arc-tier-best-for-label">Best for:</span>
        <span className="arc-tier-best-for-text">{bestFor}</span>
      </div>

      {/* Core Features */}
      <div className="arc-tier-features">
        <p className="arc-tier-features-label">Core features:</p>
        <ul className="arc-tier-features-list">
          {coreFeatures.map((feature, idx) => (
            <li key={idx} className="arc-tier-feature-item">
              <div className="arc-tier-feature-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1" />
                  <path
                    d="M6 10L9 13L14 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="arc-tier-feature-text">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Primary CTA */}
      <div className="arc-tier-cta-wrapper">
        <button
          onClick={ctaAction}
          className="arc-tier-cta-button"
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
        >
          {cta}
        </button>
      </div>
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
      className="arc-capability-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon */}
      <div className="arc-capability-icon">
        {icon}
      </div>

      {/* Title */}
      <h3 className="arc-capability-title">{title}</h3>

      {/* Explanation (two lines) */}
      <div className="arc-capability-explanation">
        <p>{explanation[0]}</p>
        <p>{explanation[1]}</p>
      </div>

      {/* You Get line with divider */}
      <div className="arc-capability-you-get-wrapper">
        <p className="arc-capability-you-get">
          {youGet.startsWith('You get:') ? (
            <>
              <span className="arc-capability-you-get-label">You get:</span>
              <span className="arc-capability-you-get-text">{youGet.slice(9).trim()}</span>
            </>
          ) : (
            youGet
          )}
        </p>
      </div>

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
        <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>{example}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HomePage() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      {/* home.hero */}
      <section id="home.hero">
        <HeroSectionV2
          onPrimaryCTAClick={() => setShowEmailModal(true)}
          onSecondaryCTAClick={() => {
            if (typeof window !== "undefined") {
              const element = document.getElementById("home.howItWorks");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }
          }}
        />
      </section>

      {/* home.problem */}
      <ReactiveByDesignSection />

      {/* home.capabilities */}
      <section id="home.capabilities" className="arc-capabilities-section">
        <Section>
          <div className="arc-capabilities-wrapper">
            <motion.div
              className="arc-capabilities-content"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="arc-capabilities-heading-block">
                <h2 className="arc-capabilities-heading">
                  What you can do in The Arc
                </h2>
                <div className="arc-capabilities-heading-divider" />
              </div>

              {/* Capability Cards Grid */}
              <div className="arc-capabilities-card-grid">
                {[
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <section id="home.tiers" className="arc-tiers-section">
        <Section>
          <div className="arc-tiers-wrapper">
            <motion.div
              className="arc-tiers-content"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="arc-tiers-heading-block">
                <h2 className="arc-tiers-heading">
                  Choose Your Tier
                </h2>
                <div className="arc-tiers-heading-divider" />
              </div>

              {/* Two Tier Cards */}
              <div className="arc-tiers-card-grid">
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
                    ctaAction: () => setShowEmailModal(true),
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
                    ctaAction: () => setShowEmailModal(true),
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
      <HowItWorksSection onCTAClick={() => setShowEmailModal(true)} />

      {/* home.marketplace */}
      <section id="home.marketplace" className="arc-marketplace-section">
        <Section>
          <div className="arc-marketplace-wrapper">
            <motion.div
              className="arc-marketplace-content"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="arc-marketplace-heading-block">
                <h2 className="arc-marketplace-heading">
                  Trusted services, matched to your timeline
                </h2>
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
      <section id="home.trustFaq" className="arc-faq-section">
        <Section>
          <div className="arc-faq-wrapper">
            {/* FAQ */}
            <div className="arc-faq-content">
              <div className="arc-faq-heading-block">
                <h2 className="arc-faq-heading">
                  Frequently asked questions
                </h2>
                <div className="arc-faq-heading-divider" />
              </div>
              <div className="arc-faq-accordion-list">
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
              <div className="arc-faq-view-all">
                <Link
                  href="/faq"
                  className="arc-faq-view-all-link"
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
      <section id="home.finalCta" className="arc-final-cta-section">
        <Section>
          <div className="arc-final-cta-wrapper">
            {/* Top Divider Separating FAQ from CTA */}
            <div className="arc-final-cta-divider" />
            <motion.div
              className="arc-final-cta-content"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <h2 className="arc-final-cta-statement">
                Health is not a moment. It is a trajectory.
              </h2>
              <div className="arc-final-cta-buttons">
                <button
                  onClick={() => setShowEmailModal(true)}
                  className="arc-final-cta-button-primary"
                >
                  Get Started with Health Intelligence
                </button>
                <button
                  onClick={() => setShowEmailModal(true)}
                  className="arc-final-cta-button-secondary"
                >
                  Talk to Us Clinics and Doctors
                </button>
              </div>
              <p className="arc-final-cta-setup">
                Set up takes minutes. You can start with uploads.
              </p>
            </motion.div>
          </div>
        </Section>
      </section>

      <EmailSignupModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
      <PartnershipModal isOpen={showPartnershipModal} onClose={() => setShowPartnershipModal(false)} />
    </div>
  );
}
