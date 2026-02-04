"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../../components/Section";
import SectionTitle from "../../components/SectionTitle";
import Container from "../../components/Container";
import Button from "../../components/ui/Button";
import { FAQAccordion } from "../../components/ui/FAQAccordion";
import Link from "next/link";

type WorkflowStepId = "intake" | "triage" | "prescribe" | "review";

interface WorkflowStep {
  id: WorkflowStepId;
  title: string;
  description: string;
  body: string;
  whatThisSolves: string;
  preview: {
    header: string;
    sublabel: string;
    whatArcSurfaces: string[];
    whyThisMatters: string[];
    example: string[];
  };
}

const workflowSteps: WorkflowStep[] = [
  {
    id: "intake",
    title: "Intake and baseline",
    description: "Establish a reliable starting point.",
    body: "Collect history, labs, and prior interventions into a single patient timeline so every future decision is grounded in context.",
    whatThisSolves: "Eliminates repeated chart reconstruction at the first visit.",
    preview: {
      header: "Intake panel",
      sublabel: "Appears during onboarding and baseline setup",
      whatArcSurfaces: [
        "Connected records status",
        "Baseline labs checklist",
        "Prior interventions captured",
      ],
      whyThisMatters: [
        "Creates a reliable starting point for longitudinal decisions",
      ],
      example: [
        "Baseline complete",
        "Last labs imported",
        "Timeline created",
      ],
    },
  },
  {
    id: "triage",
    title: "Risk triage and prioritization",
    description: "See who needs attention before symptoms escalate.",
    body: "Arc scans longitudinal data to surface emerging risk patterns and routes patients into the right workflow.",
    whatThisSolves: "Prevents silent risk accumulation between visits.",
    preview: {
      header: "Triage panel",
      sublabel: "Appears when trends shift or review is due",
      whatArcSurfaces: [
        "Emerging risk signals",
        "Priority queue for review",
        "Suggested next workflow",
      ],
      whyThisMatters: [
        "Helps clinicians focus attention where it is clinically relevant",
      ],
      example: [
        "LDL trend increasing",
        "Adherence declining",
        "Review recommended",
      ],
    },
  },
  {
    id: "prescribe",
    title: "Prescribe and monitor",
    description: "Turn plans into trackable care.",
    body: "Assign protocols and monitor adherence and outcomes as part of the patient timeline, not separate tools.",
    whatThisSolves: "Keeps treatment intent, execution, and results connected.",
    preview: {
      header: "Protocol panel",
      sublabel: "Appears when a protocol is assigned or updated",
      whatArcSurfaces: [
        "Active protocol and intent",
        "Adherence status",
        "Outcome signals over time",
      ],
      whyThisMatters: [
        "Connects plan, execution, and measurable outcomes",
      ],
      example: [
        "Protocol active",
        "Adherence high",
        "Markers improving",
      ],
    },
  },
  {
    id: "review",
    title: "Review and adjust",
    description: "Make informed changes with evidence.",
    body: "Review trends, documented interventions, and outcomes together to decide whether care should continue, change, or stop.",
    whatThisSolves: "Replaces reactive follow ups with deliberate clinical adjustments.",
    preview: {
      header: "Clinical review panel",
      sublabel: "Appears when review is due or when trends cross thresholds",
      whatArcSurfaces: [
        "Trend changes over time",
        "Protocol effectiveness",
        "Documented decisions and outcomes",
      ],
      whyThisMatters: [
        "Shows what changed since the last decision and supports safe adjustments",
      ],
      example: [
        "Markers improving across cohort",
        "Intervention frequency reduced",
        "Reviewed by Dr. Martinez on Jan 15",
      ],
    },
  },
];

const clinicFAQs = [
  {
    q: "What types of clinics is Arc designed for",
    a: "Arc is designed for preventive care, longevity practices, and clinics that manage patients over time. It supports workflows where continuity and trend based decisions matter.",
  },
  {
    q: "How does onboarding work",
    a: "Teams start with a clinic setup and a pilot cohort. Arc helps map existing workflows and then expands across patients as the team gains confidence.",
  },
  {
    q: "Can we use Arc alongside existing systems",
    a: "Yes. Arc is designed to complement existing systems by organizing longitudinal data, surfacing signals, and supporting protocol workflows. Export and sharing features support shared care.",
  },
  {
    q: "How are patients onboarded",
    a: "Patients can upload documents, connect results, and complete diagnostics as needed. Clinics can invite patients and track onboarding status.",
  },
  {
    q: "Is Arc a medical device",
    a: "Arc is designed to support clinical workflows and decision making. It does not replace clinical judgment. If you need compliance specifics, request a demo for details.",
  },
  {
    q: "How do we request a demo",
    a: "Use the Request a demo button on this page. A member of the team will follow up to understand your clinic workflow and goals.",
  },
];

