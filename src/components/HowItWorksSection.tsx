"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import Button from "./ui/Button";

type StepState = "connected" | "ready" | "pending";

interface Step {
  number: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  state: StepState; // State marker for each step
}

const steps: Step[] = [
  {
    number: "1",
    title: "Understand your health baseline",
    description: "Complete at home diagnostics and connect medical records to establish a clear picture of your current health.",
    state: "connected",
    visual: (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Diagnostics Overview</h3>
          <p className="dashboard-description text-sm">
            Your connected health data sources and status.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-[#0f0f0f]/60">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-white">Connected Data Sources</h4>
              <span className="text-xs text-[#6FFFC3] font-medium">3 active</span>
            </div>
            <div className="space-y-2 mt-3">
              <div className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                <span>Electronic health records</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                <span>Lab results portal</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                <span>Wearable devices</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0f0f0f]/60">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-white">At Home Diagnostics</h4>
              <span className="text-xs text-[#6FFFC3] font-medium">Ready</span>
            </div>
            <p className="text-sm text-[#A3B3AA] mt-2">
              Complete your baseline screening kit to unlock personalized insights.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0f0f0f]/60">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">Recent Lab Check</h4>
                <p className="text-xs text-[#A3B3AA]">Last updated 14 days ago</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#6FFFC3]/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#6FFFC3]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "2",
    title: "Build your personalized longevity plan",
    description: "Arc analyzes your data to create a plan tailored to your biology risks and goals.",
    state: "ready",
    visual: (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Plan Overview</h3>
          <p className="dashboard-description text-sm">
            Your personalized health plan based on current data.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-[#0f0f0f]/60">
            <h4 className="text-sm font-semibold text-white mb-3">Priority Focus Areas</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#A3B3AA]">Metabolic health</span>
                <span className="text-xs text-[#6FFFC3] font-medium">High priority</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#A3B3AA]">Sleep optimization</span>
                <span className="text-xs text-[#6FFFC3] font-medium">Moderate</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#A3B3AA]">Inflammation markers</span>
                <span className="text-xs text-[#6FFFC3] font-medium">Monitor</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0f0f0f]/60">
            <h4 className="text-sm font-semibold text-white mb-3">Risk Indicators</h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-[#A3B3AA]">Cardiovascular risk</span>
                  <span className="text-xs text-white font-medium">Low</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#6FFFC3] rounded-full" style={{ width: "25%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-[#A3B3AA]">Metabolic risk</span>
                  <span className="text-xs text-white font-medium">Moderate</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#6FFFC3] rounded-full" style={{ width: "55%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0f0f0f]/60">
            <h4 className="text-sm font-semibold text-white mb-2">Suggested Interventions</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1.5 rounded-full bg-[#0f0f0f] text-xs text-[#A3B3AA]">Nutrition</span>
              <span className="px-3 py-1.5 rounded-full bg-[#0f0f0f] text-xs text-[#A3B3AA]">Movement</span>
              <span className="px-3 py-1.5 rounded-full bg-[#0f0f0f] text-xs text-[#A3B3AA]">Recovery</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "3",
    title: "Test and refine blueprints",
    description: "Try structured health blueprints and track which ones improve your outcomes over time.",
    state: "ready",
    visual: (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Blueprint Testing</h3>
          <p className="dashboard-description text-sm">
            Track your blueprint performance and outcomes.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-[#0f0f0f]/60">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-white">Active Blueprint</h4>
              <span className="text-xs text-[#6FFFC3] font-medium">Week 3 of 12</span>
            </div>
            <p className="text-sm text-[#A3B3AA] mb-3">
              Metabolic optimization protocol
            </p>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#6FFFC3] rounded-full" style={{ width: "25%" }}></div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0f0f0f]/60">
            <h4 className="text-sm font-semibold text-white mb-3">Early Signal Trends</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#A3B3AA]">Energy levels</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#6FFFC3]">↑ 12%</span>
                  <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#6FFFC3] rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#A3B3AA]">Sleep quality</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#6FFFC3]">↑ 8%</span>
                  <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#6FFFC3] rounded-full" style={{ width: "55%" }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#A3B3AA]">Recovery rate</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#6FFFC3]">↑ 5%</span>
                  <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#6FFFC3] rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0f0f0f]/60">
            <h4 className="text-sm font-semibold text-white mb-2">Outcome Indicators</h4>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <p className="text-xs text-[#A3B3AA] mb-1">Baseline</p>
                <p className="text-lg font-semibold text-white">72</p>
              </div>
              <div>
                <p className="text-xs text-[#A3B3AA] mb-1">Current</p>
                <p className="text-lg font-semibold text-[#6FFFC3]">81</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "4",
    title: "Access curated clinical network",
    description: "Connect with a curated network of longevity focused clinicians and diagnostic services when needed.",
    state: "pending",
    visual: (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Clinical Network Access</h3>
          <p className="dashboard-description text-sm">
            Specialists and services available when you need them.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-[#0f0f0f]/60">
            <h4 className="text-sm font-semibold text-white mb-3">Available Specialties</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-[#A3B3AA]">Longevity medicine</span>
                <span className="text-xs text-[#6FFFC3] font-medium">12 providers</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-[#A3B3AA]">Metabolic health</span>
                <span className="text-xs text-[#6FFFC3] font-medium">8 providers</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-[#A3B3AA]">Preventive cardiology</span>
                <span className="text-xs text-[#6FFFC3] font-medium">6 providers</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0f0f0f]/60">
            <h4 className="text-sm font-semibold text-white mb-3">Diagnostic Services</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                <span>Advanced biomarker panels</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                <span>Imaging services</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                <span>Functional testing</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0f0f0f]/60">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#6FFFC3]/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#6FFFC3]"></div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white mb-1">Next Recommended Consultation</h4>
                <p className="text-xs text-[#A3B3AA] mb-2">
                  Based on your current plan and risk profile
                </p>
                <p className="text-sm text-[#6FFFC3] font-medium">
                  Metabolic health specialist → 30 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

interface HowItWorksSectionProps {
  onCTAClick?: () => void;
}

export default function HowItWorksSection({ onCTAClick }: HowItWorksSectionProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="home.howItWorks" className="relative z-10">
      <Section>
        <div>
          {/* Title */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SectionTitle className="text-center text-4xl md:text-5xl font-semibold tracking-tight">
              How it works
            </SectionTitle>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start mb-12">
            {/* Left Column - Interactive Step List */}
            <div className="space-y-4 order-2 md:order-1">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                
                // State marker styling
                const getStateStyles = (state: StepState) => {
                  switch (state) {
                    case "connected":
                      return {
                        label: "Connected",
                        color: "text-[#6FFFC3]",
                        bg: "bg-[#6FFFC3]/10",
                        dot: "bg-[#6FFFC3]",
                      };
                    case "ready":
                      return {
                        label: "Ready",
                        color: "text-[#6FFFC3]",
                        bg: "bg-[#6FFFC3]/10",
                        dot: "bg-[#6FFFC3]",
                      };
                    case "pending":
                      return {
                        label: "Pending",
                        color: "text-gray-400",
                        bg: "bg-white/5",
                        dot: "bg-gray-400",
                      };
                  }
                };
                
                const stateStyles = getStateStyles(step.state);
                
                return (
                         <button
                           key={index}
                           onClick={() => setActiveStep(index)}
                           onKeyDown={(e) => {
                             if (e.key === "Enter" || e.key === " ") {
                               e.preventDefault();
                               setActiveStep(index);
                             }
                             // Arrow key navigation
                             if (e.key === "ArrowDown" && index < steps.length - 1) {
                               e.preventDefault();
                               setActiveStep(index + 1);
                               const nextButton = document.querySelector(
                                 `[aria-label*="Step ${index + 2}"]`
                               ) as HTMLElement;
                               nextButton?.focus();
                             }
                             if (e.key === "ArrowUp" && index > 0) {
                               e.preventDefault();
                               setActiveStep(index - 1);
                               const prevButton = document.querySelector(
                                 `[aria-label*="Step ${index}"]`
                               ) as HTMLElement;
                               prevButton?.focus();
                             }
                             if (e.key === "Home") {
                               e.preventDefault();
                               setActiveStep(0);
                               const firstButton = document.querySelector(
                                 `[aria-label*="Step 1"]`
                               ) as HTMLElement;
                               firstButton?.focus();
                             }
                             if (e.key === "End") {
                               e.preventDefault();
                               setActiveStep(steps.length - 1);
                               const lastButton = document.querySelector(
                                 `[aria-label*="Step ${steps.length}"]`
                               ) as HTMLElement;
                               lastButton?.focus();
                             }
                           }}
                           className={`w-full text-left p-6 rounded-[var(--radius-card)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-page)] ${
                             isActive
                               ? "bg-layer-card shadow-card-hover"
                               : "bg-layer-card opacity-80 hover:opacity-100"
                           }`}
                           aria-label={`Step ${step.number}: ${step.title}`}
                           aria-current={isActive ? "step" : undefined}
                           tabIndex={0}
                         >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-[var(--color-accent-primary)] text-black"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        {step.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="card-title mb-0">
                            {step.title}
                          </h3>
                          {/* State Marker */}
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${stateStyles.bg} ${stateStyles.color}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${stateStyles.dot}`}></span>
                            {stateStyles.label}
                          </span>
                        </div>
                        <p className="typography-body-secondary">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column - Diagnostics Overview Panel */}
            <div className="order-1 md:order-2 w-full relative">
              <div className="w-full rounded-[var(--radius-card)] bg-layer-card p-6 md:p-8 shadow-card" style={{ minHeight: '500px', position: 'relative', zIndex: 10 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`step-${activeStep}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ 
                      duration: 0.3, 
                      ease: [0.16, 1, 0.3, 1] // Smooth easing
                    }}
                    style={{ width: '100%', minHeight: '400px' }} // Prevent layout shift
                  >
                    {steps && steps.length > activeStep && steps[activeStep] && steps[activeStep].visual ? (
                      steps[activeStep].visual
                    ) : (
                      <div className="text-white p-4">Step {activeStep + 1} content loading...</div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-sm text-[#A3B3AA] mb-4">
              Setup takes minutes. You can start with one diagnostic or record.
            </p>
            <Button variant="primary" onClick={onCTAClick}>
              Get Started
            </Button>
          </motion.div>
        </div>
      </Section>
    </section>
  );
}
