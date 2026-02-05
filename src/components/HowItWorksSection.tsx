"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { ArcButton } from "./ui/ArcButton";

interface Step {
  number: string;
  title: string;
  description: string;
  visual: React.ReactNode;
}

const steps: Step[] = [
  {
    number: "1",
    title: "Understand your health baseline",
    description: "Complete at home diagnostics and connect medical records to establish a clear picture of your current health.",
    visual: (
      <div className="arc-how-it-works-preview-content">
        <div className="arc-how-it-works-preview-heading">
          <h3 className="arc-how-it-works-preview-title">Diagnostics Overview</h3>
          <p className="arc-how-it-works-preview-subhead">
            Your connected health data sources and status.
          </p>
        </div>
        
        <div className="arc-how-it-works-preview-sections">
          <div className="arc-how-it-works-preview-section">
            <div className="arc-how-it-works-preview-section-header">
              <h4 className="arc-how-it-works-preview-section-title">Connected Data Sources</h4>
              <div className="arc-how-it-works-preview-status">
                <span className="arc-how-it-works-preview-status-dot" />
                <span className="arc-how-it-works-preview-status-text">3 active</span>
              </div>
            </div>
            <div className="arc-how-it-works-preview-section-list">
              <div className="arc-how-it-works-preview-section-item">
                <span className="arc-how-it-works-preview-section-dot" />
                <span>Electronic health records</span>
              </div>
              <div className="arc-how-it-works-preview-section-item">
                <span className="arc-how-it-works-preview-section-dot" />
                <span>Lab results portal</span>
              </div>
              <div className="arc-how-it-works-preview-section-item">
                <span className="arc-how-it-works-preview-section-dot" />
                <span>Wearable devices</span>
              </div>
            </div>
          </div>

          <div className="arc-how-it-works-preview-section">
            <div className="arc-how-it-works-preview-section-header">
              <h4 className="arc-how-it-works-preview-section-title">At Home Diagnostics</h4>
              <div className="arc-how-it-works-preview-status">
                <span className="arc-how-it-works-preview-status-dot" />
                <span className="arc-how-it-works-preview-status-text">Ready</span>
              </div>
            </div>
            <p className="arc-how-it-works-preview-section-text">
              Complete your baseline screening kit to unlock personalized insights.
            </p>
          </div>

          <div className="arc-how-it-works-preview-section">
            <div className="arc-how-it-works-preview-section-header">
              <div>
                <h4 className="arc-how-it-works-preview-section-title">Recent Lab Check</h4>
                <p className="arc-how-it-works-preview-section-meta">Last updated 14 days ago</p>
              </div>
              <div className="arc-how-it-works-preview-badge">
                <div className="arc-how-it-works-preview-badge-dot" />
                <div className="arc-how-it-works-preview-badge-ring" />
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
    visual: (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Plan Overview</h3>
          <p className="dashboard-description text-sm">
            Your personalized health plan based on current data.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-white/5">
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

          <div className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-white/5">
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

          <div className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-white/5">
            <h4 className="text-sm font-semibold text-white mb-2">Suggested Interventions</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 rounded-full bg-[#0f0f0f] border border-white/10 text-xs text-[#A3B3AA]">Nutrition</span>
              <span className="px-3 py-1 rounded-full bg-[#0f0f0f] border border-white/10 text-xs text-[#A3B3AA]">Movement</span>
              <span className="px-3 py-1 rounded-full bg-[#0f0f0f] border border-white/10 text-xs text-[#A3B3AA]">Recovery</span>
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
    visual: (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Blueprint Testing</h3>
          <p className="dashboard-description text-sm">
            Track your blueprint performance and outcomes.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-white/5">
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

          <div className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-white/5">
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

          <div className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-white/5">
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
    visual: (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Clinical Network Access</h3>
          <p className="dashboard-description text-sm">
            Specialists and services available when you need them.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-white/5">
            <h4 className="text-sm font-semibold text-white mb-3">Available Specialties</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-sm text-[#A3B3AA]">Longevity medicine</span>
                <span className="text-xs text-[#6FFFC3] font-medium">12 providers</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-sm text-[#A3B3AA]">Metabolic health</span>
                <span className="text-xs text-[#6FFFC3] font-medium">8 providers</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-[#A3B3AA]">Preventive cardiology</span>
                <span className="text-xs text-[#6FFFC3] font-medium">6 providers</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-white/5">
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

          <div className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-[#6FFFC3]/20">
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
    <section id="home.howItWorks" className="arc-how-it-works-section">
      <Section>
        <div className="arc-how-it-works-wrapper">
          {/* Title */}
          <motion.div
            className="arc-how-it-works-heading-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="arc-how-it-works-heading">
              How it works
            </h2>
            <div className="arc-how-it-works-heading-divider" />
          </motion.div>

          {/* Two Column Layout */}
          <div className="arc-how-it-works-grid">
            {/* Left Column - Step List */}
            <div className="arc-how-it-works-steps">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveStep(index);
                      }
                    }}
                    className={`arc-how-it-works-step ${isActive ? 'arc-how-it-works-step-active' : 'arc-how-it-works-step-inactive'}`}
                    aria-label={`Step ${step.number}: ${step.title}`}
                    aria-current={isActive ? "step" : undefined}
                    tabIndex={0}
                  >
                    {/* Left-edge indicator strip (active only) */}
                    {isActive && <div className="arc-how-it-works-step-indicator" />}
                    
                    <div className="arc-how-it-works-step-content">
                      {/* Number Token */}
                      <div className={`arc-how-it-works-step-number ${isActive ? 'arc-how-it-works-step-number-active' : 'arc-how-it-works-step-number-inactive'}`}>
                        {step.number}
                      </div>
                      
                      <div className="arc-how-it-works-step-text">
                        <h3 className={`arc-how-it-works-step-title ${isActive ? 'arc-how-it-works-step-title-active' : 'arc-how-it-works-step-title-inactive'}`}>
                          {step.title}
                        </h3>
                        <p className={`arc-how-it-works-step-description ${isActive ? 'arc-how-it-works-step-description-active' : 'arc-how-it-works-step-description-inactive'}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column - Visual Panel (Clinical Dossier) */}
            <div className="arc-how-it-works-preview">
              <div className="arc-how-it-works-preview-container">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`step-${activeStep}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ width: '100%' }}
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
            className="arc-how-it-works-footer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <p className="arc-how-it-works-footer-text">
              Setup takes minutes. You can start with one diagnostic or record.
            </p>
            <button onClick={onCTAClick} className="arc-how-it-works-cta-button">
              Get Started
            </button>
          </motion.div>
        </div>
      </Section>
    </section>
  );
}