export default function ClinicsPage() {
  const [activeStep, setActiveStep] = useState<WorkflowStepId>("triage");
  const activeStepData = workflowSteps.find((s) => s.id === activeStep) || workflowSteps[1];
  const heroRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Ordering panel state
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [orderItems, setOrderItems] = useState([
    { id: "baseline", name: "Baseline screening bundle", status: "Ready", context: "First baseline for new intake" },
    { id: "hormone", name: "Hormone health panel", status: "Pending", context: "Follow up after symptom report" },
    { id: "biomarker", name: "Advanced biomarker panel", status: "Ready", context: "Triggered by trend shift" },
  ]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleOrderClick = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleSendOrder = () => {
    if (orderStatus === "idle") {
      setOrderStatus("sending");
      setTimeout(() => {
        setOrderItems([
          { id: "baseline", name: "Baseline screening bundle", status: "Sent", context: "First baseline for new intake" },
          { id: "hormone", name: "Hormone health panel", status: "Pending", context: "Follow up after symptom report" },
          { id: "biomarker", name: "Advanced biomarker panel", status: "Sent", context: "Triggered by trend shift" },
        ]);
        setOrderStatus("sent");
      }, prefersReducedMotion ? 0 : 750);
    }
  };
  
  // Problem section state
  const [activeProblem, setActiveProblem] = useState<string | null>(null);
  const [hoveredProblem, setHoveredProblem] = useState<string | null>(null);
  const problemRefs = {
    scattered: useRef<HTMLDivElement>(null),
    late: useRef<HTMLDivElement>(null),
    manual: useRef<HTMLDivElement>(null),
  };

  const handleStepClick = (id: WorkflowStepId) => {
    setActiveStep(id);
  };

  const problemSectionRef = useRef<HTMLElement>(null);

  const handleProblemClick = (problemId: string) => {
    // Toggle: if clicking the active problem, collapse it; otherwise expand the new one
    if (activeProblem === problemId) {
      setActiveProblem(null);
    } else {
      setActiveProblem(problemId);
      const ref = problemRefs[problemId as keyof typeof problemRefs];
      if (ref?.current) {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const headerOffset = 100; // Account for fixed header
        const elementPosition = ref.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
    }
  };

  // Remove auto-activation - default state has no expanded card

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Section 1: Hero */}
      <section className="relative py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column: Text */}
              <motion.div
                ref={heroRef}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <p className="typography-eyebrow">
                  For clinics
                </p>
                <h1 className="typography-h1">
                  A clinical operating system for preventive care
                </h1>
                <p className="typography-body">
                  Arc gives clinics a unified patient timeline, risk triage, and intervention workflows designed for longitudinal medicine.
                </p>
                <div className="space-y-3">
                  <Button variant="primary" href="/contact">Request a demo</Button>
                  <div>
                    <Link
                      href="#workflows"
                      className="text-sm text-gray-300 hover:text-white transition-colors inline-flex items-center gap-2"
                    >
                      See clinical workflows
                    </Link>
                  </div>
                </div>
                <p className="text-xs text-gray-400 pt-2">
                  Not a replacement for clinical judgment. Built to support longitudinal care.
                </p>
            </motion.div>

            {/* Right Column: Dashboard Preview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-first lg:order-last"
              >
                <div className="rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border border-white/6 p-5 shadow-[0_0_20px_rgba(77,238,205,0.1)]">
                  {/* Three Column Horizontal Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Column 1: Patient and Signal Overview */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wide mb-2">
                        Patients
                      </h4>
                      <div className="space-y-1.5">
                        {[
                          { name: "Sarah Chen", risk: "High" },
                          { name: "Michael Park", risk: "Moderate" },
                          { name: "Emma Wilson", risk: "Low" },
                          { name: "David Lee", risk: "Moderate" },
                        ].map((patient, idx) => (
                          <div key={idx} className="p-2 rounded bg-[#050607] border border-white/5 flex items-center justify-between">
                            <span className="text-xs text-white">{patient.name}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                              patient.risk === "High" ? "text-red-400 bg-red-500/10" :
                              patient.risk === "Moderate" ? "text-yellow-400 bg-yellow-500/10" :
                              "text-gray-400 bg-white/5"
                            }`}>
                              {patient.risk}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Signal to Action Mapping (Primary) */}
                    <div className="space-y-2 md:border-l md:border-r border-white/5 md:px-4">
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wide mb-2">
                        Signal to action
                      </h4>
                      <div className="space-y-1.5">
                        {[
                          { signal: "LDL trending up", action: "Protocol review" },
                          { signal: "Sleep declining", action: "Blueprint reassess" },
                          { signal: "hs CRP elevated", action: "Order follow up labs" },
                          { signal: "Adherence slipping", action: "Schedule follow up" },
                        ].map((item, idx) => (
                          <div key={idx} className="p-2 rounded bg-[#050607] border border-white/5">
                            <div className="flex items-start gap-2 mb-1">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                className="text-[#4DEECD] flex-shrink-0 mt-0.5"
                              >
                                <path
                                  d="M4 9l4-4-4-4"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-300 mb-0.5">{item.signal}</p>
                                <p className="text-xs text-[#4DEECD] font-medium">{item.action}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Column 3: Upcoming Interventions */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wide mb-2">
                        Upcoming
                      </h4>
                      <div className="space-y-1.5">
                        {[
                          { intervention: "Protocol review", due: "This week" },
                          { intervention: "Follow up labs", due: "14 days" },
                          { intervention: "Outcome review", due: "30 days" },
                          { intervention: "Adherence check", due: "21 days" },
                        ].map((item, idx) => (
                          <div key={idx} className="p-2 rounded bg-[#050607] border border-white/5">
                            <p className="text-xs text-white mb-0.5">{item.intervention}</p>
                            <p className="text-xs text-gray-400">{item.due}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Section 2: How Arc is Fundamentally Different */}
      <section className="py-20 md:py-24">
        <Container>
          {/* Section Header - Centered */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Built for medical judgment, not automated decisions
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6 text-center">
              Arc is not an AI driven diagnostic engine and it does not attempt to replace clinical reasoning. Arc is built on a medical knowledge base and an evidence based methodology that helps clinicians see longitudinal patterns, prioritize interventions, and document decisions with clarity.
            </p>
            <p className="text-base text-[#4DEECD] font-medium text-center">
              You stay in control. Arc supports your decisions and reduces noise.
            </p>
          </div>

          {/* Layer 2: Differentiation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: "Evidence based by design",
                  body: [
                    "Arc uses curated medical knowledge and evidence based rules to structure signals and workflows. It avoids black box recommendations that cannot be explained or audited.",
                  ],
                  inPractice: "Every recommendation can be traced to a clinical rationale.",
                },
                {
                  title: "Decision support without decision replacement",
                  body: [
                    "Arc surfaces insights and prioritizes what matters most, but the clinician remains the decision maker. The system is designed to support professional judgment and documentation, not override it.",
                  ],
                  inPractice: "Insights guide attention, not authority.",
                },
                {
                  title: "Signal prioritization without overload",
                  body: [
                    "Arc is designed to reduce alert fatigue by routing only meaningful change to the right workflow. Clinicians get fewer signals with higher relevance and clear next steps.",
                  ],
                  inPractice: "Less noise, more actionable attention.",
                },
                {
                  title: "Built to fit your clinic, not force a template",
                  body: [
                    "Arc does not impose a single clinic logic. Each clinic can build and maintain its own knowledge base, protocols, and pathways while staying aligned with evidence and longitudinal outcomes.",
                  ],
                  inPractice: "Your practice keeps its identity and standards.",
                },
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={prefersReducedMotion ? {} : { y: -2 }}
                  className="group relative p-6 rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border border-white/6 hover:border-white/10 transition-all duration-200 focus-within:ring-2 focus-within:ring-[#4DEECD]/50 focus-within:ring-offset-2 focus-within:ring-offset-black motion-reduce:hover:translate-y-0"
                  tabIndex={0}
                >
                  <h3 className="text-lg font-semibold text-white mb-3">{card.title}</h3>
                  {card.body.map((paragraph, idx) => (
                    <p key={idx} className="text-sm text-gray-300 leading-relaxed mb-3">
                      {paragraph}
                    </p>
                  ))}
                  <div className="pt-3 border-t border-white/5">
                    <p className="text-xs text-gray-400 italic">
                      In practice: {card.inPractice}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Patient Communication Callout */}
          <div className="p-6 rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border border-white/6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Direct clinician patient communication
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Arc supports structured messaging and follow ups so clinicians can communicate next steps, clarify adherence, and keep care continuous between visits.
            </p>
          </div>
        </Container>
      </section>

      {/* Section 3: The Problem */}
      <section ref={problemSectionRef} className="py-20 md:py-24">
        <Container maxWidth="wide">
          {/* Section Header - Centered */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Preventive care breaks inside episodic systems
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed text-center">
              Traditional clinical software is built around visits. Preventive care requires continuity across months and years. When data is fragmented, risk signals are missed and interventions arrive too late.
            </p>
          </div>

          {/* Problem Signal Strip */}
          <div className="mb-4">
              <div className="flex flex-wrap gap-3 mb-2">
                {[
                  { id: "scattered", label: "Scattered history" },
                  { id: "late", label: "Late detection" },
                  { id: "manual", label: "Manual coordination" },
                ].map((chip) => {
                  const isActive = activeProblem === chip.id;
                  const isHovered = hoveredProblem === chip.id;
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => handleProblemClick(chip.id)}
                      onMouseEnter={() => setHoveredProblem(chip.id)}
                      onMouseLeave={() => setHoveredProblem(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleProblemClick(chip.id);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-full border text-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DEECD] focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer ${
                        isActive
                          ? "bg-white/10 border-[#4DEECD]/40 text-white"
                          : isHovered
                          ? "bg-white/8 border-white/20 text-gray-300"
                          : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/8 hover:border-white/15 hover:text-gray-300"
                      }`}
                      aria-expanded={isActive}
                      aria-controls={`problem.${chip.id}`}
                      aria-label={`${isActive ? "Collapse" : "Expand"} ${chip.label} problem details`}
                      tabIndex={0}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500">
                Select a topic to see the clinical context and how Arc helps
              </p>
          </div>

          {/* Three Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: "scattered",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 3h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                      <path d="M8 7h4M8 11h4M8 15h2" />
                    </svg>
                  ),
                  title: "Scattered patient history",
                  body: "Labs notes and protocols live in different systems with no shared context.",
                  impact: "Clinicians lose time rebuilding the story.",
                  clinicalContext: "Preventive care depends on what changed since the last decision. When prior labs, imaging, notes, and protocol history are split across portals, the clinician cannot see the full trajectory. The visit starts with reconstruction instead of interpretation.",
                  howArcHelps: [
                    "Builds one patient timeline across documents, labs, and interventions",
                    "Preserves protocol history so decisions stay consistent over time",
                    "Surfaces what changed since the last review so the next step is clear",
                  ],
                  outcome: "Less time rebuilding history and more time making decisions",
                },
                {
                  id: "late",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 2v6M10 12v6M3 10h6M11 10h6" />
                      <circle cx="10" cy="10" r="8" />
                    </svg>
                  ),
                  title: "Late risk detection",
                  body: "Signals appear slowly over time but systems only surface snapshots.",
                  impact: "Risks are discovered after they compound.",
                  clinicalContext: "Many clinical risks emerge as small drifts over months. A single normal result can hide a declining trend. When systems show only point in time values, clinicians miss the slope and act when the pattern is already established.",
                  howArcHelps: [
                    "Highlights trends across months and years not isolated values",
                    "Flags meaningful shifts with clear thresholds for review",
                    "Prioritizes patients who need attention before the next visit",
                  ],
                  outcome: "Earlier signal detection and fewer late surprises",
                },
                {
                  id: "manual",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 2h2v4H9V2z" />
                      <rect x="3" y="6" width="14" height="12" rx="2" />
                      <path d="M7 10h6M7 14h4" />
                    </svg>
                  ),
                  title: "Manual coordination",
                  body: "Clinicians track plans and follow ups outside the system.",
                  impact: "Consistency breaks across months.",
                  clinicalContext: "Longitudinal care requires follow ups, retesting, and adjustments. When tasks live in spreadsheets, messages, or memory, plans fragment across the team. Patients receive mixed guidance and clinicians lose visibility into what was completed.",
                  howArcHelps: [
                    "Turns protocols into trackable actions with review timing",
                    "Keeps intervention notes and status in the patient timeline",
                    "Creates a shared view of upcoming steps for the care team",
                  ],
                  outcome: "More consistent care delivery across the clinic",
                },
              ].map((card, index) => {
                const isExpanded = activeProblem === card.id;
                const isDeemphasized = activeProblem !== null && activeProblem !== card.id;
                const isHovered = hoveredProblem === card.id;
                
                return (
                  <motion.div
                    key={card.title}
                    ref={problemRefs[card.id as keyof typeof problemRefs]}
                    id={`problem.${card.id}`}
                    role="region"
                    aria-labelledby={`problem-label-${card.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    animate={{
                      opacity: isDeemphasized ? 0.6 : 1,
                    }}
                    className={`group relative rounded-[20px] bg-gradient-to-b transition-all duration-200 focus-within:ring-2 focus-within:ring-[#4DEECD]/50 focus-within:ring-offset-2 focus-within:ring-offset-black ${
                      isExpanded
                        ? "from-[#0d0d0d] to-[#131313] border-[#4DEECD]/50 shadow-[0_0_20px_rgba(77,238,205,0.12)] p-6 md:p-7"
                        : "from-[#0b0b0b] to-[#111111] border-white/6 hover:border-white/15 p-6 md:p-7"
                    } ${isDeemphasized ? "border-white/4" : "border"}`}
                    tabIndex={0}
                  >
                    {/* Top border accent */}
                    <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-[20px] transition-all duration-200 ${
                      isExpanded ? "bg-[#4DEECD]/50" : "bg-[#4DEECD]/20"
                    }`}></div>
                    
                    {/* Icon and Title Row */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-[#4DEECD] flex-shrink-0 mt-0.5">
                        {card.icon}
                      </div>
                      <h3 id={`problem-label-${card.id}`} className="text-lg font-semibold text-white">{card.title}</h3>
                    </div>
                    
                    {/* Body */}
                    <p className="text-sm text-gray-300 leading-relaxed mb-4">
                      {card.body} {card.impact}
                    </p>
                    
                    {/* Expanded Content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 space-y-5 border-t border-white/10">
                            {/* Clinical Context */}
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-2">Clinical context</h4>
                              <p className="text-sm text-gray-300 leading-relaxed">
                                {card.clinicalContext}
                              </p>
                            </div>
                            
                            {/* How Arc Helps */}
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-2">How Arc helps</h4>
                              <ul className="space-y-2">
                                {card.howArcHelps.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      className="text-[#4DEECD] flex-shrink-0 mt-0.5"
                                    >
                                      <path
                                        d="M13 4L6 11L3 8"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Outcome */}
                            <div className="pt-2 border-t border-white/5">
                              <p className="text-xs text-gray-400 font-medium">
                                Outcome: {card.outcome}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
        </Container>
      </section>

      {/* Section 4: What Arc Provides */}
      <section className="py-20 md:py-24">
        <Container>
          {/* Section Header - Centered */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              One system for longitudinal care
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed text-center">
              Five modules built for continuity, triage, and intervention workflows.
            </p>
          </div>

            {/* Module Grid: 3+2 layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 3h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                      <path d="M8 7h4M8 11h4M8 15h2" />
                    </svg>
                  ),
                  name: "Unified patient timeline",
                  outcome: "Every test, note, protocol, and intervention in one continuous view.",
                  capabilities: ["Chronological history", "Protocol tracking"],
                  usedFor: "Reviewing patient progression across months",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 2v6M10 12v6M3 10h6M11 10h6" />
                      <circle cx="10" cy="10" r="8" />
                    </svg>
                  ),
                  name: "Risk signal triage",
                  outcome: "Surface patients who need attention before symptoms escalate.",
                  capabilities: ["Trend based signals", "Priority routing"],
                  usedFor: "Identifying who needs review today",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 2h2v4H9V2z" />
                      <rect x="3" y="6" width="14" height="12" rx="2" />
                      <path d="M7 10h6M7 14h4" />
                    </svg>
                  ),
                  name: "Protocol prescribing and tracking",
                  outcome: "Deliver consistent care and monitor adherence over time.",
                  capabilities: ["Protocol assignment", "Outcomes monitoring"],
                  usedFor: "Running standardized programs across cohorts",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  ),
                  name: "Intervention documentation",
                  outcome: "Keep a clear record of decisions, changes, and outcomes.",
                  capabilities: ["Intervention log", "Notes and status"],
                  usedFor: "Documenting why the plan changed",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <rect x="8" y="2" width="8" height="4" rx="1" />
                      <path d="M9 14l2 2 4-4" />
                    </svg>
                  ),
                  name: "Marketplace ordering workflow",
                  outcome: "Order diagnostics and services with context and traceability.",
                  capabilities: ["Integrated ordering", "Results linked to timeline"],
                  usedFor: "Triggering next steps from patient signals",
                },
              ].map((module, index) => (
                <motion.div
                  key={module.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative p-4 md:p-5 rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border border-white/6 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-[#4DEECD]/50 focus-within:ring-offset-2 focus-within:ring-offset-black motion-reduce:hover:translate-y-0"
                  tabIndex={0}
                >
                    {/* Subtle top accent */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#4DEECD]/20 rounded-t-[20px]"></div>
                    
                    {/* Icon and Name Row */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="text-[#4DEECD] flex-shrink-0">
                        {module.icon}
                      </div>
                      <h3 className="text-base font-semibold text-white">{module.name}</h3>
                    </div>
                    
                    {/* Outcome Line */}
                    <p className="text-sm text-gray-300 leading-relaxed mb-3">
                      {module.outcome}
                    </p>
                    
                    {/* Capability Chips */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {module.capabilities.map((cap, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                    
                    {/* Used For Line - Visible on mobile, hidden on desktop until hover */}
                    <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-200">
                      <p className="text-xs text-gray-400 font-medium">
                        Used for: {module.usedFor}
                      </p>
                    </div>
                  </motion.div>
              ))}
            </div>

            {/* Navigation Link */}
            <div className="flex justify-center md:justify-end mt-6">
              <Link
                href="#workflows"
                className="text-sm text-[#4DEECD] hover:text-[#4DEECD]/80 transition-colors inline-flex items-center gap-2"
              >
                See clinical workflows
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 12l4-4-4-4" />
                </svg>
              </Link>
            </div>
        </Container>
      </section>

      {/* Section 5: How Clinics Use Arc */}
      <section id="workflows" className="py-20 md:py-24">
        <Container>
          {/* Section Header - Centered */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">
                How Arc supports real clinical decision making over time
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed text-center">
                Arc fits into existing workflows while adding the longitudinal context traditional systems miss.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left: Step List with Progression Indicator */}
              <div className="space-y-2 order-2 lg:order-1 relative">
                {/* Vertical progression line */}
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-white/10 hidden lg:block"></div>
                
                {workflowSteps.map((step, index) => {
                  const isActive = step.id === activeStep;
                  const isLast = index === workflowSteps.length - 1;
                  const stepNumber = index + 1;
                  
                  return (
                    <div key={step.id} className="relative flex items-start gap-4">
                      {/* Step dot indicator */}
                      <div className="hidden lg:block relative z-10 flex-shrink-0 mt-2">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isActive
                            ? "bg-[#4DEECD]/20 border-[#4DEECD]"
                            : "bg-[#0b0b0b] border-white/20"
                        }`}>
                          <div className={`w-2 h-2 rounded-full transition-all ${
                            isActive ? "bg-[#4DEECD]" : "bg-white/30"
                          }`}></div>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => handleStepClick(step.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleStepClick(step.id);
                          }
                        }}
                        className={`w-full text-left p-4 rounded-[20px] border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DEECD] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                          isActive
                            ? "border-[#4DEECD]/50 bg-gradient-to-b from-[#0d0d0d] to-[#131313] shadow-[0_0_20px_rgba(77,238,205,0.12)]"
                            : "border-white/10 bg-[#050607] hover:border-white/25"
                        } ${isLast && isActive ? "border-[#4DEECD]/60" : ""}`}
                        aria-selected={isActive}
                        aria-label={`${step.title}: ${step.description}`}
                        tabIndex={0}
                      >
                        <h3 className="text-base font-semibold text-white mb-1">{step.title}</h3>
                        <p className="text-sm text-gray-300 mb-2">{step.description}</p>
                        <p className="text-sm text-gray-300 leading-relaxed mb-3">{step.body}</p>
                        <div className="pt-2 border-t border-white/5">
                          <p className="text-xs text-gray-400 font-medium mb-1">What this solves</p>
                          <p className="text-xs text-gray-300">{step.whatThisSolves}</p>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Right: Preview Panel */}
              <div className="order-1 lg:order-2">
                <div className="rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border border-white/6 p-6 shadow-[0_0_15px_rgba(77,238,205,0.05)] min-h-[400px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: prefersReducedMotion ? 0 : 0.22, 
                        ease: "easeInOut"
                      }}
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      <div className="space-y-5">
                        {/* Panel Header */}
                        <div className="pb-4 border-b border-white/5">
                          <h4 className="text-sm font-semibold text-white mb-1">
                            {activeStepData.preview.header}
                          </h4>
                          <p className="text-xs text-gray-400">
                            {activeStepData.preview.sublabel}
                          </p>
                        </div>

                        {/* What Arc Surfaces */}
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                            What Arc surfaces
                          </p>
                          <div className="space-y-1.5">
                            {activeStepData.preview.whatArcSurfaces.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  className="text-[#4DEECD] flex-shrink-0 mt-0.5"
                                >
                                  <path
                                    d="M13 4L6 11L3 8"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Why This Matters */}
                        <div className="pt-3 border-t border-white/5">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                            Why this matters
                          </p>
                          <div className="space-y-1.5">
                            {activeStepData.preview.whyThisMatters.map((item, idx) => (
                              <p key={idx} className="text-sm text-gray-300">
                                {item}
                              </p>
                            ))}
                          </div>
                        </div>

                        {/* Example */}
                        <div className="pt-3 border-t border-white/5">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                            Example
                          </p>
                          <div className="space-y-1.5">
                            {activeStepData.preview.example.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#4DEECD]"></div>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-400 mb-4">
                See how this looks inside the clinical dashboard
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button href="/contact">Request a demo</Button>
                <Link
                  href="/clinics#workflows"
                  className="text-sm text-[#4DEECD] hover:text-[#4DEECD]/80 transition-colors inline-flex items-center gap-2"
                >
                  Explore Clinics features
                </Link>
              </div>
            </div>
        </Container>
      </section>

      {/* Section 6: Marketplace for Clinics */}
      <section className="py-20 md:py-24">
        <Container>
          {/* Section Header - Centered */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Diagnostics and services that close the loop
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed text-center">
              Arc turns patient signals and protocol milestones into structured orders. Each order carries clinical context, tracks status from request to result, and updates the patient timeline when results arrive.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Column */}
              <div className="space-y-6 order-2 lg:order-1">

                {/* Value Lines */}
                <div className="space-y-2">
                  {[
                    "Suggested orders tied to timeline signals",
                    "Status tracking from request to result",
                    "Results update the patient view and next step",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-gray-300">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="text-[#4DEECD] flex-shrink-0 mt-0.5"
                      >
                        <path
                          d="M13 4L6 11L3 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* What the order includes */}
                <div className="p-4 rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border border-white/6">
                  <h4 className="text-sm font-semibold text-white mb-3">What the order includes</h4>
                  <div className="space-y-2">
                    {[
                      { icon: "signal", text: "Reason for order linked to a patient signal" },
                      { icon: "calendar", text: "Protocol milestone and timing" },
                      { icon: "chart", text: "Previous related results and trend context" },
                      { icon: "user", text: "Assigned reviewer and follow up timing" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 pt-2 border-t border-white/5 first:border-t-0 first:pt-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4DEECD] mt-1.5 flex-shrink-0"></div>
                        <span className="text-sm text-gray-300">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div>
                  <Link
                    href="#workflows"
                    className="text-sm text-[#4DEECD] hover:text-[#4DEECD]/80 transition-colors inline-flex items-center gap-2"
                  >
                    Explore ordering workflow
                  </Link>
                </div>
            </div>

            {/* Right Column: Interactive Ordering Panel */}
            <div className="order-1 lg:order-2">
                <div className="rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border border-white/6 p-6 shadow-[0_0_15px_rgba(77,238,205,0.05)]">
                  {/* Panel Header */}
                  <div className="pb-4 border-b border-white/5 mb-4">
                    <h4 className="text-sm font-semibold text-white mb-1">Ordering panel</h4>
                    <p className="text-xs text-gray-400">Built from patient signals and protocol timing</p>
                  </div>

                  {/* Patient Context Strip */}
                  <div className="p-3 rounded bg-[#050607] border border-white/5 mb-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Patient name</span>
                        <span className="text-xs font-medium text-white">Sarah Chen</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Current focus</span>
                        <span className="text-xs text-white">Lipids and cardiometabolic risk</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Review due</span>
                        <span className="text-xs text-white">14 days</span>
                      </div>
                    </div>
                  </div>

                  {/* Order List */}
                  <div className="space-y-2 mb-4">
                    {orderItems.map((item) => {
                      const isExpanded = expandedOrder === item.id;
                      const orderDetails: Record<string, { reason: string; nextStep: string }> = {
                        baseline: {
                          reason: "New patient baseline for longitudinal tracking",
                          nextStep: "Review results and set monitoring cadence",
                        },
                        hormone: {
                          reason: "Symptoms reported and prior panel is outdated",
                          nextStep: "Review results and adjust protocol timing",
                        },
                        biomarker: {
                          reason: "LDL trend increasing over time",
                          nextStep: "Review results and update intervention plan",
                        },
                      };

                      return (
                        <div key={item.id}>
                          <button
                            type="button"
                            onClick={() => handleOrderClick(item.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleOrderClick(item.id);
                              }
                            }}
                            className={`w-full text-left p-3 rounded bg-[#050607] border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DEECD] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                              isExpanded ? "border-[#4DEECD]/30" : "border-white/5 hover:border-white/10"
                            }`}
                            aria-expanded={isExpanded}
                            aria-controls={`order-details-${item.id}`}
                            tabIndex={0}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-white">{item.name}</span>
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                item.status === "Ready" || item.status === "Sent"
                                  ? "text-[#4DEECD] bg-[#4DEECD]/10"
                                  : "text-gray-400 bg-white/5"
                              }`}>
                                {item.status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400">Context: {item.context}</p>
                          </button>

                          {/* Expanded Details */}
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                id={`order-details-${item.id}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="p-3 pt-2 space-y-2 border-t border-white/5 mt-2 bg-[#050607] rounded-b">
                                  <div>
                                    <p className="text-xs text-gray-400 mb-0.5">Reason</p>
                                    <p className="text-xs text-gray-300">{orderDetails[item.id]?.reason}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-400 mb-0.5">Next step</p>
                                    <p className="text-xs text-gray-300">{orderDetails[item.id]?.nextStep}</p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Area */}
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-xs text-gray-400 mb-3">Total 3 items</p>
                    <button
                      type="button"
                      onClick={handleSendOrder}
                      disabled={orderStatus === "sending" || orderStatus === "sent"}
                      className="w-full px-4 py-2 rounded-lg bg-[#4DEECD]/10 border border-[#4DEECD]/30 text-[#4DEECD] text-xs font-medium hover:bg-[#4DEECD]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DEECD] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      aria-label="Send order"
                    >
                      {orderStatus === "sending" ? "Sending..." : orderStatus === "sent" ? "Order sent" : "Send order"}
                    </button>
                    
                    {/* Confirmation Message */}
                    <AnimatePresence>
                      {orderStatus === "sent" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                          className="mt-3 pt-3 border-t border-white/5"
                        >
                          <p className="text-xs text-[#4DEECD]">
                            Orders sent. Timeline will update when results arrive.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 7: Why Arc is Built This Way */}
      <section className="py-20 md:py-24">
        <Container>
          {/* Section Header - Centered */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Built for longitudinal clinical care
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed text-center">
              Arc is designed around how health actually changes over time, not around episodic encounters.
            </p>
          </div>

          {/* Three Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Continuity over visits",
                  explanation: "Health trends emerge across months and years. Arc is built around a continuous patient timeline rather than isolated appointments.",
                  whatThisChanges: "Clinicians see the full clinical story without reconstructing it at every visit.",
                  example: "Labs, protocols, and outcomes appear in one chronological view.",
                },
                {
                  title: "Decisions tied to signals",
                  explanation: "Arc surfaces recommendations and workflows based on longitudinal patterns instead of static thresholds or visit based rules.",
                  whatThisChanges: "Attention is directed by emerging risk and meaningful change, not by calendar timing.",
                  example: "A rising trend triggers review before symptoms appear.",
                },
                {
                  title: "Reduced clinician overhead",
                  explanation: "Operational steps are embedded directly into the clinical timeline so coordination happens inside the system.",
                  whatThisChanges: "Less time is spent tracking tasks across tools and more time is spent on clinical judgment.",
                  example: "Orders, reviews, and follow ups stay linked to the original decision.",
                },
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={prefersReducedMotion ? {} : { y: -2 }}
                  className="group relative p-6 rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border border-white/6 hover:border-white/10 transition-all duration-200 focus-within:ring-2 focus-within:ring-[#4DEECD]/50 focus-within:ring-offset-2 focus-within:ring-offset-black motion-reduce:hover:translate-y-0"
                  tabIndex={0}
                >
                  {/* Subtle inner glow on hover */}
                  <div className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-[#4DEECD]/0 to-[#4DEECD]/0 group-hover:from-[#4DEECD]/5 group-hover:to-transparent transition-all duration-200 pointer-events-none"></div>
                  
                  <div className="relative">
                    {/* Principle Title */}
                    <h3 className="text-lg font-semibold text-white mb-3">{card.title}</h3>
                    
                    {/* Explanation */}
                    <p className="text-sm text-gray-300 leading-relaxed mb-4">
                      {card.explanation}
                    </p>
                    
                    {/* What this changes in practice */}
                    <div className="pt-4 border-t border-white/5 mb-3">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        What this changes in practice
                      </p>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {card.whatThisChanges}
                      </p>
                    </div>
                    
                    {/* Example */}
                    <div className="pt-2 border-t border-white/5">
                      <p className="text-xs text-gray-400 italic">
                        {card.example}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </Container>
      </section>

      {/* Section 8: Data and Interoperability */}
      <section className="py-20 md:py-24">
        <Container>
          {/* Section Header - Centered */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Bring clinical data in and share it cleanly
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4 text-center">
              Arc ingests existing records and turns fragmented inputs into clear longitudinal summaries that support shared care.
            </p>
            <p className="text-base text-gray-300 leading-relaxed text-center">
              Clinical data arrives in many formats and from many sources. Arc is designed to accept this reality and organize incoming information into a coherent patient timeline that can be reviewed and shared with confidence.
            </p>
          </div>

          {/* Capability Cards */}
          <div className="max-w-2xl mx-auto">
            <p className="text-sm font-medium text-gray-400 mb-6 text-center">
              Core capabilities include
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Upload documents and records",
                  explanation: "Bring prior notes reports and external records into a single patient timeline.",
                  supporting: "The system preserves context instead of flattening information into static files.",
                },
                {
                  title: "Ingest lab results",
                  explanation: "Lab data is parsed and placed directly into the longitudinal view where trends can be reviewed over time.",
                  supporting: "Results contribute to signal detection and ongoing assessment.",
                },
                {
                  title: "Export clinical summaries",
                  explanation: "Generate clear summaries that reflect the full patient story for referrals or patient sharing.",
                  supporting: "Outputs are structured for understanding rather than raw data transfer.",
                },
              ].map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-5 rounded-[20px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] border border-white/6 hover:border-white/10 transition-all duration-200"
                >
                  <h3 className="text-base font-semibold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-2">
                    {card.explanation}
                  </p>
                  <p className="text-xs text-gray-400 italic">
                    {card.supporting}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Section 9: FAQ */}
      <section className="py-20 md:py-24">
        <Container maxWidth="narrow">
          {/* Section Header - Centered */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-3">
            {clinicFAQs.map((faq, index) => (
              <FAQAccordion
                key={faq.q}
                question={faq.q}
                answer={faq.a}
                index={index}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/contact"
              className="text-sm text-[#4DEECD] hover:text-[#4DEECD]/80 transition-colors inline-flex items-center gap-2"
            >
              Contact the team if you have more questions
            </Link>
          </div>
        </Container>
      </section>

      {/* Section 10: Final CTA */}
      <section className="py-20 md:py-24">
        <Container maxWidth="narrow">
          {/* Section Header - Centered */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              See Arc in your workflow
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed text-center">
              Request a demo to explore the clinical timeline, triage, and intervention workflows.
            </p>
          </div>

          <div className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact">Request a demo</Button>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/40 transition-colors inline-flex items-center justify-center"
              >
                Contact the team
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
